import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import holidays
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from scipy.stats import spearmanr


def clean_weather_data(df_weather):
    """
    Clean weather data using the validated temperature ranges from EDA
    """
    df = df_weather.copy()

    # Define reasonable temperature ranges for each city
    city_limits = {
        "chicago": {"min": -30, "max": 42},
        "washington": {"min": -26, "max": 41},
        "pittsburgh": {"min": -28, "max": 38},
        "columbus": {"min": -27, "max": 38},
    }

    # Filter data within reasonable ranges
    for city, limits in city_limits.items():
        temp_col = f"temperature_{city}"
        df = df[(df[temp_col] >= limits["min"]) & (df[temp_col] <= limits["max"])]

    # Add year for filtering
    df["year"] = df["timestamp"].dt.year

    # Filter to valid years based on EDA findings
    df = df[(df["year"] < 2005) | (df["year"] >= 2014)]

    return df


def prepare_pjm_data(df_pjm):
    """
    Clean and prepare PJM data, focusing on PJME and PJMW
    """
    df = df_pjm.copy()

    # Rename datetime column to match weather data
    df.rename(columns={"Datetime": "timestamp"}, inplace=True)

    # Focus on the most complete columns identified in EDA
    columns_to_keep = ["timestamp", "PJME", "PJMW"]
    df = df[columns_to_keep]

    # Forward fill missing values (as these are time series)
    df["PJME"].fillna(method="ffill", inplace=True)
    df["PJMW"].fillna(method="ffill", inplace=True)

    return df


def merge_data(df_pjm, df_weather):
    """
    Merge cleaned PJM and weather data
    """
    # Clean individual datasets
    weather_clean = clean_weather_data(df_weather)
    pjm_clean = prepare_pjm_data(df_pjm)

    # Merge on timestamp
    df_merged = pd.merge(pjm_clean, weather_clean, on="timestamp", how="inner")

    # Sort by timestamp
    df_merged.sort_values("timestamp", inplace=True)

    return df_merged


def create_temporal_features(df):
    """
    Create temporal features including cyclic encoding for periodic features
    """
    df = df.copy()

    # Drop the first row with NaN values
    df = df.dropna()

    # Basic temporal features
    df["hour"] = df["timestamp"].dt.hour
    df["day"] = df["timestamp"].dt.day
    df["month"] = df["timestamp"].dt.month
    df["day_of_week"] = df["timestamp"].dt.dayofweek
    df["week_of_year"] = df["timestamp"].dt.isocalendar().week

    # Cyclic encoding for periodic features
    # Hour of day
    df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
    df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)

    # Day of week
    df["day_of_week_sin"] = np.sin(2 * np.pi * df["day_of_week"] / 7)
    df["day_of_week_cos"] = np.cos(2 * np.pi * df["day_of_week"] / 7)

    # Month of year
    df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)

    # Time of day indicators
    df["is_morning"] = (df["hour"] >= 6) & (df["hour"] < 12)
    df["is_afternoon"] = (df["hour"] >= 12) & (df["hour"] < 18)
    df["is_evening"] = (df["hour"] >= 18) & (df["hour"] < 22)
    df["is_night"] = (df["hour"] >= 22) | (df["hour"] < 6)

    # Weekend indicator
    df["is_weekend"] = df["day_of_week"].isin([5, 6])

    return df


def create_lag_features(df):
    """
    Create lag features for both energy consumption and weather
    Focusing on patterns relevant for 24h and 7d predictions
    """
    # Hourly lags for past 24 hours
    for i in [1, 2, 3, 6, 12, 24]:
        df[f"PJME_lag_{i}h"] = df["PJME"].shift(i)
        df[f"PJMW_lag_{i}h"] = df["PJMW"].shift(i)

    # Daily lags for past week
    for i in [24, 48, 72, 96, 120, 144, 168]:  # 24*7=168 (one week)
        df[f"PJME_lag_{i}h"] = df["PJME"].shift(i)
        df[f"PJMW_lag_{i}h"] = df["PJMW"].shift(i)

    # Same hour previous days
    df["PJME_same_hour_1d"] = df["PJME"].shift(24)
    df["PJME_same_hour_7d"] = df["PJME"].shift(168)
    df["PJMW_same_hour_1d"] = df["PJMW"].shift(24)
    df["PJMW_same_hour_7d"] = df["PJMW"].shift(168)

    # Rolling means for different windows
    windows = [6, 12, 24, 168]  # 6h, 12h, 24h, 1 week
    for window in windows:
        df[f"PJME_rolling_mean_{window}h"] = df["PJME"].rolling(window=window).mean()
        df[f"PJMW_rolling_mean_{window}h"] = df["PJMW"].rolling(window=window).mean()
        df[f"PJME_rolling_std_{window}h"] = df["PJME"].rolling(window=window).std()
        df[f"PJMW_rolling_std_{window}h"] = df["PJMW"].rolling(window=window).std()

    return df


