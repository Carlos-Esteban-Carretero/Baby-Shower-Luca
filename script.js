document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Efecto de confeti al cargar la página
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });

    // 🎵 Música de fondo con reproducción asegurada
    let musicPlayer = new Audio("https://www.example.com/music.mp3"); // Reemplazar con URL real
    musicPlayer.loop = true;
    musicPlayer.volume = 0.5;
    
    document.addEventListener("click", () => {
        musicPlayer.play().catch(() => console.log("Reproducción bloqueada por el navegador"));
    }, { once: true });

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

    // 📸 Carrusel de imágenes ajustando tamaño uniforme
    let index = 0;
    const slides = document.querySelectorAll(".carousel-slide img");
    const totalSlides = slides.length;

    slides.forEach(img => {
        img.style.width = "100%";
        img.style.height = "300px";
        img.style.objectFit = "cover";
    });

    function showSlide() {
        slides.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % totalSlides;
    }
    
    showSlide();
    setInterval(showSlide, 3000);

    // 🕒 Contador regresivo con formato avanzado
    const eventoFecha = new Date("2025-03-01T17:30:00").getTime();
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
    actualizarContador();

    // ✅ Manejo de confirmación de asistencia con botón de añadir más invitados
    let invitadosGuardados = JSON.parse(localStorage.getItem("invitados")) || [];
    const listaInvitados = document.getElementById("lista-invitados");
    const contadorInvitados = document.getElementById("contador-invitados");
    const rsvpForm = document.getElementById("rsvpForm");
    const acompanantesContainer = document.getElementById("acompanantes-container");
    const btnAgregarAcompanante = document.getElementById("agregar-acompanante");

    btnAgregarAcompanante.addEventListener("click", function () {
        let nuevoInput = document.createElement("input");
        nuevoInput.type = "text";
        nuevoInput.className = "acompanante";
        nuevoInput.placeholder = "Nombre del acompañante";
        acompanantesContainer.appendChild(nuevoInput);
    });

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

    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let acompanantes = [...document.querySelectorAll(".acompanante")].map(input => input.value).filter(val => val !== "");

        if (nombre && apellido) {
            invitadosGuardados.push({ nombre, apellido, acompanantes });
            localStorage.setItem("invitados", JSON.stringify(invitadosGuardados));
            actualizarListaInvitados();
            rsvpForm.reset();
            acompanantesContainer.innerHTML = "";
        }
    });
});
