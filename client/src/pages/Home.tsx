"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle } from "lucide-react";

import marbleBg from "../lib/marble.png";
import logoImg from "../lib/logo.png";
import profileImg from "../lib/profile.jpg";
import ringsImg from "../lib/rings.png";

function StreamingCarousel({ posts }: { posts: string[] }) {
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
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]" style={{ marginBottom: '2.54mm' }}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
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
              src={`https://www.instagram.com/p/${getPostId(post)}/embed`}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              style={{ borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(201, 169, 97, 0.9)', color: 'white' }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}

export default function Home() {
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
    <div className="min-h-screen" style={{ background: `url(${marbleBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-10 w-10" />
            <span className="font-serif text-xl font-bold" style={{ color: '#2A2A2A' }}>Italo Freitas</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-amber-600 transition">Sobre</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-amber-600 transition">Portfólio</a>
            <a href="#courses" className="text-sm font-medium hover:text-amber-600 transition">Cursos</a>
            <a href="#contact" className="text-sm font-medium hover:text-amber-600 transition">Contato</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/553498109317" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 text-center">
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4" style={{ color: '#2A2A2A' }}>
          Italo Freitas
        </h1>
        <p className="text-2xl mb-8" style={{ color: '#C9A961' }}>Profissional de Maquiagem</p>
        <p className="text-lg max-w-2xl mx-auto mb-12 px-4" style={{ color: '#4A4A4A' }}>
          Especializado em maquiagem profissional para eventos, produções audiovisuais e transformações de beleza. Oferecendo cursos e consultoria personalizada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <a
            href="https://wa.me/553498109317?text=Olá%20Italo!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20os%20serviços%20de%20maquiagem.%20Quais%20são%20os%20valores?"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ background: '#C9A961', color: 'white' }}
          >
            Solicitar Orçamento
          </a>
          <a
            href="#courses"
            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2"
            style={{ borderColor: '#C9A961', color: '#C9A961' }}
          >
            Conhecer Cursos
          </a>
        </div>
      </section>

      <section id="about" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Sobre Mim</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img src={profileImg} alt="Italo Freitas" className="w-full h-auto" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={ringsImg} alt="Alianças" width="32" height="32" style={{ objectFit: 'contain' }} />
              <h3 className="text-3xl font-serif font-bold" style={{ color: '#2A2A2A' }}>Italo Freitas</h3>
            </div>
            <p className="text-lg mb-6" style={{ color: '#4A4A4A' }}>
              Maquiador profissional com especialização em maquiagem artística, blindagem de sobrancelhas e beauty. Referência em durabilidade e elegância em Patos de Minas, MG.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}>✨ Profissionalismo</p>
                <p style={{ color: '#4A4A4A' }}>Anos de experiência em maquiagem profissional e transformação de beleza</p>
              </div>
              <div>
                <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}>🎨 Portfólio Diverso</p>
                <p style={{ color: '#4A4A4A' }}>Trabalhos em eventos, produções audiovisuais e sessões fotográficas</p>
              </div>
              <div>
                <p className="text-xl font-semibold mb-2" style={{ color: '#C9A961' }}>📚 Educação</p>
                <p style={{ color: '#4A4A4A' }}>Oferecendo cursos e workshops para profissionais e iniciantes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Localização</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: '#2A2A2A' }}>Endereço</h3>
            <p className="text-lg font-semibold mb-2" style={{ color: '#4A4A4A' }}>Rua Dona Maria Resende, 171</p>
            <p className="text-lg mb-6" style={{ color: '#4A4A4A' }}>Vila Garcia - Patos de Minas, MG</p>
            <p className="text-lg mb-6" style={{ color: '#4A4A4A' }}>CEP: 38700-000</p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/553498109317"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{ background: '#C9A961', color: 'white' }}
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg font-semibold transition-all border-2"
                style={{ borderColor: '#C9A961', color: '#C9A961' }}
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
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

      <section id="portfolio" className="py-20">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Portfólio</h2>
        
        <div className="mb-12">
          <StreamingCarousel posts={portfolioPosts1} />
        </div>

        <div className="mb-12">
          <StreamingCarousel posts={portfolioPosts2} />
        </div>

        <div className="mb-12">
          <StreamingCarousel posts={portfolioPosts3} />
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Eventos</h2>
        <StreamingCarousel posts={eventPosts} />
      </section>

      <section id="courses" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Cursos</h2>
        
        <div className="mb-12">
          <div className="flex gap-4 justify-center mb-8">
            <button className="px-6 py-2 rounded-lg font-semibold" style={{ background: '#C9A961', color: 'white' }}>
              Cursos Ministrados
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold border-2" style={{ borderColor: '#C9A961', color: '#C9A961' }}>
              Cursos Realizados
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Maquiagem Básica", desc: "Aprenda os fundamentos da maquiagem profissional", content: "Técnicas básicas, produtos, aplicação e cuidados", price: "R$ 299,00" },
              { title: "Maquiagem Avançada", desc: "Técnicas avançadas para eventos e produções", content: "Contouring, iluminação, efeitos especiais", price: "R$ 499,00" },
              { title: "Maquiagem para Noivas", desc: "Especialização em maquiagem nupcial", content: "Técnicas para casamentos, durabilidade, acabamento", price: "R$ 399,00" },
              { title: "Maquiagem Artística", desc: "Expressão criativa através da maquiagem", content: "Cores, texturas, criatividade e inovação", price: "R$ 349,00" },
            ].map((course) => (
              <div key={course.title} className="p-6 rounded-lg shadow-lg" style={{ background: 'rgba(255,255,255,0.9)' }}>
                <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: '#2A2A2A' }}>{course.title}</h3>
                <p className="mb-4" style={{ color: '#4A4A4A' }}>{course.desc}</p>
                <p className="text-sm mb-4" style={{ color: '#666' }}>Conteúdo: {course.content}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold" style={{ color: '#C9A961' }}>{course.price}</p>
                  <a href="#contact" className="px-4 py-2 rounded-lg font-semibold transition-all" style={{ background: '#C9A961', color: 'white' }}>
                    Inscrever
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 container mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold mb-16 text-center" style={{ color: '#2A2A2A' }}>Entre em Contato</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-8" style={{ color: '#2A2A2A' }}>Vamos Conversar</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>WhatsApp</h4>
              <a href="https://wa.me/553498109317" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline" style={{ color: '#4A4A4A' }}>
                +55 34 9810-9317
              </a>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>Instagram</h4>
              <a href="https://www.instagram.com/italofreitasmakeup?igsh=MW1tbWRtbnA0cWQyNA==" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline" style={{ color: '#4A4A4A' }}>
                @italofreitasmakeup
              </a>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2" style={{ color: '#C9A961' }}>Localização</h4>
              <p style={{ color: '#4A4A4A' }}>Patos de Minas, MG</p>
            </div>
          </div>

          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'rgba(255,255,255,0.9)' }}>
            <h3 className="text-2xl font-serif font-bold mb-6" style={{ color: '#2A2A2A' }}>Envie uma Mensagem</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Seu nome" className="w-full p-3 border rounded-lg" style={{ borderColor: '#C9A961' }} />
              <input type="email" placeholder="seu@email.com" className="w-full p-3 border rounded-lg" style={{ borderColor: '#C9A961' }} />
              <textarea placeholder="Sua mensagem aqui" rows={4} className="w-full p-3 border rounded-lg" style={{ borderColor: '#C9A961' }} />
              <button type="submit" className="w-full py-3 rounded-lg font-semibold transition-all" style={{ background: '#C9A961', color: 'white' }}>
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-amber-100">
        <p style={{ color: '#4A4A4A' }}>© 2024 Italo Freitas Makeup. Todos os direitos reservados.</p>
        <p style={{ color: '#999' }} className="flex items-center justify-center gap-2">Desenvolvido com elegância, profissionalismo e amor ❤️
          <img src={ringsImg} alt="Alianças" width="20" height="20" style={{ objectFit: 'contain', opacity: 0.7 }} />
        </p>
      </footer>
    </div>
  );
}