def create_weather_features(df):
    """
    Create weather-based features and weather-time interactions
    """
    df = df.copy()

    # Average temperature across cities (weighted by population/importance)
    df["temp_avg"] = (
        df["temperature_chicago"] * 0.35
        + df["temperature_washington"] * 0.25
        + df["temperature_pittsburgh"] * 0.2
        + df["temperature_columbus"] * 0.2
    )

    # Temperature changes
    for city in ["chicago", "washington", "pittsburgh", "columbus"]:
        # Hourly temperature changes
        df[f"temp_change_{city}"] = df[f"temperature_{city}"] - df[
            f"temperature_{city}"
        ].shift(1)

        # Daily temperature changes
        df[f"temp_change_24h_{city}"] = df[f"temperature_{city}"] - df[
            f"temperature_{city}"
        ].shift(24)

        # Temperature extremes
        df[f"temp_extreme_cold_{city}"] = df[f"temperature_{city}"] <= df[
            f"temperature_{city}"
        ].quantile(0.1)
        df[f"temp_extreme_hot_{city}"] = df[f"temperature_{city}"] >= df[
            f"temperature_{city}"
        ].quantile(0.9)

    # Regional weather features
    df["temp_spread"] = df[
        [
            f"temperature_{city}"
            for city in ["chicago", "washington", "pittsburgh", "columbus"]
        ]
    ].max(axis=1) - df[
        [
            f"temperature_{city}"
            for city in ["chicago", "washington", "pittsburgh", "columbus"]
        ]
    ].min(
        axis=1
    )

    # Average wind speed and precipitation
    df["wind_speed_avg"] = df[
        [
            f"avg_wind_speed_{city}"
            for city in ["chicago", "washington", "pittsburgh", "columbus"]
        ]
    ].mean(axis=1)
    df["precipitation_avg"] = df[
        [
            f"precipitation_{city}"
            for city in ["chicago", "washington", "pittsburgh", "columbus"]
        ]
    ].mean(axis=1)

    # Create weather severity index
    df["weather_severity"] = (
        (df["temp_extreme_cold_chicago"] | df["temp_extreme_hot_chicago"]).astype(int)
        + (
            df["temp_extreme_cold_washington"] | df["temp_extreme_hot_washington"]
        ).astype(int)
        + (
            df["temp_extreme_cold_pittsburgh"] | df["temp_extreme_hot_pittsburgh"]
        ).astype(int)
        + (df["temp_extreme_cold_columbus"] | df["temp_extreme_hot_columbus"]).astype(
            int
        )
    )

    return df


def create_interaction_features(df):
    """
    Create interaction features between weather and temporal components
    """
    df = df.copy()

    # Temperature-time interactions
    df["temp_hour_sin"] = df["temp_avg"] * df["hour_sin"]
    df["temp_hour_cos"] = df["temp_avg"] * df["hour_cos"]
    df["temp_month_sin"] = df["temp_avg"] * df["month_sin"]
    df["temp_month_cos"] = df["temp_avg"] * df["month_cos"]

    # Weather severity interactions
    df["severity_weekend"] = df["weather_severity"] * df["is_weekend"]
    df["severity_hour"] = df["weather_severity"] * df["hour"]

    # Time-specific temperature features
    df["temp_morning"] = df["temp_avg"] * df["is_morning"]
    df["temp_afternoon"] = df["temp_avg"] * df["is_afternoon"]
    df["temp_evening"] = df["temp_avg"] * df["is_evening"]
    df["temp_night"] = df["temp_avg"] * df["is_night"]

    # Temperature change interactions
    df["temp_change_morning"] = (
        df["temp_change_chicago"] * df["is_morning"]
    )  # Using Chicago as reference
    df["temp_change_afternoon"] = df["temp_change_chicago"] * df["is_afternoon"]

    return df


