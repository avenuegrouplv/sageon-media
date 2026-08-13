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
      {/* Subtle grid pattern background & rich, formless ambient green aura across all pages */}
      <div className="fixed inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[-10%] left-[15%] w-[85vw] max-w-[1200px] h-[550px] -rotate-6 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] bg-gradient-to-br from-[#BAFC50]/[0.15] via-[#38b000]/[0.09] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[18%] -left-[10%] w-[75vw] max-w-[950px] h-[480px] rotate-12 rounded-[50%_50%_60%_40%/40%_60%_50%_50%] bg-gradient-to-r from-[#38b000]/[0.14] via-[#BAFC50]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[35%] right-[-5%] w-[75vw] max-w-[1000px] h-[500px] rotate-6 rounded-[50%_50%_40%_60%/60%_40%_50%_50%] bg-gradient-to-bl from-[#38b000]/[0.14] via-[#BAFC50]/[0.08] to-transparent blur-[190px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[52%] left-[10%] w-[80vw] max-w-[1000px] h-[500px] -rotate-6 rounded-[45%_55%_50%_50%/50%_50%_45%_55%] bg-gradient-to-tr from-[#BAFC50]/[0.15] via-[#38b000]/[0.09] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[65%] left-[-8%] w-[80vw] max-w-[1050px] h-[520px] -rotate-12 rounded-[55%_45%_65%_35%/45%_55%_35%_65%] bg-gradient-to-tr from-[#BAFC50]/[0.16] via-[#38b000]/[0.09] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[82%] right-[-5%] w-[78vw] max-w-[1000px] h-[500px] rotate-6 rounded-[50%_50%_40%_60%/60%_40%_50%_50%] bg-gradient-to-bl from-[#38b000]/[0.14] via-[#BAFC50]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed bottom-[-15%] right-[5%] w-[90vw] max-w-[1100px] h-[600px] rotate-12 rounded-[40%_70%_50%_60%/60%_30%_70%_40%] bg-gradient-to-tl from-[#38b000]/[0.15] via-[#BAFC50]/[0.09] to-transparent blur-[190px] pointer-events-none z-0 transform-gpu" />
      
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
