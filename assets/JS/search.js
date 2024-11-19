const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = searchInput.value;
  RicercaElements(inputValue);
});

const RicercaElements = function (SearchKey) {
  const URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${SearchKey}`;

  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dati ricevuti:", data);
      creaRisultati(data.data);
    })
    .catch((error) => {
      console.error("C'è stato un errore:", error.message);
    });
};

const creaRisultati = function (data) {
  const controllaRisultatiPrsenti = document.getElementById("RisultatiRicerca");
 
  if (controllaRisultatiPrsenti) {
    controllaRisultatiPrsenti.innerHTML = "";
  }
 
  const Category = document.getElementById("Category");
  Category.style.display = "none";
  const SearchContainer = document.getElementById("SearchContainer");
  const ContenitoreResult = document.createElement("div");
  ContenitoreResult.className = "container";
  ContenitoreResult.id = "RisultatiRicerca";
  const RowResult = document.createElement("div");
  RowResult.className = "row";

  SearchContainer.appendChild(ContenitoreResult);
  ContenitoreResult.appendChild(RowResult);

  data.forEach((element) => {
    const resultDiv = document.createElement("div");
    resultDiv.className = "col-6 col-sm-6 col-md-4 col-lg-3 mb-4";
    resultDiv.innerHTML = `
              <div class="card bg-danger text-white">
                <img
                  class="img-fluid"
                  src="${element.album.cover_big}"
                  alt="${element.title}"
                />
                <p class="text-center mt-2">${element.title}</p>
                <div class="d-flex justify-content-evenly">
                  <p>${element.album.title}</p>
                  <p>${element.artist.name}</p>
                </div>
              </div>
    `;
    RowResult.appendChild(resultDiv);
  });
};
