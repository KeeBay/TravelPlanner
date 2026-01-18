const BACKEND_URL = "http://localhost:3000";
let activeTourism = true;

// Szállások adatai
const szallasok = [
  { varos: "Budapest", ejszakak: 2, ar: 20000, kep: "repulogep.png" },
  { varos: "Eger", ejszakak: 3, ar: 15000, kep: "repulogep.png" },
  { varos: "Szeged", ejszakak: 1, ar: 10000, kep: "repulogep.png" },
  { varos: "Pécs", ejszakak: 4, ar: 25000, kep: "repulogep.png" },
  { varos: "Debrecen", ejszakak: 2, ar: 18000, kep: "repulogep.png" }
];

// Kártyák kirajzolása
async function renderCards(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return; 

  container.innerHTML = '';

  for (const szallas of data) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-price', szallas.ar);

    card.innerHTML = `
          <div class="card">
            <div class="city-image-wrapper">
              <img src="${szallas.kep}" alt="${szallas.varos}">
              <span class="city-label">
                <strong>${szallas.varos}</strong><br>
                <small style="font-size: 0.85em; opacity: 0.9;">${szallas.nev || ''}</small>
              </span>
            </div>
            <div class="card-info">
              <p class="ajanlas">Fedezd fel ${szallas.varos} élményeit!</p> 
              <p class="ar-label" style="font-weight:bold; margin: 5px 0;">
                ${szallas.ar} Ft / éj
              </p>
              <div class="price-btn">
                <button class="megnezem-btn">Megnézem</button>
              </div>
            </div>
          </div>
        `;
    container.appendChild(card);

    const btn = card.querySelector('.megnezem-btn');
    btn.addEventListener('click', () => openModal(szallas));
  }
}

// Modal megnyitása
function openModal(szallas) {
  const modalVaros = document.getElementById('modal-varos');
  if (modalVaros) modalVaros.textContent = szallas.varos;

  const modalWeather = document.getElementById('modal-weather');
  if (modalWeather) modalWeather.textContent = "Időjárás: betöltés...";

  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'block';

  getWeather(szallas.lat, szallas.lng, szallas);

  const mapDiv = document.getElementById('modal-map');
  if (mapDiv) {
      if (!modalMap) {
        modalMap = L.map('modal-map').setView([szallas.lat, szallas.lng], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(modalMap);
      } else {
        modalMap.setView([szallas.lat, szallas.lng], 7);
      }
      setTimeout(() => modalMap.invalidateSize(), 200);
      
      navigator.geolocation.getCurrentPosition(pos => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        if (routingControl) modalMap.removeControl(routingControl);
        
        routingControl = L.Routing.control({
            waypoints: [L.latLng(userLat, userLng), L.latLng(szallas.lat, szallas.lng)],
            routeWhileDragging: false, draggableWaypoints: false, addWaypoints: false, show: false
        }).addTo(modalMap);
      }, err => {
        if (routingControl) modalMap.removeControl(routingControl);
        L.marker([szallas.lat, szallas.lng]).addTo(modalMap);
      });
  }
}

// Modal bezárása
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
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

function updateNavigation() {
    const token = localStorage.getItem("token");
    const guestElements = document.querySelectorAll(".guest-only");
    const userElements = document.querySelectorAll(".user-only");

    if (token) {
        guestElements.forEach(el => el.style.display = "none");
        userElements.forEach(el => el.style.display = "inline-block");
    } else {
        guestElements.forEach(el => el.style.display = "inline-block");
        userElements.forEach(el => el.style.display = "none");
    }
}

