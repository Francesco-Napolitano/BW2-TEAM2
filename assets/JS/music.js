let currentAudio = null;
const music = (music, track) => {
  music.forEach((song) => {
    song.addEventListener("click", (e) => {
      console.log("Cliccato:", e.target);

      if (track) {
        const previewUrl = track;

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        const audio = new Audio(previewUrl);
        currentAudio = audio;

        console.log(audio.getAttribute("src"));

        audio
          .play()
          .then(() => {
            console.log(`Riproduzione di: ${song.textContent}`);
            localStorage.setItem(
              "playSong",
              JSON.stringify(audio.getAttribute("src"))
            );
          })
          .catch((err) => console.error("Errore nella riproduzione:", err));
      } else {
        console.error(
          "Preview non disponibile per questa traccia:",
          song.textContent
        );
      }
    });
  });
};
