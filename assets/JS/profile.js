class SpotifyUser {
  constructor(nome, cognome, sesso, eta, paese, email, password, urlIMG) {
    this.nome = nome;
    this.cognome = cognome;
    this.sesso = sesso;
    this.eta = eta;
    this.paese = paese;
    this.email = email;
    this.password = password;
    this.urlIMG = urlIMG;
  }
}

const datiDB = JSON.parse(localStorage.getItem("User"));
const row_item = document.getElementsByClassName("listInfo");

row_item[0].innerHTML = ` 
           <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Nome : ${datiDB.nome}
            </li>
            <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Cognome : ${datiDB.cognome}
            </li>
            <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Sesso : ${datiDB.sesso}
            </li>
            <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Età : ${datiDB.eta}
            </li>
            <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Paese : ${datiDB.paese}
            </li>
            <li class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-7 col-xl-7">
              Email : ${datiDB.email}
            </li>`;

const Modifica = function () {
  row_item[0].innerHTML = `
      <input
        id="input-nome"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="text"
        placeholder="Nome"
      />
      <input
        id="input-cognome"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="text"
        placeholder="Cognome"
      />
      <select
        id="input-sesso"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
      >
        <option value="" disabled selected hidden>Seleziona il sesso</option>
        <option value="Maschio">Maschio</option>
        <option value="Femmina">Femmina</option>
        <option value="Altro">Altro</option>
      </select>
      <input
        id="input-eta"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="number"
        placeholder="Età"
        min="1"
      />
      <input
        id="input-paese"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="text"
        placeholder="Paese"
      />
      <input
        id="input-email"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="email"
        placeholder="Email"
      />
      <input
        id="input-password"
        class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5"
        type="password"
        placeholder="Password"
      />
      <button
        id="save-button"
        class="btn btn-primary mx-auto mt-2 col-10 col-lg-5"
      >
        Salva
      </button>
    `;

  document.getElementById("save-button").addEventListener("click", function () {
    const nome = document.getElementById("input-nome").value;
    const cognome = document.getElementById("input-cognome").value;
    const sesso = document.getElementById("input-sesso").value;
    const eta = document.getElementById("input-eta").value;
    const paese = document.getElementById("input-paese").value;
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-password").value;

    const UserModificato = new SpotifyUser(
      nome,
      cognome,
      sesso,
      eta,
      paese,
      email,
      password
    );

    localStorage.setItem("User", JSON.stringify(UserModificato));
    alert("Dati salvati con successo!");

    row_item[0].innerHTML = `
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Nome : ${nome}</div>
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Cognome : ${cognome}</div>
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Sesso : ${sesso}</div>
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Età : ${eta}</div>
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Paese : ${paese}</div>
        <div class="list-group-item mx-auto mt-2 mb-2 col-10 col-lg-5">Email : ${email}</div>
      `;
  });
};

const ProfileImg = document.getElementById("ProfileImg");
console.log(datiDB.urlIMG);
console.log(ProfileImg);
ProfileImg.setAttribute("src", `${datiDB.urlIMG}`);

const colonnaDestra = document.getElementById("colonna-destra");
const colonnaCentrale = document.getElementById("colonna-centrale");
const iconX = document.getElementById("icon-x");
const amici = document.getElementById("amici");

amici.addEventListener("click", () => {
  colonnaCentrale.classList.remove("col-xl-9");
  colonnaCentrale.classList.add("col-xl-7");
  colonnaDestra.classList.remove("d-none");
  colonnaDestra.classList.add("col-xl-block");
  amici.classList.remove("d-xl-block");
});

iconX.addEventListener("click", () => {
  colonnaCentrale.classList.add("col-xl-9");
  colonnaCentrale.classList.remove("col-xl-7");
  colonnaDestra.classList.add("d-none");
  colonnaDestra.classList.remove("col-xl-block");
  amici.classList.add("d-xl-block");
});