async function handleLogout() {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            await fetch(`${BACKEND_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Hiba a kijelentkezés során (backend):", error);
        }
    }

    // Helyi takarítás
    localStorage.removeItem("token");
    alert("Sikeres kijelentkezés!");
    window.location.href = "index.html";
}


// Oldal betöltés után
document.addEventListener('DOMContentLoaded', async () => {

updateNavigation();

  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const logoutBtn = document.getElementById("nav-logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          handleLogout();
      });
  }

  // 🔽 Alapértelmezett kártyák megjelenítése
  renderCards(szallasok, '#combined-cards .cards-container');
  initSliders();

  // 🔽 Ár szerinti rendezés esemény
  const sortSelect = document.getElementById('sort-price');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            let sorted = sortByPrice(value);
            renderCards(sorted, '#combined-cards .cards-container');
        });
    }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const data = { email, password };
      try {
        const res = await fetch(`${BACKEND_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("token", result.data.token);
          alert("✔ Sikeres bejelentkezés!");
          window.location.href = "index.html"; 
        } else {
          alert((result.message || "Hiba a bejelentkezésnél"));
        }
      } catch (error) {
        alert("Szerver hiba!");
      }
    });
  }

  const rform = document.getElementById("regForm");
  if (rform) {
    const bDateInput = document.getElementById('b_date');
    if (bDateInput) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
        bDateInput.setAttribute('min', minDate.toISOString().split('T')[0]);
        bDateInput.setAttribute('max', today.toISOString().split('T')[0]);
    }
    const routput = document.getElementById("jsonOutput");
    
    rform.addEventListener("submit", async function (event) {
      event.preventDefault();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("A két jelszó nem egyezik!");
        return;
      }

      const data = {
        last_name: document.getElementById("vnev").value,
        first_name: document.getElementById("knev").value,
        email: document.getElementById("email").value,
        date: document.getElementById("b_date").value,
        phone_number: document.getElementById("phone").value,
        password: password,
        passwordAgain: confirmPassword
      };

      try {
        const response = await fetch(`${BACKEND_URL}/registration`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) { 
          alert("✔ Sikeres regisztráció!");
          window.location.href = "bejelentkezes.html";
        } else {
          alert("Hiba: " + (result.message || "Hiba"));
          if (routput) routput.textContent = JSON.stringify(result, null, 2);
        }
      } catch (error) {
        alert("Nem sikerült elérni a szervert!");
      }
    });
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Kérjük, jelentkezzen be!");
      window.location.href = "bejelentkezes.html";
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/profile`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok && data.user) {
        if(document.getElementById("prof-email")) document.getElementById("prof-email").value = data.user.email || "";
        if(document.getElementById("prof-vnev")) document.getElementById("prof-vnev").value = data.user.last_name || "";
        if(document.getElementById("prof-knev")) document.getElementById("prof-knev").value = data.user.first_name || "";
        if(document.getElementById("prof-date")) document.getElementById("prof-date").value = data.user.birth || "";
        if(document.getElementById("prof-phone")) document.getElementById("prof-phone").value = data.user.phone_number || "";
      } else {
        alert("Hiba a profil betöltésekor: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Nem sikerült elérni a szervert.");
    }

    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const updatedData = {
        last_name: document.getElementById("prof-vnev").value,
        first_name: document.getElementById("prof-knev").value,
        birth: document.getElementById("prof-date").value,
        phone_number: document.getElementById("prof-phone").value
      };

      try {
        const response = await fetch(`${BACKEND_URL}/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedData)
        });

        const result = await response.json();
        if (response.ok) {
          alert("✔ Adatok sikeresen frissítve!");
        } else {
          alert("Hiba: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Szerver hiba mentés közben!");
      }
    });

    const deleteBtn = document.getElementById("deleteAccountBtn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", async () => {
        if (confirm("BIZTOSAN törölni szeretnéd a fiókodat? Ez a művelet nem visszavonható!")) {
          try {
            const response = await fetch(`${BACKEND_URL}/profile`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
              alert("Fiók törölve. Viszlát!");
              localStorage.removeItem("token");
              window.location.href = "index.html";
            } else {
              alert("Hiba a törlésnél.");
            }
          } catch (err) {
            console.error(err);
            alert("Szerver hiba törlés közben!");
          }
        }
      });
    }}
});


// Városokhoz képek hozzárendelése
const cityImages = {
  "Eger": "becs.png",
  "Budapest": "becs.png",
  "Bécs": "becs.png",
  "Szeged": "becs.png",
  "Prága": "becs.png"
};

// Kártyák kiválasztása
const cards = document.querySelectorAll(".destination-card");

// Végigmegyünk a kártyákon és beállítjuk a háttérképet
cards.forEach(card => {
  const cityName = card.textContent.trim();

  if (cityImages[cityName]) {
    card.style.backgroundImage = `url(${cityImages[cityName]})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.color = "white"; // szöveg jól látszódjon
    card.style.textShadow = "1px 1px 3px black"; // kontraszt
    card.style.minHeight = "120px"; // legyen hely a képnek
    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.justifyContent = "center";
  }
});
