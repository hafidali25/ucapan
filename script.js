document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.querySelector(".envelope-wrapper");
  const balloonContainer = document.getElementById("balloon-container");
  const fireworksBtn = document.getElementById("fireworks-btn");
  const fireworksContainer = document.getElementById("fireworks-container");
  const musicBtn = document.getElementById("music-btn");
  const birthdaySong = document.getElementById("birthday-song");
  let isOpen = false;

  let musicPlayed = false; // Variabel baru untuk melacak apakah musik sudah diputar

  // Logika tombol musik
  musicBtn.addEventListener("click", function () {
    if (birthdaySong.paused) {
      birthdaySong.play();
      musicBtn.textContent = "🎶 Matikan Musik";
    } else {
      birthdaySong.pause();
      musicBtn.textContent = "🎶 Nyalakan Musik";
    }
  });

  // Logika membuka/menutup amplop dan memutar musik
  envelopeWrapper.addEventListener("click", function () {
    if (isOpen) {
      envelopeWrapper.classList.remove("open");
      isOpen = false;
    } else {
      envelopeWrapper.classList.add("open");
      isOpen = true;

      // Putar musik secara otomatis pada interaksi pertama
      if (!musicPlayed) {
        birthdaySong
          .play()
          .then(() => {
            musicBtn.textContent = "🎶 Matikan Musik";
            musicPlayed = true;
          })
          .catch((error) => {
            // Jika putar otomatis gagal, biarkan tombol yang menangani
            console.log("Autoplay gagal, perlu interaksi pengguna.");
          });
      }
    }
  });

  // Logika animasi balon otomatis yang terus berjalan
  const createBalloons = () => {
    const interval = setInterval(() => {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloonContainer.appendChild(balloon);

      const randomLeft = Math.random() * 100;
      balloon.style.left = `${randomLeft}vw`;

      const colors = ["#ff6b6b", "#ffa07a", "#a0c4ff", "#b8c9ff", "#ffb3e6", "#ffe082"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.background = `radial-gradient(circle, ${randomColor}, ${randomColor}b3)`;
    }, 300);
  };

  createBalloons();

  // Logika animasi Kembang Api
  fireworksBtn.addEventListener("click", function () {
    const createFirework = () => {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      fireworksContainer.appendChild(firework);

      const randomX = Math.random() * 80 + 10;
      firework.style.left = `${randomX}vw`;

      firework.addEventListener("animationend", (event) => {
        if (event.animationName === "launch") {
          firework.classList.remove("firework");
          firework.classList.add("explode");

          const colors = ["#FFD700", "#FF4500", "#ADFF2F", "#8A2BE2", "#00BFFF"];
          const randomExplosionColor = colors[Math.floor(Math.random() * colors.length)];

          const explosionX = Math.random() * 400 - 200;
          const explosionY = Math.random() * 400 - 200;

          for (let i = 0; i < 16; i++) {
            const particle = document.createElement("div");
            particle.style.backgroundColor = randomExplosionColor;
            const angle = i * 22.5;
            const distance = Math.random() * 120 + 50;

            particle.style.setProperty("--explosion-x", `${distance * Math.cos((angle * Math.PI) / 180) + explosionX}px`);
            particle.style.setProperty("--explosion-y", `${distance * Math.sin((angle * Math.PI) / 180) + explosionY}px`);

            firework.appendChild(particle);
          }

          setTimeout(() => {
            firework.remove();
          }, 1000);
        }
      });
    };

    let fireworkCount = 0;
    const fireworkInterval = setInterval(() => {
      if (fireworkCount < 3) {
        createFirework();
        fireworkCount++;
      } else {
        clearInterval(fireworkInterval);
      }
    }, 800);
  });
});
