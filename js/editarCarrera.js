window.addEventListener("load", () => {
    const carreraAEditar = JSON.parse(localStorage.getItem("idCarreraEditar"))

    const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

    carrerasTodas.forEach(carrera => {
        if (carrera.id == carreraAEditar) {
            document.getElementById("nombreCarreraEditar").value = carrera.nombre
            document.getElementById("duracionEditar").value = carrera.duracion
        }
    });
})


document.getElementById("botonEditarCarrera").addEventListener("click", (e) => {
    const nombre = document.getElementById("nombreCarreraEditar").value
    const duracion = document.getElementById("duracionEditar").value

    const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

    const carreraAEditar = JSON.parse(localStorage.getItem("idCarreraEditar"))

    const carrerasEdit = carrerasTodas.filter(element => {
        return element.id != carreraAEditar
    })

    const carrera =  {
        "id":carrerasEdit.length,
        "nombre":nombre,
        "duracion":duracion
    }

    carrerasEdit.push(carrera)

    localStorage.setItem("Carreras", JSON.stringify(carrerasEdit))

    window.location.href = "agregarCarreras.html"


})