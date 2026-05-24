import { lazy, Suspense, useEffect, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  CircleDollarSign,
  Factory,
  Grid2x2Check,
  Layers3,
  MapPinned,
  Menu,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import AnimatedCounter from "./components/AnimatedCounter";
import Reveal from "./components/Reveal";
import SectionTitle from "./components/SectionTitle";
import TiltCard from "./components/TiltCard";
import {
  aboutHighlights,
  features,
  galleryItems,
  navigation,
  products,
  stats,
} from "./data/siteData";

const WoodScene = lazy(() => import("./components/WoodScene"));

const featureIcons = {
  "Premium Quality": ShieldCheck,
  "Durable Materials": Layers3,
  "Trusted Supplier": Building2,
  "Competitive Pricing": CircleDollarSign,
  "Fast Delivery": Truck,
  "Wide Product Range": Grid2x2Check,
};

const productIcons = {
  "Commercial Plywood": Building2,
  "Packing Plywood": Package,
  "White Face Plywood": Sparkles,
  HDMR: ShieldCheck,
  MDF: Boxes,
  "Shuttering Plywood": Factory,
  Laminates: Layers3,
};

const gallerySizeClasses = {
  tall: "md:col-span-5 md:row-span-2 min-h-[420px]",
  wide: "md:col-span-7 min-h-[240px]",
  square: "md:col-span-4 min-h-[260px]",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });
  const { scrollY } = useScroll();
  const heroOffset = useTransform(scrollY, [0, 700], [0, 140]);
  const navBlur = useTransform(scrollY, [0, 160], [10, 18]);
  const pointerGlow = useMotionTemplate`
    radial-gradient(420px circle at ${smoothX}px ${smoothY}px, rgba(245, 158, 11, 0.16), transparent 60%)
  `;
  const navBackdrop = useMotionTemplate`blur(${navBlur}px)`;

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 2800);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative overflow-x-clip bg-ink text-mist">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 hidden md:block"
          style={{ background: pointerGlow }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_65%)]"
        />

        <motion.header
          className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/45"
          style={{ backdropFilter: navBackdrop }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-shell flex h-20 items-center justify-between gap-4">
            <a
              href="#home"
              className="group flex items-center gap-3"
              aria-label="Shakti Plywood & Timber home"
            >
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-amber-200/15 bg-white/[0.04] shadow-glow">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]" />
                <span className="font-display text-lg font-semibold tracking-[0.28em] text-amber-100">
                  SP
                </span>
              </div>
              <div>
                <p className="font-display text-sm uppercase tracking-[0.35em] text-amber-100/70">
                  Shakti
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400 transition group-hover:text-stone-200">
                  Plywood & Timber
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  className="text-sm uppercase tracking-[0.24em] text-stone-300 transition hover:text-amber-100"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a className="btn-secondary" href="tel:+919315649439">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                className="btn-primary"
                href="https://wa.me/+919315649439"
                rel="noreferrer"
                target="_blank"
              >
                <FaWhatsapp className="relative h-6 w-6" />
                WhatsApp
              </a>
            </div>

            <button
              aria-label="Toggle navigation"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-stone-100 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                className="section-shell overflow-hidden pb-6 lg:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="glass-panel rounded-[28px] p-5">
                  <div className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <a
                        key={item.href}
                        className="text-sm uppercase tracking-[0.24em] text-stone-200"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <a className="btn-secondary" href="tel:+919315649439">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </a>
                      <a
                        className="btn-primary"
                        href="https://wa.me/+9315649439"
                        onClick={() => setMenuOpen(false)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <FaWhatsapp className="relative h-6 w-6" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.header>

        <main className="relative z-10">
          <section
            id="home"
            className="relative min-h-screen overflow-hidden pt-24"
          >
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                style={{ y: heroOffset }}
              >
                <Suspense
                  fallback={
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,193,110,0.22),transparent_20%),linear-gradient(180deg,#120c08_0%,#090604_100%)]" />
                  }
                >
                  <WoodScene />
                </Suspense>
              </motion.div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,120,0.18),transparent_24%),linear-gradient(90deg,rgba(9,6,4,0.92)_0%,rgba(9,6,4,0.56)_45%,rgba(9,6,4,0.84)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />
            </div>

            <div className="section-shell relative z-10 grid min-h-[calc(100vh-6rem)] items-center gap-14 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
              <Reveal className="max-w-3xl">
                <motion.div
                  className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-300/15 bg-white/[0.04] px-5 py-3 text-[0.72rem] uppercase tracking-[0.35em] text-amber-100/85"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.8)]" />
                  Shakti Plywood & Timber
                </motion.div>

                <motion.h1
                  className="text-balance font-display text-5xl font-semibold leading-[0.95] text-mist sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.7 }}
                >
                  Premium Plywood & Timber Solutions
                </motion.h1>

                <motion.p
                  className="mt-6 max-w-2xl text-lg leading-8 text-stone-300/88 sm:text-xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  Trusted Quality for Commercial & Industrial Needs
                </motion.p>

                <motion.p
                  className="mt-6 max-w-2xl text-base leading-8 text-stone-400"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.7 }}
                >
                  Modern plywood, timber, engineered board, and laminate supply
                  with a premium material-first approach for contractors,
                  manufacturers, and interior execution teams.
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46, duration: 0.7 }}
                >
                  <a className="btn-primary" href="tel:+919315649439">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                  <a
                    className="btn-secondary"
                    href="https://wa.me/+919315649439"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaWhatsapp className="relative h-6 w-6" />
                    WhatsApp
                  </a>
                  <a className="btn-secondary" href="#products">
                    <ArrowRight className="h-4 w-4" />
                    View Products
                  </a>
                </motion.div>
              </Reveal>

              <Reveal className="lg:justify-self-end" delay={0.12}>
                <div className="grid gap-5 sm:grid-cols-2 lg:max-w-[520px]">
                  <motion.div
                    className="glass-panel relative overflow-hidden rounded-[32px] p-6 sm:col-span-2"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]" />
                    <div className="relative flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                          Material-led Supply
                        </p>
                        <h3 className="mt-3 font-display text-3xl font-semibold text-amber-50">
                          Commercial interiors to industrial packing
                        </h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-6 w-6 text-amber-200" />
                    </div>
                    <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                          Call Support
                        </p>
                        <a
                          className="mt-3 block font-display text-2xl text-mist"
                          href="tel:+919315649439"
                        >
                          +91 9315649439
                        </a>
                      </div>
                      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                          Location
                        </p>
                        <a
                          className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-amber-100"
                          href="https://maps.app.goo.gl/TD8rJerZ95411pQL8"
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open Google Maps <MapPinned className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <div className="glass-panel rounded-[28px] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                      Surface Focus
                    </p>
                    <p className="mt-3 font-display text-2xl text-mist">
                      Wood grain, engineered panels, and finish-ready laminates.
                    </p>
                  </div>
                  <div className="glass-panel rounded-[28px] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                      Buyer Fit
                    </p>
                    <p className="mt-3 font-display text-2xl text-mist">
                      Builders, contractors, workshops, and industrial buyers.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section-shell py-10 sm:py-14">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <AnimatedCounter key={item.label} {...item} />
              ))}
            </div>
          </section>

          <section id="about" className="section-shell py-20 sm:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <SectionTitle
                  eyebrow="About Us"
                  title="A premium sourcing experience built around reliable timber and plywood supply."
                  description="Shakti Plywood & Timber delivers practical material solutions with a refined presentation, serving commercial, industrial, and fabrication-led requirements with consistency and speed."
                />
                <div className="mt-8 space-y-4">
                  {aboutHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-[26px] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/12 text-amber-200">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <p className="text-base leading-8 text-stone-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="relative mx-auto h-[460px] max-w-[620px]">
                  <motion.div
                    className="absolute left-0 top-12 h-[320px] w-[210px] rounded-[36px] border border-white/10 bg-grain shadow-panel"
                    style={{
                      backgroundColor: "#935a2e",
                      backgroundBlendMode: "overlay",
                      rotate: "-8deg",
                    }}
                    animate={{
                      y: [0, -14, 0],
                      rotate: ["-8deg", "-6deg", "-8deg"],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute left-24 top-3 h-[360px] w-[250px] rounded-[36px] border border-amber-200/20 bg-grain shadow-[0_32px_100px_rgba(91,52,21,0.45)]"
                    style={{
                      backgroundColor: "#b27035",
                      backgroundBlendMode: "overlay",
                      rotate: "5deg",
                    }}
                    animate={{
                      y: [0, 12, 0],
                      rotate: ["5deg", "7deg", "5deg"],
                    }}
                    transition={{
                      duration: 7.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute right-3 top-16 h-[300px] w-[220px] rounded-[36px] border border-white/10 bg-grain shadow-panel"
                    style={{
                      backgroundColor: "#6f431f",
                      backgroundBlendMode: "overlay",
                      rotate: "12deg",
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: ["12deg", "9deg", "12deg"],
                    }}
                    transition={{
                      duration: 6.6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="absolute bottom-0 left-10 right-10 rounded-[32px] border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.32em] text-stone-500">
                      Material Palette
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {["Warm Oak", "Burnished Walnut", "Raw Timber"].map(
                        (tone) => (
                          <div
                            key={tone}
                            className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-5"
                          >
                            <div
                              className="h-10 rounded-2xl bg-grain"
                              style={{ backgroundColor: "#8a562a" }}
                            />
                            <p className="mt-3 text-sm text-stone-300">
                              {tone}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="products" className="section-shell py-20 sm:py-28">
            <Reveal>
              <SectionTitle
                align="center"
                eyebrow="Product Range"
                title="Board, plywood, and finish solutions shaped for practical project needs."
                description="A curated lineup covering structural use, packing, interiors, fabrication, and finish applications with a polished presentation and tactile hover interactions."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => {
                const Icon = productIcons[product.name] ?? Layers3;

                return (
                  <Reveal key={product.name} delay={index * 0.05}>
                    <TiltCard className="h-full">
                      <div className="flex h-full flex-col p-7">
                        <div className="relative flex items-center justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-amber-200/15 bg-amber-300/10 text-amber-100 shadow-glow">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-[0.72rem] uppercase tracking-[0.28em] text-stone-500">
                            Industrial Grade
                          </span>
                        </div>
                        <h3 className="mt-7 font-display text-3xl font-semibold text-mist">
                          {product.name}
                        </h3>
                        <p className="mt-4 flex-1 text-base leading-8 text-stone-300/85">
                          {product.description}
                        </p>
                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm uppercase tracking-[0.24em] text-stone-400">
                          <span>Material consultation</span>
                          <ArrowUpRight className="h-4 w-4 text-amber-200" />
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="why-us" className="section-shell py-20 sm:py-28">
            <Reveal>
              <SectionTitle
                eyebrow="Why Choose Us"
                title="Premium sourcing values with commercial practicality."
                description="The business is positioned around dependable material quality, responsive supply coordination, and a catalog that fits both industrial and interior-facing demand."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = featureIcons[feature.title] ?? Sparkles;

                return (
                  <Reveal key={feature.title} delay={index * 0.06}>
                    <motion.div
                      className="glass-panel rounded-[30px] p-7"
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.05] text-amber-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-7 font-display text-3xl text-mist">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-stone-300/86">
                        {feature.description}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="gallery" className="section-shell py-20 sm:py-28">
            <Reveal>
              <SectionTitle
                align="center"
                eyebrow="Gallery"
                title="A visual language inspired by stacked boards, warm grain, and industrial texture."
                description="This gallery blends polished overlays, warm timber tones, and smooth hover movement to echo a premium material showroom aesthetic."
              />
            </Reveal>

            <div className="mt-12 grid auto-rows-[160px] gap-5 md:grid-cols-12">
              {galleryItems.map((item, index) => (
                <Reveal
                  key={item.title}
                  className={gallerySizeClasses[item.size]}
                  delay={index * 0.05}
                >
                  <motion.article
                    className="group relative h-full overflow-hidden rounded-[34px] border border-white/10"
                    whileHover={{ y: -8 }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
                    <motion.div
                      className="absolute inset-0 bg-grain"
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#8a5629" : "#5f3719",
                        backgroundBlendMode: "overlay",
                      }}
                      transition={{ duration: 5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.06 }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(9,6,4,0.9))]" />
                    <div className="relative flex h-full flex-col justify-end p-7">
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-100/80">
                        Showcase {index + 1}
                      </p>
                      <h3 className="mt-3 font-display text-3xl text-mist">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base leading-7 text-stone-300/82">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="contact" className="section-shell py-20 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal>
                <div className="glass-panel rounded-[36px] p-7 sm:p-9">
                  <SectionTitle
                    eyebrow="Contact"
                    title="Talk to the team about product availability, pricing, and procurement."
                    description="Use the inquiry form for a quick requirement brief, or connect directly through call, WhatsApp, and maps for immediate coordination."
                  />

                  <form className="mt-8 space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-stone-500">
                          Name
                        </span>
                        <input
                          className="w-full rounded-[22px] border border-white/10 bg-black/20 px-5 py-4 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/30"
                          name="name"
                          placeholder="Your name"
                          type="text"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-stone-500">
                          Phone
                        </span>
                        <input
                          className="w-full rounded-[22px] border border-white/10 bg-black/20 px-5 py-4 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/30"
                          name="phone"
                          placeholder="Mobile number"
                          type="tel"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-stone-500">
                        Requirement
                      </span>
                      <input
                        className="w-full rounded-[22px] border border-white/10 bg-black/20 px-5 py-4 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/30"
                        name="requirement"
                        placeholder="Commercial plywood, MDF, shuttering, laminates..."
                        type="text"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-stone-500">
                        Message
                      </span>
                      <textarea
                        className="min-h-[150px] w-full rounded-[22px] border border-white/10 bg-black/20 px-5 py-4 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/30"
                        name="message"
                        placeholder="Share quantity, product type, delivery timing, or project details."
                      />
                    </label>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button className="btn-primary" type="submit">
                        <ArrowRight className="h-4 w-4" />
                        Send Inquiry
                      </button>
                      <AnimatePresence>
                        {sent ? (
                          <motion.p
                            className="text-sm uppercase tracking-[0.24em] text-amber-100"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            Inquiry UI submitted.
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </form>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex h-full flex-col gap-5">
                  <div className="glass-panel rounded-[36px] p-7 sm:p-9">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                      Direct Contact
                    </p>
                    <div className="mt-5 space-y-5">
                      <a
                        className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-5"
                        href="tel:+919315649439"
                      >
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                            Phone
                          </p>
                          <p className="mt-2 font-display text-3xl text-mist">
                            +91 9315649439
                          </p>
                        </div>
                        <Phone className="h-5 w-5 text-amber-200 transition group-hover:translate-x-1" />
                      </a>

                      <a
                        className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-5"
                        href="https://wa.me/+919315649439"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                            WhatsApp
                          </p>
                          <p className="mt-2 font-display text-3xl text-mist">
                            Instant quote chat
                          </p>
                        </div>
                        <MessageCircle className="h-5 w-5 text-amber-200 transition group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>

                  <div className="glass-panel relative overflow-hidden rounded-[36px] p-7 sm:p-9">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
                    <div className="relative">
                      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                        Location
                      </p>
                      <h3 className="mt-4 font-display text-4xl text-mist">
                        Visit Shakti Plywood & Timber
                      </h3>
                      <p className="mt-4 max-w-lg text-base leading-8 text-stone-300/84">
                        Open directions on Google Maps for store access, inquiry
                        visits, and direct navigation assistance.
                      </p>
                      <div className="mt-7 rounded-[28px] border border-white/10 bg-black/20 p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-amber-400/12 text-amber-200">
                            <MapPinned className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-stone-500">
                              Google Maps
                            </p>
                            <p className="mt-2 text-lg leading-8 text-stone-300">
                              Use the provided map link to locate the store
                              quickly.
                            </p>
                          </div>
                        </div>
                        <a
                          className="btn-secondary mt-6"
                          href="https://maps.app.goo.gl/TD8rJerZ95411pQL8"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <MapPinned className="h-4 w-4" />
                          Open Map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="section-shell relative z-10 border-t border-white/10 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-3xl text-mist">
                Shakti Plywood & Timber
              </p>
              <p className="mt-3 max-w-xl text-base leading-8 text-stone-400">
                Premium plywood, timber, engineered boards, and laminates for
                commercial and industrial material needs.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.24em] text-stone-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <a
                className="transition hover:text-amber-100"
                href="tel:+919315649439"
              >
                Call
              </a>
              <a
                className="transition hover:text-amber-100"
                href="https://wa.me/+919315649439"
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
              <a
                className="transition hover:text-amber-100"
                href="https://maps.app.goo.gl/TD8rJerZ95411pQL8"
                rel="noreferrer"
                target="_blank"
              >
                Maps
              </a>
            </div>
          </div>
        </footer>

        <motion.a
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full border border-green-200/20 bg-gradient-to-br from-green-400 to-green-500 text-white shadow-glow"
          href="https://wa.me/+919315649439"
          rel="noreferrer"
          target="_blank"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="absolute inset-0 rounded-full animate-pulse-glow" />
          <FaWhatsapp className="relative h-7 w-7" />
        </motion.a>
      </div>
    </LazyMotion>
  );
}

export default App;
