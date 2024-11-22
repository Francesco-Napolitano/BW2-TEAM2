const salutoUtente = document.getElementById('salutoUtente')
const user = JSON.parse(localStorage.getItem('User'))

if (user) {
  salutoUtente.innerHTML = `Ciao, ${user.nome} ${user.cognome} !`
} else {
  salutoUtente.innerHTML = 'Utente non trovato'
}

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

const allHearts = document.querySelectorAll('.bi-suit-heart')
console.log(allHearts)
allHearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    console.log('cliccato')
    heart.classList.toggle('text-danger')
  })
})

const allImages = document.querySelectorAll('.images-playlist')
allImages.forEach((image) => {
  image.addEventListener('mouseover', () => {
    image.style.transform = 'scale(1.1)'
    image.style.transition = 'transform 0.3s ease'
  })
  image.addEventListener('mouseout', () => {
    image.style.transform = 'scale(1)'
  })
})
