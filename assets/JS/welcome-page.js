if (
  localStorage.getItem("User") !== null &&
  localStorage.getItem("FlagLogin") !== null
) {
  window.location.href = "../../homepage.html";
} else {
  const nextButtons = document.querySelectorAll(".nextButton");
  const carousel = new bootstrap.Carousel(
    document.getElementById("carouselExample"),
    {
      interval: false,
    }
  );

  nextButtons.forEach((button, index) => {
    if (index < nextButtons.length - 2) {
      button.addEventListener("click", () => {
        carousel.next();
      });
    }
  });

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

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("registerName").value;
    const cognome = document.getElementById("registerSurname").value;
    const sesso = document.getElementById("registerGender").value;
    const eta = document.getElementById("registerAge").value;
    const paese = document.getElementById("registerCountry").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const newUser = new SpotifyUser(
      nome,
      cognome,
      sesso,
      eta,
      paese,
      email,
      password,
      ""
    );

    if (newUser.sesso === "Maschio") {
      newUser.urlIMG = "/assets/imgs/imgProfile/user_5.jpg";
    } else {
      newUser.urlIMG = "/assets/imgs/imgProfile/user_7.jpg";
    }

    alert(`Utente registrato con successo !`);

    registerForm.reset();

    const registerModal = bootstrap.Modal.getInstance(
      document.getElementById("registerModal")
    );
    registerModal.hide();

    localStorage.setItem("User", JSON.stringify(newUser));

    localStorage.setItem("FlagLogin", "1");
    
    window.location.href = "../../homepage.html";
  });

  const Utente_Registrato = JSON.parse(localStorage.getItem("User"));
  const login_form = document.getElementById("loginForm");

  login_form.addEventListener("submit", (event) => {
    const login_email = document.getElementById("loginEmail").value;
    const login_pass = document.getElementById("loginPassword").value;

    event.preventDefault();

    if (
      login_email === Utente_Registrato.email &&
      login_pass === Utente_Registrato.password
    ) {
      localStorage.setItem("FlagLogin", "1");
      window.location.href = "../../homepage.html";
    }
  });
}

const change_bg = function () {
  const primoElement = document.getElementById("primo");
  const secondoElement = document.getElementById("secondo");
  const terzoElement = document.getElementById("terzo");

  if (primoElement.classList.contains("active")) {
    document.documentElement.style.background =
      "linear-gradient(255.55deg, #381a06c9 0%, #181818 100%)";
  }

  if (secondoElement.classList.contains("active")) {
    document.documentElement.style.background =
      "linear-gradient(255.55deg, #b8afa9c9 0%, #181818 100%)";
  }

  if (terzoElement.classList.contains("active")) {
    document.documentElement.style.background =
      "linear-gradient(255.55deg, #0d5c06c9 0%, #181818 100%)";
  }
};
