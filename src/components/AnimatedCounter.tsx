import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  // Fetch real user count from Supabase
  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("get_user_count");
      if (!error && data !== null) {
        setTarget(data);
      }
    };
    fetchCount();

    // Listen for auth changes to refresh count
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchCount();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Animate count
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10">
        <Users className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="hidden sm:block">
        <span className="font-bold text-primary">
          {count.toLocaleString("pt-AO")}+
        </span>{" "}
        <span className="text-muted-foreground text-xs">usuários ativos</span>
      </div>
    </div>
  );
}
