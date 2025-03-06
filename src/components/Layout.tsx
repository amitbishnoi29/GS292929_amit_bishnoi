import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-64 pt-16 min-h-screen">
          <div className="p-6 max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    );
  }