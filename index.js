// Array de estudiantes
let students = [];

const form = document.getElementById("student-form")
const editMode = document.getElementById("edit-mode")
const cancelBtn = document.getElementById("cancel-button")
const saveEditBtn = document.getElementById("save-button")
const submitBtn = document.getElementById("submit-button")
const limpiarBtn = document.getElementById("limpiar-button")

const inputMatricula = document.getElementById("matricula");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCurso = document.getElementById("curso");
const inputNota = document.getElementById("nota");

// Función para agregar un estudiante
function addStudent(matricula, nombre, apellido, curso, nota) {
  // Buscar si la matrícula ya existe
  const existingStudentIndex = students.find(
    (student) => student.matricula === matricula
  );

  if (existingStudentIndex !== undefined) {
    swal("Error", "La matrícula ya existe", "error");
    return;
  } else {
    // Si la matrícula no existe, agregar un nuevo estudiante
    students.push({ matricula, nombre, apellido, curso, nota });
    form.reset();
  }
  // Actualizar la tabla de estudiantes
  updateStudentTable();
}

// Event listener para el formulario de agregar estudiante
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const matricula = inputMatricula.value;
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const curso = inputCurso.value;
    const nota = inputNota.valueAsNumber;

    addStudent(matricula, nombre, apellido, curso, nota);

    // Cambiar el modo del formulario a modo de edición
    editMode.value = "false";
    // Mostrar el botón de cancelar
    cancelBtn.style.display = "none";
  });


// Función para actualizar la tabla de estudiantes
function updateStudentTable() {
  const tableBody = document.getElementById("student-table-body");
  tableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    const { matricula, nombre, apellido, curso, nota } = student;
    let notaClass = '';

    if (nota >= 90) {
        notaClass = 'green-score';
    } else if (nota <= 80 && nota >= 70) {
        notaClass = 'yellow-score';
    } else if (nota < 70) {
        notaClass = 'red-score';
    }

    row.innerHTML = `
            <td>${matricula}</td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${curso}</b></td>
            <td class=${notaClass}><b>${nota}</b></td>
            <td>
            <button class="btn btn-info btn-sm" onclick="fillEditStudent('${matricula}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent('${matricula}')">Eliminar</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// Función para eliminar un estudiante
function deleteStudent(matricula) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "La acción no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El estudiante ha sido eliminado.",
            icon: "success"
          });
          students = students.filter((student) => student.matricula !== matricula);
          console.log(students);
          updateStudentTable();
          form.reset();
            editMode.value = "false";
        saveEditBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
        cancelBtn.style.display = "none";
        }
      });
}

// Función para llenar el form edit
function fillEditStudent(matricula) {
    // Buscar el estudiante por matrícula
    const student = students.find((student) => student.matricula === matricula);
    const { nombre, apellido, curso, nota } = student;
  
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputMatricula.value = matricula;
    inputCurso.value = curso;
    inputNota.value = nota;
  
    // Cambiar el modo del formulario a modo de edición
    editMode.value = "true";
   
    saveEditBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
    limpiarBtn.style.display = "none";
  
    cancelBtn.style.display = "inline-block";
  
    //Editar el estudiante
    saveEditBtn.addEventListener("click", function () {
      const index = students.findIndex((student) => student.matricula === matricula);
      editStudent(index);
      
  
      editMode.value = "false";
  
      saveEditBtn.style.display = "none";
      submitBtn.style.display = "inline-block";
      limpiarBtn.style.display = "inline-block";
      cancelBtn.style.display = "none";
      
    });
  
    updateStudentTable();
}
  
// Función para editar un estudiante
function editStudent(index) {
  const matricula = inputMatricula.value;
  const nombre = inputNombre.value;
  const apellido = inputApellido.value;
  const curso = inputCurso.value;
  const nota = inputNota.valueAsNumber;

  students[index] = { matricula, nombre, apellido, curso, nota };
  updateStudentTable();
  
}

// Event listener para el botón de cancelar
cancelBtn.addEventListener("click", function () {
  form.reset();
  editMode.value = "false";
  saveEditBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
  cancelBtn.style.display = "none";
  limpiarBtn.style.display = "inline-block";
});

// Event listener para el botón de limpiar
limpiarBtn.addEventListener("click", function () {
    form.reset();
}); 