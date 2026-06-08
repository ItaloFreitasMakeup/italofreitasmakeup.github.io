"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  MessageCircle, 
  Moon, 
  Sun, 
  Languages, 
  Calendar, 
  MapPin, 
  GraduationCap
} from "lucide-react";

// --- Imports de Imagem ---
// Certifique-se de que marble.png está em ./lib/marble.png
import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";
import profileImg from "../lib/profile.jpg";
import ringsImg from "../lib/rings.png";

// --- Definições de Tipos ---
interface A11yTexts {
  logoAlt: string;
  langBtn: string;
  themeBtnDark: string;
  themeBtnLight: string;
  instaLinkNav: string;
  whatsAppLinkNav: string;
  carouselLeft: string;
  carouselRight: string;
  instaPostTitle: string;
  mapTitle: string;
  profileAlt: string;
}

interface NavTexts {
  about: string;
  portfolio: string;
  courses: string;
  contact: string;
  location: string;
}

interface HeroTexts {
  subtitle: string;
  desc: string;
  btn1: string;
  btnSchedule: string;
  btn2: string;
}

interface AboutTexts {
  title: string;
  desc: string;
  topic1: string;
  topic2: string;
  topic2Desc: string;
  topic3: string;
  topic3Desc: string;
}

interface ServicesTexts {
  title: string;
  singleTitle: string;
  singlePrice: string;
  singleDesc: string;
  packageTitle: string;
  packagePrice: string;
  packageDesc: string;
}

interface LocationTexts {
  title: string;
  addressTitle: string;
  btn1: string;
  btn2: string;
}

interface PortfolioTexts {
  title: string;
}

interface EventsTexts {
  title: string;
}

interface CoursesNotes {
  payment: string;
  modelsFee: string;
  specialty: string;
}

interface RawCourseItem {
  title: string;
  desc_pt: string;
  desc_en: string;
  content_pt: string;
  content_en: string;
  priceData: string[];
}

interface CoursesTexts {
  title: string;
  tab1: string;
  tab2: string;
  contentLabel: string;
  btn: string;
  notes: CoursesNotes;
  list: RawCourseItem[];
}

interface ContactTexts {
  title: string;
  subtitle1: string;
  subtitle2: string;
  nameHolder: string;
  emailHolder: string;
  msgHolder: string;
  sendBtn: string;
}

interface FooterTexts {
  rights: string;
  dev: string;
}

type Lang = 'pt' | 'en';

interface TranslationSet {
  a11y: A11yTexts;
  nav: NavTexts;
  hero: HeroTexts;
  about: AboutTexts;
  services: ServicesTexts;
  location: LocationTexts;
  portfolio: PortfolioTexts;
  events: EventsTexts;
  courses: CoursesTexts;
  contact: ContactTexts;
  footer: FooterTexts;
}

// --- Componente Carrossel ---
interface CarouselProps {
  posts: string[];
  a11yTexts: A11yTexts;
}

