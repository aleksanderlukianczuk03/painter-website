'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';

interface PaintingData {
  currentSlug: string;
  title: string;
  price: number;
}

export async function handlePurchase(painting: PaintingData) {
    try {
        console.log('🎨 Starting handlePurchase function');
        console.log('🎨 Environment check:', {
            nodeEnv: process.env.NODE_ENV,
            hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
            stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
            hasDomain: !!process.env.DOMAIN,
            domain: process.env.DOMAIN
        });

        console.log('🎨 Received painting data:', {
            id: painting.currentSlug,
            title: painting.title,
            price: painting.price,
            type: typeof painting.price
        });
        
        // Validate input data
        if (!painting.currentSlug || !painting.title || typeof painting.price !== 'number') {
            console.error('❌ Invalid painting data:', painting);
            throw new Error('Invalid painting data');
        }

        if (painting.price <= 0) {
            console.error('❌ Invalid price:', painting.price);
            throw new Error('Invalid price');
        }

        // Verify required environment variables
        const requiredEnvVars = [
            'STRIPE_SECRET_KEY',
            'DOMAIN',
            'SHR_PL',
            'SHR_EU', 
            'SHR_INT'
        ];

        for (const envVar of requiredEnvVars) {
            if (!process.env[envVar]) {
                console.error(`❌ Missing required environment variable: ${envVar}`);
                throw new Error(`Missing environment variable: ${envVar}`);
            }
        }

        console.log('🔍 Checking environment variables...');
        for (const envVar of requiredEnvVars) {
            if (!process.env[envVar]) {
                console.error(`❌ Missing required environment variable: ${envVar}`);
                throw new Error(`Missing environment variable: ${envVar}`);
            }
            console.log(`✅ ${envVar}: ${envVar === 'STRIPE_SECRET_KEY' ? 'PRESENT' : process.env[envVar]}`);
        }

        console.log('🎨 Initializing Stripe...');
        let stripe;
        try {
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
            console.log('✅ Stripe initialized successfully');
        } catch (stripeInitError) {
            console.error('❌ Failed to initialize Stripe:', stripeInitError);
            throw new Error('Failed to initialize payment processor');
        }

        console.log('🎨 Creating Stripe session for painting:', {
            id: painting.currentSlug,
            title: painting.title,
            price: painting.price,
            currency: 'EUR'
        });

        // Create Stripe Checkout Session directly
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'EUR',
                        unit_amount: Math.round(painting.price * 100),
                        product_data: {
                            name: painting.title,
                            description: `Original artwork by your artist`,
                        },
                    },
                    quantity: 1,
                },
            ],
            shipping_address_collection: {
                allowed_countries: [
                    'PL','AT','BE','BG','HR','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HU',
                    'IE','IT','LT','LU','LV','MT','NL','PT','RO','SE','SI','SK','IS','NO','CH','LI',
                    'GB','US','CA','AU','NZ','JP','SG','HK','KR','AE'
                ],
            },
            shipping_options: [
                { shipping_rate: process.env.SHR_PL! },
                { shipping_rate: process.env.SHR_EU! },
                { shipping_rate: process.env.SHR_INT! },
            ],
            consent_collection: { 
                terms_of_service: 'required' 
            },
            custom_text: {
                terms_of_service_acceptance: {
                    message: `By completing this purchase, you agree to our [Terms & Conditions](${process.env.DOMAIN}/terms).`
                }
            },
            success_url: `${process.env.DOMAIN}/thank-you?pid=${encodeURIComponent(painting.currentSlug)}`,
            cancel_url: `${process.env.DOMAIN}/painting/${encodeURIComponent(painting.currentSlug)}`,
        });

        if (!session.url) {
            console.error('❌ No checkout URL received from Stripe');
            throw new Error('No checkout URL received');
        }

        console.log('✅ Stripe session created successfully:', {
            sessionId: session.id,
            url: session.url
        });

        console.log('🔄 About to redirect to:', session.url);
        redirect(session.url);
    } catch (error) {
        // Check if this is a Next.js redirect (which is expected behavior)
        if (error instanceof Error && (error.message === 'NEXT_REDIRECT' || error.message.includes('NEXT_REDIRECT'))) {
            console.log('✅ Redirect happening (this is expected)');
            throw error;
        }
        
        console.error('❌ Purchase error occurred:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            type: typeof error,
            error: error
        });
        
        // Handle specific Stripe errors
        if (error instanceof Stripe.errors.StripeError) {
            console.error('🔴 Stripe Error Details:', {
                type: error.type,
                code: error.code,
                message: error.message,
                statusCode: error.statusCode
            });
            throw new Error(`Payment processing error: ${error.message}`);
        }
        
        throw error;
    }
}