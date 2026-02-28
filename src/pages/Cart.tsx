import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-8 animate-fade-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Pedido Confirmado! 🎉</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Seu pedido será entregue no endereço informado. Pagamento na entrega.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors">
              Continuar Comprando
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30" />
            <h2 className="text-xl font-semibold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground">Adicione produtos para continuar.</p>
            <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors">
              Ver Produtos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleOrder = () => {
    clearCart();
    setOrdered(true);
    toast.success("Pedido realizado com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Continuar Comprando
          </Link>

          <h1 className="text-2xl font-bold">Carrinho de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-4 border rounded-xl bg-card">
                  <Link to={`/produto/${product.id}`} className="shrink-0">
                    <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${product.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </Link>
                    <p className="text-lg font-bold text-primary mt-1">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => { removeItem(product.id); toast("Produto removido"); }} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors ml-auto">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border rounded-xl p-6 bg-card h-fit space-y-4 sticky top-28">
              <h3 className="font-semibold text-lg">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrega</span>
                  <span className="text-primary font-medium">Grátis</span>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <div className="p-3 rounded-lg bg-accent text-accent-foreground text-xs">
                💰 Pagamento na Entrega (Cash on Delivery)
              </div>
              <button
                onClick={handleOrder}
                className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
