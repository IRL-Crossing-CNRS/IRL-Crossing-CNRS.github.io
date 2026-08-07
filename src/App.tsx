import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import BackToTopButton from './components/BackToTopButton';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';
import { SectionNavProvider } from './context/SectionNavContext';
import { resourcePages } from './data/resourcePages';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';

function ResourceDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const ResourcePage = slug ? resourcePages[slug] : undefined;

  if (!ResourcePage) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={null}>
      <ResourcePage />
      <BackToTopButton />
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
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/resources/:slug"
          element={
            <PageTransition>
              <ResourceDetailRoute />
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
