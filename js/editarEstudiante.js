window.addEventListener("load", () => {

    const estudianteIdEditar = JSON.parse(localStorage.getItem("idEstudianteEditar"))

    const estudiantesTodos = JSON.parse(localStorage.getItem("Estudiante"))

    const estudianteXEditar = estudiantesTodos.find(element => {
        return element.id == estudianteIdEditar
    })

    document.getElementById("dni").value = estudianteXEditar.dni;
    document.getElementById("apellido").value = estudianteXEditar.apellido;
    document.getElementById("nombre").value = estudianteXEditar.nombre;
    document.getElementById("nacionalidad").value = estudianteXEditar.nacionalidad;
    document.getElementById("mail").value = estudianteXEditar.mail;
    document.getElementById("celular").value = estudianteXEditar.celular;

})


document.getElementById("formularioEditarEstudiante").addEventListener("submit", () => {
    const estudianteIdEditar = JSON.parse(localStorage.getItem("idEstudianteEditar"))

    const estudiantesTodos = JSON.parse(localStorage.getItem("Estudiante"))

    const nuevosEstudiantes = estudiantesTodos.filter(element => {
        return element.id != estudianteIdEditar
    })

   const estudianteAEditar = estudiantesTodos.find(element => {
        return element.id == estudianteIdEditar
   })

   estudianteAEditar.dni =  document.getElementById("dni").value
   estudianteAEditar.apellido = document.getElementById("apellido").value
   estudianteAEditar.nombre = document.getElementById("nombre").value
   estudianteAEditar.nacionalidad =  document.getElementById("nacionalidad").value
   estudianteAEditar.mail = document.getElementById("mail").value
   estudianteAEditar.celular =  document.getElementById("celular").value

   nuevosEstudiantes.push(estudianteAEditar)

   localStorage.setItem("Estudiante", JSON.stringify(nuevosEstudiantes))

   
})