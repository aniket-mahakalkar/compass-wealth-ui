import { useEffect, useState } from "react";
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Compass,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                const user = await authApi.login({ 
                    email: form.email, 
                    password: btoa(String(form.password).trim()) 
                });
                login(user);
                navigate("/dashboard");
            } else {
                await authApi.register({
                    username: form.username,
                    email: form.email,
                    password: btoa(String(form.password).trim()),
                    role: "USER"
                });
                setIsLogin(true);
                setForm((prev) => ({ ...prev, password: "" }));
                setError("Registration successful. Please login.");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#050505] text-white relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Left Side - Hero Branding */}
            <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                        <Compass className="text-black w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">CompassWealth</span>
                </div>

                <div className="max-w-md">
                    <h1 className="text-6xl font-black leading-none mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                        Navigate Your <br />Wealth.
                    </h1>
                    <p className="text-lg text-white/60 leading-relaxed">
                        The ultimate dashboard for modern investors. Track assets and tax, manage portfolios, and achieve your financial goals with precision.
                    </p>
                </div>

                <div className="flex items-center gap-8 text-white text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Financial Analytics
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        Visualize your investment
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
                <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl p-10 shadow-2xl rounded-3xl relative">
                    <div className="absolute top-0 right-0 p-4">
                        <Button 
                            variant="ghost" 
                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 text-md font-semibold"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                            }}
                        >
                            {isLogin ? "Need an account?" : "Have an account?"}
                        </Button>
                    </div>

                    <div className="mb-8 mt-4">
                        <h2 className="text-3xl font-bold mb-2 text-white">
                            {isLogin ? "Welcome back" : "Create Account"}
                        </h2>
                        <p className="text-white/60 text-sm">
                            {isLogin 
                                ? "Enter your credentials to access your dashboard." 
                                : "Start your financial journey with us today."}
                        </p>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${error.includes('successful') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60 ml-1 uppercase tracking-wider">Username</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <Input 
                                        placeholder="johndoe" 
                                        className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus-visible:ring-emerald-500/30 transition-all text-white"
                                        value={form.username}
                                        onChange={(e) => setForm({...form, username: e.target.value})}
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60 ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <Input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus-visible:ring-emerald-500/30 transition-all text-white"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Password</label>
                                {isLogin && (
                                    <button type="button" className="text-[10px] font-bold text-white/60 hover:text-emerald-400 transition-colors">
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                                <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus-visible:ring-emerald-500/30 transition-all text-white"
                                    value={form.password}
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                            
                        {/* Sign in Button */}
                        <Button 
                            className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold rounded-xl mt-4 group overflow-hidden relative"
                            disabled={loading}
                        >
                            <span className={loading ? "opacity-0" : "opacity-100 flex items-center justify-center gap-2"}>
                                {isLogin ? "Sign In" : "Get Started"}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0c10] px-3 font-medium text-white/30">Or continue with</span></div>
                    </div>

                    <div className="grid  gap-4">
                        <Button  variant="outline" className="h-12 border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white/80 rounded-xl transition-all">
                            Google
                        </Button>
                    </div>


                </Card>
            </div>
        </div>
    );
};

export default Auth;

