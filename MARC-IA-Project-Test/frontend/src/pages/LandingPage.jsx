import { useState, useEffect } from 'react';
import {
  MessageSquare, Brain, BookOpen, GraduationCap, Shield, Zap,
  ChevronRight, X, Sparkles, ArrowRight, Menu,
  CheckCircle, LogIn
} from 'lucide-react';

/* ─── Google Icon SVG ─── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

/* ─── Login Modal (Google OAuth) ─── */
function LoginModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // TODO: Integrar Google OAuth real aquí
    // window.location.href = '/api/auth/google';
    setTimeout(() => {
      alert('🔐 Aquí se redirigirá a Google OAuth para iniciar sesión con tu cuenta @pucv.cl');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Modal */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-marc-surface-light border border-marc-border p-8 shadow-2xl animate-[slide-up_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-marc-text-muted hover:text-white transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-marc-primary to-marc-accent mb-4">
            <Brain size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Bienvenido a MARC-IA</h2>
          <p className="text-marc-text-muted mt-2 text-sm">Accede con tu cuenta institucional Google de la PUCV</p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              Conectando...
            </span>
          ) : (
            <>
              <GoogleIcon />
              Continuar con Google
            </>
          )}
        </button>

        {/* Info text */}
        <div className="mt-6 pt-6 border-t border-marc-border">
          <div className="flex items-start gap-3 text-xs text-marc-text-muted">
            <LogIn size={16} className="text-marc-primary shrink-0 mt-0.5" />
            <p>Usa tu correo <strong className="text-white">@pucv.cl</strong> para acceder. Solo cuentas institucionales verificadas podrán utilizar MARC-IA.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Cómo funciona', href: '#como-funciona' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-marc-surface/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-marc-border/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-marc-primary to-marc-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-marc-primary/30 transition-all">
            <Brain size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">MARC-<span className="text-marc-primary">IA</span></span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-marc-text-muted hover:text-white transition-colors text-sm font-medium">{l.label}</a>
          ))}
          <button onClick={onLogin}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-marc-primary to-marc-accent text-white text-sm font-semibold hover:shadow-lg hover:shadow-marc-primary/25 transition-all cursor-pointer">
            Iniciar Sesión
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white cursor-pointer">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-marc-surface-light/95 backdrop-blur-xl border-t border-marc-border px-6 py-4 space-y-3 animate-[slide-up_0.2s_ease-out]">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-marc-text-muted hover:text-white transition-colors text-sm font-medium py-2">{l.label}</a>
          ))}
          <button onClick={() => { onLogin(); setMenuOpen(false); }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-marc-primary to-marc-accent text-white text-sm font-semibold cursor-pointer">
            Iniciar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <div className="group p-6 rounded-2xl bg-marc-surface-light/50 border border-marc-border/50 hover:border-marc-primary/50 hover:bg-marc-surface-light transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-marc-primary/5"
      style={{ animationDelay: `${delay}ms` }}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-marc-primary/20 to-marc-accent/20 flex items-center justify-center mb-4 group-hover:from-marc-primary/30 group-hover:to-marc-accent/30 transition-all">
        <Icon size={24} className="text-marc-primary" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-marc-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Step Card ─── */
function StepCard({ number, title, description }) {
  return (
    <div className="relative flex flex-col items-center text-center p-6">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-marc-primary to-marc-accent flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-marc-primary/30">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-marc-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}



/* ═══════════════════════════════════════════
   LANDING PAGE — Main component
   ═══════════════════════════════════════════ */
export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-marc-surface text-white overflow-x-hidden">
      <Navbar onLogin={() => setLoginOpen(true)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* ── Hero Section ── */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-marc-primary/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-marc-accent/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-marc-primary/5 to-marc-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center animate-[slide-up_0.8s_ease-out]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-marc-primary/10 border border-marc-primary/30 text-marc-primary text-sm font-medium mb-8">
            <Sparkles size={16} />
            Potenciado con Inteligencia Artificial · Próximamente
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Tu futuro asistente virtual
            <span className="block bg-gradient-to-r from-marc-primary via-marc-accent-light to-pucv-gold bg-clip-text text-transparent">
              institucional PUCV
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-marc-text-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Podrás consultar trámites, fechas académicas, servicios y más al instante.
            MARC-IA utilizará tecnología <strong className="text-white">RAG</strong> para entregar respuestas precisas basadas en información oficial de la PUCV.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setLoginOpen(true)}
              className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-marc-primary to-marc-accent text-white font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-marc-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
              Comenzar ahora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#caracteristicas"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-marc-border text-marc-text-muted hover:text-white hover:border-marc-primary/50 font-medium text-base sm:text-lg transition-all flex items-center justify-center gap-2">
              Conocer más
              <ChevronRight size={20} />
            </a>
          </div>

          {/* Hero image / chat preview */}
          <div className="mt-10 sm:mt-16 relative mx-auto max-w-lg">
            <div className="rounded-2xl bg-marc-surface-light border border-marc-border p-4 sm:p-6 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-marc-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-marc-primary to-marc-accent flex items-center justify-center">
                  <MessageSquare size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">MARC-IA</p>
                  <p className="text-xs text-marc-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-marc-success inline-block" /> En línea
                  </p>
                </div>
              </div>
              {/* Chat messages */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-end">
                  <div className="bg-marc-primary/20 border border-marc-primary/30 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-white">¿Cuándo es la inscripción de ramos?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-marc-surface border border-marc-border rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-marc-text-muted">La inscripción de asignaturas para el 2° semestre 2026 será del <strong className="text-white">14 al 18 de julio</strong>. Recuerda revisar tu malla curricular antes 📋</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-marc-primary/10 to-marc-accent/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="caracteristicas" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-marc-primary text-sm font-semibold uppercase tracking-wider mb-3">Características planificadas</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Todo lo que ofrecerá MARC-IA</h2>
            <p className="text-marc-text-muted max-w-xl mx-auto">Estamos diseñando una herramienta que hará tu vida universitaria más fácil con respuestas precisas y contextualizadas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Brain} title="IA Conversacional" description="Ofrecerá respuestas naturales y contextuales gracias a modelos de lenguaje avanzados con tecnología RAG." delay={0} />
            <FeatureCard icon={BookOpen} title="Info Académica" description="Permitirá consultar mallas curriculares, fechas de inscripción, calendario académico y más." delay={100} />
            <FeatureCard icon={GraduationCap} title="Orientación Estudiantil" description="Brindará guía sobre trámites, becas, servicios estudiantiles y procesos administrativos de la PUCV." delay={200} />
            <FeatureCard icon={Zap} title="Respuestas Inmediatas" description="Sin esperas ni filas. Se busca entregar la información en segundos, disponible 24/7." delay={300} />
            <FeatureCard icon={Shield} title="Datos Oficiales" description="Utilizará información verificada directamente de fuentes institucionales oficiales de la PUCV." delay={400} />
            <FeatureCard icon={MessageSquare} title="Chat Intuitivo" description="Contará con una interfaz de chat simple y familiar. Solo pregunta como lo harías con un compañero." delay={500} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="como-funciona" className="py-16 sm:py-24 px-4 sm:px-6 bg-marc-surface-light/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-marc-accent text-sm font-semibold uppercase tracking-wider mb-3">Cómo funcionará</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Será tan simple como conversar</h2>
            <p className="text-marc-text-muted max-w-xl mx-auto">Tres pasos para obtener la información que necesites.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <StepCard number="1" title="Inicia sesión" description="Accederás con tu cuenta institucional PUCV de forma segura y rápida." />
            <StepCard number="2" title="Haz tu pregunta" description="Escribirás tu consulta en lenguaje natural, como si hablaras con un tutor." />
            <StepCard number="3" title="Obtén tu respuesta" description="MARC-IA buscará en fuentes oficiales y te entregará una respuesta precisa al instante." />
          </div>
        </div>
      </section>


      {/* ── CTA Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-marc-accent/10 border border-marc-accent/30 text-marc-accent text-sm font-medium mb-6">
            <CheckCircle size={16} />
            En desarrollo para la comunidad PUCV
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6">Pronto estará disponible</h2>
          <p className="text-marc-text-muted text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">Una nueva forma de acceder a información institucional está en camino. Inteligente, rápida y siempre disponible.</p>
          <button onClick={() => setLoginOpen(true)}
            className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-marc-primary to-marc-accent text-white font-semibold text-lg hover:shadow-2xl hover:shadow-marc-primary/30 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer">
            Acceder a MARC-IA
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-marc-border py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-marc-primary to-marc-accent flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">MARC-<span className="text-marc-primary">IA</span></span>
          </div>
          <p className="text-marc-text-muted text-sm text-center">
            © 2026 MARC-IA — Proyecto Taller de Ingeniería de Software · Pontificia Universidad Católica de Valparaíso
          </p>
          <div className="flex items-center gap-6">
            <a href="#inicio" className="text-marc-text-muted hover:text-white text-sm transition-colors">Inicio</a>
            <a href="#caracteristicas" className="text-marc-text-muted hover:text-white text-sm transition-colors">Características</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
