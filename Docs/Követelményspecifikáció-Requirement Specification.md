1.  **Áttekintés**

A weboldal célja a bel-és külföldi utazások egyszerűbb és átláthatóbb
megtervezése. Az oldalon keresés, térkép alapú áttekintés, és ajánlás
alapján kereshetünk és választhatunk programokat, szállásokat,
éttermeket. Az oldal közösségi funkcióinak hála véleményezhetjük azokat
és fotókkal tudjuk bővíteni a helyekről alkotott képet. Ha nincs pontos
ötletünk, az AI funkcióknak hála vagy ajánlásokat kérhetünk, vagy teljes
utazásokat tervezhetünk pár kattintással. A fiókunkon belül
megtalálhatjuk utazásainkat, fényképeinket, és egy mini térképet, ami
azt mutatja, hány országban is jártunk.\
A rendszer modern webes technológiákra épül (Next.js, React), reszponzív
kialakítású, így asztali gépen és mobilon is teljesértékű élményt nyújt.
Az adatok tárolását relációs adatbázis (SQL) végzi, a térképi
megjelenítést a Mapbox API biztosítja.

2.  **Jelenlegi helyzet**

Jelenleg egy utazástervezés hosszú és időigényes feladat. A foglalások,
programok mind külön-külön oldalon jelennek meg, ezek összegyűjtése és
számontartása hosszadalmas és olykor nehézkes, átláthatatlan feladat.
Egyszerre kell követnünk az adott szállásoldalakat, az árakat, az
érkezési időket, a programokat és minden egyéb fontos információt,
emiatt könnyebben tudunk elfelejteni dolgokat és belekavarodni azokba.

3.  **Vágyálom rendszer**

A projekt célja egy olyan felület biztosítása, amelyen kényelmesen
tudjuk megtervezni utazásainkat bárhova a világba.\
Az oldal felkeresésekor a felhasználó szabadon megtekintheti a térképet,
böngészhet az országok által ajánlott lehetőségek között, elolvashatja a
regisztrált felhasználók értékeléseit, láthatja a képeiket amiket
megosztottak.\
Regisztráció után megtervezheti saját utazását, azokhoz kis
megjegyzéseket tud tenni magának, használhatja az AI funkciókat,
terveiket az oldalon elmenthetik és profilukon keresztül bármikor
megtekinthetik azt. Itt tudják továbbá adataikat módosítani, a
beállításokhoz hozzáférni, személyes térképükhöz hozzáférni.\
A felülethez tartozik egy admin felület is, amelyen keresztül a
bejelentkezett adminok láthatják a tevékenységeket, ezzel kiszűrve és ha
kell eltávolítva a normáknak nem megfelelő tartalmakat, szövegeket,
képeket (pl.: erőszak, szexualitás ábrázolása).

4.  **Funkcionális követelmények**

Felhasználói funkciók: Regisztráció, profil hozzáférése a bejelentkezés
után, térkép használat, helyek és az azokhoz tartozó megjegyzések és
értékelések megtekintése, bejelentkezés után saját megjegyzés és
értékelés írása, utazás tervezése manuálisan, AI programajánló
használata, AI segített tervezés használata, saját térképhez való
hozzáférés, beállítások (pl.: értesítések kezelése, sötét mód)
feltöltött képek megtekintése, fiók törlése

Admin funkciók: Megosztott tartalmakhoz, értékelésekhez, képekhez
történő hozzáférés, azok törlése abban az esetben, ha azok nem felelnek
meg az előírásoknak, fiókok felfüggesztése, törlése abban az esetben, ha
nem felel meg a használat az előírásoknak.

5.  **Rendszerre vonatkozó törvények, szabványok, ajánlások**

