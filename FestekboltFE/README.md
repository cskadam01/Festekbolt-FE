# Festékbolt FE – részletes dokumentáció

Ez a repository egy Vite + React + TypeScript alapú, többoldalas festék webáruház frontend. A kód router alapú navigációt, kontextus-alapú állapotkezelést, és újrafelhasználható UI komponenseket alkalmaz a terméklista, szűrés, kosár és egyéb statikus oldalak megjelenítéséhez.

## Gyors indítás
1. **Követelmények:** Node 18+ és npm.
2. **Telepítés:**
   ```bash
   npm install
   ```
3. **Fejlesztői szerver:**
   ```bash
   npm run dev
   ```
   A Vite alapértelmezés szerint a `http://localhost:5173` címen szolgálja ki az alkalmazást.
4. **Lintelés:**
   ```bash
   npm run lint
   ```
5. **Production build és előnézet:**
   ```bash
   npm run build
   npm run preview
   ```

## Projekt felépítése
```
src/
├── components/     # Újrafelhasználható UI elemek (kártyák, navigáció, slider, értesítés)
├── contexts/       # Globális állapotok (termékek, szűrők, kosár, értesítés)
├── pages/          # Routerhez kötött oldalak (Home, Product, Cart, About stb.)
├── App.tsx         # Útvonalak definiálása
└── main.tsx        # Gyökér renderelés és providerek
```

## Technológiai stack
- **Build:** Vite + TypeScript (`npm run build` a `tsc -b` után futtatja a Vite buildet).【F:package.json†L1-L22】
- **UI keretrendszer:** React 19 + React Router DOM 7 a kliens oldali navigációhoz.【F:src/App.tsx†L1-L33】
- **HTTP kliens:** Axios a termékadatok lekéréséhez távoli JSON-ból.【F:src/contexts/GetPaintContext.tsx†L3-L58】
- **Állapotkezelés:** React Context + `useReducer` a terméklista, szűrők, kosár és értesítések kezelésére.【F:src/main.tsx†L1-L28】【F:src/contexts/CartContext.tsx†L1-L119】
- **Stílus:** Moduláris CSS (`*.module.css`) a komponensenkénti stílusok elszigeteléséhez.

## Alkalmazás-áramlás
- **Indítás:** A `main.tsx` beköti a Notification-, Cart-, Paints- és Filters-provider láncot, majd rendereli az `App` komponenst.【F:src/main.tsx†L1-L28】
- **Routing:** Az `App.tsx` nyolc útvonalat határoz meg (`/`, `/products`, `/products/:takenId`, `/cart`, `/login`, `/faq`, `/about`, `/connect`, `/register`).【F:src/App.tsx†L8-L33】
- **Adatforrás:** A festékek a `PaintsProvider` első renderjén töltődnek be a GitHubon tárolt `festek.json`-ból, és `visiblePaints` állapotban kerülnek továbbításra a szűrőkhöz és listákhoz.【F:src/contexts/GetPaintContext.tsx†L28-L91】
- **Szűrés:** A `FiltersProvider` tartja karban az ár-, név-, típus- és elérhetőség-szűrőket. A módosítások memoizált `filteredPaints` listát eredményeznek, amelyet a `GetPaintContext` felé visszaír a `visiblePaints` frissítésével.【F:src/contexts/FilterContext.tsx†L1-L145】【F:src/contexts/FilterContext.tsx†L146-L216】
- **Kosár:** A `CartProvider` `useReducer`-t használ az elemek (termék + mennyiség) kezelésére, lokálisan tárolja a kosár állapotát `localStorage`-ban, és minden módosításkor újraszámolja az összesített árat.【F:src/contexts/CartContext.tsx†L1-L119】【F:src/contexts/CartContext.tsx†L120-L185】
- **Értesítés:** A `NotificationProvider` időzített, automatikusan eltűnő toastokat biztosít; a kosár műveletek sikeres visszajelzésre használják.【F:src/contexts/NotificationContext.tsx†L1-L53】【F:src/contexts/CartContext.tsx†L120-L159】

