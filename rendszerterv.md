**Rendszerterv**

**1\. Architekturális áttekintés**

A rendszer egy háromrétegű (3-tier) architektúrát követ, amely biztosítja a felhasználói felület, az üzleti logika és az adattárolás szétválasztását.

- **Kliens réteg (Frontend):** A felhasználó böngészőjében futó statikus weboldalak, amelyek JavaScript segítségével dinamikusan kommunikálnak a szerverrel. Felelős az adatok megjelenítéséért és a felhasználói interakciók kezeléséért.
- **Logikai réteg (Backend):** A Node.js alapú szerveralkalmazás, amely Express keretrendszert használ. Ez a réteg dolgozza fel a kéréseket, végzi a hitelesítést, kommunikál az adatbázissal és a külső API-kkal (Amadeus, Hugging Face), valamint implementálja az üzleti logikát.
- **Adatbázis réteg:** Relációs adatbázis (MariaDB), amely tárolja a felhasználói adatokat és a rendszer működéséhez szükséges információkat.

**Adatkapcsolat:** A kliens és a szerver között HTTPS protokollon keresztül, JSON formátumú adatcsere zajlik (REST API).

**2\. Adatbázis-terv**

Az adatbázis (MariaDB) két fő táblát tartalmaz a felhasználók és a biztonságos kijelentkezés kezelésére. A modellezést Sequelize ORM végzi.

**Users tábla (Felhasználók)**

- user_id (PK, String/UUID): Egyedi azonosító.
- first_name (String): Keresztnév.
- last_name (String): Vezetéknév.
- email (String, Unique): E-mail cím, egyben a felhasználónév.
- password (String): Titkosított jelszó (Hash).
- birth (DateOnly): Születési dátum.
- phone_number (String, Unique): Telefonszám.
- createdAt, updatedAt (DateTime): Időbélyegek.

**Blacklist tábla (Tiltólista)**

- id (PK, Integer, Auto Increment): Belső azonosító.
- token (String): A kijelentkezés során érvénytelenített JWT token.
- expiresAt (Date): A token eredeti lejárati ideje (a törléshez).

**3\. Modulstruktúra**

A backend alkalmazás moduláris felépítésű a könnyebb karbantarthatóság érdekében.

- **Controllers (Vezérlők):** Kezelik a bejövő kéréseket és válaszokat.
  - authController: Regisztráció, bejelentkezés, kijelentkezés.
  - userController: Profil adatok lekérése, módosítása, törlése.
  - hotelSearchController: Szálláskeresés, városkód-fordítás, árkalkuláció.
  - aiController: AI ajánlások generálása.
- **Models (Modellek):** Adatbázis sémák definíciói (userModel, blacklistModel).
- **Routes (Útvonalválasztók):** API végpontok definiálása és összekapcsolása a vezérlőkkel (loginRoute, registrationRoute, userRoute, hotelRoute, aiRoute).
- **Middlewares (Köztes rétegek):**
  - authMiddleware: JWT token ellenőrzése és jogosultságkezelés.
- **Utils/Services:**
  - dbConnection: Adatbázis kapcsolat kezelése.
  - scheduledDeleteFromBlackList: Cron job a lejárt tokenek törlésére.

**4\. Interfészek és API-k**

A rendszer REST API interfészt biztosít a frontend számára, és külső szolgáltatásokat integrál.

**Belső API Végpontok**

- POST /registration: Új felhasználó regisztrálása.
- POST /login: Bejelentkezés és token generálás.
- POST /logout: Kijelentkezés (token tiltólistára helyezése).
- GET /profile: Profiladatok lekérése (Védett).
- PUT /profile: Profiladatok módosítása (Védett).
- DELETE /profile: Fiók törlése (Védett).
- GET /hotels: Szállások keresése (Védett, paraméterek: query, dates, guests).
- POST /ai: AI ajánlás kérése (Védett).

**Külső API Kapcsolatok**

- **Amadeus API:** Szálláslisták (/reference-data/locations/hotels/by-city) és árajánlatok (/shopping/hotel-offers) lekérése.
- **Hugging Face API:** GPT-2 modell használata szöveggeneráláshoz (/models/gpt2).
- **OpenWeatherMap API:** Időjárás adatok lekérése (kliens oldalon).

**5\. Biztonsági megoldások**

- **Hitelesítés:** JSON Web Token (JWT) alapú azonosítás. A tokenek rövid élettartamúak (1 óra).
- **Jelszóvédelem:** A jelszavakat soha nem tároljuk nyílt szövegként; a rendszer bcrypt algoritmust használ a hasheléshez (salt rounds: 10).
- **Token érvénytelenítés:** Kijelentkezéskor a token egy adatbázis alapú feketelistára (Blacklist) kerül, amelyet a rendszer minden védett kérésnél ellenőriz.
- **Validáció:** Szigorú bemeneti validáció a Joi könyvtárral (pl. jelszó komplexitás, e-mail formátum, XSS védelem).
- **CORS:** Cross-Origin Resource Sharing szabályozása a frontend hozzáférés engedélyezésére.

**6\. Telepítési és futtatási környezet**

- **Backend:** Node.js (v18+) futtatókörnyezet.
- **Adatbázis szerver:** MariaDB (vagy MySQL) szerver, amely a 3306-os porton figyel.
- **Webszerver:** Express.js, alapértelmezetten a 3000-es porton fut.
- **Függőségkezelés:** npm (Node Package Manager).
- **Környezeti változók:** Érzékeny adatok (API kulcsok, DB jelszavak) .env fájlból vagy környezeti változókból kerülnek beolvasásra.