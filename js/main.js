var materiaSelect = document.getElementById('materia');
    var editarMateriaLink = document.getElementById('editar-materia');

    // Habilitar edición de materia al hacer clic en el enlace
    editarMateriaLink.addEventListener('click', function (event) {
      event.preventDefault();
      materiaSelect.disabled = false;
    });