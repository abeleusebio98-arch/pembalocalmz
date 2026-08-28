import { useMemo, useState } from "react";
import { anuncios } from "./anuncios";
import {
  BadgeCheck,
  Car,
  Crown,
  Laptop,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Search,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sofa,
  Utensils,
  Wrench,
  X,
} from "lucide-react";

const rawCategories = [
  {
    name: "Restaurantes",
    icon: Utensils,
    iconClass: "text-amber-300",
    glowClass: "bg-amber-400/10",
    items: anuncios.restaurantes || [],
  },
  {
    name: "Serviços",
    icon: Wrench,
    iconClass: "text-teal-300",
    glowClass: "bg-teal-400/10",
    items: anuncios.servicos || [],
  },
  {
    name: "Hotéis",
    icon: Sofa,
    iconClass: "text-emerald-300",
    glowClass: "bg-emerald-400/10",
    items: anuncios.hoteis || [],
  },
  {
    name: "Supermercados",
    icon: Monitor,
    iconClass: "text-violet-300",
    glowClass: "bg-violet-400/10",
    items: anuncios.supermercados || [],
  },
  {
    name: "Telemóveis",
    icon: Smartphone,
    iconClass: "text-blue-300",
    glowClass: "bg-blue-400/10",
    items: anuncios.tecnologia || [],
  },
  {
    name: "Veículos",
    icon: Car,
    iconClass: "text-orange-300",
    glowClass: "bg-orange-400/10",
    items: anuncios.automoveis || [],
  },
  {
    name: "Computadores",
    icon: Laptop,
    iconClass: "text-cyan-300",
    glowClass: "bg-cyan-400/10",
    items: anuncios.tecnologia || [],
  },
  {
    name: "Moda",
    icon: Shirt,
    iconClass: "text-pink-300",
    glowClass: "bg-pink-400/10",
    items: [],
  },
];

const isRealListing = (item) =>
  item?.nome && !item.nome.toLowerCase().includes("não disponível");

const categories = rawCategories.map((category) => ({
  ...category,
  items: category.items.filter(isRealListing),
}));

const allListings = categories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryName: category.name,
    listingKey: `${category.name}-${item.id}-${item.nome}`,
  })),
);

