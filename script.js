document.addEventListener("DOMContentLoaded", function () {
    const eventoFecha = new Date("2025-03-01T00:00:00").getTime();
    const countdownEl = document.getElementById("countdown");

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

        if (diferencia < 0) {
            countdownEl.innerHTML = "¡El evento ha comenzado!";
        }
    }

    setInterval(actualizarContador, 1000);

    // Manejar formulario de confirmación
    document.getElementById("rsvpForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("¡Gracias por confirmar tu asistencia!");
    });
});
