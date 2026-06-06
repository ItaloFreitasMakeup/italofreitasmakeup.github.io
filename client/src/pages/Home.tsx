"use client";

import { useState, useEffect, useRef } from "react";
// Removido: import Head from "next/head"; (Não funciona em Client Components no App Router)
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Moon, Sun, Languages, Check, Calendar, MapPin, Award } from "lucide-react";

// --- INTERFACES PARA O TYPESCRIPT ---
interface CoursePrice {
  label: string;
  value: string;
}

interface CourseItem {
  title: string;
  desc: string;
  content: string[];
  prices: CoursePrice[];
}

interface Translation {
  nav: { about: string; services: string; portfolio: string; courses: string; contact: string };
  hero: { subtitle: string; desc: string; btn1: string; btn2: string; btn3: string };
  services: { title: string; singleTitle: string; singlePrice: string; singleDesc: string; packageTitle: string; packagePrice: string; packageDesc: string };
  about: { title: string; desc: string; topic1: string; topic1Desc: string; topic2: string; topic2Desc: string; topic3: string; topic3Desc: string };
  location: { title: string; addressTitle: string; btn1: string; btn2: string };
  portfolio: { title: string };
  events: { title: string };
  courses: { title: string; tab1: string; tab2: string; contentLabel: string; btn: string; paymentInfo: string; list: CourseItem[] };
  contact: { title: string; subtitle1: string; subtitle2: string; nameHolder: string; emailHolder: string; msgHolder: string; sendBtn: string };
  footer: { rights: string; dev: string };
  a11y: { [key: string]: string };
}

