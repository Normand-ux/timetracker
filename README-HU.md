# Munkaidő Nyilvántartó (Time Tracking Application)

Ez egy egyszerű, böngészőben futó munkaidő nyilvántartó alkalmazás, amely segít a szabadúszóknak és szakembereknek a különböző projekteken eltöltött munkaórák naplózásában. Az alkalmazás a böngésző `localStorage`-ét használja az adatok tárolására, így a bejegyzések nem vesznek el a böngésző bezárása után.

## Funkciók

- **Időmérés**: Indítsd el, állítsd le, szüneteltesd és folytasd az időmérést egy egyszerű felületen.
- **Projekt alapú naplózás**: Minden mért időtartamot egy projektnévhez rendelhetsz.
- **Automatikus naplózás**: Az időmérő leállításakor az eltelt idő automatikusan hozzáadódik a naplóhoz a megadott projekt névvel.
- **Naplókezelés**:
    - Tekintsd át az összes korábbi naplóbejegyzést.
    - Szerkeszd a meglévő bejegyzések projektnevét és időtartamát.
    - Törölj egyenként bejegyzéseket.
    - Töröld az összes naplóbejegyzést egyszerre.
- **Összesítés és Költségszámítás**:
    - Számolj összesített munkaidőt és költséget egy adott projektre szűrve.
    - Készíts részletes összesítést, amely projektenként és globálisan is megmutatja a teljes munkaidőt és a kapcsolódó költségeket.
    - Az óradíj a kódban konfigurálható.
- **Vágólapra másolás**: Az elkészült összesítést egy gombnyomással a vágólapra másolhatod.

## Hogyan használd?

1.  **Nyisd meg az `index.html` fájlt** egy modern webböngészőben.

2.  **Időmérés indítása**:
    - Írd be a projekt nevét a "Projekt neve" mezőbe.
    - Kattints a **Start** gombra az időmérés elindításához.

3.  **Időmérés kezelése**:
    - A **Pause** gombbal ideiglenesen megállíthatod a számlálót. A gomb **Resume**-ra vált, amivel folytathatod a mérést.
    - A **Stop** gombra kattintva véglegesen leállítod az időmérést. Ekkor a mért időtartam a megadott projektnévvel bekerül a "Naplózott idők" listába.
    - A **Reset** gombbal lenullázhatod az időmérőt anélkül, hogy naplóbejegyzés jönne létre.

4.  **Naplóbejegyzések kezelése**:
    - A "Naplózott idők" listában minden bejegyzés mellett találsz egy **Szerkesztés** és egy **Törlés** gombot.
    - A **Szerkesztés** gombbal módosíthatod a projekt nevét és az eltöltött időt. A **Mentés** gombbal véglegesítheted a változtatásokat, a **Mégse** gombbal elvetheted azokat.
    - A **Törlés** gombbal eltávolíthatod a bejegyzést.
    - Az **Összes napló törlése** gombbal az összes eddigi bejegyzést törölheted.

5.  **Összesítés készítése**:
    - Hagyd üresen a "Projekt neve" mezőt, majd kattints az **Összesítés készítése** gombra, hogy minden projektről részletes, és egyben egy teljes összesítést kapj.
    - Ha csak egy konkrét projekt érdekel, írd be a nevét a "Projekt neve" mezőbe, és ezután kattints az **Összesítés készítése** gombra.
    - Az elkészült kimutatást a **Másolás vágólapra** gombbal egyszerűen kimásolhatod.

## Konfiguráció

Az elszámolás alapjául szolgáló óradíj közvetlenül a `script.js` fájlban módosítható. Keresd meg a következő sort és írd át az értéket a saját óradíjadnak megfelelően:

```javascript
const HOURLY_RATE = 15000; // Ft/óra
```

## Felhasznált technológiák

- HTML5
- CSS3
- JavaScript (ES6+)

Nincsenek külső függőségek, az alkalmazás önmagában futtatható.

## Élő demó
[Timetracker alkalmazás – GitHub Pages](https://normand-ux.github.io/timetracker/)

## Miért készült ez az alkalmazás?
Webfejlesztőként és tanácsadóként gyakran találkozom azzal, hogy az időkövető eszközök túl bonyolultak vagy előfizetéshez kötöttek. Ezért szerettem volna létrehozni egy egyszerű, böngészőben futó megoldást, amely nem igényel regisztrációt, és helyben tárolja az adatokat — ideális gyors, zavaró tényezőktől mentes időméréshez.
A projekt egyben lehetőséget adott arra is, hogy tisztán HTML/CSS/JS alapon fejlesszek, és kísérletezzek a felhasználóbarát felülettel és a localStorage alapú adatkezeléssel.

## Tervek a jövőre nézve
A következő funkciók beépítését fontolgatom:
- Opcionális jelszavas védelem vagy export/import lehetőség
- Grafikonok a projektek közötti időeloszlás vizualizálására
- Többnyelvű támogatás (magyar és angol)
- Adatmentés CSV vagy JSON formátumban
- Mobilbarát felület finomítása
- Moduláris kódszerkezet a könnyebb karbantartás érdekében
Ha van ötleted vagy visszajelzésed, nyugodtan nyiss egy „issue”-t vagy forkold a projektet!
