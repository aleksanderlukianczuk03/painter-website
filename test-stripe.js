// Simple script to test Stripe configuration
require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

async function testStripeConfig() {
    console.log('🔍 Testing Stripe Configuration...\n');
    
    // Check environment variables
    const requiredVars = [
        'STRIPE_SECRET_KEY',
        'STRIPE_PUBLISHABLE_KEY', 
        'DOMAIN',
        'SHR_PL',
        'SHR_EU',
        'SHR_INT',
        'STRIPE_WEBHOOK_SECRET'
    ];
    
    console.log('📋 Environment Variables:');
    requiredVars.forEach(varName => {
        const value = process.env[varName];
        if (value) {
            console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
        } else {
            console.log(`❌ ${varName}: Missing`);
        }
    });
    
    if (!process.env.STRIPE_SECRET_KEY) {
        console.log('\n❌ Cannot test Stripe API without secret key');
        return;
    }
    
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        console.log('\n🔗 Testing Stripe API connection...');
        
        // Test basic API connection
        const account = await stripe.accounts.retrieve();
        console.log(`✅ Connected to Stripe account: ${account.email || account.id}`);
        console.log(`📊 Account type: ${account.type}`);
        console.log(`🌍 Country: ${account.country}`);
        console.log(`💰 Default currency: ${account.default_currency}`);
        
        // Test shipping rates
        console.log('\n📦 Testing Shipping Rates...');
        const shippingRates = [
            { name: 'SHR_PL', id: process.env.SHR_PL },
            { name: 'SHR_EU', id: process.env.SHR_EU },
            { name: 'SHR_INT', id: process.env.SHR_INT }
        ];
        
        for (const rate of shippingRates) {
            if (rate.id) {
                try {
                    const shippingRate = await stripe.shippingRates.retrieve(rate.id);
                    console.log(`✅ ${rate.name}: ${shippingRate.display_name} (${shippingRate.fixed_amount?.amount/100} ${shippingRate.fixed_amount?.currency})`);
                } catch (error) {
                    console.log(`❌ ${rate.name}: Error - ${error.message}`);
                }
            } else {
                console.log(`❌ ${rate.name}: Missing`);
            }
        }
        
        // Test webhook endpoint configuration
        console.log('\n🔗 Testing Webhook Configuration...');
        if (process.env.STRIPE_WEBHOOK_SECRET) {
            console.log(`✅ Webhook secret configured: ${process.env.STRIPE_WEBHOOK_SECRET.substring(0, 10)}...`);
        } else {
            console.log('❌ Webhook secret missing');
        }
        
        console.log('\n🎉 Stripe configuration test completed!');
        
    } catch (error) {
        console.error('\n❌ Error testing Stripe configuration:', error.message);
        if (error.type === 'StripeInvalidRequestError') {
            console.error('💡 This might indicate an issue with your API keys or account setup');
        }
    }
}

testStripeConfig();
