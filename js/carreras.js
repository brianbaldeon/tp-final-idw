window.addEventListener("load", () => {
    const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

    if (carrerasTodas === null) {
        fetch("data/carreras.json").then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(datos => {
            llenarTabla(datos)
            localStorage.setItem("Carreras", JSON.stringify(datos))
        })
    } else {
        llenarTabla(carrerasTodas)
    }

})




function borrarBodyTabla(){
    const elemento = document.getElementById('bodyCarreras');
    while (elemento.firstChild) {
      elemento.firstChild.remove();
    }
  }

function llenarTabla(array){

    const bodyCarreras = document.getElementById("bodyCarreras")
    borrarBodyTabla(bodyCarreras)
    
    array.forEach(element => {
        let tr = document.createElement("tr")
        let id = document.createElement("td")
        id.appendChild(document.createTextNode(element.id))
        let nombre = document.createElement("td")
        nombre.appendChild(document.createTextNode(element.nombre))

        let duracion = document.createElement("td")
        duracion.appendChild(document.createTextNode(element.duracion))

        let acciones = document.createElement("td")
        let editar = document.createElement("button")
        editar.classList.add("btn", "btn-success")
        editar.appendChild(document.createTextNode("Editar"))

        let eliminar = document.createElement("button")
        eliminar.classList.add("btn", "btn-danger")
        eliminar.appendChild(document.createTextNode("Eliminar"))


        acciones.appendChild(editar)
        acciones.appendChild(eliminar)

        tr.appendChild(id)
        tr.appendChild(nombre)
        tr.appendChild(duracion)
        tr.appendChild(acciones)

        editar.addEventListener("click", (e)=> {
            localStorage.setItem("idCarreraEditar", JSON.stringify(element.id))

            window.location.href = "editarCarrera.html"
        })

        eliminar.addEventListener("click", (e) => {
            const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

            const carrerasFilter = carrerasTodas.filter(carrera => {
                return carrera.id != element.id
            })

            localStorage.setItem("Carreras", JSON.stringify(carrerasFilter))

            borrarBodyTabla()
            llenarTabla(carrerasFilter)
        })

        bodyCarreras.appendChild(tr)
    });


}

document.getElementById("botonAgregarCarrera").addEventListener("click", (e) => {

    const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

    const nuevaCarrera = {
        "id":carrerasTodas.length,
        "nombre":document.getElementById("nombreCarrera").value,
        "duracion":document.getElementById("duracion").value
    }

    const validarNombre = carrerasTodas.some(element => {
        return element.nombre === nuevaCarrera.nombre
    })

    if (!validarNombre) {
        carrerasTodas.push(nuevaCarrera)
    } else {
        alert("la carrera ya existe")
    }

    localStorage.setItem("Carreras", JSON.stringify(carrerasTodas))

    borrarBodyTabla()
    llenarTabla(carrerasTodas)
})