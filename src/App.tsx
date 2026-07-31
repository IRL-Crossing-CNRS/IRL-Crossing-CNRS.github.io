import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';
import { SectionNavProvider } from './context/SectionNavContext';
import { publicationPages } from './data/publicationPages';
import Home from './pages/Home';

function PublicationDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const PublicationPage = slug ? publicationPages[slug] : undefined;

  if (!PublicationPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={null}>
      <PublicationPage />
    </Suspense>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/publications/:slug"
          element={
            <PageTransition>
              <PublicationDetailRoute />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SectionNavProvider>
        <BrowserRouter basename="/">
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </SectionNavProvider>
    </ThemeProvider>
  );
}
