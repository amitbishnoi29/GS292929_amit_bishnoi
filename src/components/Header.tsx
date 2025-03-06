import { Menu, Store } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Store className="text-blue-600" size={28} />
              <span className="text-xl font-bold">Store Manager</span>
            </div>
          </div>
        </div>
      </header>
    );
  }