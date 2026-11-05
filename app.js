/* Cabeçalho das páginas internas, carrossel (setas, teclado e arrastar) e entrada suave dos elementos. */
const $ = (s, r = document) => [...r.querySelectorAll(s)];
const SP = `<svg class="spin" viewBox="0 0 50 50" fill="none" stroke="#748cab" stroke-width="3" stroke-linecap="round"><circle cx="25" cy="25" r="21" stroke-opacity=".35"/><path d="M9 25q8.2-10 16 0t16 0"/></svg>`;
const b = document.body;
if (b.dataset.t)
	b.insertAdjacentHTML(
		"afterbegin",
		`<header class="top"><a href="index.html" class="logo">E.B.S${SP}</a><span>${b.dataset.t}</span></header>`
	);
$(".logo.big").forEach(l => l.insertAdjacentHTML("beforeend", SP));
$(".car").forEach(c => {
	const s = $(".slides", c)[0];
	let i = 0,
		x0 = null;
	const go = d => {
		const n = s.children.length;
		i = (i + d + n) % n;
		s.style.transform = `translateX(-${i * 100}%)`;
	};
	c.insertAdjacentHTML(
		"beforeend",
		'<button class="pv" aria-label="Anterior">‹</button><button class="nx" aria-label="Próxima">›</button>'
	);
	$(".pv", c)[0].onclick = () => go(-1);
	$(".nx", c)[0].onclick = () => go(1);
	c.tabIndex = 0;
	c.onkeydown = e => {
		if (e.key === "ArrowLeft") go(-1);
		if (e.key === "ArrowRight") go(1);
	};
	c.addEventListener("touchstart", e => (x0 = e.touches[0].clientX), {
		passive: true,
	});
	c.addEventListener("touchend", e => {
		if (x0 === null) return;
		const d = e.changedTouches[0].clientX - x0;
		if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
		x0 = null;
	});
});
const io = new IntersectionObserver(
	es =>
		es.forEach(e => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}),
	{ threshold: 0.1 }
);
$(".card,.c,.g3 .img,.car,main>h1,main>h2,main>p,main>ol,.b").forEach(
	(el, i) => {
		el.classList.add("rv");
		el.style.animationDelay = (i % 5) * 70 + "ms";
		io.observe(el);
	}
);
