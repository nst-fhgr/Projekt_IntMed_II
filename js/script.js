
//** Rhône **/
async function loadData() {
    const url = 'https://api.existenz.ch/apiv1/hydro/daterange?locations=2009';
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();
console.log(data); // gibt die Daten der API oder false in der Konsole aus


// https://api-datasette.konzept.space/existenz-api/hydro_locations //
// https://www.freepublicapis.com/open-meteo// 

// Genfersee
// Neuenburgersee
// Bodensee 
// Vierwaldstättersee 
// Zürichsee 


// Grösse Flüsse Schweiz -Rhone Aare Reuss Rhein,  , Linth 


//https://api.existenz.ch/apiv1/hydro/daterange?locations=2009 - Porte du Scex	Rhône	

// https://api.existenz.ch/apiv1/hydro/daterange?locations=2016 - Brugg // 	Aare	
//https://api.existenz.ch/apiv1/hydro/daterange?locations=2019 - Brienzwiler	Aare	
//https://api.existenz.ch/apiv1/hydro/daterange?locations=2029 - Brügg, Aegerten	Aare	

// https://api.existenz.ch/apiv1/hydro/daterange?locations=2018 - Mellingen	Reuss	

// https://api.existenz.ch/apiv1/hydro/daterange?locations=2104 - Weesen, Biäsche	Linth	

// https://api.existenz.ch/apiv1/hydro/daterange?locations=2033 - Ilanz	Vorderrhein	


const pins = document.querySelectorAll('.pin');
const infobox = document.getElementById('infobox');
const infoboxName = document.getElementById('infobox_name');
const closeBtn = document.getElementById('infobox_close');

// Daten pro Fluss (noch Platzhalter)
const fluesse = {
  pin_aare:  { name: 'Aare' },
  pin_reuss: { name: 'Reuss' },
  pin_linth: { name: 'Linth' },
  pin_rhone: { name: 'Rhône' },
  pin_rhein: { name: 'Rhein' }
};

// Klick auf Pin
pins.forEach(pin => {
  pin.addEventListener('click', () => {
    const daten = fluesse[pin.id];     // holt die Daten für diesen Pin
    infoboxName.textContent = daten.name;  // setzt den Flussnamen
    infobox.classList.add('aktiv');    // zeigt die Infobox
  });
});

// Schliessen-Button
closeBtn.addEventListener('click', () => {
  infobox.classList.remove('aktiv');  // versteckt die Infobox
});



