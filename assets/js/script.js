// Id aleatorio
const aleatorio = () => Math.random().toString(16).slice(10)

// Arreglo de tareas inicales
let tareas = [
    { id: aleatorio(), description: "Sacar la basura", secompleta: false },
    { id: aleatorio(), description: "Comprar verduras", isCompleted: false },
    { id: aleatorio(), description: "Lavar la ropa", isCompleted: false }
]

// Se Inicializan variables de elementos en DOM
const taresingresadas = document.querySelector("#tareas-ingresadas");
const description = document.querySelector("#descripciones");
const tareastotales = document.querySelector("#tareas-totales");
const tareascompletas = document.querySelector("#tareas-completas");

// Se Cambian estados de las tareas
const completas = (id) => {
    const tareas_seleccionedas = tareas.findIndex(tarea => tarea.id === id);
    tareas[tareas_seleccionedas].secompleta = !tareas[tareas_seleccionedas].secompleta
    renderiza_tabla();
    calculatotal();
}

// Aca es para agregar las tareas
const agrega_tarea = () => {
    tareas.push({
        id: aleatorio(),
        description: description.value,
        secompleta: false,
    });

    renderiza_tabla();
    calculatotal();
    borra_descripcion();
}

// Eliminar una tarea
const borra_tarea = (id) => {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderiza_tabla();
    calculatotal();
}

// Calcular tareas totales y completadas
const calculatotal = () => {
    tareastotales.innerHTML = tareas.length
    let completado = 0;
    for (let tarea of tareas) {
        if (tarea.secompleta) { completado++ }
    }
    tareascompletas.innerHTML = completado
}

// Renderizar tabla de tareas
const renderiza_tabla = () => {
    let trHtml = ""
    for (let tarea of tareas) {
        trHtml += `
        <tr>
            <td>${tarea.id}</td>
            <td id="td-${tarea.id}" ${tarea.secompleta && 'class="text-line"'}>${tarea.description}</td>
            <td><input onclick="completas('${tarea.id}')" type="checkbox" class="check" ${tarea.secompleta && 'checked'}></td>
            <td><button onclick="borra_tarea('${tarea.id}')">✖️</button></td>
        </tr>
        `
    }
    taresingresadas.innerHTML = trHtml;
}

// Limpiar y enfocar input de ingreso
const borra_descripcion = ()=>{
    description.value = "";
    description.focus();
}

// Cargar tareas iniciales
renderiza_tabla();
calculatotal();
borra_descripcion();