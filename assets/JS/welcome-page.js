const main_html = document.getElementsByTagName("main");
const go_button = document.getElementById("avanti");
const circle = document.getElementsByClassName("circle");

const nextStep = function (currentStep) {
  if (currentStep === 1) {
    dot_2();
    setTimeout(() => {
      main_html[0].classList.remove("fade");
    }, 200);
  } else if (currentStep === 2) {
    dot_3();
    setTimeout(() => {
      main_html[0].classList.remove("fade");
    }, 200);
  }
};

const dot_2 = function () {
  document.body.style.backgroundImage = "url('assets/imgs/music_party.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.opacity = "0.9";
  document.documentElement.style.background =
    "linear-gradient(255.55deg, #381a06c9 0%, #181818 100%)";
  go_button.style.background = "rgba(52, 56, 54, 0.699)";

  // Aggiungi la classe fade per attivare la transizione
  main_html[0].classList.add("fade");

  setTimeout(() => {
    main_html[0].innerHTML = `    
      <div class="container ms-5 me-5">
        <div class="container">
          <img
            class="loghi img-fluid w-50 w-sm-40 w-md-30 w-lg-25 w-xl-20"
            src="/assets/imgs/logo.svg"
            alt="Spotify-Logo"
          />
        </div>
        <div class="container">
        <h1 class="text-white my-5">
        Scopri il piacere della musica !</h1></div>
        <button
          onclick="nextStep(2)"
          id="avanti"
          class="button-go w-25 w-sm-75 w-md-50 w-lg-25"
        >
          Avanti
        </button>
        <div class="container fixed-bottom pb-5">
          <div class="row justify-content-center">
            <div class="col-auto">
              <div class="circle "></div>
            </div>
            <div class="col-auto">
              <div class="circle active"></div>
            </div>
            <div class="col-auto">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>`;

    main_html[0].classList.remove("fade");
    main_html[0].classList.add("show");
  }, 200);
};

const dot_3 = function () {
  document.body.style.backgroundImage = "url('assets/imgs/music_party_2.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.opacity = "0.8";
  document.documentElement.style.background =
    "linear-gradient(255.55deg, #b8afa9c9 0%, #181818 100%)";

  main_html[0].classList.add("fade");

  setTimeout(() => {
    main_html[0].innerHTML = `    
        <div class="container ms-5 me-5">
          <img
            class="img-fluid w-100 w-sm-100"
            src="/assets/imgs/logo.svg"
            alt="Spotify-Logo"
          />
         
          <div class="d-flex justify-content-center gap-4 my-5">
            <button onclick="login()" class="button-go w-25 w-sm-75 w-md-50 w-lg-25">Login</button>
            <button onclick="register()" class="button-go w-25 w-sm-75 w-md-50 w-lg-25">Registrati</button>
          </div>
          
          <div class="container fixed-bottom pb-5">
            <div class="row justify-content-center">
              <div class="col-auto">
                <div class="circle"></div>
              </div>
              <div class="col-auto">
                <div class="circle"></div>
              </div>
              <div class="col-auto">
                <div class="circle active"></div>
              </div>
            </div>
          </div>
        </div>`;

    main_html[0].classList.remove("fade");
    main_html[0].classList.add("show");
  }, 200);
};

const login = function () {
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
};

const register = function () {
  const registerModal = new bootstrap.Modal(
    document.getElementById("registerModal")
  );
  registerModal.show();
};

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  console.log("Login attempted with:", email, password);
  alert("Login effettuato con successo!");
  // Puoi aggiungere la logica per inviare i dati al server
});

const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;

  if (password !== confirmPassword) {
    alert("Le password non corrispondono!");
    return;
  }

  console.log("Registrazione con:", email, password);
  alert("Registrazione completata con successo!");
  // Puoi aggiungere la logica per inviare i dati al server
});
