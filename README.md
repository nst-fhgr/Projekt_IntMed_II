# 🏊 Und wo schwimmst du heute?
**Wassertemperatur Guide — Semesterprojekt Interaktive Medien 2**  
Nadine Steiner | FHGR

---

## Über das Projekt

Interaktive Schweizer Karte mit aktuellen Wasser- und Lufttemperaturen für Flüsse und Seen. Per Toggle kann zwischen den zwei Ansichten gewechselt werden. Ein Klick auf einen Pin öffnet eine Infobox mit den aktuellen Temperaturen.

---

## Projektstruktur

```
projekt/
├── index.html
├── css/
│   ├── style.css
│   ├── reset.css
│   └── fonts.css
├── js/
│   └── script.js
└── assets/
    ├── karte_schweiz.png
    ├── pin_gelb.png
    ├── pin_blau.png
    ├── footer_see.png
    └── IM2_Sonneschirm.png
```

---

## Funktionen

### Toggle Flüsse / Seen
- Im Header kann zwischen **Flüsse** und **Seen** gewechselt werden
- Jeweils nur eine Gruppe ist sichtbar
- Beim Wechsel schliesst sich die Infobox automatisch
- Beim Laden wird standardmässig **Flüsse** angezeigt

### Pins & Infobox
- Klick auf einen Pin öffnet die Infobox
- Die Infobox zeigt **Name**, **Wassertemperatur** und **Lufttemperatur**
- Während die Daten laden, wird `…°C` als Platzhalter angezeigt
- Schliessen via ✕-Button

---

## APIs

### Wassertemperatur — Flüsse ✅
**API:** [api.existenz.ch](https://api.existenz.ch)  
**Endpoint:** `https://api.existenz.ch/apiv1/hydro/latest?locations={ID}`  
**Parameter:** `par: "temperature"`  
**Lizenz:** BAFU – Bundesamt für Umwelt (muss verlinkt werden)

| Fluss | Station | ID |
|---|---|---|
| Rhône | Porte du Scex | 2009 |
| Aare | Brugg | 2016 |
| Linth | Weesen, Biäsche | 2104 |
| Reuss | Mellingen | 2018 |
| Vorderrhein | Ilanz | 2033 |

---

### Wassertemperatur — Seen ⚠️

> **Schwierigkeit:** Es konnte keine funktionierende öffentliche API für Seewassertemperaturen gefunden und korrekt eingebunden werden. Die verwendete API `api-datasette.konzept.space/existenz-api/hydro_locations` liefert für Seen ausschliesslich den Wasserstand (`height`), aber keine Temperatur. Deshalb wird bei Seen unter Wassertemperatur **„-"** angezeigt.

| See | Station | ID | Verfügbare Daten |
|---|---|---|---|
| Genfersee | Chillon | 2026 | nur Pegelstand |
| Neuenburgersee | Grandson | 2154 | nur Pegelstand |
| Vierwaldstättersee | Brunnen | 2025 | nur Pegelstand |
| Lago Maggiore | Locarno | 2022 | nur Pegelstand |
| Bodensee | Romanshorn | 2032 | nur Pegelstand |

**Mögliche zukünftige Lösung:** [Alplakes von Eawag](https://www.alplakes.eawag.ch/) bietet Seewassertemperaturen für alle 5 Seen an — die API-Endpoints konnten im Rahmen des Projekts jedoch nicht vollständig getestet und eingebunden werden.

---

### Lufttemperatur — Flüsse & Seen ✅
**API:** [Open-Meteo](https://open-meteo.com/)  
**Endpoint:** `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m`  
**Lizenz:** Open-Meteo ist kostenlos und open-source (CC BY 4.0)  
Wird für alle 10 Standorte (Flüsse + Seen) verwendet.

---

## Bekannte Einschränkungen

- Wassertemperatur für Seen nicht verfügbar (keine funktionierende öffentliche JSON-API gefunden)
- Pin-Positionen auf der Karte sind in `%`-Werten definiert und müssen bei Kartenänderungen manuell in `style.css` angepasst werden

---

## Technologien

| Technologie | Verwendung |
|---|---|
| HTML / CSS /  JS | Grundstruktur, Styling, Interaktivität |
| [api.existenz.ch](https://api.existenz.ch) | Wassertemperatur Flüsse (Quelle: BAFU) |
| [Open-Meteo](https://open-meteo.com/) | Lufttemperatur |
| [LottieFiles dotlottie-wc](https://lottiefiles.com/) | Footer-Animation |
| Schriften: Sourgummy, Sora | via fonts.css |

---

*© Nadine Steiner | Semesterprojekt IM2 | FHGR*
