document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Efecto de confeti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 🎵 Música de fondo con botón de silenciar
    let musicPlayer = document.getElementById("musicPlayer");
    let muteButton = document.getElementById("muteMusic");

    muteButton.addEventListener("click", function () {
        let src = musicPlayer.src;
        if (src.includes("mute=1")) {
            musicPlayer.src = src.replace("mute=1", "mute=0");
            muteButton.textContent = "🔇 Silenciar";
        } else {
            musicPlayer.src = src.replace("mute=0", "mute=1");
            muteButton.textContent = "🔊 Reproducir";
        }
    });

    // 📸 Carrusel automático
    let index = 0;
    const slides = document.querySelector(".carousel-container");
    const totalSlides = slides.children.length;

    function moveSlide() {
        index = (index + 1) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(moveSlide, 3000); // Cambia cada 3 segundos
});
