import { useState, useEffect } from "react";
import { Truck, Shield, Clock, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import WelcomePanel from "@/components/WelcomePanel";
import { products } from "@/data/products";

const features = [
  { icon: Truck, label: "Entrega Rápida", desc: "Em toda Luanda" },
  { icon: CreditCard, label: "Pague na Entrega", desc: "Cash on Delivery" },
  { icon: Shield, label: "Compra Segura", desc: "Produtos verificados" },
  { icon: Clock, label: "Agende a Entrega", desc: "Manhã, Tarde ou Noite" },
];

export default function Index() {
  const [category, setCategory] = useState("Todos");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("lb-welcome-seen");
    if (!seen) setShowWelcome(true);
  }, []);

  const handleDismissWelcome = () => {
    sessionStorage.setItem("lb-welcome-seen", "1");
    setShowWelcome(false);
  };

  const filtered = category === "Todos"
    ? products
    : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      {showWelcome && <WelcomePanel onDismiss={handleDismissWelcome} />}

      <Header />
      <HeroBanner />

      {/* Features */}
      <section className="border-b">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="flex-1">
        <div className="container py-8 space-y-6" id="ofertas">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
          </div>

          <CategoryBar selected={category} onSelect={setCategory} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
