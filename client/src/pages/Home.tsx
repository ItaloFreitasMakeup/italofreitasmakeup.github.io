"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Moon, Sun, Languages, Check, Calendar } from "lucide-react";

import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";
import profileImg from "../lib/profile.jpg";
import ringsImg from "../lib/rings.png";

const translations = {
  pt: {
    seo: {
      title: "Italo Freitas | Maquiador Profissional em Patos de Minas",
      description: "Maquiador profissional em Patos de Minas, MG. Especializado em maquiagem para noivas, eventos e transformações de beleza. Cursos de automaquiagem e profissional.",
      keywords: "maquiador, maquiagem profissional, Patos de Minas, curso de maquiagem, automaquiagem, noivas, beleza, Italo Freitas"
    },
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
    nav: { about: "Sobre", services: "Serviços", portfolio: "Portfólio", courses: "Cursos", contact: "Contato" },
    hero: { 
      subtitle: "Profissional de Maquiagem", 
      desc: "Especializado em maquiagem profissional para eventos, produções audiovisuais e transformações de beleza. Oferecendo cursos e consultoria personalizada.", 
      btn1: "Solicitar Orçamento", 
      btnSchedule: "Marcar Horário",
      btn2: "Conhecer Cursos" 
    },
    about: { 
      title: "Sobre Mim", 
      desc: "Maquiador profissional com especialização em maquiagem artística, blindagem de sobrancelhas e beauty. Referência em durabilidade e elegância em Patos de Minas, MG.", 
      topic1: "Profissionalismo", 
      topic1Desc: "anos de experiência em maquiagem profissional e transformação de beleza", 
      topic2: "Portfólio Diverso", 
      topic2Desc: "Trabalhos em eventos, produções audiovisuais e sessões fotográficas", 
      topic3: "Educação", 
      topic3Desc: "Oferecendo cursos e workshops para profissionais e iniciantes" 
    },
    services: {
      title: "Valores & Atendimentos",
      singleTitle: "Maquiagem Individual",
      singlePrice: "R$ 180,00",
      singleDesc: "Aplicações individuais exclusivas com máxima fixação.",
      packageTitle: "Pacote Especial (Acima de 4 Makes)",
      packagePrice: "R$ 150,00 cada",
      packageDesc: "Condição especial para grupos de madrinhas, formandas ou convidadas.",
      badge: "Especialidade",
      specialtyText: "MINHA ESPECIALIDADE É REALÇAR A BELEZA FEMININA SEM TRANSFORMAR!!!"
    },
    location: { title: "Localização", addressTitle: "Endereço", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfólio" },
    events: { title: "Eventos" },
    courses: { 
      title: "Cursos", 
      tab1: "Cursos Ministrados", 
      tab2: "Cursos Realizados", 
      contentLabel: "Conteúdo:", 
      btn: "Inscrever-se via WhatsApp",
      obsLabel: "Obs:",
      paymentLabel: "Formas de Pagamento:",
      paymentDesc: "Esse valor para pagamento à vista ou em até 2x no cartão, todos meus cursos podem ser parcelados em mais vezes, somando as pequenas taxas da máquina.",
      modelsLabel: "Modelos:",
      modelsDesc: "Já está incluso os cachês das modelos e são de minha responsabilidade.",
      list: [
        {
          id: "professional",
          title: "CURSO PROFISSIONAL DE MAQUIAGEM ❣️",
          desc: "Desenvolvi meu curso profissional pensando nas dificuldades durante atendimentos. Passo e explico como pequenas atitudes fidelizam uma cliente, além de várias dicas para agilizar conseguindo agendar mais clientes durante um dia, assim rendendo mais $.",
          features: [
            "O curso é destinado tanto a maquiadores profissionais quanto a iniciantes;",
            "Realizo as aulas no meu espaço, em Patos de Minas - MG;",
            "Horários de acordo com a disponibilidade do aluno;",
            "Todo material usado no curso é disponibilizado por mim (disponibilizo lista de materiais essenciais para iniciantes);",
            "O Curso é 100% prático: reproduzo um lado e, com minha total supervisão, o(a) aluno(a) reproduz o outro lado.",
            "As técnicas ensinadas são todas escolhidas pelo aluno, sendo todas usáveis por clientes e atemporais;",
            "Todas as técnicas são desenvolvidas em modelos, com preparação de pele completa (da Asepsia até os contornos e iluminações).",
            "É passado todas as dicas de iluminação e fotos ao aluno(a) durante o Curso Vip.",
            "Ao término do curso será emitido o certificado de realização ao aluno."
          ],
          obs: "Será ensinada a técnica de pele resistente.",
          prices: [
            { label: "1 Técnica", value: "R$ 450,00" },
            { label: "2 Técnicas", value: "R$ 550,00" },
            { label: "3 Técnicas", value: "R$ 750,00 ❤️" }
          ]
        },
        {
          id: "self",
          title: "CURSO DE AUTO MAQUIAGEM ❣️",
          desc: "Desenvolvi meu curso de auto maquiagem pensando no embelezamento que a make proporciona sem deixar de lado a agilidade do dia a dia e praticidade.",
          features: [
            "Realizo as aulas no meu espaço, em Patos de Minas - MG;",
            "Horários de acordo com a disponibilidade do aluno;",
            "Todo material usado no curso é disponibilizado por mim (disponibilizo toda lista de materiais essenciais para sua make do dia a dia e fazemos uma lista do passo a passo);",
            "O Curso é 100% prático: enquanto vou explicando e fazendo um lado, o(a) aluno(a) faz o outro lado.",
            "As técnicas ensinadas são todas escolhidas pelo aluno, usáveis no dia a dia e atemporais (se preferir uma técnica mais artística fazemos também);",
            "Em todas as técnicas fazemos preparação de pele completa, desde a Asepsia da Pele até os contornos e iluminações."
          ],
          obs: "Será ensinada a técnica de pele resistente.",
          prices: [
            { label: "2 Técnicas", value: "R$ 450,00" }
          ]
        }
      ]
    },
    contact: { title: "Entre em Contato", subtitle1: "Vamos Conversar", subtitle2: "Envie uma Mensagem", nameHolder: "Seu nome", emailHolder: "seu@email.com", msgHolder: "Sua mensagem aqui", sendBtn: "Enviar Mensagem" },
    footer: { rights: "© 2026 Italo Freitas Makeup. Todos os direitos reservados.", dev: "Desenvolvido com elegância, profissionalismo e amor" }
  },
  en: {
    seo: {
      title: "Italo Freitas | Professional Makeup Artist in Patos de Minas",
      description: "Professional makeup artist in Patos de Minas, MG. Specialized in bridal, events, and beauty transformations. Self-makeup and professional courses.",
      keywords: "makeup artist, professional makeup, Patos de Minas, makeup course, bridal makeup, beauty, Italo Freitas"
    },
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
    nav: { about: "About", services: "Services", portfolio: "Portfolio", courses: "Courses", contact: "Contact" },
    hero: { 
      subtitle: "Makeup Professional", 
      desc: "Specialized in professional makeup for events, audiovisual productions, and beauty transformations. Offering personalized courses and consulting.", 
      btn1: "Request a Quote", 
      btnSchedule: "Book Appointment",
      btn2: "View Courses" 
    },
    about: { 
      title: "About Me", 
      desc: "Professional makeup artist specializing in artistic makeup, eyebrow shielding, and beauty. A reference in durability and elegance in Patos de Minas, MG.", 
      topic1: "Professionalism", 
      topic1Desc: "years of experience in professional makeup and beauty transformation", 
      topic2: "Diverse Portfolio", 
      topic2Desc: "Work in events, audiovisual productions, and photoshoots", 
      topic3: "Education", 
      topic3Desc: "Offering courses and workshops for professionals and beginners" 
    },
    services: {
      title: "Prices & Services",
      singleTitle: "Single Makeup Application",
      singlePrice: "$ 35.00",
      singleDesc: "Exclusive individual applications with maximum hold.",
      packageTitle: "Special Package (Over 4 Makes)",
      packagePrice: "$ 30.00 each",
      packageDesc: "Special condition for groups of bridesmaids, graduates, or guests.",
      badge: "Specialty",
      specialtyText: "MY SPECIALTY IS TO ENHANCE FEMININE BEAUTY WITHOUT TRANSFORMING IT!!!"
    },
    location: { title: "Location", addressTitle: "Address", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfolio" },
    events: { title: "Events" },
    courses: { 
      title: "Courses", 
      tab1: "Taught Courses", 
      tab2: "Taken Courses", 
      contentLabel: "Content:", 
      btn: "Enroll via WhatsApp",
      obsLabel: "Note:",
      paymentLabel: "Payment Methods:",
      paymentDesc: "This value for cash payment or up to 2x on the credit card, all my courses can be financed in more installments, adding the small machine fees.",
      modelsLabel: "Models:",
      modelsDesc: "Model fees are already included and are my responsibility.",
      list: [
        {
          id: "professional",
          title: "PROFESSIONAL MAKEUP COURSE ❣️",
          desc: "I developed my professional course thinking about the difficulties during appointments. I teach and explain how small actions retain a client, plus various tips to speed up, allowing you to book more clients during a day, thus yielding more $.",
          features: [
            "The course is intended for both professional makeup artists and beginners;",
            "I conduct classes in my studio, in Patos de Minas - MG;",
            "Schedules according to student availability;",
            "All material used in the course is provided by me (I provide a list of essential materials for beginners);",
            "The Course is 100% practical: I replicate one side and, with my total supervision, the student reproduces the other side.",
            "The techniques taught are all chosen by the student, all usable by clients and timeless;",
            "All techniques are developed on models, with complete skin preparation (from Asepsis to contours and highlights).",
            "All lighting and photo tips are passed to the student during the Vip Course.",
            "Upon completion of the course, a certificate of completion will be issued to the student."
          ],
          obs: "Resistant skin technique will be taught.",
          prices: [
            { label: "1 Technique", value: "$ 90.00" },
            { label: "2 Techniques", value: "$ 110.00" },
            { label: "3 Techniques", value: "$ 150.00 ❤️" }
          ]
        },
        {
          id: "self",
          title: "SELF-MAKEUP COURSE ❣️",
          desc: "I developed my self-makeup course thinking about the beauty that makeup provides without leaving aside daily agility and practicality.",
          features: [
            "I conduct classes in my studio, in Patos de Minas - MG;",
            "Schedules according to student availability;",
            "All material used in the course is provided by me (I provide a list of essential materials for your daily makeup and we make a step-by-step list);",
            "The Course is 100% practical: while I explain and do one side, the student does the other side.",
            "The techniques taught are all chosen by the student, usable in daily life and timeless (if you prefer a more artistic technique, we do it too);",
            "In all techniques we do complete skin preparation, from Skin Asepsis to contours and highlights."
          ],
          obs: "Resistant skin technique will be taught.",
          prices: [
            { label: "2 Techniques", value: "$ 90.00" }
          ]
        }
      ]
    },
    contact: { title: "Get in Touch", subtitle1: "Let's Talk", subtitle2: "Send a Message", nameHolder: "Your name", emailHolder: "your@email.com", msgHolder: "Your message here", sendBtn: "Send Message" },
    footer: { rights: "© 2026 Italo Freitas Makeup. All rights reserved.", dev: "Developed with elegance, professionalism, and love" }
  }
};

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
        className="flex overflow-x-auto scroll-smooth gap-3 px-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {posts.map((post) => (
          <div
            key={post}
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
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

  const ano_atual = new Date().getFullYear();
  const anosExperiencia = ano_atual - 2021;

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Italo Freitas Makeup",
    "image": "https://seusite.com/profile.jpg", 
    "description": t.seo.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Dona Maria Resende, 171",
      "addressLocality": "Patos de Minas",
      "addressRegion": "MG",
      "postalCode": "38700-000",
      "addressCountry": "BR"
    },
    "telephone": "+553498109317",
    "priceRange": "$$",
    "url": "https://seusite.com"
  };

  return (
    <main className="min-h-screen transition-colors duration-300 relative">
      <title>{t.seo.title}</title>
      <meta name="description" content={t.seo.description} />
      <meta name="keywords" content={t.seo.keywords} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      
      <header>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300" style={{ backgroundColor: colors.navBg, borderColor: colors.border }}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt={t.a11y.logoAlt} className="h-10 w-10" />
              <span className="font-serif text-xl font-bold" style={{ color: colors.textPrimary }} aria-hidden="true">Italo Freitas</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.about}</a>
              <a href="#services" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.services}</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.portfolio}</a>
              <a href="#courses" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.courses}</a>
              <a href="#contact" className="text-sm font-medium hover:text-amber-600 transition" style={{ color: colors.textPrimary }}>{t.nav.contact}</a>
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
      </header>

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
            {t.hero.btn2}
          </a>
        </div>
      </section>

      <section id="about" className="py-20 container mx-auto px-4" aria-labelledby="about-title">
        <h2 id="about-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.about.title}</h2>
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
                <p className="transition-colors" style={{ color: colors.textSecondary }}>{anosExperiencia} {t.about.topic1Desc}</p>
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

      <section className="py-20 container mx-auto px-4 flex flex-col items-center border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="location-title">
        <h2 id="location-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.location.title}</h2>
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center justify-items-center">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-4 transition-colors" style={{ color: colors.textPrimary }}>{t.location.addressTitle}</h3>
            <address className="not-italic">
              <p className="text-lg font-semibold mb-2 transition-colors" style={{ color: colors.textSecondary }}>Rua Dona Maria Resende, 171</p>
              <p className="text-lg mb-6 transition-colors" style={{ color: colors.textSecondary }}>Vila Garcia - Patos de Minas, MG</p>
            </address>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-96 w-full">
            <iframe
              title={t.a11y.mapTitle}
              src="https://maps.google.com/maps?q=Rua+Dona+Maria+Resende,+171+Vila+Garcia+Patos+de+Minas&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 container mx-auto px-4 flex flex-col items-center border-t transition-colors" style={{ borderColor: colors.border }} aria-labelledby="contact-title">
        <h2 id="contact-title" className="text-5xl font-serif font-bold mb-16 text-center transition-colors" style={{ color: colors.textPrimary }}>{t.contact.title}</h2>
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 justify-items-center">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-8 transition-colors" style={{ color: colors.textPrimary }}>{t.contact.subtitle1}</h3>
            <p className="mb-4 text-lg" style={{ color: colors.textSecondary }}>+55 34 9810-9317</p>
            <p className="text-lg" style={{ color: colors.textSecondary }}>@italofreitasmakeup</p>
          </div>
          <div className="p-8 rounded-lg shadow-lg w-full transition-colors" style={{ background: colors.cardBg }}>
            <h3 className="text-2xl font-serif font-bold mb-6 text-center" style={{ color: colors.textPrimary }}>{t.contact.subtitle2}</h3>
            <form className="space-y-4">
              <input type="text" placeholder={t.contact.nameHolder} className="w-full p-3 border rounded-lg bg-transparent outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              <input type="email" placeholder={t.contact.emailHolder} className="w-full p-3 border rounded-lg bg-transparent outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              <textarea placeholder={t.contact.msgHolder} rows={4} className="w-full p-3 border rounded-lg bg-transparent outline-none" style={{ borderColor: '#C9A961', color: colors.textPrimary }} />
              <button type="submit" className="w-full py-3 rounded-lg font-semibold transition-all hover:brightness-110" style={{ background: '#C9A961', color: 'white' }}>{t.contact.sendBtn}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t transition-colors" style={{ borderColor: colors.border }}>
        <p className="transition-colors" style={{ color: colors.textSecondary }}>{t.footer.rights}</p>
      </footer>
    </main>
  );
}