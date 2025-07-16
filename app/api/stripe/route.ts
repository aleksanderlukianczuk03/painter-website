import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
            currency: 'EUR', // Changed from USD to EUR
            unit_amount: painting.price * 100,
            product_data: {
              name: painting.title,
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