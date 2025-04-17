import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Flower, BookOpen } from "lucide-react";
import { RulesModal } from "@/components/game/rules-modal";
import { useState } from "react";

export default function Home() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [showRules, setShowRules] = useState(false);

  // Check if there's an existing game
  const { data: existingGames, isLoading } = useQuery({
    queryKey: ['/api/games/1'],
    enabled: true,
    staleTime: 0,
    retry: false,
    onError: () => {
      // Ignore errors - there might not be any games yet
    }
  });

  const createNewGame = async () => {
    try {
      const response = await apiRequest("POST", "/api/games", {});
      if (response.ok) {
        const newGame = await response.json();
        queryClient.invalidateQueries({ queryKey: ['/api/games'] });
        toast({
          title: "Game created!",
          description: "Your new game has been created successfully.",
        });
        navigate(`/game/${newGame.id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create a new game. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <header className="bg-primary p-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-['Crimson_Text'] font-bold">Tussie Mussie</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center border-b pb-6">
            <CardTitle className="text-3xl font-['Crimson_Text']">Welcome to Tussie Mussie</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-6">
            <p className="text-center text-neutral-600">
              A strategic card game of Victorian-era flower language and collection building.
            </p>
            
            <div className="grid gap-4">
              <Button 
                className="w-full py-6 bg-primary hover:bg-primary/90 text-lg"
                onClick={createNewGame}
                disabled={isLoading}
              >
                <Flower className="mr-2 h-5 w-5" />
                {isLoading ? "Loading..." : "New Game"}
              </Button>
              
              <Button 
                className="w-full py-6 bg-secondary hover:bg-secondary/90 text-lg text-white"
                onClick={() => setShowRules(true)}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Game Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-neutral-800 text-white py-4 px-6 text-sm">
        <div className="container mx-auto text-center">
          <p>Tussie Mussie Digital Implementation &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <RulesModal open={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}
