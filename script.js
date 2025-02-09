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

    // 🔥 🔥 🔥 FIREBASE 🔥 🔥 🔥
    if (typeof firebase !== "undefined") {
        const db = firebase.database();
        const listaInvitados = document.getElementById("lista-invitados");
        const contadorInvitados = document.getElementById("contador-invitados");
        const rsvpForm = document.getElementById("rsvpForm");
        const acompanantesContainer = document.getElementById("acompanantes-container");
        const btnAgregarAcompanante = document.getElementById("agregar-acompanante");

        if (btnAgregarAcompanante) {
            // ➕ Agregar acompañantes
            btnAgregarAcompanante.addEventListener("click", function () {
                let nuevoInput = document.createElement("input");
                nuevoInput.type = "text";
                nuevoInput.className = "acompanante";
                nuevoInput.placeholder = "Nombre del acompañante";
                acompanantesContainer.appendChild(nuevoInput);
            });
        } else {
            console.error("❌ Error: No se encontró el botón 'agregar-acompanante'");
        }

        if (rsvpForm) {
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
        } else {
            console.error("❌ Error: No se encontró el formulario 'rsvpForm'");
        }

        if (db) {
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
        } else {
            console.error("❌ Error: Firebase no está inicializado correctamente.");
        }
    } else {
        console.error("❌ Error: Firebase no está definido. Asegúrate de que la configuración es correcta.");
    }
});