GDPR (Adatvédelem): Mivel az alkalmazás személyes adatokat (név, e-mail
cím, utazási szokások, fényképek) kezel, a rendszernek meg kell felelnie
az Európai Unió Általános Adatvédelmi Rendeletének (GDPR). A jelszavakat
titkosítva (hash) tároljuk, a felhasználónak joga van adatai törlését
kérni (\"elfeledtetés joga\"), amelyet a \"Fiók törlése\" funkció
biztosít.\
Szerzői jog (Copyright): A felhasználók által feltöltött tartalmakért
(szöveges értékelések, fényképek) a feltöltő felel. A rendszer
üzemeltetője vállalja, hogy a szerzői jogot sértő vagy jogellenes
tartalmakat (pl. más szellemi tulajdona engedély nélkül) észlelés vagy
bejelentés után eltávolítja (Notice and Takedown elv).

6.  **Jelenlegi üzleti folyamatok modellje**

A mai világban egy utazás rendes, átfontolt és átlátható megszervezése
időigényes, sokszor bonyolult és olykor akár nehezen is követhető a
rengeteg oldal, keresés, információ miatt. Az így is megoszló figyelmünk
el tud veszni a folyamatban, így akár hibák is becsúszhatnak. Az
oldalak, van, hogy nem kommunikálnak egymással, így adatokat sem tudunk
átkérni, megspórolva magunknak időt és energiát.

7.  **Igényelt üzleti folyamatok**

A megrendelő a főoldalon egy rövid ismertetőt szeretne látni, és egy
biztatást a közösséghez való csatlakozásra, vagyis a regisztrációra. Egy
új oldalon van lehetőség bejelentkezni és regisztrálni. Külön oldalakon
tudjuk megtekinteni a szállás, étterem és elfoglaltság lehetőségeket, és
a térképet, ahol nyugodtan tudunk böngészni. Szintén külön oldalon,
bejelentkezés után tudunk hozzáférni az utazások szervezéséhez, profil
oldalunkon pedig a tervezett túrákat érjük el, hogy megtekintsük,
módosítsuk, vagy töröljük utainkat. Külön ponton láthatjuk
foglalásainkat is, legyen az bármilyen jellegű, szűrési lehetőséggel,
ahogy a beérkező üzeneteket is. Szintén a profilon érjük el a
térképünket, ahol be tudjuk jelölni, hogy mely országokban jártunk.\
Fontos megemlíteni

8.  **Követelménylista**

  -------------------------------------------------------------------------------------
  **Modul**         **ID**   **Név**              **v.**   **Kifejtés**
  ----------------- -------- -------------------- -------- ----------------------------
  Jogosultság       K1       Regisztráció         1.0      A felhasználó e-mail cím,
                                                           felhasználónév és jelszó
                                                           megadásával regisztrálhat. A
                                                           rendszer ellenőrzi, hogy az
                                                           e-mail cím foglalt-e már. A
                                                           jelszót titkosítva tároljuk.
                                                           Lehetőség van Google fiókkal
                                                           történő gyors regisztrációra
                                                           is.

  Jogosultság       K2       Bejelentkezés        1.0      A regisztrált felhasználó
                                                           e-mail cím és jelszó
                                                           párossal, vagy Google
                                                           fiókkal léphet be.
                                                           Sikertelen belépés esetén
                                                           hibaüzenetet kap.

  Profil            K3       Profilkezelés        1.0      A felhasználó módosíthatja
                                                           adatait, profilképét. Itt
                                                           tekintheti meg a
                                                           \"Meglátogatott országok\"
                                                           térképét, amelyet a rendszer
                                                           az utazásai alapján
                                                           automatikusan vagy manuális
                                                           jelölés alapján frissít.

  Térkép            K4       Interaktív keresés   1.0      A felhasználó a Mapbox alapú
                                                           térképen kereshet városokra,
                                                           látványosságokra. A térképen
                                                           a helyszínekre kattintva
                                                           információs buborék jelenik
                                                           meg a részletekkel.

  Tervezés          K5       Új utazás            1.0      A felhasználó létrehozhat
                             létrehozása                   egy új utazást névvel és
                                                           dátumintervallummal. Az
                                                           utazás lehet \"Privát\" vagy
                                                           \"Publikus\".

  Tervezés          K6       Program hozzáadása   1.0      A felhasználó a térképről
                                                           vagy keresőből kiválasztott
                                                           helyszíneket (szállás,
                                                           étterem, múzeum)
                                                           hozzáadhatja a tervezett
                                                           utazásának adott napjához.

  AI Funkció        K7       AI Ajánló            1.0      Ha a felhasználó manuálisan
                                                           tervez, kérhet egy-egy
                                                           programhoz ajánlást (pl.
                                                           \"Ajánlj éttermet a
                                                           közelben\"). Az AI a
                                                           helyszín és a felhasználó
                                                           preferenciái (aktív/passzív)
                                                           alapján javaslatot tesz.

  AI Funkció        K8       AI Tervezőgenerátor  1.0      A felhasználó megadja az úti
                                                           célt, az időtartamot és a
                                                           stílust (pl. \"Róma, 3 nap,
                                                           művészet\"). A rendszer
                                                           (Google Gemini API) generál
                                                           egy komplett napi bontású
                                                           útitervet, amit elmenthet
                                                           saját utazásként.

  Közösség          K9       Véleményezés         1.0      A felhasználó szöveges
                                                           értékelést írhat és
                                                           csillagos értékelést adhat
                                                           helyszínekhez.

  Közösség          K10      Képfeltöltés         1.0      A felhasználó fotókat
                                                           tölthet fel az adott
                                                           helyszínhez vagy a saját
                                                           utazási naplójához. A képek
                                                           megjelennek a profilja alatt
                                                           egy galériában.

  Admin             K11      Tartalomfelügyelet   1.0      Az adminisztrátor
                                                           jogosultsággal rendelkező
                                                           felhasználó törölheti a
                                                           szabálysértő kommenteket,
                                                           képeket vagy felfüggesztheti
                                                           a felhasználókat.

  Beállítások       K12      Megjelenítés         1.0      A felhasználó válthat a
                                                           világos és sötét mód (Dark
                                                           Mode) között.
  -------------------------------------------------------------------------------------

9.  **Fogalomtár**

> **Next.js:** React-alapú keretrendszer, amely szerveroldali
> renderelést is biztosít.
>
> **Node.js Express csomag:** Egy könnyű, rugalmas és minimalista webes
> alkalmazás-keretrendszer Node.js-hez, amelyet webes alkalmazások,
> API-k és mobil backendek hatékony fejlesztésére terveztek.
>
> **Prisma:** Modern ORM eszköz az adatbázis-kapcsolatok kezeléséhez.
>
> **Mapbox API:** Térképi szolgáltatás és keresőmotor.
>
> **JSON:** Adatcsere formátum, amit az AI és az adatbázis közötti
> kommunikációhoz
>
> használunk.

**Overview**

The purpose of the website is to make planning domestic and
international travel simpler and more transparent. On the site, users
can search for and select programs, accommodations, and restaurants
based on search queries, a map-based overview, and recommendations.
Thanks to the site\'s community features, users can review these
locations and expand the image of places with photos. If we don\'t have
a specific idea, thanks to the AI functions, we can either ask for
recommendations or plan entire trips with a few clicks. Inside our
account, we can find our trips, photos, and a mini-map showing how many
countries we have visited. The system is built on modern web
technologies (Next.js, React) and has a responsive design, providing a
full experience on both desktop and mobile. Data storage is handled by a
relational database (SQL), and map display is provided by the Mapbox
API.

**Current Situation**

Currently, travel planning is a long and time-consuming task.
Reservations and programs appear on separate websites; collecting and
keeping track of them is a lengthy and sometimes difficult, opaque task.
We have to monitor specific accommodation sites, prices, arrival times,
programs, and all other important information simultaneously, making it
easier to forget things and get confused.

**Desired System (Vision)**

The goal of the project is to provide an interface where we can
comfortably plan our travels anywhere in the world. Upon visiting the
site, the user can freely view the map, browse opportunities recommended
by countries, read reviews from registered users, and see the photos
they have shared. After registration, they can plan their own trip, add
small notes for themselves, use AI functions, save their plans on the
site, and view them at any time via their profile. Here they can also
modify their data, access settings, and access their personal map. The
interface also includes an admin interface through which logged-in
admins can view activities, filtering and, if necessary, removing
content, texts, and images that do not meet standards (e.g., depiction
of violence, sexuality).

**Functional Requirements**

-   **User Functions:** Registration, profile access after login, map
    usage, viewing places and associated notes/reviews, writing own
    notes and reviews after login, manual trip planning, using AI
    program recommender, using AI-assisted planning, access to own map,
    settings (e.g., notification management, dark mode), viewing
    uploaded photos, deleting account.

-   **Admin Functions:** Access to shared content, reviews, and images;
    deleting them if they do not comply with regulations; suspending or
    deleting accounts if usage does not comply with regulations.

**Laws, Standards, and Recommendations Applicable to the System**

-   **GDPR (Data Protection):** Since the application handles personal
    data (name, e-mail address, travel habits, photos), the system must
    comply with the European Union\'s General Data Protection Regulation
    (GDPR). Passwords are stored encrypted (hashed), and the user has
    the right to request the deletion of their data (\"right to be
    forgotten\"), which is provided by the \"Delete Account\" function.

-   **Copyright:** The uploader is responsible for the content (text
    reviews, photos) uploaded by users. The system operator undertakes
    to remove content that infringes copyright or is unlawful (e.g.,
    others\' intellectual property without permission) upon detection or
    notification (Notice and Takedown principle).

**Model of Current Business Processes**

In today\'s world, organizing a proper, well-thought-out, and
transparent trip is time-consuming, often complicated, and sometimes
difficult to follow due to the multitude of sites, searches, and
information. Our attention, which is already divided, can get lost in
the process, allowing errors to slip in. Sometimes sites do not
communicate with each other, so we cannot transfer data to save
ourselves time and energy.

**Desired Business Processes**

The client wants to see a short introduction on the main page and
encouragement to join the community (i.e., register). There is an option
to log in and register on a new page. We can view accommodation,
restaurant, and activity options on separate pages, as well as the map
where we can browse freely. Also on a separate page, after logging in,
we can access trip organization, and on our profile page, we reach
planned tours to view, modify, or delete our trips. We can also see our
bookings at a separate point, regardless of their nature, with filtering
options, as well as incoming messages. We also access our map on the
profile, where we can mark which countries we have visited.

**Requirements List**

  --------------------------------------------------------------------------------------
  **Module**      **ID**   **Name**       **v.**   **Explanation**
  --------------- -------- -------------- -------- -------------------------------------
  **Auth**        K1       Registration   1.0      The user can register by providing an
                                                   e-mail address, username, and
                                                   password. The system checks if the
                                                   e-mail address is already taken. The
                                                   password is stored encrypted. Quick
                                                   registration via Google account is
                                                   also available.

  **Auth**        K2       Login          1.0      The registered user can log in with
                                                   an e-mail address and password pair,
                                                   or with a Google account. In case of
                                                   unsuccessful login, they receive an
                                                   error message.

  **Profile**     K3       Profile        1.0      The user can modify their data and
                           Management              profile picture. Here they can view
                                                   the \"Visited Countries\" map, which
                                                   the system updates automatically
                                                   based on their trips or based on
                                                   manual marking.

  **Map**         K4       Interactive    1.0      The user can search for cities and
                           Search                  attractions on the Mapbox-based map.
                                                   Clicking on locations on the map
                                                   displays an information bubble with
                                                   details.

  **Planning**    K5       Create New     1.0      The user can create a new trip with a
                           Trip                    name and date range. The trip can be
                                                   \"Private\" or \"Public\".

  **Planning**    K6       Add Program    1.0      The user can add locations
                                                   (accommodation, restaurant, museum)
                                                   selected from the map or search
                                                   engine to a specific day of their
                                                   planned trip.

  **AI Feature**  K7       AI Recommender 1.0      If the user plans manually, they can
                                                   ask for a recommendation for a
                                                   specific program (e.g., \"Recommend a
                                                   restaurant nearby\"). The AI makes a
                                                   suggestion based on the location and
                                                   the user\'s preferences
                                                   (active/passive).

  **AI Feature**  K8       AI Planner     1.0      The user provides the destination,
                           Generator               duration, and style (e.g., \"Rome, 3
                                                   days, art\"). The system (Google
                                                   Gemini API) generates a complete
                                                   day-by-day itinerary, which can be
                                                   saved as their own trip.

  **Community**   K9       Reviewing      1.0      The user can write a text review and
                                                   give a star rating to locations.

  **Community**   K10      Image Upload   1.0      The user can upload photos to a given
                                                   location or their own travel diary.
                                                   The images appear in a gallery under
                                                   their profile.

  **Admin**       K11      Content        1.0      A user with administrator privileges
                           Moderation              can delete rule-violating comments,
                                                   images, or suspend users.

  **Settings**    K12      Display        1.0      The user can switch between light and
                                                   dark mode (Dark Mode).
  --------------------------------------------------------------------------------------

**Glossary**

-   **Next.js:** React-based framework that also provides server-side
    rendering.

-   **Node.js Express package:** A lightweight, flexible, and minimal
    web application framework for [Node.js](https://nodejs.org/en),
    designed to build web applications, APIs, and mobile backends
    efficiently.

-   **Prisma:** Modern ORM tool for managing database connections.

-   **Mapbox API:** Mapping service and search engine.

-   **JSON:** Data exchange format used for communication between the AI
    and the database.
