const esci = function () {
  localStorage.removeItem('FlagLogin')
  window.location.href = '../../welcome-page.html'
}

const imgProfile = document.getElementById('imgUtenteMenu')
const nomeUtenteMenu = document.getElementById('nomeUtenteMenu')

const UtenteSalvato = JSON.parse(localStorage.getItem('User'))
imgProfile.setAttribute('src', `${UtenteSalvato.urlIMG}`)
nomeUtenteMenu.innerHTML = `${UtenteSalvato.nome} ${UtenteSalvato.cognome}`
