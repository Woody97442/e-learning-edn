import { useState, type FormEvent } from "react";
import { fakeLogin } from "../../scripts/fakeApi";
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

export default function LoginForm({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res: LoginResponse = await fakeLogin({ email, password });
    if (res.ok) {
      onLogin(res.token, res.user);
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
            Entrez votre email et mot de passe pour vous connecter à votre
            compte
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
            <Button
              type="submit"
              variant={"edn_hover"}
              className="w-full ">
              Se connecter
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2 mt-4 text-center text-sm text-muted-foreground">
        <p className="text-center text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
        </p>
        <Link
          to="/register"
          className="text-primary underline">
          Inscrivez-vous
        </Link>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-2">
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Compte de test:
        </p>
        <div className="flex justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEmail("test@user.com");
              setPassword("123456");
            }}>
            User
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setEmail("test@admin.com");
              setPassword("123456");
            }}>
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
