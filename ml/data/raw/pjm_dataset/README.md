# PJM Dataset

This dataset contains the hourly energy consumption data for the PJM Interconnection.

## Created by

Robikscube on Kaggle
[Link to the dataset](https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption)

## Abbreviations

The dataset includes data from the following utilities/regions:

- **AEP**: American Electric Power
- **COMED**: Commonwealth Edison (serves northern Illinois)
- **DAYTON**: Dayton Power & Light (serves Ohio)
- **DEOK**: Duke Energy Ohio/Kentucky
- **DOM**: Dominion Energy (serves Virginia and North Carolina)
- **DUQ**: Duquesne Light Company (serves Pittsburgh area)
- **EKPC**: East Kentucky Power Cooperative
- **FE**: FirstEnergy
- **NI**: Northern Illinois
- **PJME**: PJM East (Eastern region of PJM, primarily covering New Jersey, Delaware, and eastern Pennsylvania)
- **PJMW**: PJM West (Western region of PJM, primarily covering western Pennsylvania, West Virginia, and parts of Ohio)
- **PJM_Load**: Total load across the entire PJM Interconnection

## Files

- AEP_hourly.csv
- COMED_hourly.csv
- DAYTON_hourly.csv
- DEOK_hourly.csv
- DOM_hourly.csv
- DUQ_hourly.csv
- EKPC_hourly.csv
- FE_hourly.csv
- NI_hourly.csv
- PJME_hourly.csv
- PJMW_hourly.csv
- PJM_Load_hourly.csv
- est_hourly.paruqet
- pjm_hourly_est.csv

## What a typical file looks like

```csv
Datetime,AEP_MW
2004-12-31 01:00:00,13478.0
2004-12-31 02:00:00,12865.0
2004-12-31 03:00:00,12577.0
...
```

## What pjm_hourly_est.csv specifically looks like

```csv
Datetime,AEP,COMED,DAYTON,DEOK,DOM,DUQ,EKPC,FE,NI,PJME,PJMW,PJM_Load
1998-12-31 01:00:00,,,,,,,,,,,,29309.0
1998-12-31 02:00:00,,,,,,,,,,,,28236.0
1998-12-31 03:00:00,,,,,,,,,,,,27692.0
1998-12-31 04:00:00,,,,,,,,,,,,27596.0
1998-12-31 05:00:00,,,,,,,,,,,,27888.0
```

Note that it has more complete data in later years.

## Future Enhancements

- Add weather data to correlate with energy consumption patterns
