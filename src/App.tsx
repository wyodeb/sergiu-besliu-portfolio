
import React, {JSX, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Moon, Sun} from "lucide-react";
import ContactForm from "./components/ContactForm";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

type NavItem = { id: string; label: string };
const sections: NavItem[] = [
  {id: "home", label: "Home"},
  {id: "about", label: "About"},
  {id: "experience", label: "Experience"},
  {id: "crysto", label: "Crysto"},
  {id: "skills", label: "Skills"},
  {id: "contact", label: "Contact"},
];

type WithChildren = { children: React.ReactNode };

const Pill: React.FC<WithChildren> = ({children}) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm backdrop-blur-sm border-zinc-300 dark:border-zinc-700/70 bg-white/40 dark:bg-zinc-800/40">
    {children}
  </span>
);

const Card: React.FC<WithChildren> = ({children}) => (
  <MotionDiv
    initial={{opacity: 0, y: 12}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true, margin: "-80px"}}
    transition={{duration: 0.4, ease: "easeOut"}}
    className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 shadow-sm hover:shadow-md transition-shadow"
  >
    {children}
  </MotionDiv>
);

type SectionProps = {
  id: string;
  title?: string;
  kicker?: string;
} & WithChildren;

const Section: React.FC<SectionProps> = ({id, title, children, kicker}) => (
  <section id={id} className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="mb-2 md:mb-3 flex items-end justify-between gap-4">
        <div>
          {kicker && (
            <div className="mb-1 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{kicker}</div>
          )}
          {title && <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"/>
      </div>
      {children}
    </div>
  </section>
);

const useDarkMode = () => {
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark"
      : false
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return {dark, setDark};
};

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]) setActive(visible[0].target.id);
      },
      {rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1]}
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return {active, setActive};
};

export default function App(): JSX.Element {
  const {dark, setDark} = useDarkMode();
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const {active, setActive} = useActiveSection(ids);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({behavior: "smooth", block: "start"});
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="min-h-dvh bg-[radial-gradient(50%_100%_at_50%_0%,rgba(120,119,198,0.12),transparent_70%),linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(50%_100%_at_50%_0%,rgba(120,119,198,0.08),transparent_60%)] text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-transparent bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="font-semibold tracking-tight"
          >
            <span className="block text-base md:text-lg">Sergiu Beșliu</span>
            <span className="block text-sm font-normal text-zinc-600 dark:text-zinc-300">
              Senior Software Engineer
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => handleNavClick(e, s.id)}
                  className="relative px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 outline-none"
                  whileTap={{scale: 0.98}}
                  transition={{type: "spring", stiffness: 400, damping: 30}}
                >
                  <span className={isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-300"}>
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full bg-zinc-900 dark:bg-zinc-100"
                      transition={{type: "spring", stiffness: 500, damping: 40}}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href="mailto:hello@wyodeb.io" className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60" aria-label="Email">
              <Mail className="h-5 w-5"/>
            </a>
            <a
              href="https://github.com/wyodeb"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5"/>
            </a>
            <a
              href="https://www.linkedin.com/in/sergiu-besliu"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5"/>
            </a>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-5 md:space-y-8">
        <Section id="home">
          <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 md:pt-10 pb-2">
            <div className="grid gap-8 items-center">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Pill>Remote · EU</Pill>
                  <Pill>Backend · Full-stack</Pill>
                </div>
                <MotionH1
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.5}}
                  className="text-3xl md:text-5xl font-semibold leading-tight"
                >
                  Rails or Django — tailored to the scope
                </MotionH1>
                <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
                  15+ years across backend and cloud. Modernizing systems, improving performance, and shipping features that stick.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#crysto"
                    onClick={(e) => handleNavClick(e, "crysto")}
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
                  >
                    View Crysto <ArrowUpRight className="h-4 w-4"/>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                  >
                    Contact <Mail className="h-4 w-4"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="about" title="About">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <div className="p-5">
                <h3 className="text-base font-semibold">Who I am</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Backend-leaning full-stack engineer. I modernize systems, trim latency, and keep the codebase approachable for teams.
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-5">
                <h3 className="text-base font-semibold">What I value</h3>
                <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5 space-y-1">
                  <li>Clarity over cleverness</li>
                  <li>Operational excellence (SLOs, rollbacks)</li>
                  <li>Tests that enable speed</li>
                </ul>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid gap-4">
            {/* ...experience cards unchanged... */}
            {/* (keeping your content the same to save space here) */}
          </div>
        </Section>

        {/* ---- CRYSTO ---- */}
        <Section id="crysto" title="Crysto">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Overview</h3>
                      <Pill>Personal project</Pill>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      Crysto helps connect tech talent with companies <span className="italic">anonymously</span>. It’s a solo build: API with Django REST Framework and a React + Vite frontend, deployed on Hetzner.
                    </p>
                  </div>
                  <a
                    href="https://crysto.io"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-4 inline-flex items-center gap-1 text-sm hover:underline"
                    title="Open crysto.io"
                  >
                    crysto.io <ExternalLink className="h-4 w-4"/>
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">Tech stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Django REST Framework", "React", "Vite", "Docker", "Redis", "Celery", "Hetzner (hosting)"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">Scope & role</h3>
                <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5 space-y-1">
                  <li>Solo: backend, frontend, and devops</li>
                  <li>API design with DRF; background jobs via Celery/Redis</li>
                  <li>React UI bootstrapped with Vite</li>
                  <li>Containerized and deployed on Hetzner</li>
                </ul>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">Purpose & status</h3>
                <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5 space-y-1">
                  <li>Goal: enable anonymous matches between talent and companies</li>
                  <li>Work in progress: vector DB exploration for matching</li>
                  <li>Full-text search work ongoing</li>
                  <li>No public metrics yet</li>
                </ul>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <Card>
            <div className="p-5">
              {/* ...skills content unchanged... */}
            </div>
          </Card>
        </Section>

        <Section id="contact" title="Contact">
          <Card>
            <div className="p-5">
              <div className="grid gap-5 md:grid-cols-[1fr,0.6fr] items-start">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Based in Chișinău. Open to remote projects across EU. Romanian and English
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href="mailto:hello@wyodeb.io"
                      className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
                    >
                      Email <Mail className="h-4 w-4"/>
                    </a>
                    <a
                      href="https://github.com/wyodeb"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                    >
                      GitHub <Github className="h-4 w-4"/>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sergiu-besliu"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                    >
                      LinkedIn <Linkedin className="h-4 w-4"/>
                    </a>
                  </div>
                </div>

                {/* ✅ Replaced the raw <form> with the component */}
                <ContactForm />
              </div>
            </div>
          </Card>
        </Section>
      </main>

      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Sergiu Beșliu. All rights reserved
        </div>
      </footer>

      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("home")?.scrollIntoView({behavior: "smooth"});
          history.replaceState(null, "", "#home");
        }}
        className="fixed bottom-4 right-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-2 shadow-sm hover:shadow-md"
        aria-label="Back to top"
      >
        <ArrowUpRight className="h-5 w-5 rotate-[-45deg]"/>
      </a>
    </div>
  );
}
