// Szállások adatai
const szallasok = [
  { varos: "Budapest", ejszakak: 2, ar: 20000, kep: "images/budapest.jpg" },
  { varos: "Eger", ejszakak: 3, ar: 15000, kep: "images/eger.jpg" },
  { varos: "Szeged", ejszakak: 1, ar: 10000, kep: "images/szeged.jpg" },
  { varos: "Pécs", ejszakak: 4, ar: 25000, kep: "images/pecs.jpg" },
  { varos: "Debrecen", ejszakak: 2, ar: 18000, kep: "images/debrecen.jpg" }
];

// Kártyák kirajzolása
function renderCards(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  data.forEach(szallas => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-price', szallas.ar); // 🔽 ár attribútum a rendezéshez

    card.innerHTML = `
      <div class="city">
        <img src="${szallas.kep}" alt="${szallas.varos}">
        <span><strong>${szallas.varos}</strong></span>
      </div>
      <span>${szallas.ejszakak} éjszaka</span>
      <div class="price-btn">
        <span>${szallas.ar.toLocaleString()} Ft</span>
        <button class="megnezem-btn">Megnézem</button>
      </div>
    `;
    container.appendChild(card);

    // Modal megnyitása gombnyomásra
    const btn = card.querySelector('.megnezem-btn');
    btn.addEventListener('click', () => openModal(szallas));
  });
}

// Modal megnyitása
function openModal(szallas) {
  document.getElementById('modal-img').src = szallas.kep;
  document.getElementById('modal-varos').textContent = szallas.varos;
  document.getElementById('modal-ejszakak').textContent = `Éjszakák száma: ${szallas.ejszakak}`;
  document.getElementById('modal-ar').textContent = `Ár: ${szallas.ar.toLocaleString()} Ft`;
  document.getElementById('modal').style.display = 'block';
}

// Modal bezárása
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Ár szerinti rendezés
function sortByPrice(order) {
  let sorted = [...szallasok];
  if (order === 'asc') {
    sorted.sort((a, b) => a.ar - b.ar);
  } else if (order === 'desc') {
    sorted.sort((a, b) => b.ar - a.ar);
  }
  return sorted;
}

// Slider funkció
function initSliders() {
  const sliders = document.querySelectorAll('.slider-wrapper');

  sliders.forEach(slider => {
    const container = slider.querySelector('.cards-container');
    const btnLeft = slider.querySelector('.slide-btn.left');
    const btnRight = slider.querySelector('.slide-btn.right');

    if (!container || !btnLeft || !btnRight) return;

    const scrollAmount = container.clientWidth / 1.2;

    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

// Oldal betöltés után
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('close-btn').addEventListener('click', closeModal);

  // 🔽 Alapértelmezett kártyák megjelenítése
  renderCards(szallasok, '#combined-cards .cards-container');
  initSliders();

  // 🔽 Ár szerinti rendezés esemény
  const sortSelect = document.getElementById('sort-price');
  sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    let sorted;

    if (value === 'asc' || value === 'desc') {
      sorted = sortByPrice(value);
    } else {
      sorted = [...szallasok]; // eredeti sorrend
    }

    renderCards(sorted, '#combined-cards .cards-container');
    initSliders();
  });
});
