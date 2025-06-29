import { NextResponse } from 'next/server';
import { writeClient } from '@/app/lib/sanity';

export async function GET() {
  try {
    console.log('🧪 Testing Sanity connection...');
    console.log('🔑 Token present:', !!process.env.SANITY_API_TOKEN);
    
    // Try to fetch all paintings
    const paintings = await writeClient.fetch(`*[_type == 'painting']{_id, "slug": slug.current, title, sold}`);
    console.log('✅ Successfully fetched paintings:', paintings.length);
    
    return NextResponse.json({ 
      success: true, 
      paintingsCount: paintings.length,
      paintings: paintings,
      hasToken: !!process.env.SANITY_API_TOKEN
    });
  } catch (error) {
    console.error('❌ Sanity test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      hasToken: !!process.env.SANITY_API_TOKEN
    }, { status: 500 });
  }
}