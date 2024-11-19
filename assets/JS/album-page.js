const data = () => {
  fetch(' https://striveschool-api.herokuapp.com/api/deezer/album/75621062')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('errore')
      }
    })
    .then((album) => {
      console.log(album)
    })
}
data()

// const searchContent = new URLSearchParams(window.location.search)
// searchContent.get('idAlbum')

// const titleContain = document.getElementById('title')

// const title = document.createElement('h1')
// title.innerText = album.title

// titleContain.appendChild('title')
