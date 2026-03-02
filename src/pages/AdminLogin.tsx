import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non trovato");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        throw new Error("Non hai i permessi di amministratore");
      }

      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Errore di accesso",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md card-gradient rounded-lg border border-border p-8">
        <div className="text-center mb-8">
          <Lock className="w-10 h-10 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground">Admin</h1>
          <p className="text-muted-foreground mt-2">Accedi per gestire i commenti</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-muted border-border"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-muted border-border"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Accesso..." : "Accedi"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Torna al sito
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
