function toggleHardwareStand(show) {
    const section = document.getElementById("hardwareSection");
    if (show) {
      section.style.visibility = "visible";
      section.style.height = "auto";
    } else {
      section.style.visibility = "hidden";
      section.style.height = "0";
    }
  
    // Optional: Radio-Buttons abwählen
    if (!show) {
      const inputs = section.querySelectorAll("input[type=radio]");
      inputs.forEach(input => input.checked = false);
    }
  }
  
  function toggleTooltip(id) {
    const el = document.getElementById(id);
    const isVisible = el.style.display === "block";
    document.querySelectorAll('.tooltip-image').forEach(t => t.style.display = "none");
    el.style.display = isVisible ? "none" : "block";
  }

const elxOptions = [
  { bezeichnung: "ELX1234", kanal: "1-8", ex: "Ex ia IIC T4", klass: "IIB" },
  { bezeichnung: "ELX5678", kanal: "1-4", ex: "Ex ib IIC T3", klass: "IIC" }
];

const epxOptions = [
  { bezeichnung: "EPX9876", kanal: "1-2", ex: "Ex ic IIC T4", klass: "IIA" },
  { bezeichnung: "EPX4321", kanal: "1-4", ex: "Ex ic IIC T5", klass: "IIB" }
];

function getSelectedSerie() {
  const elx = document.querySelector('input[name="serie"][value="ELX"]').checked;
  const epx = document.querySelector('input[name="serie"][value="EPX"]').checked;
  return elx ? "ELX" : epx ? "EPX" : null;
}

function populateDropdown() {
  const dropdown = document.getElementById("bezeichnung");
  dropdown.innerHTML = '<option value="">Bitte wählen</option>';
  const serie = getSelectedSerie();
  if (!serie) return;

  const options = serie === "ELX" ? elxOptions : epxOptions;
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.bezeichnung;
    option.textContent = opt.bezeichnung;
    dropdown.appendChild(option);
  });
  updateBetriebsmittelDetails(); // reset
}

function updateBetriebsmittelDetails() {
  const serie = getSelectedSerie();
  const value = document.getElementById("bezeichnung").value;
  const options = serie === "ELX" ? elxOptions : epxOptions;
  const eintrag = options.find(opt => opt.bezeichnung === value);
  document.getElementById("kanal").textContent = eintrag ? eintrag.kanal : "-";
  document.getElementById("ex").textContent = eintrag ? eintrag.ex : "-";
  document.getElementById("klass").textContent = eintrag ? eintrag.klass : "-";
}

// Event-Listener nach Laden
document.addEventListener("DOMContentLoaded", () => {
  const serieRadios = document.querySelectorAll('input[name="serie"]');
  serieRadios.forEach(radio => {
    radio.addEventListener("change", populateDropdown);
  });
});
