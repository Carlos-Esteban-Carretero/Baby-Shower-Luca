document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Efecto de confeti al cargar la página
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 🎵 Música de fondo automática sin necesidad de interacción
    let musicPlayer = new Audio("https://www.example.com/music.mp3"); // Reemplazar con URL real
    musicPlayer.loop = true;
    document.body.addEventListener('click', () => musicPlayer.play(), { once: true }); // Fuerza la reproducción en algunos navegadores
    musicPlayer.play().catch(() => {
        console.log("La reproducción automática fue bloqueada por el navegador. El usuario debe interactuar primero.");
    });

    let muteButton = document.getElementById("muteMusic");
    muteButton.addEventListener("click", function () {
        if (musicPlayer.paused) {
            musicPlayer.play();
            muteButton.textContent = "🔊";
        } else {
            musicPlayer.pause();
            muteButton.textContent = "🔇";
        }
    });

    // 📸 Carrusel de imágenes mostrando una foto a la vez
    let index = 0;
    const slides = document.querySelectorAll(".carousel-slide img");
    const totalSlides = slides.length;

    function showSlide() {
        slides.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % totalSlides;
    }
    showSlide();
    setInterval(showSlide, 3000);

    // 🕒 Contador regresivo con formato avanzado
    const eventoFecha = new Date("2025-03-02T17:30:00").getTime();
    const countdownEl = document.getElementById("countdown");

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `<span>${dias}</span>d <span>${horas}</span>h <span>${minutos}</span>m <span>${segundos}</span>s`;
    }
    setInterval(actualizarContador, 1000);

    // ✅ Manejo de confirmación de asistencia y lista de invitados con mejor separación
    let invitadosGuardados = JSON.parse(localStorage.getItem("invitados")) || [];
    const listaInvitados = document.getElementById("lista-invitados");
    const contadorInvitados = document.getElementById("contador-invitados");

    function actualizarListaInvitados() {
        listaInvitados.innerHTML = "";
        invitadosGuardados.forEach(invitado => {
            let nuevoInvitado = document.createElement("li");
            nuevoInvitado.textContent = `${invitado.nombre} ${invitado.apellido}`;
            listaInvitados.appendChild(nuevoInvitado);
        });
        contadorInvitados.textContent = invitadosGuardados.length;
    }
    actualizarListaInvitados();

    document.getElementById("rsvpForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let acompanantes = document.getElementById("acompanantes").value;

        if (nombre && apellido) {
            invitadosGuardados.push({ nombre, apellido, acompanantes });
            localStorage.setItem("invitados", JSON.stringify(invitadosGuardados));
            actualizarListaInvitados();
        }
    });
});
