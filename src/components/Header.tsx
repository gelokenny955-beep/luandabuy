import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import AuthModal from "@/components/AuthModal";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Categorias", to: "/#categorias" },
  { label: "Vender", to: "/vender" },
  { label: "Contato", to: "/contato" },
];

export default function Header() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 gap-4">
          {/* Logo + Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Luanda Buy" className="h-9 w-9" />
            </Link>
            <div className="hidden md:block">
              <AnimatedCounter />
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar produtos em Luanda…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="relative flex items-center justify-center h-10 w-10 rounded-lg hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <button
                onClick={signOut}
                className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <User className="h-4 w-4" />
                Entrar
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-secondary transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-background animate-slide-in">
            <div className="container py-3">
              <div className="mb-3">
                <AnimatedCounter />
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar produtos…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={() => { setMobileOpen(false); signOut(); }}
                    className="mt-2 flex items-center justify-center gap-2 h-10 rounded-lg bg-secondary text-foreground text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                    className="mt-2 flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
                  >
                    <User className="h-4 w-4" />
                    Entrar / Criar Conta
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Nav */}
        <nav className="hidden md:block border-t bg-background">
          <div className="container flex items-center gap-6 h-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
