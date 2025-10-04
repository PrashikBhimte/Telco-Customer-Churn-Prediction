# Customer Churn Prediction Web Application

## Project Overview

This project is a full-stack web application designed to predict customer churn. It utilizes a machine learning model trained on historical customer data to forecast the likelihood of a customer discontinuing their service. 

The backend is a RESTful API built with Python and FastAPI, serving a stacked ensemble model (scikit-learn and XGBoost). The frontend is a modern, responsive, multi-step form created with React, Vite, and styled with Tailwind CSS, providing an interactive user experience.

## Features

- **High-Accuracy Predictions**: Employs a stacked ensemble machine learning model for improved prediction accuracy.
- **RESTful API**: A robust backend API built with FastAPI to serve predictions.
- **Interactive UI**: A multi-step prediction form built with React guides the user through the data input process.
- **Modern & Responsive Design**: The user interface is styled with Tailwind CSS, ensuring it is visually appealing and functional across all devices.

## Directory Structure

```
/3TelcoCustomerChurnPrediction
├── backend/              # Contains the FastAPI backend application
├── frontend/             # Contains the Vite + React + Tailwind CSS frontend application
├── model_training/       # Contains the trained ML model, scaler, and Jupyter notebook
└── requirements.txt      # Python dependencies for the backend
```

## Setup and Installation

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd 3TelcoCustomerChurnPrediction
```

### 2. Backend Setup

```bash
# Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

## Running the Application

Both the backend and frontend servers must be running concurrently.

### 1. Start the Backend Server

From the **project root** directory (`3TelcoCustomerChurnPrediction`), run the following command:

```bash
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

### 2. Start the Frontend Server

In a new terminal, navigate to the **frontend** directory and run:

```bash
npm run dev
```

The React application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoint Documentation

### Predict Churn

- **Endpoint**: `/predict`
- **Method**: `POST`
- **Description**: Submits customer data to receive a churn prediction.

**Example Request Body:**

```json
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 1,
  "PhoneService": "No",
  "MultipleLines": "No phone service",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 29.85,
  "TotalCharges": 29.85
}
```

**Example Success Response:**

```json
{
  "prediction": "Yes",
  "probability": 63.45
}
```
