// Daten für jeden Fluss // 
const fluesse = {
  rhone: {
    name: "Rhône",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2009",
    lat: 46.35, lon: 6.91 // Koordinaten für Meto API 
  },
  aare: {
    name: "Aare",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2016", 
    lat: 47.48, lon: 8.11 // Koordinaten für Meto API
  },
  linth: {
    name: "Linth",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2104",
    lat: 47.13, lon: 9.10 // Koordinaten für Meto API
  },
  reuss: {
    name: "Reuss",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2018",
    lat: 47.42, lon: 8.27 // Koordinaten für Meto API
  },
  rhein: {
    name: "Vorderrhein",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2033",
    lat: 46.77, lon: 9.21 // Koordinaten für Meto API
  }
};


// API aufrufen, Temperaturwert holen
async function fetchWasserTemp(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const eintraege = data.payload;
    if (!eintraege || eintraege.length === 0) return null;

    // Filter auf "temperature"
    const tempEintrag = eintraege.find(e => e.par === "temperature");
    if (!tempEintrag) return null;

    return parseFloat(tempEintrag.val).toFixed(1);

  } catch (error) {
    console.error("Fehler:", error);
    return null;
  }
}

// Lufttemperatur via Meteo Api
async function fetchLuftTemp(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
    const response = await fetch(url);
    const data = await response.json();
    return parseFloat(data.current.temperature_2m).toFixed(1);
  } catch (error) {
    console.error("Wetterfehler:", error);
    return null;
  }
}

// Infobox anzeigen
async function zeigeInfobox(flussKey) {
  const fluss = fluesse[flussKey];
  
  // Platzhalter setzen während geladen wird
  document.getElementById("infobox_name").textContent = fluss.name;
  document.getElementById("grid_wassertemp").textContent = "…°C";
  document.getElementById("grid_lufttemp").textContent = "…";
  document.getElementById("infobox").style.display = "block";

  // Temperaturen laden 
   const [wasserTemp, luftTemp] = await Promise.all([
    fetchWasserTemp(fluss.apiUrl),
    fetchLuftTemp(fluss.lat, fluss.lon)
  ]);

  document.getElementById("grid_wassertemp").textContent = wasserTemp ? `${wasserTemp}°C` : "n/a";// Laden Wassertemp 
  document.getElementById("grid_lufttemp").textContent = luftTemp ? `${luftTemp}°C` : "n/a"; // Laden Lufttemp
}


// Pins mit Klick-Events verbinden
document.getElementById("pin_rhone").addEventListener("click", () => zeigeInfobox("rhone"));
document.getElementById("pin_aare").addEventListener("click",  () => zeigeInfobox("aare"));
document.getElementById("pin_linth").addEventListener("click", () => zeigeInfobox("linth"));
document.getElementById("pin_reuss").addEventListener("click", () => zeigeInfobox("reuss"));
document.getElementById("pin_rhein").addEventListener("click", () => zeigeInfobox("rhein"));

// Infobox schliessen
document.getElementById("infobox_close").addEventListener("click", () => {
document.getElementById("infobox").style.display = "none";
});