function StreamingCarousel({ posts, a11yTexts }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0.5);
      setCanScrollRight(
        container.scrollLeft < (container.scrollWidth - container.clientWidth - 5)
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    
    const handleScroll = () => checkScroll();
    const handleResize = () => checkScroll();

    container?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      });
    }
  };

  const getPostId = (url: string) => {
    const match = url.match(/\/p\/([^/]+)|\/reel\/([^/]+)/);
    return match ? (match[1] || match[2]) : '';
  };

  return (
    <div className="relative w-full max-w-[calc(100vw-2rem)] mx-auto mb-8">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
          style={{ background: 'rgba(201, 169, 97, 0.95)', color: 'white' }}
          aria-label={a11yTexts.carouselLeft}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth pb-4 pl-4 gap-4 no-scrollbar touch-pan-x"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />
        
        {posts.map((post) => {
          const postId = getPostId(post);
          if (!postId) return null;

          return (
            <div
              key={`${post}-${postId}`}
              className="flex-shrink-0 relative rounded-lg overflow-hidden shadow-xl border transition-colors duration-300"
              style={{
                width: 'clamp(220px, 28vw, 320px)',
                aspectRatio: '9/16',
                scrollSnapAlign: 'start',
                backgroundColor: '#f5f5f5',
                borderColor: 'rgba(75, 85, 99, 0.3)'
              }}
            >
              <iframe
                title={`${a11yTexts.instaPostTitle} - ${postId}`}
                src={`https://www.instagram.com/p/${postId}/embed`}
                width="100%"
                height="100%"
                scrolling="no"
                allowTransparency={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
          style={{ background: 'rgba(201, 169, 97, 0.95)', color: 'white' }}
          aria-label={a11yTexts.carouselRight}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}

// --- Dados e Traduções Completas ---
const translations: Record<Lang, TranslationSet> = {
  pt: {
    a11y: {
      logoAlt: "Logomarca de Italo Freitas",
      langBtn: "Alternar idioma para inglês",
      themeBtnDark: "Ativar modo claro",
      themeBtnLight: "Ativar modo escuro",
      instaLinkNav: "Acessar perfil do Instagram de Italo Freitas",
      whatsAppLinkNav: "Enviar mensagem para o WhatsApp de Italo Freitas",
      carouselLeft: "Rolar carrossel para a esquerda",
      carouselRight: "Rolar carrossel para a direita",
      instaPostTitle: "Publicação do Instagram do portfólio",
      mapTitle: "Mapa do Google Maps mostrando a localização do estúdio",
      profileAlt: "Foto de perfil de Italo Freitas maquiado profissionalmente"
    },
    nav: { about: "Sobre", portfolio: "Portfólio", courses: "Cursos", contact: "Contato", location: "Localização" },
    hero: { 
      subtitle: "Profissional de Maquiagem", 
      desc: "Especializado em maquiagem profissional para eventos, produções audiovisuais e transformações de beleza. Oferecendo cursos e consultoria personalizada.", 
      btn1: "Solicitar Orçamento",
      btnSchedule: "Agendar Horário",
      btn2: "Conhecer Cursos" 
    },
    about: { 
      title: "Sobre Mim", 
      desc: "Maquiador profissional com especialização em maquiagem artística, blindagem de sobrancelhas e beauty. Referência em durabilidade e elegância em Patos de Minas, MG.", 
      topic1: "Profissionalismo", 
      topic2: "Portfólio Diverso", 
      topic2Desc: "Trabalhos em eventos, produções audiovisuais e sessões fotográficas", 
      topic3: "Educação", 
      topic3Desc: "Oferecendo cursos e workshops para profissionais e iniciantes" 
    },
    services: {
      title: "Serviços",
      singleTitle: "Maquiagem Individual",
      singlePrice: "R$ 180,00",
      singleDesc: "Ideal para festas, eventos sociais e ensaios.",
      packageTitle: "Pacotes para Eventos",
      packagePrice: "Consultar",
      packageDesc: "Orçamento personalizado para noivas, madrinhas e grupos."
    },
    location: { title: "Localização", addressTitle: "Endereço", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfólio" },
    events: { title: "Eventos & Bastidores" },
    courses: { 
      title: "Cursos", 
      tab1: "Cursos Ministrados", 
      tab2: "Cursos Realizados", 
      contentLabel: "Conteúdo:", 
      btn: "Inscrever-se",
      notes: {
        payment: "Pagamento em até 2x sem juros no cartão 💳",
        modelsFee: "Valor já inclui modelos e certificados ❤️",
        specialty: "Minha especialidade é realçar a beleza feminina sem transformar! ✨"
      },
      list: [
        { 
          title: "Curso Profissional de Maquiagem", 
          desc_pt: "Curso completo para profissionais e iniciantes", 
          desc_en: "Complete course for professionals and beginners", 
          content_pt: "Aulas práticas, todo material incluso, técnicas escolhidas pelo aluno, preparação completa de pele, técnica de pele resistente, dicas de iluminação e fotos.", 
          content_en: "Practical classes, all materials included, techniques chosen by student, complete skin preparation, resistant skin technique, lighting and photo tips.", 
          priceData: ["1 técnica: R$ 450,00", "2 técnicas: R$ 550,00", "3 técnicas: R$ 750,00"]
        },
        { 
          title: "Curso de Auto Maquiagem", 
          desc_pt: "Embelezamento diário com agilidade e praticidade", 
          desc_en: "Daily beautification with speed and practicality", 
          content_pt: "Aulas práticas, material incluso, lista de materiais essenciais, preparo completo da pele, técnicas úteis no dia a dia ou artísticas (opcional), passo a passo personalizado.", 
          content_en: "Practical classes, materials included, essential materials list, complete skin prep, daily-use or artistic techniques (optional), personalized step-by-step guide.", 
          priceData: ["2 técnicas: R$ 450,00"]
        },
      ]
    },
    contact: { 
      title: "Entre em Contato", 
      subtitle1: "Vamos Conversar", 
      subtitle2: "Envie uma Mensagem", 
      nameHolder: "Seu nome", 
      emailHolder: "seu@email.com", 
      msgHolder: "Sua mensagem aqui", 
      sendBtn: "Enviar Mensagem" 
    },
    footer: { rights: "© 2026 Italo Freitas Makeup. Todos os direitos reservados.", dev: "Desenvolvido com elegância, profissionalismo e amor" }
  },
  en: {
    a11y: {
      logoAlt: "Italo Freitas Logo",
      langBtn: "Switch language to Portuguese",
      themeBtnDark: "Activate light mode",
      themeBtnLight: "Activate dark mode",
      instaLinkNav: "Visit Italo Freitas' Instagram profile",
      whatsAppLinkNav: "Send a message to Italo Freitas' WhatsApp",
      carouselLeft: "Scroll carousel to the left",
      carouselRight: "Scroll carousel to the right",
      instaPostTitle: "Instagram portfolio post embed",
      mapTitle: "Google Maps showing the studio's location",
      profileAlt: "Profile photo of Italo Freitas with professional makeup"
    },
    nav: { about: "About", portfolio: "Portfolio", courses: "Courses", contact: "Contact", location: "Location" },
    hero: { 
      subtitle: "Makeup Professional", 
      desc: "Specialized in professional makeup for events, audiovisual productions, and beauty transformations. Offering personalized courses and consulting.", 
      btn1: "Request Quote",
      btnSchedule: "Schedule Appointment",
      btn2: "View Courses" 
    },
    about: { 
      title: "About Me", 
      desc: "Professional makeup artist specializing in artistic makeup, eyebrow shielding, and beauty. A reference in durability and elegance in Patos de Minas, MG.", 
      topic1: "Professionalism", 
      topic2: "Diverse Portfolio", 
      topic2Desc: "Work in events, audiovisual productions, and photoshoots", 
      topic3: "Education", 
      topic3Desc: "Offering courses and workshops for professionals and beginners" 
    },
    services: {
      title: "Services",
      singleTitle: "Individual Makeup",
      singlePrice: "R$ 180.00",
      singleDesc: "Ideal for parties, social events, and photoshoots.",
      packageTitle: "Event Packages",
      packagePrice: "Consult Us",
      packageDesc: "Custom quotes for brides, bridesmaids, and groups."
    },
    location: { title: "Location", addressTitle: "Address", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfolio" },
    events: { title: "Events & BTS" },
    courses: { 
      title: "Courses", 
      tab1: "Taught Courses", 
      tab2: "Taken Courses", 
      contentLabel: "Content:", 
      btn: "Enroll",
      notes: {
        payment: "Up to 2x interest-free on card 💳",
        modelsFee: "Price includes model and certificate fees ❤️",
        specialty: "My specialty is enhancing feminine beauty without transforming! ✨"
      },
      list: [
        { 
          title: "Professional Makeup Course", 
          desc_pt: "Curso completo para profissionais e iniciantes", 
          desc_en: "Complete course for professionals and beginners", 
          content_pt: "Aulas práticas, todo material incluso, técnicas escolhidas pelo aluno, preparação completa de pele, técnica de pele resistente, dicas de iluminação e fotos.", 
          content_en: "Practical classes, all materials included, techniques chosen by student, complete skin preparation, resistant skin technique, lighting and photo tips.", 
          priceData: ["1 technique: R$ 450.00", "2 techniques: R$ 550.00", "3 techniques: R$ 750.00"]
        },
        { 
          title: "Self-Makeup Course", 
          desc_pt: "Embelezamento diário com agilidade e praticidade", 
          desc_en: "Daily beautification with speed and practicality", 
          content_pt: "Aulas práticas, material incluso, lista de materiais essenciais, preparo completo da pele, técnicas úteis no dia a dia ou artísticas (opcional), passo a passo personalizado.", 
          content_en: "Practical classes, materials included, essential materials list, complete skin prep, daily-use or artistic techniques (optional), personalized step-by-step guide.", 
          priceData: ["2 techniques: R$ 450.00"]
        },
      ]
    },
    contact: { 
      title: "Get in Touch", 
      subtitle1: "Let's Talk", 
      subtitle2: "Send a Message", 
      nameHolder: "Your name", 
      emailHolder: "your@email.com", 
      msgHolder: "Your message here", 
      sendBtn: "Send Message" 
    },
    footer: { rights: "© 2026 Italo Freitas Makeup. All rights reserved.", dev: "Developed with elegance, professionalism, and love" }
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt');
  const [isDark, setIsDark] = useState(false);
  
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: true,
    profile: true,
    rings: true,
    marbleBg: true
  });

  const t = translations[lang];
  
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = Math.max(0, currentYear - startYear);
  
  const experienciaTexto = lang === 'pt' 
    ? `${yearsOfExperience} anos de experiência em maquiagem profissional e transformação de beleza`
    : `${yearsOfExperience} years of experience in professional makeup and beauty transformation`;

  // Configuração das URLs do WhatsApp com mensagens pré-definidas
  const whatsappNumber = "553498109317";
  const quoteMessagePt = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para maquiagem.");
  const scheduleMessagePt = encodeURIComponent("Olá! Gostaria de verificar disponibilidade para agendar um horário.");
  
  const quoteMessageEn = encodeURIComponent("Hello! I would like to request a quote for makeup services.");
  const scheduleMessageEn = encodeURIComponent("Hello! I would like to check availability to schedule an appointment.");

  const colors = {
    navBg: isDark ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.9)',
    textPrimary: isDark ? '#F9FAFB' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#4B5563',
    cardBg: isDark ? 'rgba(25, 25, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    border: isDark ? '#4B5563' : '#FEF3C7',
    notesBg: isDark ? 'rgba(35, 35, 35, 0.85)' : 'rgba(254, 243, 199, 0.8)',
    accentGold: '#C9A961',
    accentDark: '#b4ab09',
    eventsSectionBg: isDark ? 'rgba(10, 10, 10, 0.5)' : 'rgba(255,255,255,0.5)',
    goldTextInverted: isDark ? '#FCD34D' : '#C9A961',
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setIsDark(prev => !prev);

  // Determina qual URL usar baseada no idioma
  const getQuoteUrl = () => {
    return lang === 'pt' 
      ? `https://wa.me/${whatsappNumber}?text=${quoteMessagePt}`
      : `https://wa.me/${whatsappNumber}?text=${quoteMessageEn}`;
  };

  const getScheduleUrl = () => {
    return lang === 'pt'
      ? `https://wa.me/${whatsappNumber}?text=${scheduleMessagePt}`
      : `https://wa.me/${whatsappNumber}?text=${scheduleMessageEn}`;
  };

  const coursesList = t.courses.list.map((c) => ({
    ...c,
    desc: lang === 'pt' ? c.desc_pt : c.desc_en,
    content: lang === 'pt' ? c.content_pt : c.content_en,
  }));

  const unique = (arr: string[]) => [...new Set(arr)];

  const portfolioPosts1 = unique([
    "https://www.instagram.com/p/DDIdE_epRKk/",
    "https://www.instagram.com/p/DCB9FYvJO4n/",
    "https://www.instagram.com/p/DDrmPN5pzlw/",
    "https://www.instagram.com/p/DGDel_wpia4/",
    "https://www.instagram.com/p/DFvuwiDpfOI/",
    "https://www.instagram.com/p/DF0_YazpgFp/",
  ]);

  const portfolioPosts2 = unique([
    "https://www.instagram.com/p/DIRSjMnxByK/",
    "https://www.instagram.com/p/DFvuwiDpfOI/",
    "https://www.instagram.com/p/DF0_YazpgFp/",
    "https://www.instagram.com/p/DKiRdN8p9k_/",
  ]);

  const portfolioPosts3 = unique([
    "https://www.instagram.com/p/DOLnOqakZck/",
    "https://www.instagram.com/p/DSxba6qEUzW/",
    "https://www.instagram.com/p/DP4lzt7kYCG/",
    "https://www.instagram.com/p/DQZPTRkkUwP/",
    "https://www.instagram.com/p/DQuMGd_EfSs/",
    "https://www.instagram.com/p/DT5qi1Oke2j/",
  ]);

  const eventPosts = unique([
    "https://www.instagram.com/p/DYP8S18iRnJ/",
    "https://www.instagram.com/reel/DRpiLoFkYpl/",
    "https://www.instagram.com/reel/DRE7xYRkWEI/",
    "https://www.instagram.com/p/DFoO0jIxRGh/",
    "https://www.instagram.com/p/DXt1I0HnLOQ/",
  ]);

  const handleImageError = (key: keyof typeof imagesLoaded) => {
    console.warn(`Imagem não encontrada: ${key}.`, key === 'marbleBg' ? 'Verifique se marble.png está na pasta ./lib/' : '');
    setImagesLoaded(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative font-sans`}>
      
      {/* --- FUNDO CORRIGIDO --- */}
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
      {/* --- FIM DO FUNDO CORRIGIDO --- */}
      
      {/* Navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 shadow-sm" 
           style={{ backgroundColor: colors.navBg, borderColor: colors.border }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={!imagesLoaded.logo ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23C9A961'/%3E%3C/svg%3E" : logoImg} 
              alt={t.a11y.logoAlt} 
              className="h-10 w-10 object-contain"
              onError={() => handleImageError('logo')}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[t.nav.about, t.nav.portfolio, t.nav.courses, t.nav.contact, t.nav.location].map((item, idx) => {
               const ids = ['about', 'portfolio', 'courses', 'contact', 'location'];
               return (
                <a 
                  key={idx} 
                  href={`#${ids[idx]}`} 
                  className="text-sm font-medium hover:text-amber-600 transition-colors" 
                  style={{ color: colors.textPrimary }}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang} 
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-semibold text-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-1"
              aria-label={t.a11y.langBtn}
            >
              <Languages size={20} />
              <span className="hidden sm:inline">{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={isDark ? t.a11y.themeBtnDark : t.a11y.themeBtnLight}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500">
              <span className="sr-only">{t.a11y.instaLinkNav}</span>
              <Instagram size={20} />
            </a>
            {/* Botão genérico de WhatsApp na navegação mantém o link simples */}
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500">
              <span className="sr-only">{t.a11y.whatsAppLinkNav}</span>
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center px-4" aria-labelledby="hero-title">
          <h1 id="hero-title" className="text-5xl md:text-7xl font-serif font-bold mb-4 transition-colors break-words" style={{ color: colors.textPrimary }}>
            Italo Freitas
          </h1>
          <p className="text-2xl mb-8 font-medium" style={{ color: colors.accentGold }}>{t.hero.subtitle}</p>
          <p className="text-lg max-w-2xl mx-auto mb-12 px-4 leading-relaxed transition-colors" style={{ color: colors.textSecondary }}>
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* BOTÃO SOLICITAR ORÇAMENTO COM MENSAGEM PRONTA */}
            <a
              href={getQuoteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:brightness-110 shadow-md flex items-center justify-center gap-2 min-w-[160px]"
              style={{ background: colors.accentGold, color: 'white' }}
            >
              <MessageCircle size={18} />
              {t.hero.btn1}
            </a>
            
            {/* BOTÃO AGENDAR HORÁRIO COM MENSAGEM PRONTA */}
            <a
              href={getScheduleUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2 flex items-center justify-center gap-2 min-w-[160px]"
              style={{ borderColor: colors.accentGold, color: colors.accentGold }}
            >
              <Calendar size={18} />
              {t.hero.btnSchedule}
            </a>

            <a
              href="#courses"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:bg-amber-50 dark:hover:bg-gray-800 shadow-md flex items-center justify-center gap-2 min-w-[160px]"
              style={{ color: colors.accentGold }}
            >
              <GraduationCap size={18} />
              {t.hero.btn2}
            </a>
          </div>
        </section>

        {/* Sobre Mim */}
        <section id="about" className="py-20 container mx-auto px-4" aria-labelledby="about-title">
          <h2 id="about-title" className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-amber-100 dark:border-gray-700">
              <img 
                src={!imagesLoaded.profile ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150'%3E%3Crect width='100' height='150' fill='%23ccc'/%3E%3C/svg%3E" : profileImg} 
                alt={t.a11y.profileAlt} 
                className="w-full h-auto object-cover"
                onError={() => handleImageError('profile')}
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={!imagesLoaded.rings ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23C9A961'/%3E%3C/svg%3E" : ringsImg} 
                  alt="" 
                  aria-hidden="true" 
                  width="32" 
                  height="32" 
                  style={{ objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
                  onError={() => handleImageError('rings')}
                />
                <h3 className="text-3xl font-serif font-bold transition-colors" style={{ color: colors.textPrimary }}>Italo Freitas</h3>
              </div>
              <p className="text-lg mb-8 leading-relaxed transition-colors" style={{ color: colors.textSecondary }}>
                {t.about.desc}
              </p>
              <div className="space-y-6">
                <div className="border-l-4 pl-4" style={{ borderColor: colors.accentGold }}>
                  <p className="text-xl font-semibold mb-1" style={{ color: colors.accentGold }}><span aria-hidden="true">✨</span> {t.about.topic1}</p>
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{experienciaTexto}</p>
                </div>
                <div className="border-l-4 pl-4" style={{ borderColor: colors.accentGold }}>
                  <p className="text-xl font-semibold mb-1" style={{ color: colors.accentGold }}><span aria-hidden="true">🎨</span> {t.about.topic2}</p>
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.about.topic2Desc}</p>
                </div>
                <div className="border-l-4 pl-4" style={{ borderColor: colors.accentGold }}>
                  <p className="text-xl font-semibold mb-1" style={{ color: colors.accentGold }}><span aria-hidden="true">📚</span> {t.about.topic3}</p>
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.about.topic3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="services" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="services-title">
          <h2 id="services-title" className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.services.title}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02] group" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <h3 className="text-2xl font-serif font-bold mb-3" style={{ color: colors.textPrimary }}>{t.services.singleTitle}</h3>
              <p className="text-4xl font-bold my-4 tracking-wide" style={{ color: colors.goldTextInverted }}>{t.services.singlePrice}</p>
              <p className="text-sm transition-colors mt-4" style={{ color: colors.textSecondary }}>{t.services.singleDesc}</p>
            </div>

            <div className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02] group" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <h3 className="text-2xl font-serif font-bold mb-3" style={{ color: colors.textPrimary }}>{t.services.packageTitle}</h3>
              <p className="text-3xl font-bold my-4 italic" style={{ color: colors.goldTextInverted }}>{t.services.packagePrice}</p>
              <p className="text-sm transition-colors mt-4" style={{ color: colors.textSecondary }}>{t.services.packageDesc}</p>
            </div>
          </div>
        </section>

        {/* Portfólio */}
        <section id="portfolio" className="py-20 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.portfolio.title}</h2>
          <div className="mb-16"><StreamingCarousel posts={portfolioPosts1} a11yTexts={t.a11y} /></div>
          <div className="mb-16"><StreamingCarousel posts={portfolioPosts2} a11yTexts={t.a11y} /></div>
          <div className="mb-16"><StreamingCarousel posts={portfolioPosts3} a11yTexts={t.a11y} /></div>
        </section>

        {/* Eventos */}
        <section className="py-20 container mx-auto px-4 bg-opacity-50 transition-colors duration-300" style={{ backgroundColor: colors.eventsSectionBg }}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.events.title}</h2>
          <StreamingCarousel posts={eventPosts} a11yTexts={t.a11y} />
        </section>

        {/* Cursos */}
        <section id="courses" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="courses-title">
          <h2 id="courses-title" className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.courses.title}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {coursesList.map((course, index) => (
              <div key={index} className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02] flex flex-col h-full" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: colors.textPrimary }}>
                    {course.title}
                  </h3>
                  
                  <p className="text-base mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
                    {course.desc}
                  </p>

                  <div className="mb-6 bg-opacity-10 p-4 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                    <p className="text-sm italic leading-relaxed" style={{ color: isDark ? '#E5E7EB' : '#666' }}>
                      <strong>{t.courses.contentLabel}</strong> {course.content}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t space-y-2" style={{ borderColor: colors.border }}>
                  {Array.isArray(course.priceData) ? (
                    course.priceData.map((priceLine, idx) => (
                      <p key={idx} className="text-xl md:text-2xl font-bold" style={{ color: colors.goldTextInverted }}>
                        {priceLine}
                      </p>
                    ))
                  ) : (
                    <p className="text-3xl font-bold" style={{ color: colors.goldTextInverted }}>{course.priceData}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div 
            className="p-6 rounded-xl shadow-inner border max-w-3xl mx-auto text-center backdrop-blur-sm transition-colors duration-300"
            style={{ 
              backgroundColor: colors.notesBg, 
              borderColor: colors.border,
              color: colors.textSecondary 
            }}
          >
            <div className="space-y-3">
              <p className="text-sm font-medium">
                <span className="inline-block mr-2">💳</span> {t.courses.notes.payment}
              </p>
              <p className="text-sm font-medium">
                <span className="inline-block mr-2">❤️</span> {t.courses.notes.modelsFee}
              </p>
              <p className="text-lg font-bold mt-2 italic" style={{ color: isDark ? '#FCD34D' : colors.accentDark }}>
                <span className="inline-block mr-2">✨</span> {t.courses.notes.specialty}
              </p>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" className="py-20 container mx-auto px-4 flex flex-col items-center border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.contact.title}</h2>
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 justify-items-center">
            <div className="text-center space-y-6 w-full">
              <h3 className="text-2xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>{t.contact.subtitle1}</h3>
              
              <div className="flex items-center gap-3 justify-center">
                <MessageCircle className="text-amber-600" size={28} />
                <p className="text-xl" style={{ color: colors.textSecondary }}>+55 34 9810-9317</p>
              </div>
              
              <div className="flex items-center gap-3 justify-center">
                <Instagram className="text-amber-600" size={28} />
                <p className="text-xl" style={{ color: colors.textSecondary }}>@italofreitasmakeup</p>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <MapPin className="text-amber-600" size={28} />
                <p className="text-xl" style={{ color: colors.textSecondary }}>Patos de Minas, MG</p>
              </div>
            </div>
            
          </div>
        </section>

        {/* Localização */}
        <section id="location" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="location-title">
          <h2 id="location-title" className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.location.title}</h2>
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
              
              <div className="text-center md:text-left w-full md:w-1/2">
                <h3 className="text-2xl font-serif font-bold mb-6 transition-colors" style={{ color: colors.textPrimary }}>{t.location.addressTitle}</h3>
                <address className="not-italic mb-8 space-y-2">
                  <p className="text-xl font-semibold transition-colors" style={{ color: colors.textSecondary }}>Rua Dona Maria Resende, 171</p>
                  <p className="text-xl transition-colors" style={{ color: colors.textSecondary }}>Vila Garcia - Patos de Minas, MG</p>
                  <p className="text-xl transition-colors" style={{ color: colors.textSecondary }}>CEP: 38700-000</p>
                </address>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {/* Botão WhatsApp na seção de Localização com mensagem pronta de contato geral */}
                  <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lang === 'pt' ? "Olá! Vi sua localização e gostaria de saber mais." : "Hello! I saw your location and would like to know more.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:brightness-110" style={{ background: colors.accentGold, color: 'white' }}>{t.location.btn1}</a>
                  <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg font-semibold transition-all border-2 hover:bg-amber-50 dark:hover:bg-gray-800" style={{ borderColor: colors.accentGold, color: colors.accentGold }}>{t.location.btn2}</a>
                </div>
              </div>

              <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl h-80 border-2 border-amber-200 dark:border-gray-700">
                <iframe
                  title={t.a11y.mapTitle}
                  src="https://maps.google.com/maps?q=Rua+Dona+Maria+Resende,+171+Vila+Garcia+Patos+de+Minas&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Rodapé */}
      <footer className="py-8 text-center border-t transition-colors" style={{ borderColor: colors.border }}>
        <p className="transition-colors mb-2" style={{ color: colors.textSecondary }}>{t.footer.rights}</p>
        <p className="flex items-center justify-center gap-2 text-sm transition-colors" style={{ color: isDark ? '#9CA3AF' : '#999' }}>
          {t.footer.dev} <span aria-hidden="true">❤️</span>
          <img 
            src={!imagesLoaded.rings ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='10' fill='%23C9A961'/%3E%3C/svg%3E" : ringsImg} 
            alt="" 
            aria-hidden="true" 
            width="20" 
            height="20" 
            style={{ objectFit: 'contain', opacity: 0.7, filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
            onError={() => handleImageError('rings')}
          />
        </p>
      </footer>
    </div>
  );
}