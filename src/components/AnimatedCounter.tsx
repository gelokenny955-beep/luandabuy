import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export default function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
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
  }, [target, duration]);

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
