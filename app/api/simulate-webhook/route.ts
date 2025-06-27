import { NextResponse } from 'next/server';

export async function POST() {
  console.log('🧪 Simulating Stripe webhook...');
  
  // Simulate the webhook call to our actual webhook endpoint
  const webhookUrl = 'http://localhost:3000/api/stripe/webhook';
  
  // Create a mock Stripe event
  const mockEvent = {
    id: 'evt_test_webhook',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_session',
        success_url: 'http://localhost:3000/thank-you?pid=roses',
        customer_details: {
          email: 'test@example.com'
        },
        amount_total: 100000,
        currency: 'usd'
      }
    }
  };

  try {
    // Note: This won't work with signature verification, but you can temporarily disable it for testing
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify(mockEvent)
    });

    const result = await response.text();
    console.log('Webhook response:', result);

    return NextResponse.json({ 
      success: true, 
      message: 'Simulated webhook sent',
      response: result
    });
  } catch (error) {
    console.error('Error simulating webhook:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to simulate webhook' 
    });
  }
}
