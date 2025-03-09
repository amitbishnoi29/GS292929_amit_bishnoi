import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import Layout from './components/Layout';
import SignUpRoute from './components/SignUp';

const StoresPage = lazy(() => import('./pages/StoresPage'));
const SkusPage = lazy(() => import('./pages/SkusPage'));
const PlanningPage = lazy(() => import('./pages/PlanningPage'));
const ChartPage = lazy(() => import('./pages/Chartpage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Layout>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpRoute />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <StoresPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stores"
                element={
                  <ProtectedRoute>
                    <StoresPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skus"
                element={
                  <ProtectedRoute>
                    <SkusPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/planning"
                element={
                  <ProtectedRoute>
                    <PlanningPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chart"
                element={
                  <ProtectedRoute>
                    <ChartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ClerkProvider>
  );
}
