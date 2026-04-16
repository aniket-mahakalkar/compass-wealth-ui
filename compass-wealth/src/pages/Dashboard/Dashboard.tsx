import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card className="bg-white/5 border-white/10 p-6">
        <p className="text-white/80">
          Welcome back{user?.username ? `, ${user.username}` : ""}.
        </p>
        <p className="mt-2 text-sm text-white/50">
          Use the sidebar to navigate to your available sections.
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
