import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, CalendarDays } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ScheduleModal from "@/components/ScheduleModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) {
      toast.error("Produto indisponível no momento.");
      return;
    }
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleSchedule = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) {
      toast.error("Produto indisponível no momento.");
      return;
    }
    setScheduleOpen(true);
  };

  return (
    <>
      <Link
        to={`/produto/${product.id}`}
        className="group bg-card rounded-xl border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
        <div className="aspect-square overflow-hidden bg-secondary relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Availability badge */}
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              product.available
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            {product.available ? "Disponível" : "Indisponível"}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              · {product.sold.toLocaleString("pt-AO")} vendidos
            </span>
          </div>
          <div className="mt-auto space-y-2">
            <div className="flex items-end justify-between gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shrink-0"
                aria-label="Adicionar ao carrinho"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleSchedule}
              className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              AGENDAR COMPRA
            </button>
          </div>
        </div>
      </Link>

      <ScheduleModal open={scheduleOpen} onOpenChange={setScheduleOpen} product={product} />
    </>
  );
}
