import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import Logo from "../assets/Logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  if (!isLoaded) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn?.create({
        identifier: email,
        password,
      });

      if (result?.status === "complete") {
        // @ts-ignore
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        console.error("Sign in result not complete", result);
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.errors?.[0]?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign in to <img src={Logo} alt="logo" className="w-20 inline" /></h2>
        <p className="text-sm text-gray-600 mt-1">
          Or{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            create a new account
          </a>
        </p>
      </div>

      <Card className="mt-6 w-full max-w-md p-6 shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

          <div>
            <Label htmlFor="email" className="mb-2">Email Address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