const normalise = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function Brand({ dark = true }) {
  return (
    <a
      href="#inicio"
      className="group flex items-center gap-3"
      aria-label="Pemba Local — início"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-2xl transition group-hover:-translate-y-0.5 ${
          dark
            ? "bg-yellow-400 text-[#07101f]"
            : "bg-[#07101f] text-yellow-400"
        }`}
      >
        <MapPin size={21} strokeWidth={2.8} />
      </span>
      <span>
        <strong
          className={`block text-lg leading-none ${
            dark ? "text-white" : "text-[#07101f]"
          }`}
        >
          Pemba <span className="text-yellow-400">Local</span>
        </strong>
        <span
          className={`mt-1 block text-[10px] uppercase tracking-[0.2em] ${
            dark ? "text-white/45" : "text-slate-500"
          }`}
        >
          Marketplace inteligente
        </span>
      </span>
    </a>
  );
}

function ListingCard({ item }) {
  const hasMap = Boolean(item.localizacao && item.localizacao !== "#");
  const hasWhatsApp = Boolean(item.whatsapp);

  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.055] shadow-[0_18px_55px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.075]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={`${item.imagem}?auto=format&fit=crop&w=900&q=80`}
          alt={item.nome}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#07101f]/75 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
          {item.categoryName}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold leading-snug text-white">
              {item.nome}
            </h3>
            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-white/60">
              {item.descricao}
            </p>
          </div>
          <BadgeCheck
            className="mt-0.5 shrink-0 text-emerald-400"
            size={20}
            aria-label="Negócio local"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {hasMap ? (
            <a
              href={item.localizacao}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-3 text-sm font-extrabold text-[#07101f] transition hover:bg-yellow-300"
            >
              <MapPin size={16} />
              Localização
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 text-sm text-white/35">
              Sem localização
            </span>
          )}

          {hasWhatsApp ? (
            <a
              href={item.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 text-sm font-extrabold text-white transition hover:bg-emerald-400"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-2 text-center text-xs font-semibold text-white/40">
              Contacto em breve
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function SellerPanel({ onClose }) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const emailLink = isMobile
    ? "mailto:pembalocal@gmail.com?subject=Pedido%20de%20vendedor%20—%20Pemba%20Local&body=Nome:%0A%0ATelefone:%0A%0ANome%20da%20loja:%0A%0ACategoria:%0A%0APlano%20escolhido:%0A[ ] Gratuito%0A[ ] Destaque Premium%0A%0AMensagem:"
    : "https://mail.google.com/mail/?view=cm&fs=1&to=pembalocal@gmail.com&su=Pedido%20de%20vendedor%20—%20Pemba%20Local&body=Nome:%0A%0ATelefone:%0A%0ANome%20da%20loja:%0A%0ACategoria:%0A%0APlano%20escolhido:%0A[ ] Gratuito%0A[ ] Destaque Premium%0A%0AMensagem:";

  const plans = [
    {
      label: "Plano grátis",
      title: "1 anúncio grátis",
      price: "0 MT",
      tone: "border-emerald-200 bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-700",
      items: [
        "1 anúncio ativo",
        "Duração de 7 dias",
        "Aprovação antes de publicar",
      ],
    },
    {
      label: "Renovação",
      title: "Mais 7 dias",
      price: "50 MT",
      tone: "border-amber-200 bg-amber-50",
      badge: "bg-amber-100 text-amber-700",
      items: [
        "Mantém o anúncio ativo",
        "Renovação simples",
        "Mais tempo para vender",
      ],
    },
    {
      label: "Destaque premium",
      title: "Máxima visibilidade",
      price: "200 MT",
      tone: "border-violet-200 bg-violet-50",
      badge: "bg-violet-100 text-violet-700",
      items: [
        "Aparece primeiro",
        "Destaque na página inicial",
        "Mais oportunidades de contacto",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f8fafc] text-[#0f172a]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Brand dark={false} />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <X size={18} />
            Fechar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative overflow-hidden rounded-[32px] bg-[#07101f] px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:px-14 lg:py-16">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-yellow-400/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
              Área do vendedor
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Coloque o seu negócio no mapa de Pemba.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Publique o seu anúncio, seja encontrado por clientes locais e
              receba contactos de forma simples.
            </p>
            <a
              href={emailLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-13 items-center justify-center rounded-2xl bg-yellow-400 px-7 py-4 font-extrabold text-[#07101f] transition hover:bg-yellow-300"
            >
              Publicar o meu anúncio
            </a>
          </div>

          <div className="relative mt-10 grid grid-cols-2 gap-3 lg:mt-0">
            {[
              ["7 dias", "no plano grátis"],
              ["50 MT", "para renovar"],
              ["200 MT", "destaque premium"],
              ["Pemba", "alcance local"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
              >
                <strong className="block text-2xl text-yellow-400">
                  {value}
                </strong>
                <span className="mt-1 block text-xs text-white/55">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-600">
              Planos simples
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Escolha como quer aparecer
            </h2>
            <p className="mt-3 text-slate-500">
              Comece gratuitamente e aumente a visibilidade quando precisar.
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.label}
                className={`rounded-[28px] border p-7 ${plan.tone}`}
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] ${plan.badge}`}
                >
                  {plan.label}
                </span>
                <h3 className="mt-5 text-2xl font-black">{plan.title}</h3>
                <p className="mt-2 text-4xl font-black">{plan.price}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck
                        className="mt-0.5 shrink-0 text-emerald-600"
                        size={18}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-7 sm:p-9">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-black">Pronto para começar?</h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-500">
                Todos os anúncios passam por aprovação. O primeiro anúncio fica
                ativo durante 7 dias sem custo.
              </p>
            </div>
            <a
              href={emailLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-[#07101f] px-7 py-4 font-extrabold text-white transition hover:bg-slate-800"
            >
              Continuar
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [sellerOpen, setSellerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredListings = useMemo(() => {
    const term = normalise(search.trim());
    if (!term) return allListings;

    return allListings.filter((item) =>
      normalise(
        `${item.nome} ${item.descricao} ${item.categoryName}`,
      ).includes(term),
    );
  }, [search]);

  const activeCategories = categories.filter(
    (category) => category.items.length > 0,
  ).length;

  const openSeller = () => {
    setMobileMenuOpen(false);
    setSellerOpen(true);
  };

  const selectCategory = (name) => {
    setSearch(name);
    document
      .getElementById("anuncios")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050a14] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(250,204,21,.10), transparent 27%), radial-gradient(circle at 88% 35%, rgba(16,185,129,.08), transparent 24%), linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 42px 42px, 42px 42px",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050a14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Brand />

          <nav
            className="hidden items-center gap-7 text-sm font-semibold text-white/65 md:flex"
            aria-label="Navegação principal"
          >
            <a className="transition hover:text-white" href="#inicio">
              Início
            </a>
            <a className="transition hover:text-white" href="#categorias">
              Categorias
            </a>
            <a className="transition hover:text-white" href="#como-funciona">
              Como funciona
            </a>
            <button
              type="button"
              onClick={openSeller}
              className="transition hover:text-white"
            >
              Seja Premium
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={openSeller}
              className="px-3 text-sm font-bold text-white/70 transition hover:text-white"
            >
              Área do vendedor
            </button>
            <button
              type="button"
              onClick={openSeller}
              className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-extrabold text-[#07101f] transition hover:bg-yellow-300"
            >
              Publicar anúncio
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#07101f] px-5 py-5 md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-bold">
              {[
                ["Início", "#inicio"],
                ["Categorias", "#categorias"],
                ["Como funciona", "#como-funciona"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={openSeller}
                className="mt-2 rounded-xl bg-yellow-400 px-5 py-3.5 text-left font-extrabold text-[#07101f]"
              >
                Publicar anúncio
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="relative">
        <section
          id="inicio"
          className="mx-auto grid max-w-7xl gap-9 px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:pb-20 lg:pt-20"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-yellow-300">
              <MapPin size={14} />
              Feito para Pemba
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Encontre tudo o que precisa,{" "}
              <span className="text-yellow-400">perto de si.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Descubra restaurantes, serviços, hotéis e negócios locais.
              Consulte a localização e entre em contacto sem complicações.
            </p>

            <form
              className="mt-8 rounded-[22px] border border-white/10 bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,.32)] sm:flex"
              onSubmit={(event) => {
                event.preventDefault();
                document
                  .getElementById("anuncios")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <label className="flex min-h-13 flex-1 items-center gap-3 px-3 text-slate-500">
                <Search size={20} className="shrink-0" />
                <span className="sr-only">O que procura?</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="O que procura em Pemba?"
                  className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                    aria-label="Limpar pesquisa"
                  >
                    <X size={17} />
                  </button>
                )}
              </label>
              <div className="hidden items-center gap-2 border-l border-slate-200 px-4 text-xs font-semibold text-slate-500 sm:flex">
                <MapPin size={16} />
                Pemba, Cabo Delgado
              </div>
              <button
                type="submit"
                className="mt-2 min-h-13 w-full rounded-2xl bg-yellow-400 px-7 font-extrabold text-[#07101f] transition hover:bg-yellow-300 sm:mt-0 sm:w-auto"
              >
                Pesquisar
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/55">
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-yellow-400" /> Localização real
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-emerald-400" /> Negócios
                locais
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-cyan-400" /> Contacto
                direto
              </span>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.14] via-white/[0.06] to-emerald-400/[0.08] p-7 shadow-[0_30px_90px_rgba(0,0,0,.3)] sm:p-9">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-yellow-400/15 blur-3xl" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400 text-[#07101f] shadow-lg shadow-yellow-400/15">
                <Crown size={27} fill="currentColor" />
              </span>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-yellow-300">
                Para negócios locais
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Faça o seu negócio ser encontrado.
              </h2>
              <p className="mt-4 leading-7 text-white/60">
                Publique gratuitamente durante 7 dias ou escolha o destaque
                Premium para aparecer primeiro.
              </p>
              <button
                type="button"
                onClick={openSeller}
                className="mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-2xl bg-white px-6 font-extrabold text-[#07101f] transition hover:bg-yellow-50 sm:w-auto"
              >
                Conhecer os planos
              </button>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                <div>
                  <strong className="block text-3xl text-yellow-400">
                    {allListings.length}
                  </strong>
                  <span className="mt-1 block text-xs text-white/45">
                    negócios listados
                  </span>
                </div>
                <div>
                  <strong className="block text-3xl text-emerald-400">
                    {activeCategories}
                  </strong>
                  <span className="mt-1 block text-xs text-white/45">
                    categorias ativas
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="categorias"
          className="border-y border-white/10 bg-white/[0.025]"
        >
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-yellow-400">
                  Explore por categoria
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  O que procura hoje?
                </h2>
              </div>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="hidden text-sm font-bold text-yellow-400 transition hover:text-yellow-300 sm:block"
                >
                  Ver tudo
                </button>
              )}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    type="button"
                    key={category.name}
                    onClick={() => selectCategory(category.name)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-1 hover:border-yellow-400/25 hover:bg-white/[0.07]"
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl ${category.glowClass}`}
                    >
                      <Icon size={21} className={category.iconClass} />
                    </span>
                    <strong className="mt-4 block text-sm leading-tight text-white">
                      {category.name}
                    </strong>
                    <span className="mt-1 block text-[11px] text-white/40">
                      {category.items.length === 1
                        ? "1 anúncio"
                        : `${category.items.length} anúncios`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="anuncios"
          className="scroll-mt-24 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-400">
                {search ? "Resultados da pesquisa" : "Descubra Pemba"}
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                {search
                  ? `Resultados para “${search}”`
                  : "Negócios e lugares em destaque"}
              </h2>
              <p className="mt-3 text-sm text-white/50">
                {filteredListings.length === 1
                  ? "1 resultado encontrado"
                  : `${filteredListings.length} resultados encontrados`}
              </p>
            </div>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white/65 transition hover:border-white/20 hover:text-white"
              >
                <X size={16} />
                Limpar pesquisa
              </button>
            )}
          </div>

          {filteredListings.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredListings.map((item) => (
                <ListingCard key={item.listingKey} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-dashed border-white/15 bg-white/[0.035] px-6 py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                <Search size={25} />
              </span>
              <h3 className="mt-5 text-2xl font-black">
                Ainda não encontrámos esse resultado
              </h3>
              <p className="mx-auto mt-2 max-w-lg leading-7 text-white/50">
                Tente pesquisar por outra palavra ou consulte todas as
                categorias disponíveis.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-extrabold text-[#07101f]"
              >
                Ver todos os anúncios
              </button>
            </div>
          )}
        </section>

        <section
          id="como-funciona"
          className="scroll-mt-24 border-y border-white/10 bg-[#07101f]"
        >
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-yellow-400">
                Simples e rápido
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Como funciona
              </h2>
              <p className="mt-3 leading-7 text-white/50">
                Do que procura até ao contacto com o negócio em apenas alguns
                passos.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  Search,
                  "Pesquise",
                  "Digite o produto, serviço ou lugar que procura.",
                ],
                [
                  MapPin,
                  "Descubra",
                  "Compare opções disponíveis em Pemba.",
                ],
                [
                  MessageCircle,
                  "Entre em contacto",
                  "Fale diretamente com o negócio quando o contacto estiver disponível.",
                ],
                [
                  ShieldCheck,
                  "Combine com segurança",
                  "Confirme todos os detalhes antes de fechar o negócio.",
                ],
              ].map(([Icon, title, text], index) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-[#07101f]">
                      <Icon size={22} />
                    </span>
                    <span className="text-4xl font-black text-white/[0.08]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden rounded-[32px] bg-yellow-400 px-6 py-10 text-[#07101f] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[42px] border-black/5" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#07101f]/55">
                Tem um negócio em Pemba?
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Apareça onde os seus clientes estão à procura.
              </h2>
              <p className="mt-3 leading-7 text-[#07101f]/65">
                O primeiro anúncio é gratuito durante 7 dias.
              </p>
            </div>
            <button
              type="button"
              onClick={openSeller}
              className="relative mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-2xl bg-[#07101f] px-7 py-4 font-extrabold text-white transition hover:bg-slate-800 sm:w-auto lg:mt-0"
            >
              Publicar anúncio
            </button>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-[#030710]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <Brand />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
              Conectando pessoas e negócios locais em Pemba, Cabo Delgado.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-extrabold">Navegação</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/45">
              <a href="#inicio" className="hover:text-white">
                Início
              </a>
              <a href="#categorias" className="hover:text-white">
                Categorias
              </a>
              <a href="#como-funciona" className="hover:text-white">
                Como funciona
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold">Para vendedores</h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/45">
              <button
                type="button"
                onClick={openSeller}
                className="hover:text-white"
              >
                Publicar anúncio
              </button>
              <button
                type="button"
                onClick={openSeller}
                className="hover:text-white"
              >
                Planos e preços
              </button>
              <a
                href="mailto:pembalocal@gmail.com"
                className="hover:text-white"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/30">
          © 2026 Pemba Local. Todos os direitos reservados.
        </div>
      </footer>

      {sellerOpen && <SellerPanel onClose={() => setSellerOpen(false)} />}
    </div>
  );
}
