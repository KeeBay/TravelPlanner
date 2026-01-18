# **TravelPlanner - Integrációs Tesztelési Dokumentáció**

**Projekt neve:** TravelPlanner

**Fejlesztők:** Erdei Gábor, Klubert Bálint

**Dátum:** 2026.01.17.

**Tesztelési környezet:**

- **Típus:** Integrációs / Életciklus Teszt (End-to-End)

## Integrációs tesztesetek - Felhasználói Életciklus

(Regisztráció -> Login -> Profil -> Logout -> Biztonsági ellenőrzés)

| **TESZT ID** | **TESZT LEÍRÁSA** | **BEMENET** | **VÁRT EREDMÉNY** | **KAPOTT EREDMÉNY** | **OK?** | **MEGJEGYZÉS** |
| --- | --- | --- | --- | --- | --- | --- |
| ITC01 | Regisztráció (Új felhasználó) | **POST /registration Body: Valid JSON (pl. "Teszt", "Elek", "<teszt@elek.hu>", "Jelszo123!", "2000-01-01")** | **201 Created. Válaszban success: true és a létrehozott user objektum.** | **Sikeres létrehozás, user ID generálva.** | **OK** |     |
| ITC02 | Bejelentkezés (A fenti felhasználóval) | **POST /login**<br><br>**Body: {"email": "<teszt@elek.hu>", "password": "Jelszo123!"}** | **200 OK. Válaszban token mező (JWT string).** | **Token sikeresen megérkezett.** | **OK** |     |
| ITC03 | Profil lekérése (Tokennel) | **GET /profile Header: Authorization: Bearer &lt;TOKEN&gt; (az ITC02-ből)** | **200 OK. A válaszban a regisztrációnál megadott "Teszt", "Elek" nevek láthatóak.** | **Helyes adatokat ad vissza a szerver.** | **OK** |     |
| ITC04 | Profil módosítása (Folyamatban) | **PUT /profile Header: Bearer &lt;TOKEN&gt;. Body: {"phone_number": "+36301234567"}** | **200 OK. Üzenet: "Adatok sikeresen frissítve!".** | **Sikeres válasz.** | **OK** |     |
| ITC05 | Módosítás ellenőrzése | **GET /profile Header: Bearer &lt;TOKEN&gt;** | **200 OK. A visszaadott JSON-ben a phone_number már "+36301234567".** | **Az adatbázisban ténylegesen megtörtént a változás.** | **OK** |     |
| ITC06 | Kijelentkezés | **POST /logout Header: Bearer &lt;TOKEN&gt;** | **200 OK. Üzenet: "Successful Logout!".** | **Sikeres válasz.** | **OK** |     |
| ITC07 | Újbóli belépés (Törlés előkészítése) | **POST /login (Ugyanazokkal az adatokkal)** | **200 OK. Új, érvényes token2 érkezik.** | **Új token generálva.** | **OK** |     |
| ITC08 | Fiók törlése (Cleanup) | **DELETE /profile Header: Bearer &lt;TOKEN2&gt;** | **200 OK. Üzenet: "Fiók sikeresen törölve."** | **Sikeres törlés.** | **OK** |     |
| ITC09 | Törlés ellenőrzése | **POST /login (A törölt adatokkal)** | **401 Unauthorized. Üzenet: "Invalid Email" vagy hasonló auth hiba.** | **Nem enged belépni törölt fiókkal.** | **OK** |     |

# TravelPlanner - Hotel Keresés Integrációs Teszt

**Projekt neve:** TravelPlanner

**Fejlesztők:** Erdei Gábor, Klubert Bálint

**Dátum:** 2026.01.18.

**Tesztelési környezet:**

- **Típus:** Integrációs Teszt (Backend + External API + Frontend flow)

## Integrációs tesztesetek - Szálláskeresés Modul

(Frontend kérés -> Controller -> API Hívás -> Adatfeldolgozás -> Válasz)

| **TESZT ID** | **TESZT LEÍRÁSA** | **BEMENET/LÉPÉS** | **VÁRT EREDMÉNY** | **KAPOTT EREDMÉNY** | **OK?** | **MEGJEGYZÉS** |
| --- | --- | --- | --- | --- | --- | --- |
| **ITC11** | **Keresés indítása - Világváros (API teszt)** | GET /hotels?query=Paris&guests=2 | 200 OK. JSON | Sikeres válasz, valós hotelek listázva. | OK  |     |
| **ITC12** | **Keresés indítása** | GET /hotels?query=Eger | 200 OK. | Sikeres válasz, de nincs hotel  <br>„Nem találtunk szállást ezen a helyen." Az Amadeus korlátai miatt. | OK  | .   |
| **ITC13** | **Hiányzó paraméter kezelése** | GET /hotels (Query paraméter nélkül) | 400 Bad Request. A frontend nem engedi elküldeni (required) | Helyes hibaüzenet érkezett. | OK  |     |
| **ITC14** | **Frontend integráció - Kártyák megjelenítése** | Böngészőben: Keresőbe beírni: "Debrecen" -> Keresés gomb. | A renderCards függvény lefut, a div.card elemek megjelennek a #combined-cards konténerben. Kép, név és ár látható. | A kártyák megjelentek az oldalon. | OK  |     |
| **ITC15** | **Részletek Modal megnyitása (Frontend)** | Kattintás egy "Megnézem" gombra a találati listában. | A openModal függvény lefut, a felugró ablakban megjelenik a szállás neve és a térkép (Leaflet) inicializálódik. | Modal megnyílt, térkép betöltött. | OK  |     |