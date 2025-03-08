import {Link, useLocation } from 'react-router-dom';
import { Store, LayoutGrid, Package, LineChart } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-48 bg-white border-r border-gray-200 p-4">
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
                isActive(path)
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
    );
  }

  export default Sidebar;