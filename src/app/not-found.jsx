import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="py-24 md:py-36 bg-brand-navy min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="font-display text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-red to-white">
          404
        </div>

        <h1 className="font-display text-2xl font-bold uppercase text-white">
          PAGE NOT FOUND
        </h1>

        <p className="text-xs text-brand-muted leading-relaxed">
          The requested page or supply route does not exist. Please return to the homepage or check our commercial product catalogue.
        </p>

        <div className="pt-2 flex justify-center">
          <Button href="/" variant="primary" size="md" icon="arrow-left" iconPosition="left">
            Back to Star Eggs Home
          </Button>
        </div>
      </div>
    </div>
  );
}
