const params = new URLSearchParams(window.location.search)
const idAlbum = params.get('')

const data = (idAlbum) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dell'album")
      }
    })
    .then((album) => {
      creaAlbum(album)
    })
    .catch((error) => {
      console.error('Errore:', error)
    })
}

data(idAlbum)

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

const creaAlbum = (album) => {
  const titleContain = document.getElementById('title')
  const title = document.createElement('h1')
  title.innerText = album.title
  titleContain.appendChild(title)

  const singer = document.getElementById('singer')
  singer.setAttribute('src', album.artist.picture)

  const cover = document.getElementById('cover')
  cover.setAttribute('src', album.cover_medium)

  const coverSound = document.getElementById('coverSound')
  coverSound.setAttribute('src', album.cover_medium)

  // Funzione per calcolare la durata dell'album
  function duration() {
    const hours = Math.floor(album.duration / 3600)
    const minutes = Math.floor((album.duration % 3600) / 60)
    const seconds = album.duration % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${minutes}m ${seconds}s`
    }
  }
  album.duration = duration()

  let quantitàBrani = ''
  const braniObrano = function () {
    if (album.nb_tracks > 1) {
      quantitàBrani = 'Brani'
    } else {
      quantitàBrani = 'Brano'
    }
    return quantitàBrani
  }
  braniObrano()

  const singerContain = document.getElementById('singer-contain')
  singerContain.innerHTML = `
    <div>
      <p class="fs-6 mb-0 d-lg-none">
        ${album.artist.name}
      </p>
      <p class="d-lg-none text-secondary">
        Album &middot; ${album.release_date}
      </p>
      <p class="mb-0 d-none d-lg-block">
        ${album.artist.name} &middot; ${album.release_date} &middot; ${album.nb_tracks} ${quantitàBrani}, ${album.duration}.
      </p>
    </div>
  `

  const brani = document.getElementById('brani')
  const titoli = album.tracks.data
  const shuffle = document.getElementById('shuffle')
  const buttonPlay = document.getElementById('buttonPlay')
  const barName = document.getElementById('barName')

  for (let i = 0; i < titoli.length; i++) {
    brani.innerHTML += `
    <div class="brano-container d-flex justify-content-between align-items-center mt-4 mx-3 mx-lg-5 text-white">
      <div>
        <h1 class="playSong fs-4 fw-semibold" style="margin-bottom: 0px" data-index="${i}">
          ${titoli[i].title}
        </h1>
        <p>${album.artist.name}</p>
      </div>
      <label class="heart-label mb-3 me-2">
        <input type="checkbox" class="heart-checkbox" hidden />
        <i class="heart-icon bi bi-suit-heart fs-2"></i>
      </label>
    </div>
  `
  }

  const playSongElements = document.querySelectorAll('.playSong')

  playSongElements.forEach((song) => {
    song.addEventListener('click', function () {
      const songIndex = this.getAttribute('data-index')
      const currentSong = titoli[songIndex]
      barName.textContent = currentSong.title
    })
  })

  const playSongs = document.querySelectorAll('.playSong')
  playSongs.forEach((song, index) => {
    const track = album.tracks.data[index].preview
    music([song], track)
  })

  buttonPlay.addEventListener('click', () => {
    localStorage.removeItem('tracklist')
    localStorage.removeItem('playFromIndex')

    const tracklist = album.tracks.data
    localStorage.setItem('tracklist', JSON.stringify(tracklist))
    localStorage.setItem('playFromIndex', '0')

    playPlaylist()
  })

  // Button per riprodurre la playlist in modalità casuale
  shuffle.addEventListener('click', () => {
    // Estrai la lista di brani da `album.tracks.data`
    const tracklist = album.tracks.data

    // Genera un indice casuale
    const randomIndex = Math.floor(Math.random() * tracklist.length)

    // Salva l'indice casuale in `localStorage`
    localStorage.setItem('playFromIndex', randomIndex.toString())

    // Avvia la riproduzione dalla traccia casuale
    playPlaylist()
  })

  // Funzione per caricare e riprodurre la playlist
  const playPlaylist = () => {
    // Recupera il `tracklist` dalla `localStorage` e l'indice dal quale partire
    const tracklist = JSON.parse(localStorage.getItem('tracklist'))
    const playFromIndex = parseInt(localStorage.getItem('playFromIndex'), 10)

    // Verifica se ci sono dati salvati nella `localStorage` per iniziare la riproduzione
    if (tracklist && tracklist.length > 0) {
      // Imposta la traccia corrente
      const track = tracklist[playFromIndex]

      // Riproduce la traccia
      playNewTrack(track.preview)

      // Sincronizza i pulsanti per la traccia in riproduzione
      playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
      isPlaying = true
      currentTrackIndex = playFromIndex

      // Mostra la soundbar
      soundBar.classList.remove('d-none')

      // Imposta il nome e la copertura dell'album
      barName.textContent = track.title
      coverSound.src = track.album.cover_medium
    } else {
      console.error('Playlist non trovata!')
    }
  }
}
