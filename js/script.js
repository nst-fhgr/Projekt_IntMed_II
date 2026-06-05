fetch("https://api.existenz.ch/apiv1/hydro/daterange?locations=2009")
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d.payload?.[0], null, 2)))


// Daten für jeden Fluss
const fluesse = {
  rhone: {
    name: "Rhône",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2009"
  },
  aare: {
    name: "Aare",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2016"
  },
  linth: {
    name: "Linth",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2104"
  },
  reuss: {
    name: "Reuss",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2018"
  },
  rhein: {
    name: "Vorderrhein",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2033"
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


// Infobox anzeigen
async function zeigeInfobox(flussKey) {
  const fluss = fluesse[flussKey];
  
  // Platzhalter setzen während geladen wird
  document.getElementById("infobox_name").textContent = fluss.name;
  document.getElementById("grid_wassertemp").textContent = "…°C";
  document.getElementById("grid_lufttemp").textContent = "–";
  document.getElementById("infobox").style.display = "block";

  // Wassertemperatur laden
  const temp = await fetchWasserTemp(fluss.apiUrl);
  document.getElementById("grid_wassertemp").textContent = temp ? `${temp}°C` : "n/a";
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