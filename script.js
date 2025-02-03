document.addEventListener("DOMContentLoaded", function () {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Música
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

    // Carrusel de imágenes
    let index = 0;
    const slides = document.querySelector(".carousel-slide");
    const totalSlides = slides.children.length;
    document.getElementById("next").addEventListener("click", function () {
        index = (index + 1) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prev").addEventListener("click", function () {
        index = (index - 1 + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    });

    // Contador regresivo
    const eventoFecha = new Date("2025-03-02T17:30:00").getTime();
    const countdownEl = document.getElementById("countdown");

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    setInterval(actualizarContador, 1000);
});