## Fő oldalak és komponensek
- **Home (`/`):** Betöltött festékeket sliderrel és kiemelt termékkártyákkal jeleníti meg, betöltés közben `BarLoader` spinnert mutat.【F:src/pages/home/Home.tsx†L1-L48】
- **Product/ProductDetail:** Részletesebb listázás és termékadat nézet (komponensek: `ProductCard`, `ProductDetailView`).
- **Cart (`/cart`):** A kosár elemeinek és összegének megjelenítése, mennyiség módosítása, törlés, összesítő (komponensek: `CartProduct`, `CartOverall`, `QuantityButtons`).
- **Szűrő UI:** A `components/filtersAndProducts` mappában árslider, típus és elérhetőség checkboxok, névkereső és „Szűrők törlése” gomb található a `FiltersProvider` állapotára kötve.
- **Értesítés UI:** `ToastNotification` figyeli a NotificationContext állapotát, és típus szerinti stílust használ (`success`/`error`/`info`).
- **Navigáció és layout:** `Navbar` és `Footer` komponensek biztosítják az oldal vázát, minden fő oldal ezeket használja.

## Állapotkezelési részletek
- **Persistálás:**
  - Kosár: `localStorage['cart']` minden változáskor frissül; betöltéskor azonnal visszatöltésre kerül.【F:src/contexts/CartContext.tsx†L82-L118】【F:src/contexts/CartContext.tsx†L120-L138】
  - Szűrők: `localStorage['filterState']` tárolja az utolsó szűrőbeállításokat (ár, típus, elérhetőség, név).【F:src/contexts/FilterContext.tsx†L74-L128】
- **Számítások:**
  - Ár aggregálás: a `CALC_TOTAL` action újraszámolja a kosár teljes értékét minden tételváltozás után.【F:src/contexts/CartContext.tsx†L52-L119】
  - Dinamikus árhatárok: a `PaintsProvider` az összes termék árából számolja a minimumot és maximumot, és átadja a szűrőknek.【F:src/contexts/GetPaintContext.tsx†L72-L91】

## Hibakezelés és felhasználói visszajelzés
- **Adatlekérés:** A festéklista lekérése `try/catch`-ben történik, hiba esetén a `error` állapotban tárolódik és a `isLoading` zászló false lesz.【F:src/contexts/GetPaintContext.tsx†L32-L70】
- **Értesítések:** A `showNotification` automatikusan bezáródik 4 másodperc után, ismételt meghívások felülírják a korábbi időzítőt a villogás elkerülésére.【F:src/contexts/NotificationContext.tsx†L19-L53】

## Fejlesztési irányelvek
- **Új oldal:** add a route-ot az `App.tsx`-ben, és a `pages/` alatt helyezd el a JSX/TSX + moduláris CSS fájlokat.
- **Új globális állapot:** hozz létre saját contextet a `contexts/` mappában, és kösd be a `main.tsx`-ben, hogy a teljes fa hozzáférjen.
- **HTTP hívások:** használj Axios-t, és kezeld a `isLoading`/`error` állapotokat a felhasználói visszajelzéshez.
- **Stílus:** komponensenként külön `*.module.css` fájl, elnevezéseket tartasd szinkronban a TSX importtal.

## Gyakori problémák
- **Üres lista:** ha a távoli JSON nem elérhető, a `paints` tömb üres marad, ezért érdemes fallback üzenetet vagy újrapróbálást beépíteni (pl. Home komponens már kiírja, hogy „Nem találhatóak termékek”).【F:src/pages/home/Home.tsx†L30-L47】
- **Szűrő alapértékek:** a szűrők csak akkor kapnak minimális és maximális árat, ha a festékek betöltődtek; érdemes a UI-ban kezelni a töltési állapotot a csúszka inicializálása előtt.【F:src/contexts/FilterContext.tsx†L101-L145】

## Kapcsolódó szkriptek
- `npm run dev`: Vite fejlesztői szerver HMR-rel.
- `npm run build`: TypeScript build (projekt referenciák) majd Vite production bundle.
- `npm run lint`: ESLint alapbeállítások a forrásfa teljesére.
- `npm run preview`: lokális előnézet a buildelt tartalomból.

A fenti dokumentáció célja, hogy production környezetben is könnyen átadható, átlátható képet adjon a projekt működéséről és továbbfejlesztési pontjairól.
