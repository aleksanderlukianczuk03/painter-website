'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';

interface PaintingData {
  currentSlug: string;
  title: string;
  price: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function handlePurchase(painting: PaintingData) {
    try {
        console.log('🎨 Initiating purchase for painting:', {
            id: painting.currentSlug,
            title: painting.title,
            price: painting.price
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

        console.log('🔄 Redirecting to:', session.url);
        redirect(session.url);
    } catch (error) {
        // Check if this is a Next.js redirect (which is expected behavior)
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            // This is expected - let the redirect happen
            throw error;
        }
        
        console.error('❌ Purchase error:', error);
        
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