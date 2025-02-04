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
const db = firebase.database();

// Confeti
document.addEventListener("DOMContentLoaded", function () {
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });

    // Confirmación de asistencia en Firebase
    document.getElementById("rsvpForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;

        db.ref("invitados").push({
            nombre: nombre,
            apellido: apellido
        });

        alert("Asistencia confirmada");
    });
});
