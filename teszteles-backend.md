**TravelPlanner**

**Projekt neve:** TravelPlanner

**Fejlesztők:** Erdei Gábor, Klubert Bálint

Dátum 2025.12.02

Tesztelési környezet:

**Operációs Rendszer:** Windows 11

**Programozási nyelv(ek):** PHP, JavaScript, MYSQL, CSS/HTML, JSON

**Programozási felület:** Visual Studio Code

**Tesztelési eszköz:** POSTMAN

## Regisztráció, Bejelentkezés, Kijelentkezés (registrationController.js, loginController.js)

| **TESZT ID** | **TESZTLEÍRÁSA** | **BEMENET/LÉPÉS** | **VÁRT**<br><br>**EREDMÉNY** | **KAPOTT**<br><br>**EREDMÉNY** | **OK?** |     |
| --- | --- | --- | --- | --- | --- | --- |
| **TC00** | **Regisztrációs kérés beérkezése** | **"Regisztráció gombra kattintás" (szimulálás)** | **Az adatok JSON formátumban beérkeznek** | **Az adatok JSON formátumban beérkeznek** | **OK** |     |
| **TC01** | **Regisztrációs hiba, ha a backend nem fut** | **"Regisztráció gombra kattintás" (szimulálás)** | **Előre megírt Hibaüzenet** | **Postman által jelzett hiba** | **OK** | **Javítva: 2025. 12.11** |
| **TC02** | **Regisztrációs hiba, ha az adatbázis nem fut** | **"Regisztráció gombra kattintás" (szimulálás)** | **Az adatbázissal való kapcsolat sikertelen!** | **Az adatbázissal való kapcsolat sikertelen!** | **OK** |     |
| **TC03** | **Nem megfelelően kitöltött adatok, a restrictions.js működése** | **Regisztrációs adatok beérkezése** | **A restrictions A megfelelő hibát dobja vissza, egyébként létrejön a felhasználó az adatbázisban** | **A restrictions A megfelelő hibát dobja vissza, egyébként létrejön a** | **OK** |     |

| **TC04** | **Bejelentkezési adatok ellenőrzése** | **Létező felhasználó név, és hozzátartozó jelszó** | **A**<br><br>**bejelentkezés gombra**<br><br>**kattintva bedob a megfelelő profilba a megfelelő jelszóval és felhasználó név vagy email megadásával** | **Bedob a megfelelő profilra** | **OK** |     |
| --- | --- | --- | --- | --- | --- | --- |
| **TC05** | **Hibás adatok kezelése** | **Rossz felhasználó név, vagy rossz jelszó** | **Hibás felhasználó név esetén vagy jelszó esetén hiba üzenet jelenik**<br><br>**meg** | **Nem ír ki hiba üzenetet, csak törli a sorokat** | **OK** | **Javítva: 2025. 12.11** |
| **TC06** | **Jelszó titkosítás** | **Jelszó**<br><br>**megadása** | **Adatbázisba titkosítva jelenik meg a jelszó** | **Olvasható állapotba jelenik meg a jelszó** | **OK** | **Javítva: 2025. 12.13** |
| **TC07** | **"Kijelentkezés" gomb** | **"Kijelentkezés" gombra**<br><br>**kattintás** | **Visszadob a kezdő lapra** | **Kezdő lapra dob vissza** | **OK** |     |

## Profil Kezelés (userController.js)

A tesztek előfeltétele: A felhasználó sikeresen bejelentkezett, és rendelkezik érvényes JWT tokennel (Authorization: Bearer &lt;token&gt;).

| **TESZT ID** | **TESZT LEÍRÁSA** | **BEMENET/LÉPÉS** | **VÁRT EREDMÉNY** | **KAPOTT EREDMÉNY** | **OK?** | **MEGJEGYZÉS** |
| --- | --- | --- | --- | --- | --- | --- |
| **TC01** | **Profil adatok lekérése (Sikeres)** | **GET /profile hívás érvényes tokennel** | **200 OK státusz. JSON válaszban a felhasználó adatai (név, email, születés, tel). A jelszó mező NEM szerepelhet.** | **A szerver visszaadja a felhasználó adatait, jelszó nélkül.** | **OK** |     |
| **TC02** | **Profil adatok lekérése (Hibás/Lejárt token)** | **GET /profile hívás érvénytelen vagy lejárt tokennel** | **401 Unauthorized hibaüzenet (authMiddleware kezeli).** | **"Érvénytelen vagy lejárt token" hibaüzenet.** | **OK** |     |
| **TC03** | **Profil módosítása - Egy mező (Telefon)** | **PUT /profile hívás. Body: {"phone_number": "+36709999999"}** | **200 OK státusz. Üzenet: "Adatok sikeresen frissítve!". Az adatbázisban csak a telefonszám változik.** | **Sikeres válasz, adatbázisban frissült a szám.** | **OK** |     |
| **TC04** | **Profil módosítása - Több mező** | **PUT /profile hívás. Body: {"first_name": "ÚjNév", "birth": "2000-01-01"}** | **200 OK státusz. Az adatbázisban a keresztnév és a születési idő frissül.** | **Sikeres válasz, adatok frissítve.** | **OK** |     |
| **TC05** | **Profil módosítása - Üres body** | **PUT /profile hívás. Body: {} (üres JSON)** | **200 OK státusz. Üzenet: "Adatok sikeresen frissítve!".** | **Sikeres válasz, de semmi nem változik az adatbázisban.** | **OK** |     |
| **TC06** | **Profil módosítása - Nem létező User ID** | **PUT /profile hívás olyan tokennel, amelyben lévő ID már nincs az adatbázisban (pl. manuálisan törölték).** | **404 Not Found. Üzenet: "Felhasználó nem található."** | **Hibaüzenet: "Felhasználó nem található."** | **OK** |     |
| **TC07** | **Fiók törlése (Sikeres)** | **DELETE /profile hívás érvényes tokennel.** | **200 OK státusz. Üzenet: "Fiók sikeresen törölve."** | **Sikeres válasz, a user eltűnik a Users táblából.** | **OK** |     |
| **TC08** | **Fiók törlése (Már törölt fiók)** | **DELETE /profile hívás (ismételt hívás az előző teszt után, ugyanazzal a tokennel).** | **404 Not Found. Üzenet: "Felhasználó nem található."** | **Hibaüzenet: "Felhasználó nem található."** | **OK** |     |