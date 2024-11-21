class branoPreferito {
  constructor(titolo, nomeArtista) {
    this.titolo = titolo;
    this.nomeArtista = nomeArtista;
  }
}

window.onload = () => {
  const branoContainers = document.querySelectorAll(".brano-container");
  branoContainers.forEach((container) => {
    const titoloElement = container.querySelector("h1");
    const artistElement = container.querySelector("p");
    if (!titoloElement || !artistElement) return;

    const titolo = titoloElement.innerText;
    const artista = artistElement.innerText;

    const isPreferito = arrayPreferiti.some(
      (brano) => brano.titolo === titolo && brano.nomeArtista === artista
    );
    const checkbox = container.querySelector(".heart-checkbox");
    if (checkbox) {
      checkbox.checked = isPreferito;
    }
  });
};

const braniContainer = document.getElementById("brani");
let arrayPreferiti = JSON.parse(localStorage.getItem("Preferiti")) || [];

braniContainer.addEventListener("change", (event) => {
  if (event.target.classList.contains("heart-checkbox")) {
    const checkbox = event.target;
    const container = checkbox.closest(".brano-container");

    if (!container) return;

    const titoloElement = container.querySelector("h1");
    const artistElement = container.querySelector("p");

    if (!titoloElement || !artistElement) return;

    const titolo = titoloElement.innerText;
    const artista = artistElement.innerText;

    if (checkbox.checked) {
      const newBrano = new branoPreferito(titolo, artista);
      arrayPreferiti.push(newBrano);
    } else {
      const index = arrayPreferiti.findIndex(
        (brano) => brano.titolo === titolo && brano.nomeArtista === artista
      );
      if (index !== -1) {
        arrayPreferiti.splice(index, 1);
      }
    }

    localStorage.setItem("Preferiti", JSON.stringify(arrayPreferiti));
    console.log(arrayPreferiti);
  }
});
