document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Efecto de confeti al cargar la página
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 🎵 Música de fondo automática con botón flotante para silenciar
    let musicPlayer = new Audio("https://www.example.com/music.mp3"); // Reemplazar con URL real
    musicPlayer.loop = true;
    musicPlayer.play();

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

    // 📸 Carrusel automático
    let index = 0;
    const slides = document.querySelector(".carousel-slide");
    const totalSlides = slides.children.length;

    function moveSlide() {
        index = (index + 1) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(moveSlide, 3000);

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

    // ✅ Manejo de confirmación de asistencia y lista de invitados
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
