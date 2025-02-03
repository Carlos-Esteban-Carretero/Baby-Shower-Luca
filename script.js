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

    // 📅 Juego: Adivina la fecha de nacimiento
    let prediccionesGuardadas = JSON.parse(localStorage.getItem("predicciones")) || [];
    let listaPredicciones = document.getElementById("listaPredicciones");

    function renderizarPredicciones() {
        listaPredicciones.innerHTML = "";
        prediccionesGuardadas.forEach(prediccion => {
            let nuevoItem = document.createElement("li");
            nuevoItem.textContent = `${prediccion.nombre} → ${prediccion.fecha}`;
            listaPredicciones.appendChild(nuevoItem);
        });
    }
    renderizarPredicciones();

    document.getElementById("enviarAdivinanza").addEventListener("click", function () {
        let nombre = document.getElementById("nombreAdivinanza").value;
        let fechaIngresada = document.getElementById("fechaAdivinada").value;
        if (nombre && fechaIngresada) {
            prediccionesGuardadas.push({ nombre, fecha: fechaIngresada });
            localStorage.setItem("predicciones", JSON.stringify(prediccionesGuardadas));
            renderizarPredicciones();
        }
    });

    // ✅ Confirmar asistencia y añadir invitados
    let invitadosGuardados = JSON.parse(localStorage.getItem("invitados")) || [];
    const listaInvitados = document.getElementById("lista-invitados");
    const contadorInvitados = document.getElementById("contador-invitados");

    function actualizarContador() {
        let total = invitadosGuardados.reduce((acc, invitado) => acc + 1 + invitado.extra.length, 0);
        contadorInvitados.textContent = total;
    }

    function renderizarInvitados() {
        listaInvitados.innerHTML = "";
        invitadosGuardados.forEach(invitado => {
            let nuevoInvitado = document.createElement("li");
            nuevoInvitado.textContent = `${invitado.nombre} ${invitado.apellido}`;
            listaInvitados.appendChild(nuevoInvitado);
        });
        actualizarContador();
    }
    renderizarInvitados();
});
