import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, MapPin, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Produto não encontrado.</p>
            <Link to="/" className="text-primary font-medium hover:underline">
              Voltar ao início
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success("Produto adicionado! Redirecionando ao carrinho…");
    setTimeout(() => window.location.href = "/carrinho", 800);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
              </div>

              <p className="text-3xl font-extrabold text-primary">{formatPrice(product.price)}</p>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {product.seller} · {product.location}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent text-accent-foreground text-sm">
                <Truck className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Pagamento na Entrega (Cash on Delivery)</p>
                  <p className="text-xs opacity-80">Pague quando receber o produto em mãos</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantidade:</span>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-secondary transition-colors">−</button>
                  <span className="px-4 py-2 border-x text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-secondary transition-colors">+</button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors"
                >
                  Comprar Agora
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 rounded-lg border-2 border-primary text-primary font-semibold text-base hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
