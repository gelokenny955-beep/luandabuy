import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-primary-light">
      <div className="container grid md:grid-cols-2 items-center gap-8 py-12 md:py-20">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🚚 Pagamento na Entrega
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance">
            Compre os melhores produtos em{" "}
            <span className="text-primary">Luanda!</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Tecnologia, moda, acessórios e muito mais. Entrega rápida e pagamento na entrega em toda Luanda.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/#ofertas"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-card-hover"
            >
              Ver Ofertas
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/vender"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Vender na Luanda Buy
            </Link>
          </div>
        </div>
        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroBanner}
            alt="Produtos disponíveis na Luanda Buy"
            className="w-full rounded-2xl shadow-card-hover object-cover max-h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
