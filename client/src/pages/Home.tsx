"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Moon, Sun, Languages } from "lucide-react";

import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";
import profileImg from "../lib/profile.jpg";
import ringsImg from "../lib/rings.png";

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
    nav: { about: "Sobre", portfolio: "Portfólio", courses: "Cursos", contact: "Contato" },
    hero: { subtitle: "Profissional de Maquiagem", desc: "Especializado em maquiagem profissional para eventos, produções audiovisuais e transformações de beleza. Oferecendo cursos e consultoria personalizada.", btn1: "Solicitar Orçamento", btn2: "Conhecer Cursos" },
    about: { title: "Sobre Mim", desc: "Maquiador profissional com especialização em maquiagem artística, blindagem de sobrancelhas e beauty. Referência em durabilidade e elegância em Patos de Minas, MG.", topic1: "Profissionalismo", topic1Desc: "Anos de experiência em maquiagem profissional e transformação de beleza", topic2: "Portfólio Diverso", topic2Desc: "Trabalhos em eventos, produções audiovisuais e sessões fotográficas", topic3: "Educação", topic3Desc: "Oferecendo cursos e workshops para profissionais e iniciantes" },
    location: { title: "Localização", addressTitle: "Endereço", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfólio" },
    events: { title: "Eventos" },
    courses: { title: "Cursos", tab1: "Cursos Ministrados", tab2: "Cursos Realizados", contentLabel: "Conteúdo:", btn: "Inscrever",
      list: [
        { title: "Maquiagem Básica", desc: "Aprenda os fundamentos da maquiagem profissional", content: "Técnicas básicas, produtos, aplicação e cuidados", price: "R$ 299,00" },
        { title: "Maquiagem Avançada", desc: "Técnicas avançadas para eventos e produções", content: "Contouring, iluminação, efeitos especiais", price: "R$ 499,00" },
        { title: "Maquiagem para Noivas", desc: "Especialização em maquiagem nupcial", content: "Técnicas para casamentos, durabilidade, acabamento", price: "R$ 399,00" },
        { title: "Maquiagem Artística", desc: "Expressão criativa através da maquiagem", content: "Cores, texturas, criatividade e inovação", price: "R$ 349,00" },
      ]
    },
    contact: { title: "Entre em Contato", subtitle1: "Vamos Conversar", subtitle2: "Envie uma Mensagem", nameHolder: "Seu nome", emailHolder: "seu@email.com", msgHolder: "Sua mensagem aqui", sendBtn: "Enviar Mensagem" },
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
    nav: { about: "About", portfolio: "Portfolio", courses: "Courses", contact: "Contact" },
    hero: { subtitle: "Makeup Professional", desc: "Specialized in professional makeup for events, audiovisual productions, and beauty transformations. Offering personalized courses and consulting.", btn1: "Request a Quote", btn2: "View Courses" },
    about: { title: "About Me", desc: "Professional makeup artist specializing in artistic makeup, eyebrow shielding, and beauty. A reference in durability and elegance in Patos de Minas, MG.", topic1: "Professionalism", topic1Desc: "Years of experience in professional makeup and beauty transformation", topic2: "Diverse Portfolio", topic2Desc: "Work in events, audiovisual productions, and photoshoots", topic3: "Education", topic3Desc: "Offering courses and workshops for professionals and beginners" },
    location: { title: "Location", addressTitle: "Address", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfolio" },
    events: { title: "Events" },
    courses: { title: "Courses", tab1: "Taught Courses", tab2: "Taken Courses", contentLabel: "Content:", btn: "Enroll",
      list: [
        { title: "Basic Makeup", desc: "Learn the fundamentals of professional makeup", content: "Basic techniques, products, application, and care", price: "$ 60.00" },
        { title: "Advanced Makeup", desc: "Advanced techniques for events and productions", content: "Contouring, lighting, special effects", price: "$ 100.00" },
        { title: "Bridal Makeup", desc: "Specialization in bridal makeup", content: "Wedding techniques, durability, finishing", price: "$ 80.00" },
        { title: "Artistic Makeup", desc: "Creative expression through makeup", content: "Colors, textures, creativity, and innovation", price: "$ 70.00" },
      ]
    },
    contact: { title: "Get in Touch", subtitle1: "Let's Talk", subtitle2: "Send a Message", nameHolder: "Your name", emailHolder: "your@email.com", msgHolder: "Your message here", sendBtn: "Send Message" },
    footer: { rights: "© 2026 Italo Freitas Makeup. All rights reserved.", dev: "Developed with elegance, professionalism, and love" }
  }
};

