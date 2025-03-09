import { useClerk, useUser } from "@clerk/clerk-react";
import { LogOut, UserCircle } from "lucide-react";
import Logo from '../assets/Logo.svg';

function Header() {
    const { signOut } = useClerk();
    const { user } = useUser();
    
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="logo" className="w-30 " />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <UserCircle size={20} />
              <span>{user?.emailAddresses[0]?.emailAddress}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center cursor-pointer space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  export default Header;