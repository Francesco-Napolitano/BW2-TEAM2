let currentAudio = null
let isPlaying = false // Stato della riproduzione

const music = (music, track) => {
  music.forEach((song) => {
    song.addEventListener('click', (e) => {
      console.log('Cliccato:', e.target)

      if (track) {
        const previewUrl = track

        // Se è già in riproduzione un brano, fermalo
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }

        // Crea un nuovo oggetto audio per il brano selezionato
        const audio = new Audio(previewUrl)
        currentAudio = audio

        console.log(audio.getAttribute('src'))

        // Imposta gli eventi audio
        audio.addEventListener('play', () => {
          isPlaying = true
          playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
        })

        audio.addEventListener('pause', () => {
          isPlaying = false
          playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
        })

        audio
          .play()
          .then(() => {
            console.log(`Riproduzione di: ${song.textContent}`)
            localStorage.setItem(
              'playSong',
              JSON.stringify(audio.getAttribute('src'))
            )
          })
          .catch((err) => console.error('Errore nella riproduzione:', err))

        // Aggiungi il tempo totale e corrente
        audio.addEventListener('loadeddata', () => {
          durationLabel.textContent = formatTime(audio.duration)
        })

        // Sincronizza la barra di progresso con il tempo
        audio.addEventListener('timeupdate', updateProgress)
      } else {
        console.error(
          'Preview non disponibile per questa traccia:',
          song.textContent
        )
      }
    })
  })
}

// Funzione per formattare il tempo in formato mm:ss
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

// Eventi per controllare la barra audio
const playPauseBtn = document.getElementById('playPauseBtn')
const audioProgress = document.getElementById('audioProgress')
const currentTimeLabel = document.getElementById('currentTime')
const durationLabel = document.getElementById('duration')
const volumeControl = document.getElementById('volumeControl')

// Controllo play/pause
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    currentAudio.pause()
  } else {
    currentAudio.play()
  }
})

// Controllo della barra di progresso
audioProgress.addEventListener('input', seekAudio)

// Controllo del volume
volumeControl.addEventListener('input', updateVolume)

const songElements = document.querySelectorAll('.playSong') // Assicurati che '.playSong' rappresenti i brani
const trackUrls = album.tracks.data.map((track) => track.preview) // URL dei brani

songElements.forEach((song, index) => {
  const trackUrl = trackUrls[index]
  music([song], trackUrl)
})
