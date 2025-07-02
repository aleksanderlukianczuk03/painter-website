import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { pid?: string };
}) {
  const paintingId = searchParams.pid;

  return (
    <div className="premium-container py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-16 space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif font-light tracking-tight">
              Purchase Complete
            </h1>
            <div className="elegant-divider"></div>
            <p className="text-lg font-light text-foreground/80 leading-relaxed max-w-lg mx-auto">
              Thank you for acquiring an original piece. Your artwork will be carefully prepared and shipped to you.
            </p>
          </div>
          
          {paintingId && (
            <div className="scarcity-indicator inline-flex">
              Order Reference: {paintingId}
            </div>
          )}
        </div>

        {/* What's Next Section */}
        <div className="mb-12 p-8 bg-muted/30 space-y-6">
          <h3 className="text-xl font-serif font-light tracking-tight">What Happens Next</h3>
          <div className="elegant-divider"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground/70">
            <div className="space-y-2">
              <div className="font-medium text-foreground">Email Confirmation</div>
              <div>You&apos;ll receive detailed order confirmation within minutes</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-foreground">Professional Packaging</div>
              <div>Museum-quality materials ensure safe transit</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-foreground">Shipping Timeline</div>
              <div>5-10 business days for domestic, 10-21 for international</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-foreground">Tracking Information</div>
              <div>Full tracking details sent once your artwork ships</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild className="btn-premium w-full md:w-auto px-8">
            <Link href="/originals">
              View More Originals
            </Link>
          </Button>
          <div className="flex justify-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-[0.1em] uppercase">
              Return Home
            </Link>
          </div>
        </div>

        {/* Certificate Note */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase font-light">
            Certificate of Authenticity Included • Fully Insured Shipping
          </p>
        </div>
      </div>
    </div>
  );
}
