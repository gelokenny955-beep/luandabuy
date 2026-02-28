import { useState } from "react";
import { X, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

type AuthView = "login" | "register" | "otp" | "success";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [view, setView] = useState<AuthView>("login");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  // Register form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForms = () => {
    setView("login");
    setAcceptTerms(false);
    setOtpValue("");
    setLoginEmail("");
    setLoginPwd("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setDob("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setShowPwd(false);
    setShowConfirmPwd(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Aceite os Termos e Políticas para continuar.");
      return;
    }
    toast.success("Login realizado com sucesso!");
    resetForms();
    onOpenChange(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Aceite os Termos e Políticas para continuar.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setView("otp");
  };

  const handleOtp = () => {
    if (otpValue.length !== 6) {
      toast.error("Insira o código de 6 dígitos.");
      return;
    }
    setView("success");
  };

  const handleSuccess = () => {
    toast.success("Bem-vindo à Luanda Buy!");
    resetForms();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) resetForms();
        onOpenChange(o);
      }}
    >
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* LOGIN */}
        {view === "login" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Entrar na Luanda Buy</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Email ou Nome de Usuário</Label>
                <Input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Senha</Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={loginPwd}
                    onChange={(e) => setLoginPwd(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="login-terms"
                  checked={acceptTerms}
                  onCheckedChange={(v) => setAcceptTerms(v === true)}
                />
                <label htmlFor="login-terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  Confirmo que li e aceito os Termos e Políticas
                </label>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold">
                ENTRAR
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => { setAcceptTerms(false); setView("register"); }}
                  className="text-primary font-medium hover:underline"
                >
                  Criar conta
                </button>
              </p>
            </form>
          </>
        )}

        {/* REGISTER */}
        {view === "register" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Criar Conta</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Primeiro Nome</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Último Nome</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Nome de Usuário</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ex: joao_luanda" required />
              </div>
              <div className="space-y-1">
                <Label>Data de Nascimento</Label>
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label>Número de Telefone</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+244 9XX XXX XXX" required />
              </div>
              <div className="space-y-1">
                <Label>Senha</Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPwd ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="reg-terms"
                  checked={acceptTerms}
                  onCheckedChange={(v) => setAcceptTerms(v === true)}
                />
                <label htmlFor="reg-terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  Aceito os Termos e Políticas
                </label>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold">
                CRIAR CONTA
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => { setAcceptTerms(false); setView("login"); }}
                  className="text-primary font-medium hover:underline"
                >
                  Entrar
                </button>
              </p>
            </form>
          </>
        )}

        {/* OTP */}
        {view === "otp" && (
          <div className="text-center space-y-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Verificação de Email</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Insira o código de 6 dígitos enviado para<br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button onClick={handleOtp} className="w-full h-11 font-semibold">
              CONTINUAR
            </Button>
          </div>
        )}

        {/* SUCCESS */}
        {view === "success" && (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold">A sua conta foi criada com sucesso</h2>
            <Button onClick={handleSuccess} className="h-11 px-8 font-semibold">
              OK
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
