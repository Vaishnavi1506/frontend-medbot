import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionScreen.css'; // Your custom CSS file

const SubscriptionScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscription = async (plan) => {
    let url;

    if (plan === 'monthly') {
      url = 'https://buy.stripe.com/test_eVa9CVcc8gjLeB27st';
    } else if (plan === 'annual') {
      url = 'https://buy.stripe.com/test_28odTbgso0kN0Kc4gg';
    }

    if (url) {
      try {
        // Open the URL in a new tab
        window.open(url, '_blank');

        // Wait for user to complete payment and return
        if (window.confirm("After completing the payment, press OK to continue.")) {
          const isSubscribed = await checkSubscriptionStatus();

          if (isSubscribed) {
            localStorage.setItem('isSubscribed', 'true');
            await saveSubscription(plan);
            navigate('/home');
          } else {
            alert("Subscription Failed: Please try again or contact support.");
          }
        }
        setLoading(false);
      } catch (err) {
        alert("Error: Failed to open the subscription page");
        setLoading(false);
      }
    }
  };

  const saveSubscription = async (plan) => {
    const now = new Date();
    let expiryDate;
    if (plan === 'monthly') {
      expiryDate = new Date(now.setMonth(now.getMonth() + 1));
    } else if (plan === 'annual') {
      expiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
    }
    localStorage.setItem('subscriptionExpiry', expiryDate.toISOString());
  };

  const checkSubscriptionStatus = async () => {
    // Simulating a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // Replace this with actual logic to check subscription status
  };

  return (
    <div className="gradient-background">
      <div className="container">
        <div className="header">
          <h1 className="title">Choose Your Plan</h1>
          <p className="subtitle">Select the subscription that works best for you</p>
        </div>

        <div className="plan-container">
          <button
            className="plan-button"
            onClick={() => handleSubscription('monthly')}
            disabled={loading}
          >
            <span className="icon">📅</span>
            <h2 className="plan-title">Monthly</h2>
            <p className="plan-price">$5.00/month</p>
          </button>

          <button
            className="plan-button annual-plan"
            onClick={() => handleSubscription('annual')}
            disabled={loading}
          >
            <span className="icon">📅</span>
            <h2 className="plan-title">Annual</h2>
            <p className="plan-price">$50/year</p>
            <p className="savings-text">Save 16.66%</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
