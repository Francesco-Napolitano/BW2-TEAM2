const END_POINT =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

fetch(END_POINT)
  .then((oggetto) => {
    if (oggetto.ok) {
      return oggetto.json();
    } else {
      throw new Error("Errore nella ricezione dei dati");
    }
  })
  .then((dati) => {
    console.log(dati, "dati");
  })
  .catch((error) => {
    console.log(error, "errore");
  });
