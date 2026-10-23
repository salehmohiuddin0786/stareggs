import DemoOne from "@/components/ui/floating-nav-demo";

export const metadata = {
  title: "Floating Nav Demo | STAR EGGS",
  description: "Interactive Floating Nav component demo with sliding spring indicator.",
};

export default function FloatingNavDemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-white relative">
      <div className="text-center space-y-2 mb-32">
        <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white">
          Floating Nav Component
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Interactive dock navigation with fluid spring indicator and responsive icon scaling.
        </p>
      </div>

      <DemoOne />
    </div>
  );
}
