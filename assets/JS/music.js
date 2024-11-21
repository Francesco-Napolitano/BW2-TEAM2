let currentAudio = null
let currentIndex = 0 // Indice della traccia attualmente riprodotta

// Funzione per riprodurre singole tracce
const music = (musicElements, track) => {
  musicElements.forEach((song) => {
    song.addEventListener('click', () => {
      console.log('Brano selezionato:', track.title) // Verifica che il brano sia correttamente selezionato
      playTrack(track)
    })
    console.log(song)
  })
}

// Funzione per riprodurre la traccia
const playTrack = (track) => {
  if (track && track.preview) {
    const previewUrl = track.preview

    // Verifica che l'URL della traccia sia valido
    console.log('Preview URL:', previewUrl) // Verifica l'URL del brano

    // Se l'audio è già in riproduzione e la traccia è la stessa, non fare nulla
    if (currentAudio && currentAudio.src === previewUrl) {
      console.log('La traccia è già in riproduzione')
      return
    }

    // Se c'è una traccia già in riproduzione, fermala e resetta
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    // Crea una nuova traccia
    currentAudio = new Audio(previewUrl)

    // Riprendi la traccia
    currentAudio
      .play()
      .then(() => {
        console.log(`Riproduzione di: ${track.title}`)
      })
      .catch((err) => console.error('Errore nella riproduzione:', err))

    // Aggiungi il listener per quando la traccia finisce
    currentAudio.addEventListener('ended', () => {
      console.log('Fine del brano')
      currentIndex++
      localStorage.setItem('playFromIndex', currentIndex.toString())
    })
  } else {
    console.error(`Preview non disponibile per ${track.title}`)
  }
}

// Funzione per riprodurre la playlist
const playPlaylist = () => {
  const tracklist = JSON.parse(localStorage.getItem('tracklist'))
  currentIndex = parseInt(localStorage.getItem('playFromIndex'), 10) || 0

  const playNext = () => {
    if (currentIndex < tracklist.length) {
      playTrack(tracklist[currentIndex])
      currentIndex++

      localStorage.setItem('playFromIndex', currentIndex.toString())

      currentAudio.addEventListener('ended', playNext, { once: true })
    } else {
      console.log('Fine della playlist')
    }
  }

  playNext()
}

// Gestione dello stato all'inizio (al caricamento della pagina)
document.addEventListener('DOMContentLoaded', () => {
  // Se c'è una traccia salvata nel localStorage, riprendi la riproduzione
  const storedAudio = localStorage.getItem('currentAudio')
  if (storedAudio) {
    const savedTime = parseFloat(localStorage.getItem('currentAudioTime')) || 0
    currentAudio = new Audio(storedAudio)
    currentAudio.currentTime = savedTime
    currentAudio
      .play()
      .catch((err) => console.error('Errore nella riproduzione:', err))
  }

  const buttonPlay = document.getElementById('buttonPlay')
  if (buttonPlay) {
    buttonPlay.addEventListener('click', playPlaylist)
  }

  // Gestisci i pulsanti delle tracce
  const musicElements = document.querySelectorAll('.playSong')
  musicElements.forEach((song, index) => {
    const track = JSON.parse(localStorage.getItem('tracklist'))[index]
    music([song], track)
  })
})

// Funzione per gestire la chiusura o la navigazione
window.addEventListener('beforeunload', () => {
  if (currentAudio) {
    // Salva la traccia corrente e la posizione nel localStorage
    localStorage.setItem('currentAudio', currentAudio.src)
    localStorage.setItem(
      'currentAudioTime',
      currentAudio.currentTime.toString()
    )
  }
})
