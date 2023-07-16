window.addEventListener("load", () => {
    const dataLocalMaterias = localStorage.getItem("Materias")

    if (dataLocalMaterias !== null) {
        const dataJson = JSON.parse(dataLocalMaterias)
        llenarTabla(dataJson)
    } else {
        fetch("./data/materias.json").then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json()
            }
        }).then((datos) => {
            llenarTabla(datos)
            const guardar = datos
            console.log(JSON.stringify(guardar))
            localStorage.setItem("Materias", JSON.stringify(guardar))
        })
    }


    const divSeleccionadorCarrera = document.getElementById("seleccionadorCarreras");

    const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"));

    const select = document.createElement("select");
    select.setAttribute("id", "carreraSeleccionada")
    select.classList.add("form-select")
    carrerasTodas.forEach(element => {
        let option = document.createElement("option");
        option.setAttribute("value", element.id)
        option.appendChild(document.createTextNode(`${element.nombre}`))

        select.appendChild(option)
    });
    divSeleccionadorCarrera.appendChild(select)

})

function borrarHijos(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}
function llenarTabla (array) {
    const bodyMaterias = document.getElementById("bodyMaterias")
    borrarHijos(bodyMaterias)
    array.forEach(materia => {
        let tr = document.createElement("tr")
        
        let id = document.createElement("th")
        id.appendChild(document.createTextNode(materia.id))

        let nombre = document.createElement("td")
        nombre.appendChild(document.createTextNode(materia.nombre))

        let hsSemanales = document.createElement("td")
        let textoHsSemanales = document.createTextNode(materia.hsSemanales)
        hsSemanales.appendChild(textoHsSemanales)

        let carrera = document.createElement("td")
        const carrerasTodas = JSON.parse(localStorage.getItem("Carreras"))

        carrerasTodas.forEach(element => {
            if (element.id == materia.carrera) {
                carrera.appendChild(document.createTextNode(element.nombre))
            }
        })
        

        let acciones = document.createElement("td")
        let botonEditar = document.createElement("button")
        botonEditar.setAttribute("type", "button")
        botonEditar.classList.add("btn",  "btn-warning", "btn-sm")
        botonEditar.appendChild(document.createTextNode("Editar Materia"))

        let botonEliminar = document.createElement("button")
        botonEliminar.setAttribute("type", "button")
        botonEliminar.classList.add("btn", "btn-danger", "btn-sm")
        botonEliminar.appendChild(document.createTextNode("Eliminar Materia"))


        let botonVerInscriptos = document.createElement("button")
        botonVerInscriptos.classList.add("btn", "btn-info")
        botonVerInscriptos.appendChild(document.createTextNode("Ver Inscriptos"))

        acciones.appendChild(botonEditar)
        acciones.appendChild(botonEliminar)
        acciones.appendChild(botonVerInscriptos)
        
        tr.appendChild(id)
        tr.appendChild(nombre)
        tr.appendChild(hsSemanales)
        tr.appendChild(carrera)
        tr.appendChild(acciones)

        botonEditar.addEventListener("click", (e) => {
            let td = botonEditar.parentNode;
            let tr = td.parentNode;
            let id = tr.firstChild.textContent;
            
            localStorage.setItem("idMateriaEditar", id)
            window.location.href = "editarMateria.html"

        });


        botonVerInscriptos.addEventListener("click", () => {
            const inscripciones = JSON.parse(localStorage.getItem("materiasInscripciones"))

            if (inscripciones !== null) {
                inscripciones.forEach(element => {
                    if (element.idMateria == materia.id) {
                        alert("no llegue a hacer una tabla para los inscriptos pero los mostre por consola")
                       console.log(element.estudiantes)
                    } else {
                        alert("no hay inscriptos para esta materia")
                    }
                })
            }
        })

        bodyMaterias.appendChild(tr)
    });

}


document.getElementById("formularioAgregarMateria").addEventListener("submit", (evento) => {
    const datosLocal = localStorage.getItem("Materias");
    let arrayMaterias = []
    if (datosLocal) {
        arrayMaterias = JSON.parse(datosLocal)
    }

    const nuevaMateria = {
        "id": arrayMaterias.length,
        "nombre":  document.getElementById("nombre").value, 
        "hsSemanales": document.getElementById("cargaSemanal").value,
        "carrera": parseInt(document.getElementById("carreraSeleccionada").value)
    }

    arrayMaterias.push(nuevaMateria)

    localStorage.setItem("Materias", JSON.stringify(arrayMaterias))

})



document.getElementById("botonVerMaterias").addEventListener("click", (e) => {
    const datosLocal = JSON.parse(localStorage.getItem("Materias"))

    llenarTabla(datosLocal)
})

document.getElementById("buscarMateria").addEventListener("click", (e) => {
    const materiasTodas = JSON.parse(localStorage.getItem("Materias"))

    const valorIngresado = document.getElementById("buscarMaterias").value.toLowerCase()

    const materiasfiltradas = materiasTodas.filter(element => {
        return element.nombre.toLowerCase() == valorIngresado
    })

    const bodyMaterias = document.getElementById("bodyMaterias")
    borrarHijos(bodyMaterias)

    llenarTabla(materiasfiltradas)
    
})