import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if it's a painting document and if it was marked as sold
    if (body._type === 'painting' && body.slug?.current) {
      const paintingSlug = body.slug.current;
      
      // Revalidate the specific painting page and homepage
      revalidatePath(`/painting/${paintingSlug}`);
      revalidatePath('/');
      
      console.log(`Revalidated paths for painting: ${paintingSlug}`);
      
      return NextResponse.json({ revalidated: true });
    }
    
    return NextResponse.json({ message: 'No revalidation needed' });
  } catch (error) {
    console.error('Error in revalidation webhook:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}