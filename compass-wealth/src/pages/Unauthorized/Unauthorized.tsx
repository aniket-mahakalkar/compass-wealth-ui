import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-white p-6">
      <Card className="w-full max-w-lg p-8 bg-white/[0.03] border-white/10 rounded-2xl space-y-4">
        <h1 className="text-2xl font-semibold">You do not have access</h1>
        <p className="text-white/60">
          Your role does not have permission to view this route.
        </p>
        <div className="flex gap-3 pt-2">
          <Button onClick={() => navigate("/dashboard")} className="bg-white text-black hover:bg-white/90">
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Unauthorized;
