import { useEffect, useState } from "react";
import { ShoppingBag, Shield, Truck, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

interface WelcomePanelProps {
  onDismiss: () => void;
}

export default function WelcomePanel({ onDismiss }: WelcomePanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const autoTimer = setTimeout(() => handleDismiss(), 12000);
    return () => clearTimeout(autoTimer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center max-w-lg mx-auto px-6 space-y-8 animate-fade-in">
        <img src={logo} alt="Luanda Buy" className="h-20 w-20 mx-auto" />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Seja bem-vindo à{" "}
            <span className="text-primary">Luanda Buy</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Uma das melhores plataformas de e-commerce em Angola.
            <br />
            Compre com segurança com{" "}
            <span className="font-semibold text-primary">Cash on Delivery</span>{" "}
            (Pagamento na Entrega).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Truck, label: "Entrega Rápida" },
            { icon: Shield, label: "Compra Segura" },
            { icon: ShoppingBag, label: "Cash on Delivery" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/60">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleDismiss}
          className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors shadow-card-hover"
        >
          Começar
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
