'use server';

import { redirect } from 'next/navigation';

interface PaintingData {
  currentSlug: string;
  title: string;
  price: number;
}

export async function handlePurchase(painting: PaintingData) {
    console.log('Painting data being sent to Stripe:', {
        id: painting.currentSlug,
        title: painting.title,
        price: painting.price
    });
    
    const response = await fetch(`${process.env.DOMAIN}/api/stripe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            painting: {
                id: painting.currentSlug,
                title: painting.title,
                price: painting.price,
                currency: 'USD'
            }
        }),
    });
    
    const { url } = await response.json();
    redirect(url);
}