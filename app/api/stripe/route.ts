import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',  // Updated to the expected API version format
});



export async function POST(request: NextRequest) {
  try {
    const { painting } = await request.json();
    
    console.log('Creating Stripe session for painting:', painting);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: painting.currency || 'USD',
            unit_amount: painting.price * 100,
            product_data: {
              name: painting.title,
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['PL', 'AT', 'DE', 'FR', 'GB', 'US', 'CA', 'AU'],
      },
      shipping_options: [
        { shipping_rate: process.env.SHR_PL! },
        { shipping_rate: process.env.SHR_EU! },
        { shipping_rate: process.env.SHR_INT! },
      ],
      success_url: `${process.env.DOMAIN}/thank-you?pid=${painting.id}`,
      cancel_url: `${process.env.DOMAIN}/painting/${painting.id}`,
    });

    console.log('Stripe session created with success URL:', session.success_url);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session.' }, { status: 500 });
  }
}