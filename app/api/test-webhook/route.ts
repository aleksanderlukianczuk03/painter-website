import { NextResponse } from 'next/server';
import { writeClient } from '@/app/lib/sanity';
import { revalidatePath } from 'next/cache';

async function markPaintingAsSold(paintingSlug: string) {
  try {
    console.log(`🎨 Testing: Attempting to mark painting ${paintingSlug} as sold`);
    
    // First, let's try to find the painting by slug
    const slugQuery = `*[_type == 'painting' && slug.current == $slug][0]`;
    let painting = await writeClient.fetch(slugQuery, { slug: paintingSlug });
    
    if (!painting) {
      console.log('❌ Not found by slug, trying by _id...');
      const idQuery = `*[_type == 'painting' && _id == $id][0]`;
      painting = await writeClient.fetch(idQuery, { id: paintingSlug });
    }
    
    if (!painting) {
      console.log('❌ Painting not found. Let me check what paintings exist...');
      const allPaintings = await writeClient.fetch(`*[_type == 'painting']{_id, "slug": slug.current, title}`);
      console.log('🎨 All paintings:', JSON.stringify(allPaintings, null, 2));
      console.log('🔍 Looking for:', paintingSlug);
      return false;
    }
    
    console.log(`✅ Found painting:`, JSON.stringify(painting, null, 2));
    
    const result = await writeClient
      .patch(painting._id)
      .set({ 
        sold: true, 
        soldAt: new Date().toISOString() 
      })
      .commit();
    
    console.log(`✅ Painting ${paintingSlug} marked as sold successfully:`, JSON.stringify(result, null, 2));
    
    // Revalidate using the correct slug
    const paintingSlugForRevalidation = painting.slug?.current || paintingSlug;
    revalidatePath(`/painting/${paintingSlugForRevalidation}`);
    revalidatePath('/');
    revalidatePath('/originals');
    
    return true;
  } catch (error) {
    console.error('❌ Error marking painting as sold:', error);
    return false;
  }
}

export async function GET() {
  console.log('🧪 Testing webhook functionality...');
  
  const success = await markPaintingAsSold('roses');
  
  return NextResponse.json({ 
    success, 
    message: success ? 'Painting marked as sold' : 'Failed to mark painting as sold' 
  });
}