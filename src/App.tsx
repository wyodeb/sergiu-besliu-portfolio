import React, { JSX, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Moon, Sun, ExternalLink } from "lucide-react";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

type NavItem = { id: string; label: string };
const sections: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "crysto", label: "Crysto" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type WithChildren = { children: React.ReactNode };

const Pill: React.FC<WithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm backdrop-blur-sm border-zinc-300 dark:border-zinc-700/70 bg-white/40 dark:bg-zinc-800/40">
    {children}
  </span>
);

const Card: React.FC<WithChildren> = ({ children }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
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

const Section: React.FC<SectionProps> = ({ id, title, children, kicker }) => (
  <section id={id} className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="mb-2 md:mb-3 flex items-end justify-between gap-4">
        <div>
          {kicker && (
            <div className="mb-1 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{kicker}</div>
          )}
          {title && <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
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

  return { dark, setDark };
};

export default function App(): JSX.Element {
  const { dark, setDark } = useDarkMode();

  return (
    <div className="min-h-dvh bg-[radial-gradient(50%_100%_at_50%_0%,rgba(120,119,198,0.12),transparent_70%),linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(50%_100%_at_50%_0%,rgba(120,119,198,0.08),transparent_60%)] text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-transparent bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#home" className="font-semibold tracking-tight">
            Sergiu Beșliu · Software Engineer
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60">
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="mailto:hello@wyodeb.io" className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/wyodeb"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sergiu-besliu"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* even tighter vertical spacing between sections */}
      <main className="space-y-5 md:space-y-8">
        <Section id="home">
          <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 md:pt-10 pb-2">
            <div className="grid gap-8 md:grid-cols-[1.2fr,0.8fr] items-center">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Pill>Remote · EU</Pill>
                  <Pill>Backend · Full-stack</Pill>
                </div>
                <MotionH1
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-5xl font-semibold leading-tight"
                >
                  Building reliable platforms with Rails, Django and solid delivery
                </MotionH1>
                <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
                  15+ years across backend and cloud. Modernizing systems, improving performance, and shipping features that stick.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#crysto"
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
                  >
                    View Crysto <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                  >
                    Contact <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="md:justify-self-end">
                <Card>
                  <div className="p-5">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Now</div>
                    <div className="mt-1 text-lg font-medium">Sr. Engineer & Team Lead @ We as Web</div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      Rails upgrades, test coverage, Docker/CI reliability, and migration plans with zero downtime.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Rails 5–7", "PostgreSQL", "Sidekiq", "Redis", "Docker", "AWS"].map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                  </div>
                </Card>
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
            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Sep 2024 — Present · Chișinău</div>
                  <div className="mt-1 font-medium">We as Web · Sr. Software Engineer & Team Lead</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Upgraded legacy Rails to latest stable (+35% perf), raised tests to ~90% (fewer incidents),
                    reduced job failures (−70%), sped up onboard/CI via Docker refactor, and executed zero-downtime migrations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Rails 5–7", "PostgreSQL", "Sidekiq", "Redis", "Docker", "AWS"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">May 2021 — Sep 2024 · Chișinău</div>
                  <div className="mt-1 font-medium">Teamart Outsourcing · Sr. Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Built document digitization for construction; 1.5k+ docs/day, −80% manual entry, +30% OCR accuracy,
                    −45% API latency, 99.9% uptime with Sidekiq + AWS hardening.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Rails", "PostgreSQL", "Sidekiq", "Redis", "AWS", "OCR.space"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Jun 2019 — May 2021 · Chișinău</div>
                  <div className="mt-1 font-medium">Artsintez Media · Sr. Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Document systems for state institutions (100k+ records), public site with payments for ASEM (10k+ users),
                    and feedback/admin tooling to streamline operations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Rails", "PostgreSQL", "RSpec", "Sidekiq", "Redis"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Sep 2018 — Jul 2019 · Chișinău</div>
                  <div className="mt-1 font-medium">ASEM · Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Internal apps used daily by 500+ users; automated IT workflows (−60% manual ops) and faster incident handling.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Rails", "PostgreSQL", "RSpec", "Sidekiq", "Redis"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Jul 2017 — Mar 2018 · Kyiv</div>
                  <div className="mt-1 font-medium">Bitsane · Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Core account logic for crypto exchange (50k+ users); automated wallet lifecycle and Advanced Cash integration.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Rails", "Blockchain", "RSpec", "Sidekiq", "Redis", "REST"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Jul 2015 — Nov 2017 · Chișinău</div>
                  <div className="mt-1 font-medium">Obmen.md · Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Solo-built real-time currency exchange (3k+ users). Automated rate parsing, secure payments, 99.9% uptime, 100+ tx/day.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["PHP", "SOAP", "MySQL", "NGINX", "Ubuntu"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">May 2013 — Mar 2015 · Kyiv</div>
                  <div className="mt-1 font-medium">LLC IPS RISE · Software Engineer</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl">
                    Payment gateway APIs handling 10k+ daily tx; led partner integrations and reduced payment support load.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["PHP", "SOAP", "MySQL", "Git", "Ubuntu"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ---- CRYSTO ---- */}
        <Section id="crysto" title="Crysto">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Overview</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      Crysto is my clean, minimalist brand system and portfolio scaffold. It focuses on clarity,
                      speed, and accessibility with a Rails/React/Tailwind stack and production-ready patterns.
                    </p>
                  </div>
                  <a href="#contact" className="ml-4 inline-flex items-center gap-1 text-sm hover:underline" title="Get in touch">
                    Contact <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Rails", "React", "TypeScript", "Tailwind v4", "PostgreSQL", "Docker", "AWS"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">Highlights</h3>
                <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5 space-y-1">
                  <li>Atomic components with motion micro-interactions</li>
                  <li>Dark-mode tokens and accessible contrast defaults</li>
                  <li>Optimized build: minimal CLS, fast TTI in Vite</li>
                  <li>Drop-in sections: About, Experience, Skills, Contact</li>
                </ul>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">Brand Tokens</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["#111827", "#0ea5e9", "#a78bfa", "#22c55e"].map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs"
                    >
                      <span className="inline-block h-3 w-3 rounded-full" style={{ background: c }} />
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Easily swap these to match employer or product palettes.</p>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <h3 className="font-medium">What’s inside</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Prewired layout, accessible components, sensible defaults for forms, lists, and content blocks. Ready
                  to extend with analytics, auth, or blog.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <Card>
            <div className="p-5">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <h4 className="font-medium">Frontend</h4>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                    <li>JavaScript, React</li>
                    <li>Tailwind CSS, Bootstrap</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Backend</h4>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                    <li>Ruby, Ruby on Rails, Sinatra</li>
                    <li>PHP, REST APIs, OCR integration</li>
                    <li>PostgreSQL, MySQL, Redis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Ops & QA</h4>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                    <li>Docker, NGINX, Ubuntu</li>
                    <li>AWS (EC2, S3, RDS, Lambda, CloudFront, Route 53)</li>
                    <li>Sidekiq, CI/CD, RSpec, Minitest</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        <Section id="contact" title="Contact">
          <Card>
            <div className="p-5">
              <div className="grid gap-5 md:grid-cols-[1fr,0.6fr] items-start">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Based in Chișinău. Open to remote across EU. Romanian, English, Russian.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href="mailto:hello@wyodeb.io"
                      className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
                    >
                      Email <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href="https://github.com/wyodeb"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                    >
                      GitHub <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sergiu-besliu"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium"
                    >
                      LinkedIn <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <form className="grid gap-2.5">
                  <input
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
                    placeholder="Your name"
                  />
                  <input
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
                    placeholder="Email"
                    type="email"
                  />
                  <textarea
                    rows={4}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
                    placeholder="Message"
                  />
                  <button className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium">
                    Send
                  </button>
                </form>
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
        className="fixed bottom-4 right-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-2 shadow-sm hover:shadow-md"
        aria-label="Back to top"
      >
        <ArrowUpRight className="h-5 w-5 rotate-[-45deg]" />
      </a>
    </div>
  );
}
