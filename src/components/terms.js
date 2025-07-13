// src/components/Terms.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-container">
            <h1>Terms and Conditions</h1>
            <ol>
                <li><strong>Payment Processing</strong>
                    <p>All payments are securely processed through the Stripe payment gateway. Stripe's terms and conditions apply to all transactions. Users are advised to review Stripe’s policies before completing a payment.</p>
                </li>
                <li><strong>Taxes</strong>
                    <p>Applicable taxes are calculated based on the user’s location by Stripe during the payment process. The exact amount of tax will be displayed on the payment page prior to transaction completion.</p>
                </li>
                <li><strong>Subscription Plans and Usage</strong>
                    <p>We offer both monthly and annual subscription plans:</p>
                    <ul>
                        <li><strong>Monthly Subscription:</strong> Provides access to chatbot services for one month.</li>
                        <li><strong>Annual Subscription:</strong> Provides access to chatbot services for one year at a discounted rate compared to monthly billing.</li>
                    </ul>
                    <p>Each subscription includes a specified number of chatbot usage minutes. Subscriptions will expire either when the allocated minutes are used or when the subscription period ends, whichever occurs first. Additional minutes can be purchased if necessary.</p>
                </li>
                <li><strong>User Data</strong>
                    <p>We only collect and store users' email addresses for account management and customer support purposes. Any other information provided during payment will be collected and stored securely by Stripe in accordance with their privacy policy.</p>
                </li>
                <li><strong>Refund Policy</strong>
                    <p>Payments are refundable under the following conditions:</p>
                    <ul>
                        <li>Refunds will be processed upon request, but will exclude Stripe payment processing fees and any applicable taxes that cannot be recovered.</li>
                        <li>Refunds are only available for unused subscription minutes. If minutes have been used, refunds will be prorated based on the remaining time or minutes in the subscription period.</li>
                        <li>Refund requests must be submitted within 14 days of the initial payment. Refunds will be processed within 5-10 business days after approval.</li>
                    </ul>
                </li>
                <li><strong>Stripe Terms and Conditions</strong>
                    <p>By subscribing to our services, you agree to Stripe’s terms and conditions, which govern all payment transactions processed through our platform.</p>
                </li>
            </ol>
            <Link to="/signup">Back to Signup</Link>
        </div>
    );
};

export default Terms;
