import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Trash2, LogOut, ArrowLeft } from "lucide-react";

const AdminPanel = () => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin-login"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!roles || roles.length === 0) { navigate("/admin-login"); return; }
      setAuthed(true);
      setChecking(false);
    };
    check();
  }, [navigate]);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["admin-comments"],
    enabled: authed,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const { error } = await supabase
        .from("comments")
        .update({ visible: !visible })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-comments"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      toast({ title: "Commento eliminato" });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (checking) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Verifica accesso...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="font-display text-2xl font-bold text-foreground">Gestione Commenti</h1>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
          <LogOut className="w-4 h-4 mr-2" /> Esci
        </Button>
      </header>

      <main className="container mx-auto px-6 py-8">
        <p className="text-muted-foreground mb-6">
          {comments.length} commenti totali · {comments.filter(c => c.visible).length} visibili · {comments.filter(c => !c.visible).length} nascosti
        </p>

        {isLoading ? (
          <p className="text-muted-foreground">Caricamento...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">Nessun commento presente.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`card-gradient rounded-lg border p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
                  comment.visible ? "border-border" : "border-destructive/30 opacity-60"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-semibold text-foreground">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString("it-IT")}
                    </span>
                    {!comment.visible && (
                      <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                        Nascosto
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm truncate">{comment.comment_text}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleMutation.mutate({ id: comment.id, visible: comment.visible })}
                    disabled={toggleMutation.isPending}
                  >
                    {comment.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(comment.id)}
                    disabled={deleteMutation.isPending}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
