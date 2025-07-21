'use server';

import { redirect } from 'next/navigation';

interface PaintingData {
  currentSlug: string;
  title: string;
  price: number;
}

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

        const apiUrl = `${process.env.DOMAIN}/api/stripe`;
        console.log('📡 Making request to:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                painting: {
                    id: painting.currentSlug,
                    title: painting.title,
                    price: painting.price,
                    currency: 'EUR'
                }
            }),
        });
        
        console.log('📨 Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ API Error:', response.status, errorData);
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Response data:', data);
        
        if (!data.url) {
            console.error('❌ No checkout URL received');
            throw new Error('No checkout URL received');
        }
        
        console.log('🔄 Redirecting to:', data.url);
        redirect(data.url);
    } catch (error) {
        console.error('❌ Purchase error:', error);
        // In production, you might want to redirect to an error page instead
        throw error;
    }
}