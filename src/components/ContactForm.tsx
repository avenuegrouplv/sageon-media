import * as React from "react";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  hideHeader?: boolean;
}

export default function ContactForm({ title, subtitle, hideHeader = false }: ContactFormProps) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: t.contactForm.serviceOptions.multi,
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", service: t.contactForm.serviceOptions.multi, message: "" });
    }, 800);
  };

  return (
    <section 
      id="contact-section" 
      className="relative py-20 md:py-28 overflow-visible font-sans text-left text-white bg-transparent"
    >
      {/* Background Mesh Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0" />

      {/* Dominant Flowing Rich Green Background Ambient Lighting */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-36 -right-20 w-[800px] h-[800px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0"
      />

      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.95, 1.15, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-36 -left-20 w-[850px] h-[850px] bg-gradient-to-tr from-[#38b000]/25 via-[#BAFC50]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0"
      />

      <div className="w-full max-w-[1380px] mx-auto space-y-10 relative z-10 px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Section Heading */}
        {!hideHeader && (
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight text-center drop-shadow-lg">
              {title || t.contactForm.defaultTitle}
            </h2>
            <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto font-normal text-center drop-shadow">
              {subtitle || t.contactForm.defaultSubtitle}
            </p>
          </div>
        )}

        {/* Upper Part: Modern Frosted Glass Contact Form with Site Neutral Dark Tone */}
        <div className="bg-[#18181b]/95 backdrop-blur-xl border border-zinc-800 p-6 md:p-10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-5xl mx-auto">
          <div className="mb-6 pb-6 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-2">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vārds Input */}
                <div className="space-y-2">
                  <label htmlFor="form-name" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
                    {t.contactForm.nameLabel} <span className="text-[#BAFC50] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=""
                    className="w-full bg-[#121215] border border-zinc-800 focus:border-[#BAFC50] focus:outline-none px-4 py-3 text-sm text-white transition-colors rounded-xl placeholder-zinc-500"
                  />
                </div>

                {/* E-pasts Input */}
                <div className="space-y-2">
                  <label htmlFor="form-email" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
                    {t.contactForm.emailLabel} <span className="text-[#BAFC50] font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder=""
                    className="w-full bg-[#121215] border border-zinc-800 focus:border-[#BAFC50] focus:outline-none px-4 py-3 text-sm text-white transition-colors rounded-xl placeholder-zinc-500"
                  />
                </div>

                {/* Tālrunis Input */}
                <div className="space-y-2">
                  <label htmlFor="form-phone" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
                    {t.contactForm.phoneLabel} <span className="text-[#BAFC50] font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder=""
                    className="w-full bg-[#121215] border border-zinc-800 focus:border-[#BAFC50] focus:outline-none px-4 py-3 text-sm text-white transition-colors rounded-xl placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Mājaslapas veids / Pakalpojuma izvēlne */}
              <div className="space-y-2">
                <label htmlFor="form-service" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
                  {t.contactForm.serviceLabel} <span className="text-[#BAFC50] font-bold">*</span>
                </label>
                <select
                  id="form-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#121215] border border-zinc-800 focus:border-[#BAFC50] focus:outline-none px-4 py-3 text-sm text-white transition-colors rounded-xl cursor-pointer"
                >
                  <option value={t.contactForm.serviceOptions.landing}>{t.contactForm.serviceOptions.landing}</option>
                  <option value={t.contactForm.serviceOptions.multi}>{t.contactForm.serviceOptions.multi}</option>
                  <option value={t.contactForm.serviceOptions.ecommerce}>{t.contactForm.serviceOptions.ecommerce}</option>
                  <option value={t.contactForm.serviceOptions.maintenance}>{t.contactForm.serviceOptions.maintenance}</option>
                  <option value={t.contactForm.serviceOptions.other}>{t.contactForm.serviceOptions.other}</option>
                </select>
              </div>

              {/* Ziņa Input */}
              <div className="space-y-2">
                <label htmlFor="form-message" className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
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
                      ? "Aprakstiet savu projektu, mērķus un vēlamo izstrādes laiku..."
                      : lang === "EN"
                        ? "Describe your project, goals, and desired timeline..."
                        : "Опишите ваш проект, цели и желаемые сроки..."
                  }
                  className="w-full bg-[#121215] border border-zinc-800 focus:border-[#BAFC50] focus:outline-none px-4 py-3 text-sm text-white transition-colors rounded-xl placeholder-zinc-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-4 bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold tracking-widest text-xs uppercase transition-all duration-300 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(186,252,80,0.5)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
