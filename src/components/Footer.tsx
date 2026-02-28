import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-16">
      <div className="container py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Luanda Buy" className="h-8 w-8 brightness-0 invert" />
            <span className="text-lg font-bold text-background">Luanda Buy</span>
          </div>
          <p className="text-sm text-background/60">
            O marketplace de Luanda. Compre e venda com pagamento na entrega.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Links</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-background transition-colors">Início</Link>
            <Link to="/#categorias" className="hover:text-background transition-colors">Categorias</Link>
            <Link to="/vender" className="hover:text-background transition-colors">Vender</Link>
            <Link to="/contato" className="hover:text-background transition-colors">Contato</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Ajuda</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="#" className="hover:text-background transition-colors">Como comprar</Link>
            <Link to="#" className="hover:text-background transition-colors">Pagamento na entrega</Link>
            <Link to="#" className="hover:text-background transition-colors">Devoluções</Link>
            <Link to="#" className="hover:text-background transition-colors">Termos de uso</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Contato</h4>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              Luanda, Angola
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              +244 923 000 000
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              info@luandabuy.ao
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-4 text-center text-xs text-background/40">
          © 2026 Luanda Buy. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
