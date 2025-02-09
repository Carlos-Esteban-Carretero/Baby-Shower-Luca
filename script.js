document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Página cargada correctamente");

    // 🔹 Animación del título con GSAP
    gsap.from("#titulo", { 
        duration: 1.5, 
        opacity: 0, 
        y: -50, 
        ease: "bounce.out" 
    });

    // 🎠 Carrusel automático
    const slides = document.querySelectorAll(".carousel-slide");
    const carouselContainer = document.querySelector(".carousel-container");
    let index = 0;

    function cambiarImagen() {
        index = (index + 1) % slides.length;
        const desplazamiento = -index * 100; 
        carouselContainer.style.transform = `translateX(${desplazamiento}%)`;
    }
    setInterval(cambiarImagen, 3000);

    // ⏳ Cuenta regresiva
    function actualizarCuentaRegresiva() {
        const eventoFecha = new Date("March 2, 2025 17:30:00").getTime();
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
    setInterval(actualizarCuentaRegresiva, 1000);

    // 📌 Formulario de confirmación y Firebase
    const db = firebase.database();
    const listaInvitados = document.getElementById("lista-invitados");
    const contadorInvitados = document.getElementById("contador-invitados");
    const rsvpForm = document.getElementById("rsvpForm");

    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        
        if (nombre && apellido) {
            let nuevoInvitado = db.ref("invitados").push();
            nuevoInvitado.set({ nombre, apellido })
            .then(() => {
                console.log("🎉 Invitado registrado con éxito en Firebase");
                rsvpForm.reset();
            })
            .catch(error => console.error("❌ Error al guardar en Firebase:", error));
        } else {
            alert("Por favor, completa tu nombre y apellido.");
        }
    });

    // 📌 Mostrar invitados en tiempo real
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
