import { useState, type FormEvent } from "react";
import { fakeRegister } from "../../scripts/fakeApi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm({ onRegister }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const res: RegisterResponse = await fakeRegister({ email, password });

    if (res.ok) {
      onRegister(res.token, res.user);
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  }

  return (
    <div>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-secondary text-3xl font-bold text-center">
            Espace E-learning
          </CardTitle>
          <CardDescription>
            Remplissez les champs pour créer un nouveau compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label
                htmlFor="email"
                className="text-left text-primary">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@domaine.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="password"
                className="text-left text-primary">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="passwordConfirm"
                className="text-left text-primary">
                Confirmer le mot de passe
              </Label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="edn_hover"
              className="w-full">
              S'inscrire
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2 mt-4 text-center text-sm text-muted-foreground">
        <p className="text-center text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
        </p>
        <Link
          to="/login"
          className="text-primary underline">
          Connectez-vous
        </Link>
      </div>
    </div>
  );
}
