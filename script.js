document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Página cargada correctamente");

    // 🔹 Animación del título con GSAP
    gsap.from("#titulo", { 
        duration: 1.5, 
        opacity: 0, 
        y: -50, 
        ease: "bounce.out" 
    });

    // 🎉 Confeti cayendo desde arriba por toda la pantalla
    function lanzarConfeti() {
        let duracion = 5000; // 5 segundos de duración
        let end = Date.now() + duracion;

        (function frame() {
            confetti({
                particleCount: 5, 
                spread: 120,
                startVelocity: 8,
                ticks: 300,
                gravity: 0.3,
                scalar: 0.8,
                origin: { x: Math.random(), y: -0.1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    setTimeout(lanzarConfeti, 1000);

     function cambiarImagen() {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? "1" : "0";
        });

        index = (index + 1) % totalSlides;
    }

    // Mostrar la primera imagen al inicio
    if (totalSlides > 0) {
        slides.forEach(slide => slide.style.opacity = "0");
        slides[0].style.opacity = "1";
        setInterval(cambiarImagen, 2500);
    }

    // 🔥 🔥 🔥 FIREBASE 🔥 🔥 🔥
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
