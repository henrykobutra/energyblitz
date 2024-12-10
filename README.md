# EnergyBlitz 🌩️

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![ML Models](https://img.shields.io/badge/ML-Python-blue)](https://python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

EnergyBlitz is an AI-powered energy consumption forecasting platform that combines advanced machine learning models with real-time data analysis to provide actionable insights for energy grid operations.

## Features

- 📊 Real-time energy consumption visualization
- 🤖 ML-powered consumption forecasting
- 🔍 Pattern recognition and anomaly detection
- 🌡️ Weather impact analysis
- 💡 AI-generated insights and recommendations

## Tech Stack

- **Frontend**: Next.js 15+, shadcn/ui, Tailwind CSS
- **ML/AI**: Python, scikit-learn, Prophet, PyTorch
- **Data Analysis**: Pandas, NumPy
- **Visualization**: Recharts
- **API**: Next.js API Routes
- **AI Insights**: OpenAI API

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- PJM Energy Consumption Dataset
- OpenAI API Key (for insights generation)

### Installation

1. Clone the repository:
   
```bash
git clone https://github.com/henrykobutra/energyblitz.git
cd energyblitz
```

2. Install dependencies:

```bash
# Install frontend dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```env
OPENAI_API_KEY=your_key_here
```

5. Start the development server:
```bash
npm run dev
```

### ML Model Training

1. Prepare your data:
```bash
python scripts/prepare_data.py
```

2. Train models:
```bash
python scripts/train_models.py
```

## Project Structure

```
energyblitz/
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── dashboard/         # Dashboard pages
├── components/            # React components
├── lib/                   # Utility functions
├── ml/                    # Machine learning models
│   ├── train.py          # Training scripts
│   └── predict.py        # Prediction scripts
├── public/               # Static files
└── scripts/              # Data processing scripts
```

## API Routes

- `GET /api/consumption/current`: Get current consumption data
- `GET /api/consumption/forecast`: Get consumption forecasts
- `GET /api/consumption/insights`: Get AI-generated insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- PJM Interconnection for providing the energy consumption dataset
- HCC ITAI 2277 Capstone Project

## Authors

- Varit Kobutra ([@henrykobutra](https://github.com/henrykobutra))
- Sittichai Chaikamol ([@Sittichai-nu](https://github.com/Sittichai-nu))

---

**Note**: This project is part of the ITAI 2277 Capstone Project at Houston Community College.