import React, { useState } from "react";
import { anuncios } from "./anuncios";

import {
  MapPin,
  Smartphone,
  Monitor,
  Laptop,
  Car,
  Sofa,
  Shirt,
  Wrench,
  Utensils,
  Crown,
  Search,
  ShieldCheck,
  MessageCircle,
  BadgeCheck,
  Bell,
  Menu,
  X,
} from "lucide-react";

export default function App() {

  const [chatOpen, setChatOpen] = useState(false);
  const [chatType, setChatType] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const categories = [
    {
      name: "Restaurantes",
      icon: Utensils,
      color: "text-yellow-400",
      anuncios: anuncios.restaurantes || [],
    },

    {
      name: "Serviços",
      icon: Wrench,
      color: "text-teal-400",
      anuncios: anuncios.servicos || [],
    },

    {
      name: "Hotéis",
      icon: Sofa,
      color: "text-green-400",
      anuncios: anuncios.hoteis || [],
    },

    {
      name: "Supermercados",
      icon: Monitor,
      color: "text-purple-400",
      anuncios: anuncios.supermercados || [],
    },

    {
      name: "Telemóveis",
      icon: Smartphone,
      color: "text-blue-400",
      anuncios: anuncios.tecnologia || [],
    },

    {
      name: "Veículos",
      icon: Car,
      color: "text-orange-400",
      anuncios: anuncios.automoveis || [],
    },

    {
      name: "Computadores",
      icon: Laptop,
      color: "text-cyan-400",
      anuncios: anuncios.tecnologia || [],
    },

    {
      name: "Moda",
      icon: Shirt,
      color: "text-pink-400",
      anuncios: [],
    },
  ];


  const filteredCategories = categories.map((cat) => {
    const termo = search.toLowerCase();

    if (!termo) return cat;

    const categoriaMatch = cat.name.toLowerCase().includes(termo);

    if (categoriaMatch) return cat;

    const anunciosFiltrados = cat.anuncios.filter(
      (item) =>
        item.nome?.toLowerCase().includes(termo) ||
        item.descricao?.toLowerCase().includes(termo)
    );

    return {
      ...cat,
      anuncios: anunciosFiltrados,
    };
  });

  const hasResults = filteredCategories.some(
    (cat) => cat.anuncios.length > 0
  );

  const isSearching = search.trim() !== "";

  return (
    <div className="bg-[#050816] text-white min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="relative z-10 md:scale-[0.82] scale-[0.48] origin-top md:w-[122%] w-[210%] md:-ml-[11%] -ml-[55%]">

        {/* NAVBAR */}
        <header className="h-[62px] px-6 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-black text-yellow-400 flex items-center gap-2">

              <div className="relative">
                <MapPin
                  size={24}
                  strokeWidth={2.8}
                  className="text-yellow-400 fill-yellow-400"
                />

                <div className="absolute w-[7px] h-[7px] bg-[#050816] rounded-full top-[7px] left-[8px]" />
              </div>

              Pemba Local
            </h1>

            <p className="text-[10px] text-white/50">
              Marketplace inteligente
            </p>
          </div>

          <nav className="flex gap-7 text-[13px] font-medium">
            <a href="#">Início</a>
            <a href="#">Categorias</a>
            <a href="#">Como funciona</a>
            <a href="#">Seja Premium</a>
          </nav>

          <div className="flex gap-3 items-center">

            <button
              onClick={() => {
                setChatType("vendedor");
                setChatOpen(true);
              }}
              className="text-white/90 text-sm"
            >
              Área do vendedor
            </button>

            <button
              onClick={() => {
                setChatType("anuncio");
                setChatOpen(true);
              }}
              className="bg-yellow-400 text-black px-5 py-2 rounded-2xl font-bold text-sm"
            >
              Publicar anúncio
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="px-6 pt-3">

          <div className={searched ? "block" : "grid grid-cols-[1.7fr_320px] gap-3"}>

            {/* LEFT */}
            <div>

              {/* HERO */}
              <div className="grid grid-cols-[1fr_250px] gap-4 items-start">

                <div>

                  <h1 className="text-[52px] leading-[0.95] font-black text-white">
                    Encontre tudo em

                    <div className="flex items-center gap-2">

                      <span className="text-yellow-400">
                        Pemba
                      </span>

                      <div className="relative">
                        <MapPin
                          size={38}
                          strokeWidth={2.5}
                          className="text-yellow-400 fill-yellow-400"
                        />

                        <div className="absolute w-[10px] h-[10px] bg-[#050816] rounded-full top-[10px] left-[14px]" />
                      </div>
                    </div>
                  </h1>

                  <p className="mt-2 text-white/80 text-[15px] leading-relaxed max-w-[620px]">
                    Pesquise, descubra e fale diretamente com vendedores locais
                    via WhatsApp.
                  </p>

                  {/* SEARCH */}
                  <div className="mt-4 flex h-[56px] bg-white rounded-2xl overflow-hidden">

                    <div className="flex items-center px-4 text-black/50">
                      <Search size={20} />
                    </div>

                    <input
                      type="text"
                      placeholder="O que você está procurando?"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSearched(e.target.value.trim() !== "");
                      }}
                      className="flex-1 text-black px-2 outline-none text-[15px]"
                    />

                    <div className="flex items-center gap-2 border-l border-black/10 px-4 text-black/70">

                      <div className="relative">
                        <MapPin
                          size={15}
                          className="text-black/70 fill-black/70"
                        />

                        <div className="absolute w-[4px] h-[4px] bg-white rounded-full top-[4px] left-[5px]" />
                      </div>

                      <span className="text-xs">
                        Pemba, Cabo Delgado
                      </span>
                    </div>

                    <button onClick={() => setSearched(true)} className="bg-yellow-400 px-8 text-black font-bold">
                      Pesquisar
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="flex gap-5 mt-3 text-[12px] text-white/85 flex-wrap">

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <MapPin
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />

                        <div className="absolute w-[4px] h-[4px] bg-[#050816] rounded-full top-[4px] left-[5px]" />
                      </div>

                      Localização real
                    </div>

                    <div className="flex items-center gap-2">
                      <BadgeCheck
                        size={14}
                        className="text-green-400"
                      />

                      Vendedores verificados
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle
                        size={14}
                        className="text-green-500"
                      />

                      Fale direto no WhatsApp
                    </div>

                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        size={14}
                        className="text-yellow-400"
                      />

                      Negocie com segurança
                    </div>
                  </div>
                </div>

                {!isSearching && !searched && (
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-[28px] p-5 backdrop-blur-xl">

                  <div className="flex items-center gap-2 text-yellow-400">
                    <Crown size={22} fill="currentColor" />

                    <h2 className="font-black text-2xl">
                      Destaques Premium
                    </h2>
                  </div>

                  <p className="mt-3 text-white/80 text-sm leading-relaxed">
                    Os melhores vendedores em evidência para você!
                  </p>

                  <button className="mt-5 w-full h-[50px] rounded-2xl border border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-black transition">
                    Ver destaques
                  </button>
                </div>
                )}
              </div>

              {!isSearching ? (
              <>
              {/* CATEGORIES */}
              <section className="mt-4">

                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-3xl font-black">
                    Categorias populares
                  </h2>

                  <button className="text-yellow-400 text-sm font-bold">
                    Ver todas
                  </button>
                </div>

                <div className="grid md:grid-cols-4 grid-cols-2 gap-1">

                  {filteredCategories.map((cat, index) => {

                    const Icon = cat.icon;

                    return (
                      <div
                        key={index}
                        className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 hover:bg-white/10 transition"
                      >

                        <div className="flex items-center gap-3 mb-4">

                          <div className="w-12 h-12 rounded-2xl bg-black/30 flex items-center justify-center">
                            <Icon
                              size={24}
                              className={cat.color}
                            />
                          </div>

                          <div>
                            <h3 className="font-bold text-sm">
                              {cat.name}
                            </h3>

                            <p className="text-white/50 text-xs">
                              {cat.anuncios.length} anúncios
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">

                          {cat.anuncios.length > 0 ? (

                            cat.anuncios.map((item, idx) => (

                              <div
                                key={idx}
                                className="bg-black/30 rounded-lg p-1.5 md:p-3 border border-white/5"
                              >

                                <img
                                  src={item.imagem}
                                  alt=""
                                  className="w-full h-[58px] md:h-[110px] object-cover rounded-lg"
                                />

                                <div className="mt-3">

                                  <h4 className="font-bold text-[11px] md:text-sm leading-tight">
                                    {item.nome}
                                  </h4>

                                  <p className="text-white/60 text-[10px] md:text-xs mt-1 leading-tight">
                                    {item.descricao}
                                  </p>

                                  <div className="flex gap-2 mt-3">

                                    <a
                                      href={item.localizacao}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex-1 bg-yellow-400 text-black text-center py-1 rounded-lg text-[8px] md:text-xs font-bold"
                                    >
                                      Maps
                                    </a>

                                    <a
                                      href={item.whatsapp}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex-1 bg-green-500 text-white text-center py-1 rounded-lg text-[8px] md:text-xs font-bold"
                                    >
                                      WhatsApp
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))

                          ) : (

                            <div className="bg-black/30 rounded-xl p-4 text-center border border-white/5">
                              <p className="text-white/50 text-sm">
                                Não disponível no momento
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!hasResults && search && (
                  <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-black text-yellow-400">
                      Não disponível no momento
                    </h3>

                    <p className="text-white/60 mt-2">
                      Nenhum resultado encontrado para "{search}"
                    </p>
                  </div>
                )}
              </section>
              </>
              ) : (
                <div className="mt-6">

                  <h2 className="text-4xl font-black mb-6">
                    Resultados para: "{search}"
                  </h2>

                  {hasResults ? (

                    <div className="grid grid-cols-3 gap-4">

                      {filteredCategories.map((cat) =>
                        cat.anuncios.map((item, idx) => (

                          <div
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                          >

                            <img
                              src={item.imagem}
                              alt=""
                              className="w-full h-[220px] object-cover"
                            />

                            <div className="p-4">

                              <h3 className="text-xl font-black">
                                {item.nome}
                              </h3>

                              <p className="text-white/60 mt-2 text-sm">
                                {item.descricao}
                              </p>

                              <div className="flex gap-3 mt-4">

                                <a
                                  href={item.localizacao}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex-1 bg-yellow-400 text-black py-3 rounded-2xl text-center font-bold"
                                >
                                  Maps
                                </a>

                                <a
                                  href={item.whatsapp}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex-1 bg-green-500 text-white py-3 rounded-2xl text-center font-bold"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  ) : null}
                </div>
              )}
            </div>

            {!isSearching && !searched && (
            <>
            {/* MOBILE PREVIEW */}
            <div className="flex justify-center">

              <div className="relative w-[300px] h-[760px] rounded-[38px] border border-white/10 bg-[#060b18] overflow-hidden shadow-2xl">

                {/* FURO */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full border border-white/10 z-50"></div>

                {/* TOP */}
                <div className="h-[70px] px-5 flex items-center justify-between border-b border-white/10">

                  <Menu size={20} />

                  <div className="text-center">
                    <h2 className="text-xl font-black text-yellow-400 flex items-center gap-2">

                      <div className="relative">
                        <MapPin
                          size={18}
                          strokeWidth={2.5}
                          className="text-yellow-400 fill-yellow-400"
                        />

                        <div className="absolute w-[5px] h-[5px] bg-[#060b18] rounded-full top-[5px] left-[6px]" />
                      </div>

                      Pemba Local
                    </h2>
                  </div>

                  <Bell size={18} />
                </div>

                {/* MINI BODY */}
                <div className="p-4 h-[690px] overflow-hidden">

                  <h2 className="text-[28px] font-black leading-tight text-white">
                    Encontre tudo em
                  </h2>

                  <div className="flex items-center gap-2">

                    <span className="text-yellow-300 text-[30px] font-black">
                      Pemba
                    </span>

                    <div className="relative">
                      <MapPin
                        className="text-yellow-300 fill-yellow-300"
                        size={22}
                      />

                      <div className="absolute w-[5px] h-[5px] bg-[#060b18] rounded-full top-[6px] left-[8px]"></div>
                    </div>
                  </div>

                  <p className="text-white/70 mt-2 text-sm">
                    Pesquise e descubra vendedores locais via WhatsApp.
                  </p>                  {/* SEARCH */}
                  <div className="mt-4 bg-white rounded-2xl overflow-hidden">

                    <input
                      placeholder="O que você está procurando?"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSearched(e.target.value.trim() !== "");
                      }}
                      className="w-full px-4 py-3 text-black outline-none text-sm"
                    />

                    <button onClick={() => setSearched(true)} className="w-full h-[46px] bg-yellow-400 text-black font-black text-sm">
                      Pesquisar
                    </button>
                  </div>

                  {/* MINI CATEGORIES */}
                  <div className="grid grid-cols-4 gap-2 mt-5">

                    {categories.slice(0, 4).map((cat, index) => {

                      const Icon = cat.icon;

                      return (
                        <div
                          key={index}
                          className="bg-white/5 border border-white/10 rounded-2xl p-2 text-center"
                        >

                          <div className="w-10 h-10 mx-auto rounded-xl bg-black/30 flex items-center justify-center mb-2">

                            <Icon
                              size={18}
                              className={cat.color}
                            />
                          </div>

                          <p className="text-[10px]">
                            {cat.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* PREMIUM MINI */}
                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">

                      <div className="flex items-center gap-2 text-yellow-400">
                        <Crown size={16} fill="currentColor" />

                        <h3 className="font-bold text-sm">
                          Destaques Premium
                        </h3>
                      </div>

                      <span className="text-yellow-400 text-[10px]">
                        Ver mais
                      </span>
                    </div>

                    {anuncios.tecnologia?.[0] && (

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3">

                        <img
                          src={anuncios.tecnologia[0].imagem}
                          alt=""
                          className="w-full h-[120px] object-cover rounded-xl"
                        />

                        <h4 className="mt-3 font-bold text-sm">
                          {anuncios.tecnologia[0].nome}
                        </h4>

                        <p className="text-white/60 text-[10px] md:text-xs mt-1 leading-tight">
                          {anuncios.tecnologia[0].descricao}
                        </p>

                        <a
                          href={anuncios.tecnologia[0].whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 block w-full bg-green-500 text-center text-white py-2 rounded-xl text-xs font-bold"
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </div>

                  {/* ALL MINI CATEGORIES */}
                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-3">

                      <h3 className="font-bold text-sm">
                        Categorias
                      </h3>

                      <span className="text-yellow-400 text-[10px]">
                        Ver todas
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">

                      {categories.map((cat, index) => {

                        const Icon = cat.icon;

                        return (
                          <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-2xl p-2 text-center"
                          >

                            <div className="w-10 h-10 mx-auto rounded-xl bg-black/30 flex items-center justify-center mb-2">

                              <Icon
                                size={18}
                                className={cat.color}
                              />
                            </div>

                            <p className="text-[10px]">
                              {cat.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            </>
            )}

          {!isSearching && !searched && (
          <>
          <section className="mt-6">

            <h2 className="text-3xl font-black mb-3">
              Como funciona
            </h2>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-1">

              {[
                "Pesquise",
                "Descubra",
                "Fale no WhatsApp",
                "Negocie",
              ].map((item, index) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xl"
                >

                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center mb-2">
                    {index + 1}
                  </div>

                  <h3 className="font-bold text-sm">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          
          </>
          )}

          </div>

          {/* FOOTER */}
          <footer className="mt-4 border-t border-white/10 pt-5 pb-3">

            <div className="grid grid-cols-5 gap-6 text-sm">

              <div>
                <h3 className="text-yellow-400 font-black text-lg">
                  Pemba Local
                </h3>

                <p className="text-white/60 mt-2 leading-relaxed text-xs">
                  Conectando pessoas e negócios em Pemba.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-white">
                  Navegação
                </h4>

                <div className="flex flex-col gap-1 text-white/60 text-xs">
                  <span>Início</span>
                  <span>Categorias</span>
                  <span>Como funciona</span>
                  <span>Seja Premium</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-white">
                  Para vendedores
                </h4>

                <div className="flex flex-col gap-1 text-white/60 text-xs">
                  <span>Publicar anúncio</span>
                  <span>Planos Premium</span>
                  <span>Dicas para vender</span>
                  <span>Central de ajuda</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-white">
                  Suporte
                </h4>

                <div className="flex flex-col gap-1 text-white/60 text-xs">
                  <span>Ajuda</span>
                  <span>Contato</span>
                  <span>Termos de uso</span>
                  <span>Política de privacidade</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-white">
                  Siga-nos
                </h4>

                <div className="flex gap-4 mt-3">

                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                    <span className="text-lg font-bold">
                      f
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                    <span className="text-lg">
                      ◎
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                    <MessageCircle size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-5 pt-3 text-center text-white/40 text-xs">
              © 2026 Pemba Local. Todos os direitos reservados.
            </div>
          </footer>

        </main>
      </div>

      {/* SELLER PAGE */}
{chatOpen && (
  <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* TOP */}
      <div className="grid md:grid-cols-2 gap-10 items-center bg-[#f7f8fa] rounded-[30px] p-10">

        <div>

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
            ÁREA DO VENDEDOR
          </div>

          <h1 className="text-[56px] leading-[1] font-black text-[#111827]">
            Venda mais.
            <br />
            Alcance mais pessoas em Pemba.
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Junte-se ao Pemba Local e conecte o seu negócio com milhares de clientes todos os dias.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
            className="w-[320px]"
          />
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <div className="mt-14">

        <h2 className="text-3xl font-black text-center text-[#111827]">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          {[
            {
              title: "Publique seu anúncio",
              text: "Publique seu anúncio gratuitamente e mostre o que você oferece.",
            },
            {
              title: "Seja visto por mais pessoas",
              text: "Seu anúncio aparece para milhares de pessoas em Pemba.",
            },
            {
              title: "Venda mais",
              text: "Mais visibilidade, mais contactos e mais oportunidades.",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="border border-gray-200 rounded-3xl p-6"
            >

              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-black flex items-center justify-center mb-4">
                {index + 1}
              </div>

              <h3 className="text-xl font-black text-[#111827]">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PLANOS */}
      <div className="mt-16">

        <h2 className="text-3xl font-black text-center text-[#111827]">
          Planos e taxas
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="border border-green-200 bg-green-50 rounded-3xl p-7">

            <div className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-black mb-5">
              PLANO GRÁTIS
            </div>

            <h3 className="text-3xl font-black text-[#111827]">
              1 Anúncio Grátis
            </h3>

            <div className="text-[50px] font-black text-[#111827] mt-3">
              0 MT
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>✓ 1 anúncio ativo</p>
              <p>✓ Duração de 7 dias</p>
              <p>✓ Sem destaque</p>
              <p>✓ Renovação paga</p>
            </div>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-3xl p-7">

            <div className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-black mb-5">
              TAXA DE RENOVAÇÃO
            </div>

            <h3 className="text-3xl font-black text-[#111827]">
              Renovar anúncio
            </h3>

            <div className="text-[50px] font-black text-[#111827] mt-3">
              50 MT
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>✓ Mais 7 dias de visibilidade</p>
              <p>✓ Mantém o anúncio ativo</p>
              <p>✓ Renovação simples</p>
              <p>✓ Melhor alcance</p>
            </div>
          </div>

          <div className="border border-purple-200 bg-purple-50 rounded-3xl p-7">

            <div className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-black mb-5">
              DESTAQUE PREMIUM
            </div>

            <h3 className="text-3xl font-black text-[#111827]">
              Destaque Premium
            </h3>

            <div className="text-[50px] font-black text-[#111827] mt-3">
              200 MT
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>✓ Aparece primeiro</p>
              <p>✓ Mais visibilidade</p>
              <p>✓ Destaque na página inicial</p>
              <p>✓ Mais contactos</p>
            </div>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-16 bg-[#f7f8fa] rounded-3xl p-8">

        <h2 className="text-3xl font-black text-[#111827] mb-5">
          Informações importantes
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>• O plano grátis permite apenas 1 anúncio por vez.</p>
          <p>• Após 7 dias será necessário renovar.</p>
          <p>• Renovação custa 50 MT.</p>
          <p>• Destaque Premium custa 200 MT.</p>
          <p>• Todos os anúncios passam por aprovação.</p>
        </div>
      </div>

      {/* CONTINUAR */}
      <div className="mt-16 text-center">

        <h2 className="text-4xl font-black text-[#111827]">
          Pronto para começar?
        </h2>

        <p className="mt-4 text-gray-600">
          Clique abaixo para entrar em contacto e publicar seu anúncio.
        </p>

        {(() => {

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const emailLink = isMobile
    ? "mailto:pembalocal@gmail.com?subject=Pedido%20de%20vendedor%20—%20Pemba%20Local&body=Nome:%0A%0ATelefone:%0A%0ANome%20da%20loja:%0A%0ACategoria:%0A%0APlano%20escolhido:%0A[ ] Gratuito%0A[ ] Destaque Premium%0A%0AMensagem:"
    : "https://mail.google.com/mail/?view=cm&fs=1&to=pembalocal@gmail.com&su=Pedido%20de%20vendedor%20—%20Pemba%20Local&body=Nome:%0A%0ATelefone:%0A%0ANome%20da%20loja:%0A%0ACategoria:%0A%0APlano%20escolhido:%0A[ ] Gratuito%0A[ ] Destaque Premium%0A%0AMensagem:";

  return (
    <a
      href={emailLink}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center mt-6 bg-green-500 hover:bg-green-600 transition text-white font-black px-10 h-[58px] rounded-2xl text-lg"
    >
      Continuar
    </a>
  );
})()}

        <div className="mt-5">
          <button
            onClick={() => setChatOpen(false)}
            className="text-gray-500 text-sm"
          >
            Fechar
          </button>
        </div>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
