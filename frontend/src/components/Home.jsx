import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BarChart, Users, Shield } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const HowItWorksStep = ({ number, title, description }) => (
    <div className="flex items-start md:items-center md:flex-col md:text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 border-2 border-indigo-500 text-indigo-400 font-bold text-2xl mr-4 md:mr-0 md:mb-4">
            {number}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className='flex justify-end items-center w-full'>
                <a href="https://github.com/PrashikBhimte/CardioCare" className="p-5 text-gray-300 hover:text-white transition duration-300 hover:underline">Explore the Code</a>
            </div>
            <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    Predict Customer Churn with AI
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                    Leverage the power of machine learning to proactively identify customers at risk of churning and take data-driven actions to retain them.
                </p>
                <Link to="/predict">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                        Get Started
                    </button>
                </Link>
            </section>

            <section id="features" className="py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Use Our Predictor?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon={<BarChart size={24} />} 
                            title="Data-Driven Insights" 
                            description="Make informed decisions based on predictive analytics, not just guesswork."
                        />
                        <FeatureCard 
                            icon={<Users size={24} />} 
                            title="Proactive Retention" 
                            description="Identify at-risk customers early and implement targeted retention strategies."
                        />
                        <FeatureCard 
                            icon={<Zap size={24} />} 
                            title="Instant Predictions" 
                            description="Get real-time churn probability scores with a simple, easy-to-use interface."
                        />
                        <FeatureCard 
                            icon={<Shield size={24} />} 
                            title="Reduce Revenue Loss"
                            description="Minimize customer attrition and protect your bottom line by retaining valuable clients."
                        />
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-20 px-4 bg-gray-800">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Simple Steps to Prediction</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-600" style={{ top: '4rem', transform: 'translateY(-50%)' }}></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <HowItWorksStep 
                                number="1" 
                                title="Enter Customer Data" 
                                description="Fill in the intuitive multi-step form with the customer's details."
                            />
                            <HowItWorksStep 
                                number="2" 
                                title="Get AI Prediction" 
                                description="Our model instantly analyzes the data and calculates the churn probability."
                            />
                            <HowItWorksStep 
                                number="3" 
                                title="Take Action" 
                                description="Use the prediction to engage with at-risk customers and improve retention."
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 py-6 text-center text-gray-500">
                <p>&copy; 2024 Churn Predictor AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;