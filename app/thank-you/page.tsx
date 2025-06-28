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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your purchase has been completed successfully. You will receive a confirmation email shortly.
          </p>
          {paintingId && (
            <p className="text-sm text-muted-foreground mb-8">
              Order Reference: {paintingId}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/originals">
              Browse More Paintings
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• You&apos;ll receive an email confirmation</li>
            <li>• Your artwork will be carefully packaged</li>
            <li>• Shipping typically takes 5-10 business days</li>
            <li>• You&apos;ll receive tracking information once shipped</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
