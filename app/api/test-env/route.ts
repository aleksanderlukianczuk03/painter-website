import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'PRESENT' : 'MISSING',
      STRIPE_SECRET_KEY_LENGTH: process.env.STRIPE_SECRET_KEY?.length || 0,
      DOMAIN: process.env.DOMAIN || 'MISSING',
      SHR_PL: process.env.SHR_PL ? 'PRESENT' : 'MISSING',
      SHR_EU: process.env.SHR_EU ? 'PRESENT' : 'MISSING',
      SHR_INT: process.env.SHR_INT ? 'PRESENT' : 'MISSING',
      SANITY_API_TOKEN: process.env.SANITY_API_TOKEN ? 'PRESENT' : 'MISSING',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? 'PRESENT' : 'MISSING',
    };

    console.log('Environment variables check:', envCheck);
    return NextResponse.json(envCheck);
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return NextResponse.json({ error: 'Failed to check environment variables' }, { status: 500 });
  }
}