// Interface para passar as traduções de acessibilidade para o carrossel
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
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] mb-4">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
          aria-label={a11yTexts.carouselLeft}
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          scrollPaddingLeft: '1rem',
          scrollSnapType: 'x mandatory',
        }}
      >
        {posts.map((post) => (
          <div
            key={post}
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            style={{
              width: 'clamp(200px, 25vw, 300px)',
              aspectRatio: '9/16',
              scrollSnapAlign: 'start',
              marginRight: '0.75rem',
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
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
          aria-label={a11yTexts.carouselRight}
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang];
  
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
    "https://www.instagram.com/p/DDIdE_epRKk/?igsh=eDdqaGUwMzNuZWZ3",
    "https://www.instagram.com/p/DCB9FYvJO4n/?igsh=cW8yNW96dGVkZml1",
    "https://www.instagram.com/p/DDrmPN5pzlw/?img_index=1&igsh=bnV4emNkbmo4eGY1",
    "https://www.instagram.com/p/DGDel_wpia4/?img_index=2&igsh=NXE1N3ZobWV0aWEy",
    "https://www.instagram.com/p/DFvuwiDpfOI/?igsh=aW1yeW13enc2NXh3",
    "https://www.instagram.com/p/DF0_YazpgFp/?img_index=3&igsh=MXh1dnBsa25zempjaQ==",
  ];

  const portfolioPosts2 = [
    "https://www.instagram.com/p/DIRSjMnxByK/?igsh=b3FjaTBqdTM4Z2R5",
    "https://www.instagram.com/p/DFvuwiDpfOI/?igsh=aW1yeW13enc2NXh3",
    "https://www.instagram.com/p/DF0_YazpgFp/?img_index=3&igsh=MXh1dnBsa25zempjaQ==",
    "https://www.instagram.com/p/DIRSjMnxByK/?igsh=b3FjaTBqdTM4Z2R5",
    "https://www.instagram.com/p/DKiRdN8p9k_/?img_index=1&igsh=N2M3dmt5OHUxczI=",
    "https://www.instagram.com/p/DF0_YazpgFp/?img_index=3&igsh=MXh1dnBsa25zempjaQ==",
  ];

  const portfolioPosts3 = [
    "https://www.instagram.com/p/DOLnOqakZck/?igsh=OTJ1eWQycWFiZzdy",
    "https://www.instagram.com/p/DSxba6qEUzW/?igsh=Y2ZsMXp5dGc1YjJk",
    "https://www.instagram.com/p/DP4lzt7kYCG/?igsh=aWJ4NWNjN3V6cXdv",
    "https://www.instagram.com/p/DQZPTRkkUwP/?img_index=1&igsh=MW5pajQ2Ym9zNmo5bQ==",
    "https://www.instagram.com/p/DQuMGd_EfSs/?img_index=1&igsh=MTk5ZWQ3N3RpZG9ycg==",
    "https://www.instagram.com/p/DT5qi1Oke2j/?igsh=MTl5dWtoNzhkZHllbA==",
  ];

  const eventPosts = [
    "https://www.instagram.com/p/DYP8S18iRnJ/?img_index=1&igsh=Z3MwaGlrOGhmYnd4",
    "https://www.instagram.com/reel/DRpiLoFkYpl/?igsh=MTljNjlnbWUzcXVtYg==",
    "https://www.instagram.com/reel/DRE7xYRkWEI/?igsh=c2dqYmpxc21sdWpj",
    "https://www.instagram.com/p/DFoO0jIxRGh/?igsh=MTB3cTlkcGV6cTE0bQ==",
    "https://www.instagram.com/p/DXt1I0HnLOQ/?igsh=MXZibG02ZGV1enp3eg==",
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 relative">
{/* Elemento de fundo fixo e acessível */}
<div 
  className="fixed inset-0 z-[-1] transition-all duration-700"
  style={{
    // Combinações de luzes radiais para simular um brilho luxuoso
    background: isDark 
      ? 'radial-gradient(at 20% 20%, rgba(201, 169, 97, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(30, 30, 30, 1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(201, 169, 97, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(18, 18, 18, 1) 0px, transparent 50%)'
      : 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(254, 243, 199, 0.6) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(243, 244, 246, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 255, 255, 1) 0px, transparent 50%)',
    backgroundColor: isDark ? '#121212' : '#FAFAFA'
  }}
  aria-hidden="true"
/>
      
      {/* Navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300" style={{ backgroundColor: colors.navBg, borderColor: colors.border }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt={t.a11y.logoAlt} className="h-10 w-10" />
            <span className="font-serif text-xl font-bold" style={{ color: colors.textPrimary }} aria-hidden="true">Italo Freitas</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.about}</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.portfolio}</a>
            <a href="#courses" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.courses}</a>
            <a href="#contact" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Botão de Tradução */}
            <button onClick={toggleLang} className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-semibold text-sm transition-transform hover:scale-110">
              <span className="sr-only">{t.a11y.langBtn}</span>
              <Languages size={20} aria-hidden="true" />
              <span className="hidden sm:inline" aria-hidden="true">{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            
            {/* Botão de Dark Mode */}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>
          Italo Freitas
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
            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ background: '#C9A961', color: 'white' }}
          >
            {t.hero.btn1}
          </a>
          <a
            href="#courses"
            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2"
            style={{ borderColor: '#C9A961', color: '#C9A961' }}
          >
            {t.hero.btn2}
          </a>
        </div>
      </section>

      {/* Sobre Mim */}
      <section id="about" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.about.title}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img src={profileImg} alt={t.a11y.profileAlt} className="w-full h-auto" />
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
                <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.about.topic1Desc}</p>
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

      {/* Localização */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.location.title}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>{t.location.addressTitle}</h3>
            <address className="not-italic">
              <p className="text-lg font-semibold mb-2 transition-colors" style={{ color: colors.textSecondary }}>Rua Dona Maria Resende, 171</p>
              <p className="text-lg mb-6 transition-colors" style={{ color: colors.textSecondary }}>Vila Garcia - Patos de Minas, MG</p>
              <p className="text-lg mb-6 transition-colors" style={{ color: colors.textSecondary }}>CEP: 38700-000</p>
            </address>
            <div className="flex gap-4">
              <a
                href="https://wa.me/553498109317"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{ background: '#C9A961', color: 'white' }}
              >
                {t.location.btn1}
              </a>
              <a
                href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg font-semibold transition-all border-2"
                style={{ borderColor: '#C9A961', color: '#C9A961' }}
              >
                {t.location.btn2}
              </a>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              title={t.a11y.mapTitle}
              src="https://maps.google.com/maps?q=Rua+Dona+Maria+Resende,+171+Vila+Garcia+Patos+de+Minas&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-20">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.portfolio.title}</h2>
        <div className="mb-12"><StreamingCarousel posts={portfolioPosts1} a11yTexts={t.a11y} /></div>
        <div className="mb-12"><StreamingCarousel posts={portfolioPosts2} a11yTexts={t.a11y} /></div>
        <div className="mb-12"><StreamingCarousel posts={portfolioPosts3} a11yTexts={t.a11y} /></div>
      </section>

      {/* Eventos */}
      <section className="py-20">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.events.title}</h2>
        <StreamingCarousel posts={eventPosts} a11yTexts={t.a11y} />
      </section>

      {/* Cursos */}
      <section id="courses" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.courses.title}</h2>
        
        <div className="mb-12">
          <div className="flex gap-4 justify-center mb-8">
            <button className="px-6 py-2 rounded-lg font-semibold" style={{ background: '#C9A961', color: 'white' }}>
              {t.courses.tab1}
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold border-2 transition-colors" style={{ borderColor: '#C9A961', color: isDark ? '#E5C57C' : '#C9A961' }}>
              {t.courses.tab2}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.courses.list.map((course) => (
              <div key={course.title} className="p-6 rounded-lg shadow-lg transition-colors" style={{ background: colors.cardBg }}>
                <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.textPrimary }}>{course.title}</h3>
                <p className="mb-4" style={{ color: colors.textSecondary }}>{course.desc}</p>
                <p className="text-sm mb-4" style={{ color: isDark ? '#9CA3AF' : '#666' }}>{t.courses.contentLabel} {course.content}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold" style={{ color: '#C9A961' }}>{course.price}</p>
                  <a href="#contact" className="px-4 py-2 rounded-lg font-semibold transition-all" style={{ background: '#C9A961', color: 'white' }}>
                    <span className="sr-only">{`Inscrever-se no curso de ${course.title}`}</span>
                    <span aria-hidden="true">{t.courses.btn}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.contact.title}</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-8 transition-colors" style={{ color: colors.textPrimary }}>{t.contact.subtitle1}</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>WhatsApp</h4>
              <a href="https://wa.me/553498109317" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline transition-colors" style={{ color: colors.textSecondary }}>
                <span className="sr-only">{t.a11y.whatsAppLinkNav}</span>
                <span aria-hidden="true">+55 34 9810-9317</span>
              </a>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>Instagram</h4>
              <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline transition-colors" style={{ color: colors.textSecondary }}>
                <span className="sr-only">{t.a11y.instaLinkNav}</span>
                <span aria-hidden="true">@italofreitasmakeup</span>
              </a>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>{t.location.title}</h4>
              <p className="transition-colors" style={{ color: colors.textSecondary }}>Patos de Minas, MG</p>
            </div>
          </div>

          <div className="p-8 rounded-lg shadow-lg transition-colors" style={{ background: colors.cardBg }}>
            <h3 className="text-2xl font-serif font-bold mb-6 transition-colors" style={{ color: colors.textPrimary }}>{t.contact.subtitle2}</h3>
            <form className="space-y-4">
              <label htmlFor="name" className="sr-only">{t.contact.nameHolder}</label>
              <input id="name" type="text" placeholder={t.contact.nameHolder} className="w-full p-3 border rounded-lg bg-transparent transition-colors outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              
              <label htmlFor="email" className="sr-only">{t.contact.emailHolder}</label>
              <input id="email" type="email" placeholder={t.contact.emailHolder} className="w-full p-3 border rounded-lg bg-transparent transition-colors outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              
              <label htmlFor="message" className="sr-only">{t.contact.msgHolder}</label>
              <textarea id="message" placeholder={t.contact.msgHolder} rows={4} className="w-full p-3 border rounded-lg bg-transparent transition-colors outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              
              <button type="submit" className="w-full py-3 rounded-lg font-semibold transition-all hover:brightness-110" style={{ background: '#C9A961', color: 'white' }}>
                {t.contact.sendBtn}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t transition-colors" style={{ borderColor: colors.border }}>
        <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.footer.rights}</p>
        <p className="flex items-center justify-center gap-2 mt-2 transition-colors" style={{ color: isDark ? '#9CA3AF' : '#999' }}>
          {t.footer.dev} <span aria-hidden="true">❤️</span>
          <img src={ringsImg} alt="" aria-hidden="true" width="20" height="20" style={{ objectFit: 'contain', opacity: 0.7, filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
        </p>
      </footer>
    </div>
  );
}