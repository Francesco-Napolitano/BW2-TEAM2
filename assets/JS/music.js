let currentAudio = null // Audio in riproduzione
let isPlaying = false // Stato di riproduzione
let isFirstPlay = true // Flag per sapere se è la prima traccia che parte
const soundBar = document.getElementById('soundBar') // Barra audio
const playPauseBtn = document.getElementById('playPauseBtn') // Pulsante play/pause
const audioProgress = document.getElementById('audioProgress') // Barra di progresso
const nextTrackBtn = document.querySelector('.bi-skip-forward-fill') // Bottone Avanti
const prevTrackBtn = document.querySelector('.bi-skip-backward-fill') // Bottone Indietro
const currentTimeLabel = document.getElementById('currentTime') // Tempo corrente
const durationLabel = document.getElementById('duration') // Durata totale
const volumeControl = document.getElementById('volumeControl') // Controllo del volume
const audioWave = document.querySelector('.audio-wave') // Onde audio

// Funzione per formattare il tempo
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secondsFormatted = Math.floor(seconds % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    secondsFormatted < 10 ? '0' + secondsFormatted : secondsFormatted
  }`
}

// Funzione per aggiornare la barra di progresso
const updateProgress = () => {
  if (currentAudio) {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100
    audioProgress.value = progress
    currentTimeLabel.textContent = formatTime(currentAudio.currentTime)
  }
}

// Funzione per far avanzare il brano
const seekAudio = () => {
  if (currentAudio) {
    const seekTime = (audioProgress.value / 100) * currentAudio.duration
    currentAudio.currentTime = seekTime
  }
}

// Funzione per aggiornare il volume
const updateVolume = () => {
  if (currentAudio) {
    currentAudio.volume = volumeControl.value / 100
  }
}

// Funzione per riprodurre/pausare l'audio
const togglePlayPause = () => {
  if (isPlaying) {
    currentAudio.pause()
    audioWave.classList.add('paused')
  } else {
    currentAudio.play()
    audioWave.classList.remove('paused')
  }
}

// Funzione per avviare una nuova traccia
const playNewTrack = (previewUrl) => {
  if (currentAudio) {
    // Se c'è già un brano in riproduzione, fermalo
    currentAudio.pause()
    currentAudio.currentTime = 0
  }

  // Crea un nuovo oggetto audio
  currentAudio = new Audio(previewUrl)

  // Aggiungi eventi per la gestione play/pause
  currentAudio.addEventListener('play', () => {
    isPlaying = true
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
    if (soundBar) {
      soundBar.classList.remove('d-none') // Rendi visibile la soundbar quando l'audio è in riproduzione
    }
  })

  currentAudio.addEventListener('pause', () => {
    isPlaying = false
    playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
    // Non nascondere più la soundbar quando è in pausa
    // soundBar.classList.add('d-none'); // Questa linea è stata rimossa
  })

  currentAudio.addEventListener('ended', () => {
    // Quando il brano finisce, non nascondere la soundbar
    // soundBar.classList.add('d-none'); // Questa linea è stata rimossa
    isPlaying = false
    playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
  })

  // Imposta la durata e aggiorna la barra di progresso quando i dati sono caricati
  currentAudio.addEventListener('loadeddata', () => {
    durationLabel.textContent = formatTime(currentAudio.duration)
  })

  // Sincronizza la barra di progresso con il tempo
  currentAudio.addEventListener('timeupdate', updateProgress)

  // Avvia la riproduzione
  currentAudio.play().catch((err) => {
    console.error('Errore nella riproduzione:', err)
  })
}

// Funzione per gestire la selezione dei brani
const music = (music, track) => {
  music.forEach((song) => {
    song.addEventListener('click', () => {
      console.log('Cliccato:', song.textContent)

      if (track) {
        playNewTrack(track)
      } else {
        console.error('Preview non disponibile per questa traccia')
      }
    })
  })
}

// Eventi di controllo
playPauseBtn.addEventListener('click', togglePlayPause)
audioProgress.addEventListener('input', seekAudio)
volumeControl.addEventListener('input', updateVolume)

// Inizializzazione brani (per esempio, songElements è la lista di brani con la classe 'playSong')
const songElements = document.querySelectorAll('.playSong')
const trackUrls = album.tracks.data.map((track) => track.preview) // URL dei brani

songElements.forEach((song, index) => {
  const trackUrl = trackUrls[index]
  music([song], trackUrl)
})