def create_holiday_features(df):
    """
    Create holiday-related features
    """
    df = df.copy()

    # Create US holidays calendar
    us_holidays = holidays.US()

    # Basic holiday indicator
    df["is_holiday"] = df["timestamp"].dt.date.map(lambda x: x in us_holidays)

    # Create specific holiday season indicators
    def is_christmas_season(date):
        return (
            (date.month == 12 and date.day >= 15)
            or (date.month == 12 and date.day <= 31)
            or (date.month == 1 and date.day <= 5)
        )

    def is_thanksgiving_season(date):
        return date.month == 11 and date.day >= 20 and date.day <= 30

    def is_summer_holiday(date):
        return (
            date.month in [7, 8]
            or (date.month == 6 and date.day >= 15)
            or (date.month == 9 and date.day <= 15)
        )

    # Apply holiday seasons
    df["is_christmas_season"] = df["timestamp"].map(is_christmas_season)
    df["is_thanksgiving_season"] = df["timestamp"].map(is_thanksgiving_season)
    df["is_summer_holiday"] = df["timestamp"].map(is_summer_holiday)

    # Day before/after holiday
    holiday_dates = set(us_holidays)
    df["is_day_before_holiday"] = df["timestamp"].dt.date.map(
        lambda x: (x + timedelta(days=1)) in holiday_dates
    )
    df["is_day_after_holiday"] = df["timestamp"].dt.date.map(
        lambda x: (x - timedelta(days=1)) in holiday_dates
    )

    return df


def create_consumption_features(df):
    """
    Create features related to consumption patterns and trends
    """
    df = df.copy()

    # Create 24h moving average crossover signals
    df["ma_24h"] = df["PJME"].rolling(window=24).mean()
    df["ma_168h"] = df["PJME"].rolling(window=168).mean()  # 7 days
    df["trend_signal"] = (df["ma_24h"] > df["ma_168h"]).astype(int)

    # Peak consumption indicators
    df["hour_of_week"] = df["day_of_week"] * 24 + df["hour"]

    # Calculate peak consumption thresholds
    hourly_peaks = df.groupby("hour")["PJME"].quantile(0.9)
    weekly_hour_peaks = df.groupby("hour_of_week")["PJME"].quantile(0.9)

    # Create peak indicators
    df["is_peak_hour"] = df.apply(lambda x: x["PJME"] > hourly_peaks[x["hour"]], axis=1)
    df["is_peak_hour_of_week"] = df.apply(
        lambda x: x["PJME"] > weekly_hour_peaks[x["hour_of_week"]], axis=1
    )

    # Add consumption change rates
    df["consumption_change_rate"] = df["PJME"].pct_change()
    df["consumption_change_rate_24h"] = df["PJME"].pct_change(periods=24)

    # Add weekly seasonality strength
    df["weekly_seasonality"] = abs(df["PJME"] - df["PJME"].shift(168)) / df[
        "PJME"
    ].shift(168)

    return df


def remove_highly_correlated_features(df, threshold=0.95):
    """
    Remove highly correlated features using Spearman correlation
    """
    # Calculate correlation matrix
    correlation_matrix = df.corr(method="spearman")

    # Create upper triangle mask
    upper = correlation_matrix.where(
        np.triu(np.ones(correlation_matrix.shape), k=1).astype(bool)
    )

    # Find features with correlation greater than threshold
    to_drop = [
        column for column in upper.columns if any(upper[column].abs() > threshold)
    ]

    print(f"Dropping {len(to_drop)} highly correlated features: {to_drop}")

    return df.drop(columns=to_drop)


def prepare_final_features(df, prediction_window="24h"):
    """
    Prepare final feature set for either 24h or 7d prediction
    """
    df = df.copy()

    # Handle missing values
    # Forward fill for trend-based features
    trend_cols = ["ma_24h", "ma_168h", "trend_signal"]
    df[trend_cols] = df[trend_cols].fillna(method="ffill")

    # Fill change rates with 0
    change_cols = [
        "consumption_change_rate",
        "consumption_change_rate_24h",
        "weekly_seasonality",
    ]
    df[change_cols] = df[change_cols].fillna(0)

    # Fill temperature changes with 0
    temp_change_cols = [col for col in df.columns if "temp_change" in col]
    df[temp_change_cols] = df[temp_change_cols].fillna(0)

    # Define features to exclude (target variables and timestamps)
    exclude_cols = ["timestamp", "PJME", "PJMW"]

    # Additional exclusions based on prediction window
    if prediction_window == "24h":
        # Exclude weekly features for 24h prediction
        exclude_cols.extend([col for col in df.columns if "168h" in col])
        exclude_cols.extend([col for col in df.columns if "7d" in col])
        min_required_records = 24
    else:  # 7d prediction
        min_required_records = 168

    # Remove rows with insufficient history
    df = df.iloc[min_required_records:]

    # Get feature columns
    feature_cols = [col for col in df.columns if col not in exclude_cols]

    # Remove highly correlated features
    df_features = remove_highly_correlated_features(df[feature_cols])

    # Scale features
    scaler = StandardScaler()
    df_scaled = pd.DataFrame(
        scaler.fit_transform(df_features),
        columns=df_features.columns,
        index=df_features.index,
    )

    # Add back target variables
    df_final = pd.concat([df_scaled, df[["PJME", "PJMW"]]], axis=1)

    return df_final, scaler
