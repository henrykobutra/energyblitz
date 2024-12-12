# ⚡ EnergyBlitz

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://energyblitz.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)

Predicting the future of energy consumption? We've got the power! 🔮⚡

EnergyBlitz is a cutting-edge energy consumption forecasting system that brings together the mighty PJM Interconnection data, weather insights from NOAA, and even throws holidays into the mix (though they're not as impactful as you might think - turns out people use electricity whether it's Presidents' Day or not! 🎈).

🔗 [Witness the Magic in Action](https://energyblitz.vercel.app)

## ✨ What Makes Us Special

- 🤖 Not one, not two, but FOUR prediction models duking it out (SARIMA, Random Forest, XGBoost, LSTM)
- 📊 Interactive dashboards that would make Edward Tufte proud
- 🌤️ Weather data from FIVE different cities (because one weather station is never enough)
- 📅 Holiday tracking (though it turns out Netflix doesn't care what day it is)
- 🎯 Real-time predictions that are actually pretty accurate!

## 🏆 Model Showdown

Here's how our models performed in the ultimate forecasting battle:

| Model | MAE (MW) | RMSE (MW) | MAPE (%) | R² Score | Personality |
|-------|----------|-----------|-----------|----------|-------------|
| XGBoost | 292.01 | 431.50 | 0.99 | 0.9918 | The Overachiever |
| Random Forest | 367.35 | 675.55 | 1.27 | 0.9798 | The Reliable Friend |
| LSTM | 872.86 | 1273.44 | 2.95 | 0.9283 | The Complex One |
| SARIMA | 6425.16 | 8002.68 | 23.42 | - | The Classic Elder |

## 🗺️ Project Map

```
energyblitz/
├── ml/                    # Where the magic happens 🧙‍♂️
│   ├── notebooks/        # Jupyter notebooks (bring coffee ☕)
│   ├── models/          # Trained models (they're very proud)
│   └── data/            # Data processing (the real MVP)
└── app/                  # The pretty face of our project 💅
    ├── components/      # React components (they're reusable!)
    ├── lib/            # Helper functions (the unsung heroes)
    └── public/         # Static assets (they don't move much)
```

## 🎯 Prerequisites

- Python 3.8+ (the newer the better!)
- Node.js 18+ (because we're fancy)
- NOAA API Key (promise to use it wisely)
- PJM Dataset (grab it from Kaggle)
- Coffee machine (trust us, you'll need it)

## 🚀 Getting Started

1. Clone this beauty:
```bash
git clone https://github.com/henrykobutra/energyblitz
cd energyblitz
```

2. Set up the ML magic:
```bash
cd ml
python -m venv venv
source venv/bin/activate  # Windows users: venv\Scripts\activate
pip install -r requirements.txt
```

3. Prepare the web sparkles:
```bash
cd app
pnpm install  # npm install works too, we don't judge
```

4. Configuration secrets:
```bash
cp .env.example .env.local
# Add your NOAA_API_KEY (no peeking! 🙈)
```

## 📓 Our Notebook Collection

The `ml/notebooks` directory is where the real data science happens:

1. `00a_get_noaa_data.ipynb` - Weather wrangling 🌤️
2. `01_eda.ipynb` - Data detective work 🔍
3. `02_feature_engineering.ipynb` - Feature crafting 🛠️
4. `03a_arima_models.ipynb` - SARIMA shenanigans 📈
5. `03b_ml_models.ipynb` - ML model party 🎉
6. `04_model_comparison.ipynb` - Model showdown 🥊
7. `05_create_demo_data.ipynb` - Demo data prep 🎭
8. `06_demo_cleanup.ipynb` - Keeping things tidy 🧹

## 📊 Data Sources

- PJM Hourly Energy Consumption Dataset (2002-2018) ⚡
- NOAA Weather Data from our favorite cities:
  - Philadelphia 🔔
  - Pittsburgh 🏗️
  - Chicago 🌭
  - Columbus 🏈
  - Washington 🏛️
- US Federal Holidays 🎉 (they tried their best to be relevant)

## 🤝 Want to Join the Fun?

1. Fork it like it's hot
2. Branch out (literally)
3. Commit like you mean it
4. Push it real good
5. PR your way to fame

## 📜 License

MIT License - Go wild, but give us a high-five if you use it!

## 👥 The Dream Team

- Varit Kobutra (The Code Whisperer)
- Sittichai Chaikamol (The Data Wrangler)

## 🙏 Shoutouts

- Houston Community College ITAI 2277 (for the opportunity)
- Professor Zohaib Khawaja (for the guidance)
- PJM Interconnection (for the juicy data)
- NOAA (for keeping track of the weather)
- Coffee makers worldwide (for obvious reasons ☕)