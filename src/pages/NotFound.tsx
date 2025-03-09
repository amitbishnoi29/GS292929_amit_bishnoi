import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md text-center shadow-lg border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">404</h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
