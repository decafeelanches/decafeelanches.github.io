/* ===== EDITE AQUI: cardápio =====
   Preencha "preco" (ex.: "R$ 5,00") quando quiser exibir valores.
   Deixe vazio ("") para mostrar "Consulte". */
const CARDAPIO = [
  { icone: "☕", nome: "Cafés e bebidas", desc: "Para começar ou recarregar o dia.", preco: "" },
  { icone: "🍊", nome: "Sucos", desc: "Opções de sucos para refrescar.", preco: "" },
  { icone: "🥟", nome: "Salgados", desc: "Salgados na vitrine para o seu lanche.", preco: "" },
  { icone: "🍗", nome: "Coxinhas", desc: "Para matar a fome com sabor.", preco: "" },
  { icone: "🧀", nome: "Pão de queijo", desc: "Ótimo companheiro do café.", preco: "" },
  { icone: "🥪", nome: "Lanches", desc: "Para o café da manhã ou a tarde.", preco: "" },
  { icone: "🍰", nome: "Doces e sobremesas", desc: "Um final doce para o seu momento.", preco: "" }
];
/* ===== EDITE AQUI: avaliações do Google ===== */
const NOTA = 4.5, TOTAL = 108;

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cardápio
$("#cards").innerHTML = CARDAPIO.map((c, i) =>
  `<article class="card rv" style="transition-delay:${i * 60}ms"><span class="ic" aria-hidden="true">${c.icone}</span><h3>${c.nome}</h3><p>${c.desc}</p><b>${c.preco || "Consulte"}</b></article>`
).join("");

// Avaliações
const br = n => String(n).replace(".", ",");
$("#nota").textContent = br(NOTA);
$("#qtd").textContent = TOTAL;
$("#stars").innerHTML = [1, 2, 3, 4, 5].map(n =>
  `<i style="--f:${Math.max(0, Math.min(1, NOTA - n + 1)) * 100}%">★</i>`).join("");

// Rodapé
$("#ano").textContent = new Date().getFullYear();

// Cabeçalho + menu mobile
const hd = $("#topo-nav"), bg = $("#burger");
const onScroll = () => hd.classList.toggle("sc", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const fechaMenu = () => { hd.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); };
bg.onclick = () => bg.setAttribute("aria-expanded", hd.classList.toggle("open"));
$$("#menu a").forEach(a => a.addEventListener("click", fechaMenu));

// Animação de entrada
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
}), { threshold: .15 });
$$(".rv").forEach(el => reduz ? el.classList.add("on") : io.observe(el));

// Galeria ampliada
const fotos = $$(".ph");
const lb = $("#lb"), lbi = $("#lbi"), lbc = $("#lbc");
let atual = 0, foco = null;
function abre(i) {
  atual = (i + fotos.length) % fotos.length;
  const im = $("img", fotos[atual]);
  lbi.src = im.src; lbi.alt = im.alt;
  lbi.style.objectPosition = im.style.objectPosition || "center";
  lbc.textContent = $("span", fotos[atual]).textContent;
  if (lb.hidden) { foco = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbx").focus(); }
}
function fecha() { lb.hidden = true; document.body.style.overflow = ""; if (foco) foco.focus(); }
fotos.forEach((f, i) => f.onclick = () => abre(i));
$("#lbx").onclick = fecha;
$("#lbp").onclick = () => abre(atual - 1);
$("#lbn").onclick = () => abre(atual + 1);
lb.onclick = e => { if (e.target === lb) fecha(); };
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") fecha();
  if (e.key === "ArrowLeft") abre(atual - 1);
  if (e.key === "ArrowRight") abre(atual + 1);
});
