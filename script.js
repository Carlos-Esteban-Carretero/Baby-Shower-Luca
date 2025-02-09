document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Página cargada correctamente");

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

    // 🔥 Firebase
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
            nuevoInvitado.set({
                nombre: nombre,
                apellido: apellido
            });
            rsvpForm.reset();
        }
    });

    db.ref("invitados").on("value", (snapshot) => {
        listaInvitados.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            let data = childSnapshot.val();
            let li = document.createElement("li");
            li.textContent = `${data.nombre} ${data.apellido}`;
            listaInvitados.appendChild(li);
        });
    });
});
