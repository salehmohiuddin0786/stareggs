import DemoOne from "@/components/ui/demo";

export const metadata = {
  title: "Prisma Hero Demo | STAR EGGS",
  description: "Interactive Prisma Hero component demo with framer-motion video and typography pull-up.",
};

export default function PrismaDemoPage() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8">
      <DemoOne />
    </div>
  );
}
