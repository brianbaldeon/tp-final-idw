window.addEventListener("load", () => {

    const idMateriaEditar = JSON.parse(localStorage.getItem("idMateriaEditar"))

    const datosLocal = JSON.parse(localStorage.getItem("Materias"));
    const materiaObjetivo = datosLocal.find(element => {
        return element.id === idMateriaEditar
    })

    document.getElementById("nombreEditar").value = materiaObjetivo.nombre
    document.getElementById("cargaSemanalEditar").value = materiaObjetivo.hsSemanales

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


document.getElementById("formularioEditarMateria").addEventListener("submit", (e) => {

    const datosLocal = JSON.parse(localStorage.getItem("Materias"));
    const idMateriaObjetivo = JSON.parse(localStorage.getItem("idMateriaEditar"))
    
    const materiasFiltradas = datosLocal.filter(element => {
        return element.id !== idMateriaObjetivo
    })

    // encontrar la materia con el find
    const materiaObjetivo = datosLocal.find(element => {
        return element.id === idMateriaObjetivo
    })

    materiaObjetivo.nombre = document.getElementById("nombreEditar").value 
    materiaObjetivo.hsSemanales = document.getElementById("cargaSemanalEditar").value
    materiaObjetivo.carrera = document.getElementById("carreraSeleccionada").value

    materiasFiltradas.push(materiaObjetivo)


    localStorage.setItem("Materias",JSON.stringify(materiasFiltradas))


})