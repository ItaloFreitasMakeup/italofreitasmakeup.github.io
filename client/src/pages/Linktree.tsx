"use client";

import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  MessageCircle, 
  Moon, 
  Sun, 
  Languages,
  ExternalLink
} from "lucide-react";

import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";

// --- Definições de Tipos ---
interface A11yTexts {
  logoAlt: string;
  langBtn: string;
  themeBtnDark: string;
  themeBtnLight: string;
  instaLink: string;
  whatsappLink: string;
  siteLink: string;
  logoLink: string;
  titleLink: string;
}

interface LinktreeTexts {
  title: string;
  subtitle: string;
  description: string;
  instagram: string;
  whatsapp: string;
  website: string;
  footer: string;
  dev: string;
}

type Lang = 'pt' | 'en';

interface TranslationSet {
  a11y: A11yTexts;
  linktree: LinktreeTexts;
}

// --- Dados e Traduções ---
const translations: Record<Lang, TranslationSet> = {
  pt: {
    a11y: {
      logoAlt: "Logomarca de Italo Freitas",
      langBtn: "Alternar idioma para inglês",
      themeBtnDark: "Ativar modo claro",
      themeBtnLight: "Ativar modo escuro",
      instaLink: "Acessar perfil do Instagram de Italo Freitas",
      whatsappLink: "Enviar mensagem para o WhatsApp de Italo Freitas",
      siteLink: "Acessar o site de Italo Freitas",
      logoLink: "Ir para o site principal de Italo Freitas",
      titleLink: "Ir para o site principal de Italo Freitas"
    },
    linktree: {
      title: "Italo Freitas",
      subtitle: "Profissional de Maquiagem",
      description: "Especializado em maquiagem profissional para eventos, produções audiovisuais e transformações de beleza. Oferecendo cursos e consultoria personalizada.",
      instagram: "Portfólio & Inspirações",
      whatsapp: "Solicitar Orçamento",
      website: "Conhecer Meu Site",
      footer: "© 2026 Italo Freitas Makeup. Todos os direitos reservados.",
      dev: "Desenvolvido com elegância, profissionalismo e amor"
    }
  },
  en: {
    a11y: {
      logoAlt: "Italo Freitas Logo",
      langBtn: "Switch language to Portuguese",
      themeBtnDark: "Activate light mode",
      themeBtnLight: "Activate dark mode",
      instaLink: "Visit Italo Freitas' Instagram profile",
      whatsappLink: "Send a message to Italo Freitas' WhatsApp",
      siteLink: "Visit Italo Freitas' website",
      logoLink: "Go to Italo Freitas' main website",
      titleLink: "Go to Italo Freitas' main website"
    },
    linktree: {
      title: "Italo Freitas",
      subtitle: "Makeup Professional",
      description: "Specialized in professional makeup for events, audiovisual productions, and beauty transformations. Offering personalized courses and consulting.",
      instagram: "Portfolio & Inspirations",
      whatsapp: "Request a Quote",
      website: "Visit My Website",
      footer: "© 2026 Italo Freitas Makeup. All rights reserved.",
      dev: "Developed with elegance, professionalism, and love"
    }
  }
};

