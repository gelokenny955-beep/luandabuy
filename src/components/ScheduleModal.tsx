import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { CalendarDays, Clock, MapPin, Minus, Plus } from "lucide-react";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export default function ScheduleModal({ open, onOpenChange, product }: ScheduleModalProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState<string>("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!period) {
      toast.error("Escolha o período de entrega.");
      return;
    }
    for (let i = 0; i < qty; i++) addItem(product);
    setConfirmed(true);
    toast.success("Compra agendada com sucesso!");
  };

  const handleClose = () => {
    setConfirmed(false);
    setQty(1);
    setDate("");
    setPeriod("");
    setAddress("");
    onOpenChange(false);
  };

  if (confirmed) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-sm">
          <div className="text-center space-y-4 py-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-lg font-bold">Agendamento Confirmado!</h2>
            <p className="text-sm text-muted-foreground">
              Seu pedido será entregue no endereço informado. Pagamento na entrega.
            </p>
            <Button onClick={handleClose} className="h-10 px-6 font-semibold">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleConfirm} className="space-y-4">
          {/* Product summary */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">{product.name}</p>
              <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <Label>Quantidade</Label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-secondary">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-secondary">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <Label className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" /> Data de Entrega
            </Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          {/* Period */}
          <div className="space-y-1">
            <Label className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Período
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {["Manhã", "Tarde", "Noite"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`h-9 rounded-lg border text-sm font-medium transition-colors ${
                    period === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> Endereço de Entrega
            </Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Bairro, Rua, Referência…"
              required
            />
          </div>

          {/* Payment */}
          <div className="p-3 rounded-lg bg-accent text-accent-foreground text-xs">
            💰 Pagamento: Cash on Delivery (Pagamento na Entrega)
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span className="text-primary">{formatPrice(product.price * qty)}</span>
          </div>

          <Button type="submit" className="w-full h-11 font-semibold">
            CONFIRMAR AGENDAMENTO
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
