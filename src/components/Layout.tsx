import { useAuth } from "@clerk/clerk-react";
import { LayoutGrid, LineChart, Package, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
    const { isSignedIn } = useAuth();
    const location = useLocation();
  
    if (!isSignedIn) {
      return (
        <div className="min-h-screen flex flex-col justify-center">
          {children}
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {[
                { path: '/stores', icon: Store, label: 'Stores' },
                { path: '/skus', icon: Package, label: 'SKUs' },
                { path: '/planning', icon: LayoutGrid, label: 'Planning' },
                { path: '/chart', icon: LineChart, label: 'Chart' },
              ].map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <main className="ml-64 pt-16 min-h-screen w-full">
            <div className="p-6 max-w-[1920px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  export default Layout;