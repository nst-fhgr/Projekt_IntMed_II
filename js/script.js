/**** FLÜSSE -- Api einbinden ****/
  // Daten für jeden Fluss 
  const fluesse = {
    rhone: {
      name: "Rhône",
      apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2009",
      lat: 46.35, lon: 6.91
    },
    aare: {
      name: "Aare",
      apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2016", 
      lat: 47.48, lon: 8.11
    },
    linth: {
      name: "Linth",
      apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2104",
      lat: 47.13, lon: 9.10
    },
    reuss: {
      name: "Reuss",
      apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2018",
      lat: 47.42, lon: 8.27
    },
    rhein: {
      name: "Vorderrhein",
      apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2033",
      lat: 46.77, lon: 9.21
    }
  };


  // API aufrufen, Temperaturwert holen
  async function fetchWasserTemp(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const eintraege = data.payload;
      if (!eintraege || eintraege.length === 0) return null;

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
    
    document.getElementById("infobox_name").textContent = fluss.name;
    document.getElementById("grid_wassertemp").textContent = "…°C";
    document.getElementById("grid_lufttemp").textContent = "…";
    document.getElementById("infobox").style.display = "block";

    const [wasserTemp, luftTemp] = await Promise.all([
      fetchWasserTemp(fluss.apiUrl),
      fetchLuftTemp(fluss.lat, fluss.lon)
    ]);

    document.getElementById("grid_wassertemp").textContent = wasserTemp ? `${wasserTemp}°C` : "n/a";
    document.getElementById("grid_lufttemp").textContent = luftTemp ? `${luftTemp}°C` : "n/a";
  }


  // Pins mit Klick-Events verbinden
  document.getElementById("pin_rhone").addEventListener("click", async function() {
    await zeigeInfobox("rhone");
  });
  document.getElementById("pin_aare").addEventListener("click", async function() {
    await zeigeInfobox("aare");
  });
  document.getElementById("pin_linth").addEventListener("click", async function() {
    await zeigeInfobox("linth");
  });
  document.getElementById("pin_reuss").addEventListener("click", async function() {
    await zeigeInfobox("reuss");
  });
  document.getElementById("pin_rhein").addEventListener("click", async function() {
    await zeigeInfobox("rhein");
  });

  // Infobox schliessen
  document.getElementById("infobox_close").addEventListener("click", function() {
    document.getElementById("infobox").style.display = "none";
  });


/**** SEEN -- Api einbinden ****/
const seen = {
  genfersee: {
    name: "Genfersee",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2026",
    lat: 46.45, lon: 6.56
  },
  neuenburgersee: {
    name: "Neuen-<br>burgersee",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2154",
    lat: 46.88, lon: 6.87
  },
  vierwaldstaettersee: {
    name: "Vierwald-<br>stättersee",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2025",
    lat: 46.97, lon: 8.46
  },
  lago_maggiore: {
    name: "Lago<br>Maggiore",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2022",
    lat: 46.06, lon: 8.72
  },
  bodensee: {
    name: "Bodensee",
    apiUrl: "https://api.existenz.ch/apiv1/hydro/latest?locations=2032",
    lat: 47.60, lon: 9.47
  }
};

  // Infobox anzeigen
  async function zeigeInfoboxSee(seeKey) {
    const see = seen[seeKey];

    document.getElementById("infobox_name").innerHTML      = see.name;
    document.getElementById("grid_wassertemp").textContent = "…°C";
    document.getElementById("grid_lufttemp").textContent   = "…°C";
    document.getElementById("infobox").style.display       = "block";

    const [wasserTemp, luftTemp] = await Promise.all([
      fetchWasserTemp(see.apiUrl),
      fetchLuftTemp(see.lat, see.lon)
    ]);

    document.getElementById("grid_wassertemp").textContent = wasserTemp ? `${wasserTemp}°C` : "-";
    document.getElementById("grid_lufttemp").textContent   = luftTemp   ? `${luftTemp}°C`   : "n/a";
  }

  // Seen Pins verbinden
  document.getElementById("pin_genfersee").addEventListener("click", async function() {
    await zeigeInfoboxSee("genfersee");
  });
  document.getElementById("pin_neuenburgersee").addEventListener("click", async function() {
    await zeigeInfoboxSee("neuenburgersee");
  });
  document.getElementById("pin_vierwaldstaettersee").addEventListener("click", async function() {
    await zeigeInfoboxSee("vierwaldstaettersee");
  });
  document.getElementById("pin_lago_maggiore").addEventListener("click", async function() {
    await zeigeInfoboxSee("lago_maggiore");
  });
  document.getElementById("pin_bodensee").addEventListener("click", async function() {
    await zeigeInfoboxSee("bodensee");
  });


//**** Toggle ****//
const btnFluesse = document.getElementById("btn_fluesse");
const btnSeen    = document.getElementById("btn_seen");

function zeigePins(gruppe) {
  document.getElementById("infobox").style.display = "none";

  document.getElementById("gruppe_fluesse").classList.remove("visible");
  document.getElementById("gruppe_seen").classList.remove("visible");

  document.getElementById(`gruppe_${gruppe}`).classList.add("visible");
}

btnFluesse.addEventListener("click", function() {
  btnFluesse.classList.add("active");
  btnSeen.classList.remove("active");
  zeigePins("fluesse");
});

btnSeen.addEventListener("click", function() {
  btnSeen.classList.add("active");
  btnFluesse.classList.remove("active");
  zeigePins("seen");
});

// Beim Laden: Flüsse anzeigen
zeigePins("fluesse");