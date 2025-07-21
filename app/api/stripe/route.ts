import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Validate required environment variables
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
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Received payment request');
    
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body' }, 
        { status: 400 }
      );
    }

    const { painting } = body;
    
    // Validate painting data
    if (!painting) {
      console.error('❌ Missing painting data');
      return NextResponse.json(
        { error: 'Missing painting data' }, 
        { status: 400 }
      );
    }

    if (!painting.id || !painting.title || typeof painting.price !== 'number') {
      console.error('❌ Invalid painting data:', painting);
      return NextResponse.json(
        { error: 'Invalid painting data' }, 
        { status: 400 }
      );
    }
    
    console.log('🎨 Creating Stripe session for painting:', {
      id: painting.id,
      title: painting.title,
      price: painting.price,
      currency: painting.currency || 'EUR'
    });

    // Validate price
    if (painting.price <= 0) {
      console.error('❌ Invalid price:', painting.price);
      return NextResponse.json(
        { error: 'Invalid price' }, 
        { status: 400 }
      );
    }

    // Verify shipping rates exist
    const shippingRates = [
      process.env.SHR_PL,
      process.env.SHR_EU,
      process.env.SHR_INT
    ];
    
    if (shippingRates.some(rate => !rate)) {
      console.error('❌ Missing shipping rates');
      return NextResponse.json(
        { error: 'Missing shipping configuration' }, 
        { status: 500 }
      );
    }

    console.log('✅ Shipping rates configured:', {
      SHR_PL: !!process.env.SHR_PL,
      SHR_EU: !!process.env.SHR_EU,
      SHR_INT: !!process.env.SHR_INT
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: painting.currency || 'EUR',
            unit_amount: Math.round(painting.price * 100), // Ensure it's an integer
            product_data: {
              name: painting.title,
              description: `Original artwork by your artist`, // Add description
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
      // Add terms acceptance checkbox using custom_text
      consent_collection: { 
        terms_of_service: 'required' 
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: `By completing this purchase, you agree to our [Terms & Conditions](${process.env.DOMAIN}/terms).`
        }
      },
      success_url: `${process.env.DOMAIN}/thank-you?pid=${encodeURIComponent(painting.id)}`,
      cancel_url: `${process.env.DOMAIN}/painting/${encodeURIComponent(painting.id)}`,
    });

    console.log('✅ Stripe session created successfully:', {
      sessionId: session.id,
      url: session.url,
      successUrl: session.success_url
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    
    // Handle specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      console.error('🔴 Stripe Error Details:', {
        type: error.type,
        code: error.code,
        message: error.message,
        statusCode: error.statusCode
      });
      
      return NextResponse.json(
        { 
          error: 'Payment processing error',
          details: error.message 
        }, 
        { status: error.statusCode || 500 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}