import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageSquare } from "lucide-react";

const CommentsSection = () => {
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("comments")
        .insert({ author_name: authorName.trim(), comment_text: commentText.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setAuthorName("");
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast({ title: "Commento inviato!", description: "Grazie per il tuo contributo." });
    },
    onError: () => {
      toast({ title: "Errore", description: "Impossibile inviare il commento.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;
    submitMutation.mutate();
  };

  return (
    <section id="commenti" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Lascia un Commento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Condividi le tue impressioni sull'opera di Picasso
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-16 space-y-4">
          <Input
            placeholder="Il tuo nome"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={100}
            required
            className="bg-card border-border"
          />
          <Textarea
            placeholder="Scrivi il tuo commento..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={1000}
            required
            rows={4}
            className="bg-card border-border resize-none"
          />
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitMutation.isPending ? "Invio..." : "Invia Commento"}
          </Button>
        </form>

        {/* Comments list */}
        <div className="max-w-3xl mx-auto space-y-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Caricamento...</p>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">Nessun commento ancora. Sii il primo!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="card-gradient rounded-lg p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {comment.author_name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{comment.comment_text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