// Objeto de traduções com tipagem explícita Record<string, Translation>
const translations: Record<'pt' | 'en', Translation> = {
  pt: {
    nav: { about: "Sobre", services: "Valores", portfolio: "Portfólio", courses: "Cursos", contact: "Contato" },
    hero: { 
      subtitle: "Especialista em Beleza Feminina", 
      desc: "Maquiagem profissional para eventos e produções. Cursos VIP em Patos de Minas para quem busca durabilidade e elegância.", 
      btn1: "WhatsApp", btn2: "Ver Cursos", btn3: "Agendar" 
    },
    services: {
      title: "Maquiagem e Atendimentos",
      singleTitle: "Maquiagem Individual",
      singlePrice: "R$ 180,00",
      singleDesc: "Produção completa com foco em durabilidade.",
      packageTitle: "Pacotes para Grupos",
      packagePrice: "R$ 150,00",
      packageDesc: "Grupos acima de 4 pessoas."
    },
    about: { 
      title: "Profissionalismo", 
      desc: "Minha especialidade é realçar a beleza feminina sem transformar.", 
      topic1: "Experiência", topic1Desc: "anos transformando olhares.",
      topic2: "Portfólio", topic2Desc: "Presença em eventos e ensaios.",
      topic3: "Formação", topic3Desc: "Cursos ministrados com prática."
    },
    location: { title: "Onde Estamos", addressTitle: "Endereço", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Trabalhos" },
    events: { title: "Eventos" },
    courses: { 
      title: "Cursos", tab1: "Profissional", tab2: "Auto Maquiagem", contentLabel: "Conteúdo:", btn: "Inscrever",
      paymentInfo: "* Valores para 2x no cartão.",
      list: [
        { 
          title: "CURSO PROFISSIONAL ❣️", 
          desc: "Capacitação completa.", 
          content: ["Prática", "Material incluso"], 
          prices: [{ label: "1 Técnica", value: "R$ 450" }] 
        },
        { 
          title: "CURSO AUTO MAKE ❣️", 
          desc: "Aprenda a se maquiar.", 
          content: ["Pele", "Olhos"], 
          prices: [{ label: "VIP", value: "R$ 450" }] 
        }
      ]
    },
    contact: { title: "Contato", subtitle1: "Canais", subtitle2: "Dúvidas", nameHolder: "Nome", emailHolder: "Email", msgHolder: "Mensagem", sendBtn: "Enviar" },
    footer: { rights: "© 2026", dev: "Dev com Amor" },
    a11y: { logoAlt: "Logo", langBtn: "Língua", themeBtnDark: "Dark", themeBtnLight: "Light", mapTitle: "Mapa", profileAlt: "Foto Italo" }
  },
  en: {
    // IMPORTANTE: O objeto EN agora tem EXATAMENTE a mesma estrutura do PT
    nav: { about: "About", services: "Rates", portfolio: "Portfolio", courses: "Courses", contact: "Contact" },
    hero: { subtitle: "Beauty Expert", desc: "Professional makeup for events. VIP Courses in Brazil.", btn1: "WhatsApp", btn2: "Courses", btn3: "Book" },
    services: { title: "Services", singleTitle: "Single Session", singlePrice: "$ 40.00", singleDesc: "Full production.", packageTitle: "Groups", packagePrice: "$ 30.00", packageDesc: "4+ people." },
    about: { title: "About", desc: "Enhancing natural beauty.", topic1: "Experience", topic1Desc: "years in the industry.", topic2: "Portfolio", topic2Desc: "Events and shoots.", topic3: "Teaching", topic3Desc: "VIP Practical courses." },
    location: { title: "Location", addressTitle: "Address", btn1: "WhatsApp", btn2: "Instagram" },
    portfolio: { title: "Portfolio" },
    events: { title: "Events" },
    courses: { 
      title: "Courses", tab1: "Professional", tab2: "Self-Makeup", contentLabel: "Content:", btn: "Enroll", 
      paymentInfo: "* Cash or card.",
      list: [
        { title: "PROFESSIONAL ❣️", desc: "Full training.", content: ["Practice", "Tools included"], prices: [{ label: "1 Technique", value: "$ 100" }] },
        { title: "SELF MAKEUP ❣️", desc: "Learn yourself.", content: ["Skin", "Eyes"], prices: [{ label: "VIP", value: "$ 100" }] }
      ]
    },
    contact: { title: "Contact", subtitle1: "Channels", subtitle2: "Questions", nameHolder: "Name", emailHolder: "Email", msgHolder: "Message", sendBtn: "Send" },
    footer: { rights: "© 2026", dev: "Dev with Love" },
    a11y: { logoAlt: "Logo", langBtn: "Lang", themeBtnDark: "Dark", themeBtnLight: "Light", mapTitle: "Map", profileAlt: "Photo Italo" }
  }
};

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isDark, setIsDark] = useState(false);
  const t = translations[lang];
  const anosExperiencia = new Date().getFullYear() - 2021;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 p-4" style={{ backgroundColor: isDark ? '#111' : '#fff' }}>
        <div className="flex justify-between items-center container mx-auto">
          {/* Aqui 't.nav' não dará mais erro porque 't' está tipado como 'Translation' */}
          <a href="#about" style={{ color: isDark ? '#fff' : '#000' }}>{t.nav.about}</a>
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>{lang.toUpperCase()}</button>
          <button onClick={() => setIsDark(!isDark)}>{isDark ? <Sun /> : <Moon />}</button>
        </div>
      </nav>

      <main className="pt-20">
        <section id="services" className="py-20 text-center">
          <h2 style={{ color: isDark ? '#fff' : '#000' }}>{t.services.title}</h2>
          <p style={{ color: isDark ? '#ccc' : '#333' }}>{t.services.singlePrice}</p>
        </section>

        <section id="courses" className="container mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Correção do Pi: any e CourseItem */}
            {t.courses.list.map((course: CourseItem, index: number) => (
              <div key={index} className="p-6 border rounded-xl">
                <h3>{course.title}</h3>
                <div className="flex gap-2">
                  {course.prices.map((p: CoursePrice, pi: number) => (
                    <div key={pi} className="p-2 bg-amber-100 rounded">
                      <p>{p.label}: {p.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}