// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASZ9upT2Rv0wfESt9dBvOBi-_trzmsE-U",
    authDomain: "baby-shower-luca.firebaseapp.com",
    databaseURL: "https://baby-shower-luca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "baby-shower-luca",
    storageBucket: "baby-shower-luca.appspot.com",
    messagingSenderId: "1007298783013",
    appId: "1:1007298783013:web:3b095422fac1e9bff1cc",
    measurementId: "G-CJ5P4M14FE"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 🎉 Confeti al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });

    // 🎵 Música de fondo con reproducción asegurada
    let musicPlayer = new Audio("https://www.example.com/music.mp3");
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

    // 📸 Carrusel
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

    // 🕒 Contador regresivo
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

    // ✅ Confirmación en Firebase
    document.getElementById("rsvpForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;

        database.ref("invitados").push({
            nombre: nombre,
            apellido: apellido
        });

        alert("Asistencia confirmada");
    });
});
