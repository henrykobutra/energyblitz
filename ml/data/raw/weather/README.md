# NOAA Weather Dataset

## Overview

This dataset contains hourly weather measurements from multiple U.S. cities, collected from NOAA (National Oceanic and Atmospheric Administration) starting from January 2002. The data includes various weather metrics such as temperature, wind speed, and precipitation for Chicago, Washington, Pittsburgh, and Columbus.

## Data Format

The data is provided in CSV (Comma-Separated Values) format with the following structure:

### File: noaa_data.csv

- **Timestamp**: Hourly readings starting from 2002-01-01
- **Measurements per city** (repeated for each city: Chicago, Washington, Pittsburgh, Columbus):
  - `avg_wind_speed`: Average wind speed
  - `precipitation`: Precipitation amount
  - `avg_temperature`: Average temperature
  - `max_temperature`: Maximum temperature
  - `min_temperature`: Minimum temperature
  - `temperature`: Current temperature

### Cities Included

- Chicago, Illinois
- Washington, D.C.
- Pittsburgh, Pennsylvania
- Columbus, Ohio

### Sample Data

```csv
timestamp,avg_wind_speed,precipitation,avg_temperature,max_temperature,min_temperature,temperature,avg_wind_speed_chicago,precipitation_chicago,avg_temperature_chicago,max_temperature_chicago,min_temperature_chicago,temperature_chicago,avg_wind_speed_washington,precipitation_washington,avg_temperature_washington,max_temperature_washington,min_temperature_washington,temperature_washington,avg_wind_speed_pittsburgh,precipitation_pittsburgh,avg_temperature_pittsburgh,max_temperature_pittsburgh,min_temperature_pittsburgh,temperature_pittsburgh,avg_wind_speed_columbus,precipitation_columbus,avg_temperature_columbus,max_temperature_columbus,min_temperature_columbus,temperature_columbus
2002-01-01 00:00:00,15.0,0.0,-8.4,3.3,-20.099999999999998,-20.099999999999998,5.5,0.0,-19.5,-9.75,-30.5,-29.875,11.600000000000001,0.0,-5.6000000000000005,2.2,-13.4,-13.4,3.9,0.0,-12.45,-6.6,-19.2,-18.75,1.3,0.0,-7.800000000000001,-3.3000000000000003,-12.8,-12.55
```

## Units of Measurement

- Temperature: Degrees Celsius (°C)
- Wind Speed: Meters per second (m/s)
- Precipitation: Millimeters (mm)

## Data Range

- Start Date: January 1, 2002
- Frequency: Hourly readings

## Usage

This dataset can be used for:

- Weather pattern analysis
- Temperature trend studies
- Precipitation pattern analysis
- Wind speed analysis
- Cross-city weather comparisons
- Climate change research
- Machine learning weather prediction models

## File Structure

public/
└── data/
└── weather/
└── noaa_data.csv

## Data Source

Data collected from the National Oceanic and Atmospheric Administration (NOAA).
