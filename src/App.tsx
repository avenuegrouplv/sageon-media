import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import SmoothScroll from "./components/SmoothScroll";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./i18n/LanguageContext";

// Core Home page (hero view loads instantly)
import Home from "./pages/Home";

// Lazy-loaded sub-pages
const Projekti = lazy(() => import("./pages/Projekti"));
const Cenas = lazy(() => import("./pages/Cenas"));
const Buj = lazy(() => import("./pages/Buj"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Kontakti = lazy(() => import("./pages/Kontakti"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-[#BAFC50] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/en" || location.pathname === "/ru";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-white transition-colors duration-300 relative overflow-x-hidden">
      {/* Subtle grid pattern background & ambient green glow across all pages */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0 transform-gpu" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(186,252,80,0.12)_0%,rgba(56,176,0,0.06)_40%,transparent_80%)] pointer-events-none z-0 transform-gpu" />
      
      {/* Fixed top overlay header */}
      <Header />

      {/* Core Multi-Page Views & Footer - Shifted left by 4.2cm on desktop */}
      <div className="flex-1 flex flex-col justify-between w-full lg:relative lg:-left-[4.2cm] lg:w-[calc(100%+4.2cm)]">
        <main id="main-content" className={`flex-1 relative z-10 ${!isHome ? "pt-[80px]" : ""}`}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* LV Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projekti" element={<Projekti />} />
            <Route path="/portfolio" element={<Projekti />} />
            <Route path="/darbi" element={<Projekti />} />
            <Route path="/pakalpojumi" element={<Cenas />} />
            <Route path="/cenas" element={<Cenas />} />
            <Route path="/buj" element={<Buj />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/kontakti" element={<Kontakti />} />

            {/* EN Routes */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/projects" element={<Projekti />} />
            <Route path="/en/portfolio" element={<Projekti />} />
            <Route path="/en/services" element={<Cenas />} />
            <Route path="/en/faq" element={<Buj />} />
            <Route path="/en/blog" element={<Blogs />} />
            <Route path="/en/contact" element={<Kontakti />} />

            {/* RU Routes */}
            <Route path="/ru" element={<Home />} />
            <Route path="/ru/proekty" element={<Projekti />} />
            <Route path="/ru/portfolio" element={<Projekti />} />
            <Route path="/ru/uslugi" element={<Cenas />} />
            <Route path="/ru/voprosy" element={<Buj />} />
            <Route path="/ru/blog" element={<Blogs />} />
            <Route path="/ru/kontakty" element={<Kontakti />} />

            {/* Fallback route back to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      {/* 4-Column Professional Footer */}
      <Footer />
      </div>

      {/* Pop-up Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LanguageProvider>
          <SmoothScroll>
            {/* Automatically reset scroll position to top on route change */}
            <ScrollToTop />
            <AppContent />
          </SmoothScroll>
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}
