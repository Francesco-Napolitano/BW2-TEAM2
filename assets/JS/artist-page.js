class branoEvidenza {
  constructor(titolo, nomeArtista) {
    this.titolo = titolo
    this.nomeArtista = nomeArtista
  }
}

const tittle = document.getElementById('artistName')
const imgBG = document.getElementById('cover')
const params = new URLSearchParams(window.location.search)
const idArtista = params.get('id')
let nomeArtista = ''

const data = (idArtista) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtista}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dell'artista")
      }
    })
    .then((artista) => {
      nomeArtista = artista.name
      tittle.innerHTML = `${nomeArtista}`
      imgBG.setAttribute('src', `${artista.picture_xl}`)
      ricercaAlbum(nomeArtista)
    })
    .catch((error) => {
      console.error('Errore:', error)
    })
}

const ricercaAlbum = function (SearchKey) {
  const URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${SearchKey}`

  fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Errore nella risposta')
      }
      return response.json()
    })
    .then((data) => {
      BraniEvidenza(data.data)
      creaRisultatiAlbum(data.data)
    })
    .catch((error) => {
      console.error("C'è stato un errore:", error.message)
    })
}

data(idArtista)

const colonnaDestra = document.getElementById('colonna-destra')
const colonnaCentrale = document.getElementById('colonna-centrale')
const iconX = document.getElementById('icon-x')
const amici = document.getElementById('amici')

amici.addEventListener('click', () => {
  colonnaCentrale.classList.remove('col-xl-9')
  colonnaCentrale.classList.add('col-xl-7')
  colonnaDestra.classList.remove('d-none')
  colonnaDestra.classList.add('col-xl-block')
  amici.classList.remove('d-xl-block')
})

iconX.addEventListener('click', () => {
  colonnaCentrale.classList.add('col-xl-9')
  colonnaCentrale.classList.remove('col-xl-7')
  colonnaDestra.classList.add('d-none')
  colonnaDestra.classList.remove('col-xl-block')
  amici.classList.add('d-xl-block')
})

const creaRisultatiAlbum = function (data) {
  const albumTrovati = document.getElementById('Album')

  data.forEach((element) => {
    albumEvidenza = element
    const resultDiv = document.createElement('div')
    resultDiv.className = 'col-6 col-sm-6 col-md-4 col-lg-3 mb-4'
    resultDiv.innerHTML = `
            <a href="./album-page.html?=${element.album.id}" class="card-link text-decoration-none">
                 <div class="card text-white h-100" style="background: linear-gradient(220.55deg, #FF5E98 0%, #0F213E 100%);">
                      <img
                           class="img-fluid"
                              src="${element.album.cover_big}"
                              alt="${element.title_short}"
                       />
    <p class="text-center mt-2 fw-bold fs-5"> ${element.title_short}</p>
    <div class="d-flex justify-content-evenly text-center flex-wrap">
      <p style="flex-basis: 100%" class>${element.album.title}</p>
      <p class="text-secondary fst-italic">${element.artist.name}</p>
    </div>
  </div>
</a> `
    albumTrovati.appendChild(resultDiv)
  })
}

const BraniEvidenza = function (brani) {
  const rowBraniEvidenza = document.getElementById('brani')
  const cardMusic = document.createElement('div')
  cardMusic.classList.add('container', 'd-flex', 'm-4')

  for (i = 0; i < 3; i++) {
    rowBraniEvidenza.innerHTML += ` 
          <div class="container d-flex m-4">
                      <div
                        class="ms-1 d-flex justify-content-center align-items-center bg-light rounded-3 overflow-hidden"
                        style="width: 90px; height: 90px"
                      >
                        <img
                          src="${brani[i].album.cover_medium}"
                          class="w-100 h-100 object-fit-cover"
                          alt="Sample Image"
                        />
                      </div>
                      <div
                        class="container-fluid px-4 d-flex align-items-center justify-content-between"
                      >
                        <div id="info" class="text-white">
                          <h1 class="playSong">${brani[i].title_short}</h1>
                          <p>${brani[i].artist.name}</p>
                        </div>
                        <label class="heart-label mb-3 me-5">
                          <input
                            type="checkbox"
                            class="heart-checkbox"
                            hidden
                          />
                          <i class="heart-icon bi bi-suit-heart fs-2"></i>
                        </label>
                      </div>
                    </div>`
  }

  const playSongs = document.querySelectorAll('.playSong')
  console.log(brani)
  playSongs.forEach((song, index) => {
    const track = brani[index].preview
    music([song], track)
  })
}
