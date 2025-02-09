document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Página cargada correctamente");

    // 🔹 Animación del título con GSAP
    gsap.from("#titulo", { 
        duration: 1.5, 
        opacity: 0, 
        y: -50, 
        ease: "bounce.out" 
    });

    // 🎉 Confeti cayendo suavemente desde arriba en el centro
    function lanzarConfeti() {
        let duracion = 5000; // 5 segundos de duración
        let end = Date.now() + duracion;

        (function frame() {
            confetti({
                particleCount: 5, 
                spread: 40, 
                startVelocity: 5, // Velocidad más baja para caída lenta
                ticks: 200, 
                gravity: 0.1, 
                scalar: 1, 
                origin: { x: 0.5, y: -0.1 } // Sale desde el centro y arriba
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    // Disparar confeti después de 1 segundo
    setTimeout(lanzarConfeti, 1000);

    // 🔄 Carrusel de imágenes funcional
    let index = 0;
    const slides = document.querySelectorAll(".carousel-slide img"); // Asegurarse de seleccionar las imágenes
    const totalSlides = slides.length;

    function cambiarImagen() {
        slides.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none"; // Mostrar solo la imagen activa
        });
        index = (index + 1) % totalSlides;
    }

    if (slides.length > 0) {
        cambiarImagen(); // Iniciar con la primera imagen visible
        setInterval(cambiarImagen, 2500); // Cambia cada 2.5 segundos
    }

    // 🔥 🔥 🔥 RESTAURANDO FIREBASE 🔥 🔥 🔥
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
