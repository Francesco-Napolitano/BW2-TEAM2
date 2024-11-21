// nasconde la pubblicità
const advHHide = document.getElementById('adv-button')
advHHide.addEventListener('click', () => {
  const adv = document.getElementById('top-album-container')
  adv.classList.add('d-lg-none')
})

// colora i cuori di rosso
const allHearts = document.querySelectorAll('.bi-suit-heart')
console.log(allHearts)
allHearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    console.log('cliccato')
    heart.classList.toggle('text-danger')
  })
})

const END_POINT = 'https:striveschool-api.herokuapp.com/api/deezer/album/454043'
// collega il tasto play all'album di Jimy Hendrix
fetch(END_POINT)
  .then((oggetto) => {
    if (oggetto.ok) {
      return oggetto.json()
    } else {
      throw new Error('Errore nella ricezione dei dati')
    }
  })
  .then((dati) => {
    console.log(dati, 'dati')
    const playButton = document.getElementById('play-button')
    playButton.addEventListener('click', () => {
      window.location.assign(dati.share)
    })
  })
  .catch((error) => {
    console.log(error, 'errore')
  })

const playlistImages = document.querySelectorAll('.images-playlist')
playlistImages.forEach((img) => {
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.1)'
    img.style.transition = 'transform 0.3s ease'
  })
  img.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1)'
  })
})
