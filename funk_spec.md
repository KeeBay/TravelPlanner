**Funkcionális specifikáció**

**Projekt neve:** TravelPlanner - Utazástervező Rendszer **Dátum:** 2026.01.15. **Készítette:** Hallgatói projektcsapat

**1\. Bevezetés**

Ez a dokumentum a TravelPlanner webes alkalmazás funkcionális működését írja le. Célja, hogy pontosan meghatározza, a rendszer milyen funkciókat biztosít a szálláskeresés és utazástervezés során, hogyan viselkedik a felhasználói interakciók alkalmával, és milyen adatokat kezel.

**2\. Rendszeráttekintés**

A rendszer egy böngészőből elérhető webes alkalmazás. A látogatók szabadon kereshetnek szállásokat valós idejű adatok alapján, a regisztrált felhasználók pedig bejelentkezés után hozzáférhetnek a profilkezeléshez, az eseménynaptárhoz és a személyre szabott (AI által generált) ajánlásokhoz.

**3\. Felhasználói felületek**

**3.1 Bejelentkezés és Regisztráció képernyő**

**Mezők (Bejelentkezés):** Email cím, Jelszó. **Mezők (Regisztráció):** Vezetéknév, Keresztnév, Email cím, Születési idő, Telefonszám, Jelszó, Jelszó megerősítése.

**Műveletek:**

- **Belépés:** Ha sikeres, átirányítás a főoldalra, a navigációs sáv megváltozik.
- **Regisztráció:** Validáció (jelszó erősség, email formátum) után új fiók létrehozása.
- **Hibaüzenetek:** Hibás adatok esetén üzenet: „Hibás email vagy jelszó", „A két jelszó nem egyezik".

**3.2 Főoldal (Szálláskereső)**

**Szűrők:** Város neve, Utazás kezdete, Vége, Vendégek száma (legördülő lista). **Műveletek:**

- **Szűrés gomb:** Indítja a keresést a megadott paraméterekkel.
- **Turizmus mód:** Kapcsoló gomb „Aktív turizmus" és „Passzív turizmus" között (befolyásolja az AI ajánlásokat).
- **Rendezés:** Találatok rendezése ár szerint (növekvő/csökkenő).
- **Lapozás:** Slider nyilak a kártyák közötti váltáshoz. **Kártya adatai:** Város neve, Szállás neve, Reprezentatív kép, Ár (Ft/éj), Rövid AI ajánló.

**3.3 Részletek (Modal) ablak**

**Mezők:**

- Szállás neve és helyszíne.
- **Időjárás:** 5 napos előrejelzés ikonokkal és hőmérséklettel.
- **Térkép:** Interaktív térkép a szállás pozíciójával és útvonallal.
- **Programajánló:** Szöveges leírás (esős idő vagy választott turizmus típus alapján). **Műveletek:**
- **Bezárás:** Visszalépés a főoldalra az „X" gombbal vagy a háttérre kattintva.

**3.4 Profil oldal**

**Mezők:**

- Email cím (nem szerkeszthető, szürke háttérrel).
- Vezetéknév
- Keresztnév
- Születési idő (dátumválasztó)
- Telefonszám **Műveletek:**
- **Mentés:** A módosított adatok frissítése az adatbázisban.
- **Fiók törlése:** Megerősítő kérdés után a felhasználó végleges törlése és kijelentkeztetés.

**4\. Funkcionális folyamatok**

**4.1 Szállás keresése**

- Felhasználó a főoldalon beírja a várost (pl. "Bécs") és kiválasztja a dátumokat.
- A rendszer a háttérben azonosítja a várost (pl. Bécs → VIE kód).
- Lekéri az elérhető szállásokat és árakat a külső API-tól (Amadeus).
- A találatok megjelennek kártyák formájában a képernyőn.

**4.2 Részletek és Útvonaltervezés**

- Felhasználó a kártyán a „Megnézem" gombra kattint.
- Megnyílik a részletek ablak.
- A rendszer lekéri az aktuális időjárást (OpenWeatherMap).
- A rendszer lekéri a felhasználó GPS koordinátáit a böngészőtől.
- A térképen (Leaflet) megjelenik a kék útvonal a felhasználó és a szállás között.

**4.3 AI Programajánlás**

- A rendszer érzékeli a választott várost és a turizmus típusát (Aktív/Passzív).
- Esős időjárás-előrejelzés esetén automatikusan beltéri programot keres.
- A backend elküldi a kérést az AI modellnek (Hugging Face).
- A generált szöveg megjelenik a felhasználó számára.

**5\. Adatmodell (egyszerűsített)**

**Felhasználó (Users)**

- user_id (Egyedi azonosító)
- email (Belépési azonosító)
- password (Titkosítva)
- first_name, last_name
- birth, phone_number

**Feketelista (Blacklist)**

- token (Érvénytelenített JWT token)
- expiresAt (Lejárat ideje)

_(Megjegyzés: A szállások adatai nem kerülnek mentésre a helyi adatbázisban, azokat valós időben kérjük le külső szolgáltatótól.)_

**6\. Példa UML diagramok**

**6.1 Használatieset-diagram (egyszerűsített)**

- **Látogató** → \[Keresés\]
- **Látogató** → \[Regisztráció\]
- **Felhasználó** → \[Bejelentkezés\]
- **Felhasználó** → \[Profil szerkesztése\]
- **Felhasználó** → \[Naptár megtekintése\]
- **Adminisztrátor (Rendszer)** → \[Lejárt tokenek törlése\]

**6.2 Egyszerű aktivitásdiagram - „Bejelentkezés"**

Start → Email és Jelszó megadása → "Belépés" gomb → Adatok ellenőrzése DB-ben →

- _Ha hibás:_ Hibaüzenet megjelenítése → Vissza a mezőkhöz.
- _Ha helyes:_ Token generálása → Token mentése kliens oldalon → Átirányítás Index oldalra → Menüsor frissítése → End.

**7\. Rendszerkövetelmények**

- **Böngésző:** Chrome, Firefox, Edge legfrissebb verzió (JavaScript engedélyezése kötelező).
- **Képernyőméret:** Reszponzív (mobil és asztali támogatás).
- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js + Express.js.
- **Adatbázis:** MariaDB.

**8\. Elfogadási kritériumok**

- A kereső felismeri a magyar ékezetes városneveket (pl. Párizs, Bécs) és helyes találatokat ad.
- Bejelentkezés nélkül a "Profil" és "Naptár" menüpontok nem láthatók.
- A regisztráció során a rendszer validálja az email formátumát és a jelszó erősségét.
- Minden profilmódosítás azonnal frissül az adatbázisban.

**9\. Jövőbeli funkciók**

- Szállásfoglalás és fizetés közvetlen lebonyolítása az oldalon.
- Kedvenc szállások mentése ("Kedvencek" lista).
- Repülőjegy-keresés integrálása.
- Email értesítés a sikeres regisztrációról.