import React, { useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Loader, BarChart, TrendingUp, TrendingDown } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
            <div 
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

const FormInput = ({ name, label, value, onChange, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            type={type} 
            id={name} 
            name={name} 
            value={value}
            onChange={onChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

const FormSelect = ({ name, label, value, onChange, options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select 
            id={name} 
            name={name} 
            value={value}
            onChange={onChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const PredictionResult = ({ result, onReset }) => {
    const isHighRisk = result.probability > 50;
    return (
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Prediction Result</h2>
            <div className={`inline-block p-4 rounded-lg mb-4 ${isHighRisk ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                {isHighRisk ? 
                    <TrendingDown className="w-16 h-16 text-red-400 mx-auto" /> : 
                    <TrendingUp className="w-16 h-16 text-green-400 mx-auto" />
                }
            </div>
            <p className="text-lg text-gray-300 mb-2">The model predicts that the customer will:</p>
            <p className={`text-5xl font-extrabold mb-4 ${isHighRisk ? 'text-red-500' : 'text-green-500'}`}>
                {result.prediction === 'Yes' ? 'Churn' : 'Not Churn'}
            </p>
            <p className="text-lg text-gray-300">With a probability of:</p>
            <p className={`text-5xl font-extrabold mb-8 ${isHighRisk ? 'text-red-500' : 'text-green-500'}`}>
                {result.probability}%
            </p>
            <button 
                onClick={onReset}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
                Make Another Prediction
            </button>
        </div>
    );
};

const Predict = () => {
    const totalSteps = 4;
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: 'Male',
        SeniorCitizen: 0,
        Partner: 'No',
        Dependents: 'No',
        tenure: 12,
        PhoneService: 'Yes',
        MultipleLines: 'No',
        InternetService: 'DSL',
        OnlineSecurity: 'No',
        OnlineBackup: 'No',
        DeviceProtection: 'No',
        TechSupport: 'No',
        StreamingTV: 'No',
        StreamingMovies: 'No',
        Contract: 'Month-to-month',
        PaperlessBilling: 'Yes',
        PaymentMethod: 'Electronic check',
        MonthlyCharges: 70.0,
        TotalCharges: 700.0
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseFloat(value) : value 
        }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/predict`, formData);
            setPrediction(response.data);
        } catch (err) {
            setError('An error occurred while making the prediction.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setPrediction(null);
        setCurrentStep(1);
        setError('');
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <h3 className="md:col-span-2 text-2xl font-semibold text-white mb-2">Step 1: Customer Demographics</h3>
                        <FormSelect name="gender" label="Gender" value={formData.gender} onChange={handleChange} options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]} />
                        <FormSelect name="SeniorCitizen" label="Senior Citizen" value={formData.SeniorCitizen} onChange={handleChange} options={[{value: 0, label: 'No'}, {value: 1, label: 'Yes'}]} />
                        <FormSelect name="Partner" label="Partner" value={formData.Partner} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}]} />
                        <FormSelect name="Dependents" label="Dependents" value={formData.Dependents} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}]} />
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <h3 className="md:col-span-2 text-2xl font-semibold text-white mb-2">Step 2: Account & Contract</h3>
                        <FormInput name="tenure" label="Tenure (Months)" value={formData.tenure} onChange={handleChange} type="number" />
                        <FormSelect name="Contract" label="Contract" value={formData.Contract} onChange={handleChange} options={[{value: 'Month-to-month', label: 'Month-to-month'}, {value: 'One year', label: 'One year'}, {value: 'Two year', label: 'Two year'}]} />
                        <FormSelect name="PaperlessBilling" label="Paperless Billing" value={formData.PaperlessBilling} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}]} />
                        <FormSelect name="PaymentMethod" label="Payment Method" value={formData.PaymentMethod} onChange={handleChange} options={[{value: 'Electronic check', label: 'Electronic check'}, {value: 'Mailed check', label: 'Mailed check'}, {value: 'Bank transfer (automatic)', label: 'Bank transfer (automatic)'}, {value: 'Credit card (automatic)', label: 'Credit card (automatic)'}]} />
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <h3 className="md:col-span-2 lg:col-span-3 text-2xl font-semibold text-white mb-2">Step 3: Service Details</h3>
                        <FormSelect name="PhoneService" label="Phone Service" value={formData.PhoneService} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}]} />
                        <FormSelect name="MultipleLines" label="Multiple Lines" value={formData.MultipleLines} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No phone service', label: 'No phone service'}]} />
                        <FormSelect name="InternetService" label="Internet Service" value={formData.InternetService} onChange={handleChange} options={[{value: 'DSL', label: 'DSL'}, {value: 'Fiber optic', label: 'Fiber optic'}, {value: 'No', label: 'No'}]} />
                        <FormSelect name="OnlineSecurity" label="Online Security" value={formData.OnlineSecurity} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                        <FormSelect name="OnlineBackup" label="Online Backup" value={formData.OnlineBackup} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                        <FormSelect name="DeviceProtection" label="Device Protection" value={formData.DeviceProtection} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                        <FormSelect name="TechSupport" label="Tech Support" value={formData.TechSupport} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                        <FormSelect name="StreamingTV" label="Streaming TV" value={formData.StreamingTV} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                        <FormSelect name="StreamingMovies" label="Streaming Movies" value={formData.StreamingMovies} onChange={handleChange} options={[{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}, {value: 'No internet service', label: 'No internet service'}]} />
                    </div>
                );
            case 4:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <h3 className="md:col-span-2 text-2xl font-semibold text-white mb-2">Step 4: Charges & Prediction</h3>
                        <FormInput name="MonthlyCharges" label="Monthly Charges" value={formData.MonthlyCharges} onChange={handleChange} type="number" />
                        <FormInput name="TotalCharges" label="Total Charges" value={formData.TotalCharges} onChange={handleChange} type="number" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
                    
                    {!prediction && !loading && (
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">Churn Prediction Form</h1>
                    )}

                    {error && <p className="text-red-400 bg-red-500/20 p-3 rounded-md text-center mb-6">{error}</p>}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <Loader className="w-16 h-16 animate-spin text-indigo-500" />
                            <p className="mt-4 text-lg text-gray-300">Analyzing data and making prediction...</p>
                        </div>
                    ) : prediction ? (
                        <PredictionResult result={prediction} onReset={resetForm} />
                    ) : (
                        <form>
                            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                            <div className="min-h-[250px] animate-fade-in">
                                {renderStep()}
                            </div>
                            <div className="flex justify-between mt-8">
                                <button 
                                    type="button" 
                                    onClick={handlePrev} 
                                    disabled={currentStep === 1}
                                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={20} className="mr-1" />
                                    Previous
                                </button>

                                {currentStep < totalSteps ? (
                                    <button 
                                        type="button" 
                                        onClick={handleNext}
                                        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                                    >
                                        Next
                                        <ChevronRight size={20} className="ml-1" />
                                    </button>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
                                    >
                                        <BarChart size={20} className="mr-2" />
                                        Get Prediction
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Predict;
