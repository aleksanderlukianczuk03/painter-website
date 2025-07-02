import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { writeClient } from '@/app/lib/sanity';
import { revalidatePath } from 'next/cache';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function markPaintingAsSold(paintingSlug: string) {
  try {
    console.log(`🎨 Attempting to mark painting ${paintingSlug} as sold`);
    console.log(`🔑 Sanity token present: ${!!process.env.SANITY_API_TOKEN}`);
    
    // First, let's try to find the painting by slug
    const slugQuery = `*[_type == 'painting' && slug.current == $slug][0]`;
    console.log(`🔍 Searching with query: ${slugQuery}`);
    console.log(`🔍 Search parameter: ${paintingSlug}`);
    
    let painting = await writeClient.fetch(slugQuery, { slug: paintingSlug });
    
    // If not found by slug, try by _id (in case the paintingSlug is actually an ID)
    if (!painting) {
      console.log('❌ Not found by slug, trying by _id...');
      const idQuery = `*[_type == 'painting' && _id == $id][0]`;
      painting = await writeClient.fetch(idQuery, { id: paintingSlug });
    }
    
    // If still not found, let's see all paintings to debug
    if (!painting) {
      console.log('❌ Painting not found. Checking all paintings...');
      const allPaintings = await writeClient.fetch(`*[_type == 'painting']{_id, "slug": slug.current, title, sold}`);
      console.log('🎨 All paintings:', JSON.stringify(allPaintings, null, 2));
      console.log('🔍 Looking for slug:', paintingSlug);
      
      // Try case-insensitive search as backup
      const caseInsensitiveQuery = `*[_type == 'painting' && lower(slug.current) == lower($slug)][0]`;
      painting = await writeClient.fetch(caseInsensitiveQuery, { slug: paintingSlug });
      
      if (!painting) {
        console.log('❌ Still not found with case-insensitive search');
        return false;
      } else {
        console.log('✅ Found with case-insensitive search');
      }
    }
    
    console.log(`✅ Found painting:`, JSON.stringify(painting, null, 2));
    
    // Double-check we have write permissions
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ No SANITY_API_TOKEN found in environment');
      return false;
    }
    
    const result = await writeClient
      .patch(painting._id)
      .set({ 
        sold: true, 
        soldAt: new Date().toISOString() 
      })
      .commit();
    
    console.log(`✅ Update result:`, JSON.stringify(result, null, 2));
    
    // Revalidate paths
    const paintingSlugForRevalidation = painting.slug?.current || paintingSlug;
    revalidatePath(`/painting/${paintingSlugForRevalidation}`);
    revalidatePath('/');
    revalidatePath('/originals');
    
    console.log(`🔄 Revalidated paths for slug: ${paintingSlugForRevalidation}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error marking painting as sold:', error);
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
    return false;
  }
}

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received at:', new Date().toISOString());
  console.log('🔍 Request headers:', Object.fromEntries(headers()));
  
  const body = await request.text();
  console.log('📦 Webhook body length:', body.length);
  
  const headersList = headers();
  const sig = headersList.get('stripe-signature');
  console.log('🔐 Stripe signature present:', !!sig);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    console.log('✅ Webhook signature verified');
    console.log('📝 Event type:', event.type);
    console.log('🆔 Event ID:', event.id);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('🎉 Checkout session completed:', session.id);
    console.log('🔗 Success URL:', session.success_url);
    
    // Extract painting ID from success_url parameters
    const paintingId = new URL(session.success_url!).searchParams.get('pid');
    console.log('🎨 Extracted painting ID:', paintingId);
    
    if (paintingId) {
      console.log(`💰 Payment completed for painting: ${paintingId}`);
      console.log(`📧 Customer email: ${session.customer_details?.email}`);
      console.log(`💵 Amount paid: ${session.amount_total} ${session.currency}`);
      
      // Mark painting as sold in Sanity CMS
      const success = await markPaintingAsSold(paintingId);
      
      if (success) {
        console.log(`✅ Successfully processed payment and updated painting ${paintingId}`);
      } else {
        console.error(`❌ Failed to update painting ${paintingId} after successful payment`);
      }
    } else {
      console.error('❌ No painting ID found in success URL');
    }
  } else {
    console.log('ℹ️ Received webhook event:', event.type, '- not handling this event type');
  }

  return NextResponse.json({ received: true });
}
