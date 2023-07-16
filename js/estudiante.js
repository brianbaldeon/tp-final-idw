//Carga del JSON CON DATOS LOCAL AL INICIAR LA WEB
window.addEventListener("load", () => {
  const dataLocalEstudiante = localStorage.getItem("Estudiante")

  if (dataLocalEstudiante) {
      const dataJson = JSON.parse(dataLocalEstudiante)
      llenarTabla(dataJson)
  } else {
      fetch("./data/estudiantes.json").then(respuesta => {
          if (respuesta.ok) {
              return respuesta.json()
          }
      }).then((datos) => {
          llenarTabla(datos)
          const guardar = datos
          console.log(JSON.stringify(guardar))
          localStorage.setItem("Estudiante", JSON.stringify(guardar))
      })
  }

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
  } 

  const dataLocalMaterias = localStorage.getItem("Materias")

  if (dataLocalMaterias === null) {
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


});


//buscar estudiante
document.getElementById("botonBuscarEstudiante").addEventListener("click", (e) => {
    const valorIngresado = document.getElementById("buscarEstudiante").value.toLowerCase()
    const estudiantesTodos = JSON.parse(localStorage.getItem("Estudiante"));

    const estudiantesFiltrados = estudiantesTodos.filter(element => {
      return element.dni == valorIngresado || element.nombre.toLowerCase() == valorIngresado || element.apellido.toLowerCase() == valorIngresado
    })

    borrarBodyTabla()

    llenarTabla(estudiantesFiltrados)
})

document.getElementById("listarEstudiantes").addEventListener("click", (e) => {
    const estudiantesTodos = JSON.parse(localStorage.getItem("Estudiante"));
    borrarBodyTabla();
    llenarTabla(estudiantesTodos)
})

//BORRAR HIJOS
function borrarBodyTabla(){
  const elemento = document.getElementById('dataBody');
  while (elemento.firstChild) {
    elemento.firstChild.remove();
  }
}
// FUNCION PARA CARGAR LOS DATOS DEL LOCAL A LA TABLA DE LA WEB
function llenarTabla (array) {
  array.sort((a, b) => {
    return a.id - b.id
  })
  const dataBody = document.getElementById("dataBody")
  borrarBodyTabla(dataBody)
  array.forEach(estudiante => {
      let tr = document.createElement("tr")
      
      let id = document.createElement("th")
      id.appendChild(document.createTextNode(estudiante.id))

      let dni = document.createElement("td")
      let dniTexto = document.createTextNode(estudiante.dni)
      dni.appendChild(dniTexto)

      let apellido = document.createElement("td")
      let apellidoTexto = document.createTextNode(estudiante.apellido)
      apellido.appendChild(apellidoTexto)

      let nombre = document.createElement("td")
      let nombreTexto = document.createTextNode(estudiante.nombre)
      nombre.appendChild(nombreTexto)

      let fechaNac = document.createElement("td")
      let fechaNacTexto = document.createTextNode(estudiante.fechaNac)
      fechaNac.appendChild(fechaNacTexto)

      let nacionalidad = document.createElement("td")
      let nacionalidadTexto = document.createTextNode(estudiante.nacionalidad)
      nacionalidad.appendChild(nacionalidadTexto)

      let mail = document.createElement("td")
      let mailTexto = document.createTextNode(estudiante.mail)
      mail.appendChild(mailTexto)

      let celular = document.createElement("td")
      let celularTexto = document.createTextNode(estudiante.celular)
      celular.appendChild(celularTexto)

      let acciones = document.createElement("td")
      let botonEditar = document.createElement("button")
      botonEditar.setAttribute("type", "button")
      botonEditar.classList.add("btn",  "btn-success", "btn-sm")
      botonEditar.appendChild(document.createTextNode("Editar"))

      let botonEliminar = document.createElement("button")
      botonEliminar.setAttribute("type", "button")
      botonEliminar.classList.add("btn", "btn-danger", "btn-sm", )
      botonEliminar.appendChild(document.createTextNode("Eliminar"))

      let botonInscribir = document.createElement("button")
      botonInscribir.setAttribute("type", "button");
      botonInscribir.classList.add("btn", "btn-secondary")
      botonInscribir.appendChild(document.createTextNode("Inscribir"))
      botonInscribir.setAttribute("id", estudiante.id)


      
      acciones.appendChild(botonEditar)
      acciones.appendChild(botonEliminar)
      acciones.appendChild(botonInscribir)
      
      tr.appendChild(id)
      tr.appendChild(dni)
      tr.appendChild(apellido)
      tr.appendChild(nombre)
      tr.appendChild(fechaNac)
      tr.appendChild(nacionalidad)
      tr.appendChild(mail)
      tr.appendChild(celular)
      tr.appendChild(acciones)

      // Agrega un listener al botón de editar
      botonEditar.addEventListener("click", (e) => {
        
        
        localStorage.setItem("idEstudianteEditar",JSON.stringify(estudiante.id))

        window.location.href = "editarEstudiante.html"
        
        });
        
        

      botonEliminar.addEventListener("click", (e) => {
        let td = botonEliminar.parentNode;
        let tr = td.parentNode;
        let id = tr.firstChild.textContent;
        
        tr.remove(); // Eliminar la fila completa
        
        let data = JSON.parse(localStorage.getItem("Estudiante"));
        
        let newData = Object.entries(data).filter(([key, value]) => key !== id);
        
        let updatedData = Object.fromEntries(newData);
        
        localStorage.setItem("Estudiante", JSON.stringify(updatedData));
        
        
      });

      botonInscribir.addEventListener("click", (e) => {
        const idEstudianteInscribir =  e.target.id

        localStorage.setItem("estudianteInscribir", JSON.stringify(idEstudianteInscribir))
        window.location.href = "inscribirEstudiante.html"
      })

      dataBody.appendChild(tr)
  });

};



// Función para crear estudiante
document.getElementById("addStudentForm").addEventListener("submit", (evento) => {
  
  const datosLocal = localStorage.getItem("Estudiante");
  let arrayEstudiantes = []
  if (datosLocal) {
      arrayEstudiantes = JSON.parse(datosLocal)
  }

  const nuevoEstudiante = {
      "id": arrayEstudiantes.length,
      "dni":  document.getElementById("dni").value, 
      "apellido": document.getElementById("apellido").value,
      "nombre": document.getElementById("nombre").value,
      "fechaNac": document.getElementById("fechaNac").value,
      "nacionalidad": document.getElementById("nacionalidad").value,
      "mail": document.getElementById("mail").value,
      "celular": document.getElementById("celular").value
  }

  arrayEstudiantes.push(nuevoEstudiante)

  localStorage.setItem("Estudiante", JSON.stringify(arrayEstudiantes))

});











