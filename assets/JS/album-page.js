// const data = () => {
//   fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062')
//     .then((response) => {
//       if (response.ok) {
//         return response.json()
//       } else {
//         throw new Error("Errore nel recupero dell'album")
//       }
//     })
//     .then((album) => {
//       console.log(album)
//       const titleContain = document.getElementById('title')

//       const title = document.createElement('h1')
//       title.innerText = album.title

//       titleContain.appendChild(title)
//       const imgContain = document.getElementById('cover')
//       imgContain.innerHTML = ` <img
//                      src="${album.cover_medium}"
//                     class="img-fluid w-75 rounded shadowCover"
//                     alt="Album Cover"
//                   />`

//       function duration() {
//         const hours = Math.floor(album.duration / 3600)
//         const minutes = Math.floor((album.duration % 3600) / 60)
//         const seconds = album.duration % 60

//         return `${hours}h ${minutes}m ${seconds}s`
//       }

//       album.duration = duration()

//       const singerContain = document.getElementById('singer')
//       singerContain.innerHTML = ` <img
//                         src="${album.artist.picture}"
//                         class="rounded-circle me-3"
//                         width="30"
//                         height="30"
//                         alt="singer"
//                       />
//                         <div>
//                         <p class="fs-6 mb-0 d-lg-none">
//                           ${album.artist.name}
//                         </p>
//                         <p class="d-lg-none text-secondary">
//                           Album &middot; ${album.release_date}
//                         </p>
//                         <p class="mb-0 d-none d-lg-block">
//                          ${album.artist.name} &middot; ${album.release_date} &middot; ${album.nb_tracks}, ${album.duration}.
//                         </p>
//                       </div>
//                       `
//     })
//     .catch((error) => {
//       console.error('Errore:', error)
//     })
// }

// data()
