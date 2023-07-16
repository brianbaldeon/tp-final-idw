window.addEventListener("load", () => {
    const idEstudianteaInscribir = JSON.parse(localStorage.getItem("estudianteInscribir"))
    //console.log(idEstudianteaInscribir)
    const estudiantesTodos = JSON.parse(localStorage.getItem("Estudiante"))
    //console.log(estudiantesTodos)
    const estudianteAInscribir = estudiantesTodos.find(element => {
        return element.id === parseInt(idEstudianteaInscribir)
    })
    
    document.getElementById("dniInscribir").value = estudianteAInscribir.dni;
    document.getElementById("apellidoInscribir").value = estudianteAInscribir.apellido;
    document.getElementById("nombreInscribir").value = estudianteAInscribir.nombre;
    document.getElementById("nacionalidadInscribir").value = estudianteAInscribir.nacionalidad;
    document.getElementById("mailInscribir").value = estudianteAInscribir.mail;
    document.getElementById("celularInscribir").value = estudianteAInscribir.celular

    const seleccionarMaterias = document.getElementById("seleccionarMaterias");

    const materiasTodas = JSON.parse(localStorage.getItem("Materias"));

    const select = document.createElement("select");
    select.setAttribute("id", "materiaseleccionada")
    materiasTodas.forEach(element => {
        let option = document.createElement("option");
        option.setAttribute("value", element.id)
        option.appendChild(document.createTextNode(`${element.nombre}`))

        select.appendChild(option)
    });
    seleccionarMaterias.appendChild(select)


})



document.getElementById("botonInscribir").addEventListener("click", (e) => {
    const Inscriptos = JSON.parse(localStorage.getItem("materiasInscripciones"))
    if (Inscriptos !== null) {
        const estudiantes = JSON.parse(localStorage.getItem("Estudiante"));
        const idEstudianteaInscribir = JSON.parse(localStorage.getItem("estudianteInscribir"))
        const estudiante = estudiantes.find(element => {
            return element.id == idEstudianteaInscribir
        })
        const id_materia = document.getElementById("materiaseleccionada").value
        const nuevosInscriptos = Inscriptos.filter(element => {
            return element.idMateria != id_materia
        })
        const materiaInscripcion = Inscriptos.find(element => {
            return element.idMateria == id_materia
        })
        if (materiaInscripcion !== undefined) {
            const yaestainscripto = materiaInscripcion.estudiantes.some(element => {
                    return element.id == estudiante.id
            })
            if (!yaestainscripto) {
                    materiaInscripcion.estudiantes.push(estudiante)
            } else {
                alert("Este Estudiante ya esta inscripto");
            }
            nuevosInscriptos.push(materiaInscripcion)
        } else {
            const array_inscriptos = []
            array_inscriptos.push(estudiante)
            const inscriptos_materia = {
                "idMateria":id_materia,
                "estudiantes":array_inscriptos
            }
            nuevosInscriptos.push(inscriptos_materia)
        }
        localStorage.setItem("materiasInscripciones", JSON.stringify(nuevosInscriptos))
    } else {
        let arrayInscriptos = []
        const estudiantes = JSON.parse(localStorage.getItem("Estudiante"));
        const idEstudianteaInscribir = JSON.parse(localStorage.getItem("estudianteInscribir"))
        const estudiante = estudiantes.find(element => {
            return element.id == idEstudianteaInscribir
        })
        const id_materia = document.getElementById("materiaseleccionada").value
        const array_inscriptos = []
        array_inscriptos.push(estudiante)
        const inscriptos_materia = {
            "idMateria":id_materia,
            "estudiantes":array_inscriptos
        }
        arrayInscriptos.push(inscriptos_materia)
        localStorage.setItem("materiasInscripciones", JSON.stringify(arrayInscriptos))
    }
})




