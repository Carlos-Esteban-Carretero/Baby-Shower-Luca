document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Página cargada correctamente");

    // 🔹 Animación del título con GSAP
    gsap.from("#titulo", { 
        duration: 1.5, 
        opacity: 0, 
        y: -50, 
        ease: "bounce.out" 
    });

    // 🎠 Carrusel funcional
    const slides = document.querySelectorAll(".carousel-slide");
    const carouselContainer = document.querySelector(".carousel-container");
    let index = 0;

    function cambiarImagen() {
        index = (index + 1) % slides.length;
        const desplazamiento = -index * 100; 
        carouselContainer.style.transform = `translateX(${desplazamiento}%)`;
    }

    setInterval(cambiarImagen, 3000);

    // 🔥 🔥 🔥 FIREBASE CONFIGURADO CORRECTAMENTE 🔥 🔥 🔥
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

    // **Inicializa Firebase** (Esto faltaba en el código)
    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.database();
    const listaInvitados = document.getElementById("lista-invitados");
    const contadorInvitados = document.getElementById("contador-invitados");
    const rsvpForm = document.getElementById("rsvpForm");
    const acompanantesContainer = document.getElementById("acompanantes-container");
    const btnAgregarAcompanante = document.getElementById("agregar-acompanante");

    // ➕ Agregar acompañantes
    btnAgregarAcompanante.addEventListener("click", function () {
        let nuevoInput = document.createElement("input");
        nuevoInput.type = "text";
        nuevoInput.className = "acompanante";
        nuevoInput.placeholder = "Nombre del acompañante";
        acompanantesContainer.appendChild(nuevoInput);
    });

    // 📌 Guardar en Firebase
    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        let acompanantes = [...document.querySelectorAll(".acompanante")].map(input => input.value.trim()).filter(val => val !== "");

        if (nombre && apellido) {
            let nuevoInvitado = db.ref("invitados").push();
            nuevoInvitado.set({
                nombre: nombre,
                apellido: apellido,
                acompanantes: acompanantes
            }).then(() => {
                console.log("🎉 Invitado registrado con éxito en Firebase");
                rsvpForm.reset();
                acompanantesContainer.innerHTML = "";
            }).catch(error => {
                console.error("❌ Error al guardar en Firebase:", error);
            });
        } else {
            alert("Por favor, completa tu nombre y apellido.");
        }
    });

    // 📌 Mostrar invitados en tiempo real desde Firebase
    db.ref("invitados").on("value", (snapshot) => {
        listaInvitados.innerHTML = "";
        let count = 0;
        snapshot.forEach(childSnapshot => {
            let data = childSnapshot.val();
            let li = document.createElement("li");
            li.textContent = `${data.nombre} ${data.apellido}`;
            listaInvitados.appendChild(li);
            count++;
        });
        contadorInvitados.textContent = count;
    });
});
