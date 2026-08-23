import * as React from "react";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

interface ContactFormProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  hideHeader?: boolean;
}

export default function ContactForm({ title, subtitle, hideHeader = false }: ContactFormProps) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: "Mājaslapas pieteikums",
      message: formData.message.trim(),
    };

    try {
      let response: Response;
      
      // Primary attempt: standard /api/send-email endpoint (Express dev/prod server or Netlify redirect)
      try {
        response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // If 404 or 502 received, fallback to direct Netlify serverless function path
        if (response.status === 404 || response.status === 502) {
          response = await fetch("/.netlify/functions/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        }
      } catch (networkErr: any) {
        // Network fail on /api, try direct Netlify functions endpoint fallback
        response = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      let data: any = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = {};
      }

      if (!response.ok || !data.success) {
        const errorText = 
          data?.error || 
          data?.message || 
          (lang === "LV" 
            ? `Kļūda nosūtot e-pastu (${response.status}). Lūdzu, mēģiniet vēlreiz.` 
            : lang === "EN" 
              ? `Error sending message (${response.status}). Please try again.` 
              : `Ошибка при отправке (${response.status}). Пожалуйста, попробуйте еще раз.`);
        throw new Error(errorText);
      }

      // Success
      setSubmitted(true);
      setErrorMessage(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setErrorMessage(
        err?.message || 
        (lang === "LV" 
          ? "Neizdevās nosūtīt ziņojumu. Lūdzu, pārbaudiet interneta savienojumu vai sazinieties ar mums tieši." 
          : lang === "EN" 
            ? "Could not send message. Please check your connection or contact us directly." 
            : "Не удалось отправить сообщение. Пожалуйста, попробуйте позже.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact-section" 
      className="relative pt-8 pb-0 sm:py-12 md:py-16 overflow-visible font-sans text-left text-white bg-transparent"
    >
      {/* Background Mesh Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0" />

      {/* Fluid Organic Green Background Ambient Lighting */}
      <div
        className="absolute -top-36 -right-20 w-[900px] h-[500px] -rotate-12 rounded-[55%_45%_65%_35%] bg-gradient-to-bl from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu"
      />
      <div
        className="hidden sm:block absolute top-[20%] -left-20 w-[850px] h-[480px] rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-r from-[#BAFC50]/[0.14] via-[#38b000]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu"
      />
      <div
        className="hidden sm:block absolute top-[55%] right-[-10%] w-[900px] h-[500px] -rotate-6 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.15] via-[#BAFC50]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu"
      />
      <div
        className="absolute -bottom-36 -left-20 w-[950px] h-[550px] rotate-12 rounded-[35%_65%_45%_55%] bg-gradient-to-tr from-[#38b000]/[0.15] via-[#BAFC50]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu"
      />
      <div className="sm:hidden absolute top-[10%] -left-12 w-80 h-64 -rotate-12 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[110px] pointer-events-none z-0 transform-gpu" />
      <div className="sm:hidden absolute top-[38%] -right-12 w-80 h-64 rotate-12 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[110px] pointer-events-none z-0 transform-gpu" />
      <div className="sm:hidden absolute top-[68%] -left-12 w-80 h-64 -rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-r from-[#BAFC50]/[0.14] via-[#38b000]/[0.07] to-transparent blur-[110px] pointer-events-none z-0 transform-gpu" />
      <div className="sm:hidden absolute top-[92%] -right-12 w-80 h-64 rotate-6 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[110px] pointer-events-none z-0 transform-gpu" />

      <div className="w-full max-w-[1380px] mx-auto space-y-10 relative z-10 px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Section Heading */}
        {!hideHeader && (
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight text-center drop-shadow-lg leading-tight md:leading-snug whitespace-pre-line">
              {title || t.contactForm.defaultTitle}
            </h2>
            {(subtitle !== undefined ? subtitle : t.contactForm.defaultSubtitle) ? (
              <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto font-light text-center drop-shadow">
                {subtitle !== undefined ? subtitle : t.contactForm.defaultSubtitle}
              </p>
            ) : null}
          </div>
        )}

        {/* Form Container - Horizontally narrower, vertically taller and focused */}
        <div className="bg-[#18181b]/95 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-2xl mx-auto">
          <div className="mb-6 pb-5 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BAFC50] animate-ping" />
                {lang === "LV" ? "Nosūtiet mums ziņu" : lang === "EN" ? "Send us a message" : "Отправьте нам сообщение"}
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-1">
                {lang === "LV" 
                  ? "Aizpildiet zemāk esošo formu un mēs sazināsimies ar Jums." 
                  : lang === "EN" 
                    ? "Fill out the form below and we will contact you." 
                    : "Заполните форму ниже, и мы свяжемся с Вами."}
              </p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#BAFC50]/10 text-[#BAFC50] border border-[#BAFC50]/30 mb-2">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.contactForm.successTitle}</h3>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto font-light">
                {t.contactForm.successMessage}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 border border-zinc-700 hover:border-[#BAFC50] transition-colors text-xs font-semibold uppercase tracking-wider text-white hover:text-[#BAFC50] cursor-pointer rounded-xl shadow-sm"
              >
                {lang === "LV" ? "Sūtīt jaunu ziņu" : lang === "EN" ? "Send another message" : "Отправить еще сообщение"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Vārds and E-pasts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Vārds Input */}
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-300">
                    {t.contactForm.nameLabel} <span className="text-[#BAFC50] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=""
                    className="w-full bg-[#e4e4e7] hover:bg-[#ececf0] focus:bg-[#ffffff] border border-zinc-300 focus:border-[#BAFC50] focus:ring-2 focus:ring-[#BAFC50]/30 focus:outline-none px-4 py-3 text-sm text-zinc-900 font-medium transition-all rounded-xl placeholder-zinc-500 shadow-inner"
                  />
                </div>

                {/* E-pasts Input */}
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-300">
                    {t.contactForm.emailLabel} <span className="text-[#BAFC50] font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder=""
                    className="w-full bg-[#e4e4e7] hover:bg-[#ececf0] focus:bg-[#ffffff] border border-zinc-300 focus:border-[#BAFC50] focus:ring-2 focus:ring-[#BAFC50]/30 focus:outline-none px-4 py-3 text-sm text-zinc-900 font-medium transition-all rounded-xl placeholder-zinc-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Row 2: Tālrunis (Below Vārds and E-pasts) */}
              <div className="space-y-1.5">
                <label htmlFor="form-phone" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-300">
                  {t.contactForm.phoneLabel} <span className="text-[#BAFC50] font-bold">*</span>
                </label>
                <input
                  type="tel"
                  id="form-phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder=""
                  className="w-full bg-[#e4e4e7] hover:bg-[#ececf0] focus:bg-[#ffffff] border border-zinc-300 focus:border-[#BAFC50] focus:ring-2 focus:ring-[#BAFC50]/30 focus:outline-none px-4 py-3 text-sm text-zinc-900 font-medium transition-all rounded-xl placeholder-zinc-500 shadow-inner"
                />
              </div>

              {/* Row 3: Ziņojums */}
              <div className="space-y-1.5">
                <label htmlFor="form-message" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-300">
                  {t.contactForm.messageLabel} <span className="text-[#BAFC50] font-bold">*</span>
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    lang === "LV" 
                      ? "Lūdzu, aprakstiet savu projektu, mērķus un vēlamo izstrādes laiku..."
                      : lang === "EN"
                        ? "Please describe your project, goals, and desired timeline..."
                        : "Пожалуйста, опишите ваш проект, цели и желаемые сроки..."
                  }
                  className="w-full bg-[#e4e4e7] hover:bg-[#ececf0] focus:bg-[#ffffff] border border-zinc-300 focus:border-[#BAFC50] focus:ring-2 focus:ring-[#BAFC50]/30 focus:outline-none px-4 py-3 text-sm text-zinc-900 font-medium transition-all rounded-xl placeholder-zinc-500 resize-none shadow-inner"
                />
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-300 text-xs sm:text-sm"
                >
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold tracking-widest text-xs uppercase transition-all duration-300 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(186,252,80,0.5)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.contactForm.submittingBtn : t.contactForm.submitBtn}
                  <Send className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