export default function Linktree() {
  const [lang, setLang] = useState<Lang>('pt');
  const [isDark, setIsDark] = useState(false);
  
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: true,
    marbleBg: true
  });

  const t = translations[lang];
  
  const whatsappNumber = "553498109317";
  const quoteMessagePt = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para maquiagem.");
  const quoteMessageEn = encodeURIComponent("Hello! I would like to request a quote for makeup services.");
  const siteUrl = "https://italofreitasmakeup.github.io/";

  const colors = {
    textPrimary: isDark ? '#F9FAFB' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#4B5563',
    cardBg: isDark ? 'rgba(25, 25, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    accentGold: '#C9A961',
    accentGoldLight: '#E8D4A8',
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setIsDark(prev => !prev);

  const getQuoteUrl = () => {
    return lang === 'pt' 
      ? `https://wa.me/${whatsappNumber}?text=${quoteMessagePt}`
      : `https://wa.me/${whatsappNumber}?text=${quoteMessageEn}`;
  };

  const handleImageError = (key: keyof typeof imagesLoaded) => {
    console.warn(`Imagem não encontrada: ${key}.`);
    setImagesLoaded(prev => ({ ...prev, [key]: false }));
  };

  const links = [
    {
      id: 'instagram',
      label: t.linktree.instagram,
      url: 'https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==',
      icon: Instagram,
      color: '#E1306C'
    },
    {
      id: 'whatsapp',
      label: t.linktree.whatsapp,
      url: getQuoteUrl(),
      icon: MessageCircle,
      color: '#25D366'
    },
    {
      id: 'website',
      label: t.linktree.website,
      url: siteUrl,
      icon: ExternalLink,
      color: colors.accentGold
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative font-sans flex flex-col`}>
      
      {/* --- FUNDO --- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${marbleBg})`,
            backgroundColor: isDark ? '#0f172a' : '#fefce8',
            backgroundRepeat: 'repeat',
            backgroundSize: '100%',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            opacity: isDark ? 0.9 : 0.7,
            filter: isDark 
              ? 'grayscale(100%) invert(100%) brightness(1.3)' 
              : 'brightness(1.1)',
            transition: 'opacity 0.5s ease, filter 0.5s ease'
          }}
        />
      </div>
      {/* --- FIM DO FUNDO --- */}

      {/* Header com Controles */}
      <header className="relative z-10 pt-6 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between mb-8">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang} 
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-semibold text-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
              aria-label={t.a11y.langBtn}
            >
              <Languages size={18} />
              <span className="hidden sm:inline text-xs">{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={isDark ? t.a11y.themeBtnDark : t.a11y.themeBtnLight}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Logo com Link */}
          <a 
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center mb-8 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-2"
            aria-label={t.a11y.logoLink}
          >
            <img 
              src={!imagesLoaded.logo ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23C9A961'/%3E%3C/svg%3E" : logoImg} 
              alt={t.a11y.logoAlt} 
              className="h-20 w-20 object-contain drop-shadow-lg"
              onError={() => handleImageError('logo')}
            />
          </a>

          {/* Título e Subtítulo */}
          <div className="text-center mb-12">
            <a 
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-colors hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
              aria-label={t.a11y.titleLink}
            >
              <h1 
                className="text-4xl md:text-5xl font-serif font-bold mb-2 transition-colors" 
                style={{ color: colors.textPrimary }}
              >
                {t.linktree.title}
              </h1>
            </a>
            <p 
              className="text-xl font-medium mb-4" 
              style={{ color: colors.accentGold }}
            >
              {t.linktree.subtitle}
            </p>
            <p 
              className="text-sm leading-relaxed transition-colors" 
              style={{ color: colors.textSecondary }}
            >
              {t.linktree.description}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4 mb-12">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    outlineColor: colors.accentGold
                  }}
                  aria-label={link.id === 'instagram' ? t.a11y.instaLink : link.id === 'whatsapp' ? t.a11y.whatsappLink : t.a11y.siteLink}
                >
                  {/* Background gradient effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: link.color }}
                  />
                  
                  {/* Content */}
                  <div className="relative px-6 py-4 flex items-center gap-4">
                    <div 
                      className="p-3 rounded-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${link.color}15`,
                        color: link.color
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <p 
                        className="font-semibold transition-colors" 
                        style={{ color: colors.textPrimary }}
                      >
                        {link.label}
                      </p>
                    </div>

                    <ExternalLink 
                      size={20} 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: link.color }}
                    />
                  </div>

                  {/* Bottom border accent */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: link.color }}
                  />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div 
            className="h-px my-8"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${colors.accentGold}, transparent)`
            }}
          />

          {/* Footer */}
          <footer className="text-center">
            <p 
              className="text-xs transition-colors" 
              style={{ color: colors.textSecondary }}
            >
              {t.linktree.footer}
            </p>
            <p
              className="flex items-center justify-center text-xs transition-colors mt-2"
              style={{ color: colors.textSecondary }}
            >
              {t.linktree.dev}<span>
                <a
                  className="wedding-rings-link"
                  href="https://jluckmay.github.io/"
                  aria-label="João Lucas Mayrinck portfólio"
                  title="João Lucas Mayrinck"
                >
                  <span className="wedding-rings" aria-hidden="true">
                    <svg viewBox="0 0 32 24" fill="none" focusable="false">
                      <defs>
                        <mask id="linktree-left-ring-weave">
                          <rect width="32" height="24" fill="white" />
                          <circle cx="17.2" cy="7.9" r="2.3" fill="black" />
                        </mask>
                        <mask id="linktree-right-ring-weave">
                          <rect width="32" height="24" fill="white" />
                          <circle cx="14.8" cy="16.1" r="2.3" fill="black" />
                        </mask>
                      </defs>
                      <ellipse
                        cx="13.5"
                        cy="12"
                        rx="10.5"
                        ry="5.7"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        transform="rotate(-42 13.5 12)"
                        mask="url(#linktree-left-ring-weave)"
                      />
                      <ellipse
                        cx="18.5"
                        cy="12"
                        rx="10.5"
                        ry="5.7"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        transform="rotate(42 18.5 12)"
                        mask="url(#linktree-right-ring-weave)"
                      />
                    </svg>
                  </span>
                </a>
                .
              </span>
            </p>
          </footer>

        </div>
      </main>

    </div>
  );
}
