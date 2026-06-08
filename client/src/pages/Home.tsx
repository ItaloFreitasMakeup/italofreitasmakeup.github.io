"use client";

import { useState, useEffect, useRef } from "react";

import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Moon, Sun, Languages, Calendar, MapPin, Mail, BookOpen, User, GraduationCap } from "lucide-react";

// Imagens (assegure-se que estas existam na pasta lib/ do seu projeto)
import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";
import profileImg from "../lib/profile.jpg";
import ringsImg from "../lib/rings.png";

// --- Componente Carrossel Restaurado ---
function StreamingCarousel({ posts, a11yTexts }: { posts: string[], a11yTexts: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 500;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getPostId = (url: string) => {
    const match = url.match(/\/p\/([^/]+)|\/reel\/([^/]+)/);
    return match ? (match[1] || match[2]) : '';
  };

  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] mb-8">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110 shadow-lg"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
          aria-label={a11yTexts.carouselLeft}
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth pb-4 px-4 no-scrollbar"
        style={{
          scrollPaddingLeft: '1rem',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // Firefox
        }}
      >
        {/* Usando __html corretamente para evitar erros de TS no React */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />
        
        {posts.map((post) => (
          <div
            key={post}
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow mr-4 last:mr-0"
            style={{
              width: 'clamp(200px, 25vw, 300px)',
              aspectRatio: '9/16',
              scrollSnapAlign: 'start',
            }}
          >
            <iframe
              title={`${a11yTexts.instaPostTitle} - ID: ${getPostId(post)}`}
              src={`https://www.instagram.com/p/${getPostId(post)}/embed`}
              width="100%"
              height="100%"
              scrolling="no"
              allowTransparency={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              style={{ border: 0, borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110 shadow-lg"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
          aria-label={a11yTexts.carouselRight}
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

// --- Traduções Completas Restauradas ---
const translations = {
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
      topic1DescDynamic: true, // Marcador para usar cálculo dinâmico
      topic1DescStatic: "Anos de experiência em maquiagem profissional", 
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
      list: [
        { 
          title: "Curso Profissional de Maquiagem", 
          desc: "Curso completo para profissionais e iniciantes", 
          content: "Aulas práticas, todo material incluso, técnicas escolhidas pelo aluno, preparação completa de pele, técnica de pele resistente, dicas de iluminação e fotos.", 
          price: "1 técnica: R$ 450,00 </br> 2 técnicas: R$ 550,00 </br> 3 técnicas: R$ 750,00" 
        },
        { 
          title: "Curso de Auto Maquiagem", 
          desc: "Embelezamento diário com agilidade e praticidade", 
          content: "Aulas práticas, material incluso, lista de materiais essenciais, preparo completo da pele, técnicas úteis no dia a dia ou artísticas (opcional), passo a passo personalizado.", 
          price: "2 técnicas: R$ 450,00" 
        },
      ],
      notes: {
        payment: "Pagamento em até 2x sem juros no cartão 💳",
        modelsFee: "Valor já inclui modelos e certificados ❤️",
        specialty: "Minha especialidade é realçar a beleza feminina sem transformar! ✨"
      }
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
      btn1: "Request Quote via WhatsApp",
      btnSchedule: "Schedule Appointment",
      btn2: "View Courses" 
    },
    about: { 
      title: "About Me", 
      desc: "Professional makeup artist specializing in artistic makeup, eyebrow shielding, and beauty. A reference in durability and elegance in Patos de Minas, MG.", 
      topic1: "Professionalism", 
      topic1DescDynamic: true,
      topic1DescStatic: "Years of experience in professional makeup", 
      topic2: "Diverse Portfolio", 
      topic2Desc: "Work in events, audiovisual productions, and photoshoots", 
      topic3: "Education", 
      topic3Desc: "Offering courses and workshops for professionals and beginners" 
    },
    services: {
      title: "Services",
      singleTitle: "Individual Makeup",
      singlePrice: "R$180.00",
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
      list: [
        { 
          title: "Professional Makeup Course", 
          desc: "Complete course for professionals and beginners", 
          content: "Practical classes, all materials included, techniques chosen by student, complete skin preparation, resistant skin technique, lighting and photo tips.", 
          price: "1 technique: R$450 </br> 2 techniques: R$550 </br> 3 techniques: R$750" 
        },
        { 
          title: "Self-Makeup Course", 
          desc: "Daily beautification with speed and practicality", 
          content: "Practical classes, materials included, essential materials list, complete skin prep, daily-use or artistic techniques (optional), personalized step-by-step guide.", 
          price: "2 techniques: R$450" 
        },
      ],
      notes: {
        payment: "Up to 2x interest-free on card 💳",
        modelsFee: "Price includes model and certificate fees ❤️",
        specialty: "My specialty is enhancing feminine beauty without transforming! ✨"
      }
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
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang];
  
  // --- Lógica de Cálculo de Anos de Experiência ---
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;
  
  const experienciaTexto = lang === 'pt' 
    ? `${yearsOfExperience} anos de experiência em maquiagem profissional e transformação de beleza`
    : `${yearsOfExperience} years of experience in professional makeup and beauty transformation`;

  const colors = {
    navBg: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    textPrimary: isDark ? '#F3F4F6' : '#2A2A2A',
    textSecondary: isDark ? '#D1D5DB' : '#4A4A4A',
    cardBg: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    border: isDark ? '#333' : '#FEF3C7',
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setIsDark(prev => !prev);

  const portfolioPosts1 = [
    "https://www.instagram.com/p/DDIdE_epRKk/",
    "https://www.instagram.com/p/DCB9FYvJO4n/",
    "https://www.instagram.com/p/DDrmPN5pzlw/",
    "https://www.instagram.com/p/DGDel_wpia4/",
    "https://www.instagram.com/p/DFvuwiDpfOI/",
    "https://www.instagram.com/p/DF0_YazpgFp/",
  ];

  const portfolioPosts2 = [
    "https://www.instagram.com/p/DIRSjMnxByK/",
    "https://www.instagram.com/p/DFvuwiDpfOI/",
    "https://www.instagram.com/p/DF0_YazpgFp/",
    "https://www.instagram.com/p/DIRSjMnxByK/",
    "https://www.instagram.com/p/DKiRdN8p9k_/",
    "https://www.instagram.com/p/DF0_YazpgFp/",
  ];

  const portfolioPosts3 = [
    "https://www.instagram.com/p/DOLnOqakZck/",
    "https://www.instagram.com/p/DSxba6qEUzW/",
    "https://www.instagram.com/p/DP4lzt7kYCG/",
    "https://www.instagram.com/p/DQZPTRkkUwP/",
    "https://www.instagram.com/p/DQuMGd_EfSs/",
    "https://www.instagram.com/p/DT5qi1Oke2j/",
  ];

  const eventPosts = [
    "https://www.instagram.com/p/DYP8S18iRnJ/",
    "https://www.instagram.com/reel/DRpiLoFkYpl/",
    "https://www.instagram.com/reel/DRE7xYRkWEI/",
    "https://www.instagram.com/p/DFoO0jIxRGh/",
    "https://www.instagram.com/p/DXt1I0HnLOQ/",
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 relative font-sans">
      {/* Elemento de fundo fixo e acessível */}
      <div className="fixed inset-0 z-[-1]" aria-hidden="true">
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: isDark ? '#121212' : '#f8f8f8' }}
        />
        
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{ 
            backgroundImage: `url(${marbleBg})`, 
            backgroundRepeat: 'repeat',
            backgroundSize: '100%',
            filter: isDark ? 'invert(100%) grayscale(100%)' : 'none',
            opacity: isDark ? 0.15 : 0.4,
            mixBlendMode: isDark ? 'screen' : 'multiply' 
          }}
        />
      </div>
      
      {/* Navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300" style={{ backgroundColor: colors.navBg, borderColor: colors.border }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt={t.a11y.logoAlt} className="h-10 w-10 object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.about}</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.portfolio}</a>
            <a href="#courses" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.courses}</a>
            <a href="#contact" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.contact}</a>
            {/* Novo link Localização adicionado */}
            <a href="#location" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.location}</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-semibold text-sm transition-transform hover:scale-110">
              <span className="sr-only">{t.a11y.langBtn}</span>
              <Languages size={20} aria-hidden="true" />
              <span className="hidden sm:inline" aria-hidden="true">{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            
            <button onClick={toggleTheme} className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110">
              <span className="sr-only">{isDark ? t.a11y.themeBtnDark : t.a11y.themeBtnLight}</span>
              {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>

            <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110">
              <span className="sr-only">{t.a11y.instaLinkNav}</span>
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a href="https://wa.me/553498109317" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110">
              <span className="sr-only">{t.a11y.whatsAppLinkNav}</span>
              <MessageCircle size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center" aria-labelledby="hero-title">
          <h1 id="hero-title" className="text-6xl md:text-7xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>
            Italo Freitas <span className="sr-only">- Maquiador Profissional em Patos de Minas, MG</span>
          </h1>
          <p className="text-2xl mb-8" style={{ color: '#C9A961' }}>{t.hero.subtitle}</p>
          <p className="text-lg max-w-2xl mx-auto mb-12 px-4 transition-colors" style={{ color: colors.textSecondary }}>
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a
              href="https://wa.me/553498109317"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
              style={{ background: '#C9A961', color: 'white' }}
            >
              <MessageCircle size={18} />
              {t.hero.btn1}
            </a>
            <a
              href="https://wa.me/553498109317"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2 flex items-center justify-center gap-2"
              style={{ borderColor: '#C9A961', color: '#C9A961' }}
            >
              <Calendar size={18} />
              {t.hero.btnSchedule}
            </a>
            <a
              href="#courses"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
              style={{ background: '#C9A961', color: 'white' }}
            >
              <GraduationCap size={18} />
              {t.hero.btn2}
            </a>
          </div>
        </section>

        {/* Sobre Mim */}
        <section id="about" className="py-20 container mx-auto px-4" aria-labelledby="about-title">
          <h2 id="about-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src={profileImg} alt={t.a11y.profileAlt} className="w-full h-auto object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={ringsImg} alt="" aria-hidden="true" width="32" height="32" style={{ objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
                <h3 className="text-3xl font-serif font-bold transition-colors" style={{ color: colors.textPrimary }}>Italo Freitas</h3>
              </div>
              <p className="text-lg mb-6 transition-colors" style={{ color: colors.textSecondary }}>
                {t.about.desc}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}><span aria-hidden="true">✨</span> {t.about.topic1}</p>
                  {/* Texto atualizado dinamicamente */}
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{experienciaTexto}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}><span aria-hidden="true">🎨</span> {t.about.topic2}</p>
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.about.topic2Desc}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}><span aria-hidden="true">📚</span> {t.about.topic3}</p>
                  <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.about.topic3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="services" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="services-title">
          <h2 id="services-title" className="text-5xl font-serif font-bold mb-4 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.services.title}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02]" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.textPrimary }}>{t.services.singleTitle}</h3>
              <p className="text-4xl font-bold my-4" style={{ color: '#C9A961' }}>{t.services.singlePrice}</p>
              <p className="text-sm transition-colors" style={{ color: colors.textSecondary }}>{t.services.singleDesc}</p>
            </div>

            <div className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02]" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.textPrimary }}>{t.services.packageTitle}</h3>
              <p className="text-4xl font-bold my-4" style={{ color: '#C9A961' }}>{t.services.packagePrice}</p>
              <p className="text-sm transition-colors" style={{ color: colors.textSecondary }}>{t.services.packageDesc}</p>
            </div>
          </div>
        </section>

        {/* Portfólio */}
        <section id="portfolio" className="py-20 container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.portfolio.title}</h2>
          <div className="mb-12"><StreamingCarousel posts={portfolioPosts1} a11yTexts={t.a11y} /></div>
          <div className="mb-12"><StreamingCarousel posts={portfolioPosts2} a11yTexts={t.a11y} /></div>
          <div className="mb-12"><StreamingCarousel posts={portfolioPosts3} a11yTexts={t.a11y} /></div>
        </section>

        {/* Eventos */}
        <section className="py-20 container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.events.title}</h2>
          <StreamingCarousel posts={eventPosts} a11yTexts={t.a11y} />
        </section>

        {/* Cursos */}
        <section id="courses" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="courses-title">
          <h2 id="courses-title" className="text-5xl font-serif font-bold mb-4 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.courses.title}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>

          {/* Abas mantidas para navegação lógica, mas com estilo simplificado */}
          {/* <div className="flex gap-4 justify-center mb-12">
            <button className="px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 shadow-sm" style={{ background: '#C9A961', color: 'white' }}>
              {t.courses.tab1}
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105" style={{ border: `1px solid ${colors.border}`, color: isDark ? '#E5C57C' : '#C9A961' }}>
              {t.courses.tab2}
            </button>
          </div> */}

          {/* Grid de Cartões */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {t.courses.list.map((course) => (
              <div key={course.title} className="p-8 rounded-lg shadow-lg text-center transition-all hover:scale-[1.02] flex flex-col h-full" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
                
                <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: colors.textPrimary }}>
                  {course.title}
                </h3>
                
                <p className="text-base mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
                  {course.desc}
                </p>

                <div className="flex-grow mb-4">
                  <p className="text-sm italic" style={{ color: isDark ? '#9CA3AF' : '#666' }}>
                    <strong>{t.courses.contentLabel}</strong> {course.content}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t" style={{ borderColor: colors.border }}>
                  <p className="text-4xl font-bold mb-4" style={{ color: '#C9A961' }}>{course.price}</p>
                  {/* <a 
                    href="#contact" 
                    className="inline-block w-full px-6 py-3 rounded-lg font-semibold transition-all hover:brightness-110"
                    style={{ background: '#C9A961', color: 'white' }}
                  >
                    {t.courses.btn}
                  </a> */}
                </div>
              </div>
            ))}
          </div>

          {/* Notas Informativas - Mantidas abaixo com destaque sutil */}
          <div className="bg-gradient-to-r from-amber-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-inner border max-w-3xl mx-auto text-center" style={{ borderColor: colors.border }}>
            <div className="space-y-3">
              <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                <span className="inline-block mr-2">💳</span> {t.courses.notes.payment}
              </p>
              <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                <span className="inline-block mr-2">❤️</span> {t.courses.notes.modelsFee}
              </p>
              <p className="text-lg font-bold mt-2" style={{ color: '#cab177f2' }}>
                <span className="inline-block mr-2">✨</span> {t.courses.notes.specialty}
              </p>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" className="py-20 container mx-auto px-4 flex flex-col items-center border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.contact.title}</h2>
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 justify-items-center">
            <div className="text-center md:text-center space-y-6">
              <h3 className="text-2xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>{t.contact.subtitle1}</h3>
              
              <div className="flex items-center gap-3 justify-center">
                <MessageCircle className="text-amber-600" size={24} />
                <p className="text-lg" style={{ color: colors.textSecondary }}>+55 34 9810-9317</p>
              </div>
              
              <div className="flex items-center gap-3 justify-center">
                <Instagram className="text-amber-600" size={24} />
                <p className="text-lg" style={{ color: colors.textSecondary }}>@italofreitasmakeup</p>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <MapPin className="text-amber-600" size={24} />
                <p className="text-lg" style={{ color: colors.textSecondary }}>Patos de Minas, MG</p>
              </div>
            </div>
            
            <div className="p-8 rounded-lg shadow-lg w-full transition-colors" style={{ background: colors.cardBg }}>
              <h3 className="text-2xl font-serif font-bold mb-6 text-center" style={{ color: colors.textPrimary }}>{t.contact.subtitle2}</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder={t.contact.nameHolder} className="w-full p-3 border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-amber-600 transition-all" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
                <input type="email" placeholder={t.contact.emailHolder} className="w-full p-3 border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-amber-600 transition-all" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
                <textarea placeholder={t.contact.msgHolder} rows={4} className="w-full p-3 border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-amber-600 transition-all resize-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
                <button type="submit" className="w-full py-3 rounded-lg font-semibold transition-all hover:brightness-110" style={{ background: '#C9A961', color: 'white' }}>{t.contact.sendBtn}</button>
              </form>
            </div>
          </div>
        </section>

        {/* Nova Sessão de Localização (Adicionada após Contato) */}
        <section id="location" className="py-20 container mx-auto px-4 border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="location-title">
          <h2 id="location-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.location.title}</h2>
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
              
              {/* Coluna de Texto Centralizada */}
              <div className="text-center md:text-center w-full">
                <h3 className="text-3xl font-serif font-bold mb-6 transition-colors" style={{ color: colors.textPrimary }}>{t.location.addressTitle}</h3>
                <address className="not-italic mb-8">
                  <p className="text-xl font-semibold mb-2 transition-colors" style={{ color: colors.textSecondary }}>Rua Dona Maria Resende, 171</p>
                  <p className="text-xl mb-2 transition-colors" style={{ color: colors.textSecondary }}>Vila Garcia - Patos de Minas, MG</p>
                  <p className="text-xl transition-colors" style={{ color: colors.textSecondary }}>CEP: 38700-000</p>
                </address>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://wa.me/553498109317" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg" style={{ background: '#C9A961', color: 'white' }}>{t.location.btn1}</a>
                  <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg font-semibold transition-all border-2 hover:bg-amber-50 dark:hover:bg-gray-800" style={{ borderColor: '#C9A961', color: '#C9A961' }}>{t.location.btn2}</a>
                </div>
              </div>

              {/* Mapa Centralizado */}
              <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl h-80">
                <iframe
                  title={t.a11y.mapTitle}
                  src="https://maps.google.com/maps?q=Rua+Dona+Maria+Resende,+171+Vila+Garcia+Patos+de+Minas&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Rodapé Restaurado */}
      <footer className="py-8 text-center border-t transition-colors" style={{ borderColor: colors.border }}>
        <p className="transition-colors mb-2" style={{ color: colors.textSecondary }}>{t.footer.rights}</p>
        <p className="flex items-center justify-center gap-2 text-sm transition-colors" style={{ color: isDark ? '#9CA3AF' : '#999' }}>
          {t.footer.dev} <span aria-hidden="true">❤️</span>
          <img src={ringsImg} alt="" aria-hidden="true" width="20" height="20" style={{ objectFit: 'contain', opacity: 0.7, filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
        </p>
      </footer>
    </div>
  );
}