import { Card } from "@/components/ui/card";

const Investments = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Investments</h1>
      <Card className="bg-white/5 border-white/10 p-6">
        <p className="text-white/70">
          Your investment overview will be displayed here.
        </p>
      </Card>
    </div>
  );
};

export default Investments;