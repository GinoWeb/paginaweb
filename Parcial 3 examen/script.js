// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const nuevaTareaInput = document.getElementById('nuevaTarea');
    const btnAgregar = document.getElementById('btnAgregar');
    const listaTareas = document.getElementById('listaTareas');
    const btnEliminarCompletadas = document.getElementById('btnEliminarCompletadas');
    
    // Cargar tareas guardadas en localStorage si existen
    cargarTareas();
    
    // Evento para agregar tarea al hacer clic en el botón
    btnAgregar.addEventListener('click', agregarTarea);
    
    // Evento para agregar tarea al presionar Enter en el input
    nuevaTareaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
    
    // Evento para eliminar tareas completadas
    btnEliminarCompletadas.addEventListener('click', eliminarTareasCompletadas);
    
    // Función para agregar una nueva tarea
    function agregarTarea() {
        const textoTarea = nuevaTareaInput.value.trim();
        
        // Validar que el texto no esté vacío
        if (textoTarea === '') {
            alert('Por favor, ingresa una tarea');
            return;
        }
        
        // Crear elemento de lista para la nueva tarea
        const li = document.createElement('li');
        
        // Crear checkbox para marcar como completada
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.addEventListener('change', function() {
            textoSpan.classList.toggle('completada');
            guardarTareas();
        });
        
        // Crear span para el texto de la tarea
        const textoSpan = document.createElement('span');
        textoSpan.className = 'tarea-texto';
        textoSpan.textContent = textoTarea;
        
        // Agregar elementos al li
        li.appendChild(checkbox);
        li.appendChild(textoSpan);
        
        // Agregar li a la lista
        listaTareas.appendChild(li);
        
        // Limpiar el input
        nuevaTareaInput.value = '';
        
        // Guardar tareas en localStorage
        guardarTareas();
    }
    
    // Función para eliminar tareas completadas
    function eliminarTareasCompletadas() {
        const tareasCompletadas = document.querySelectorAll('li .completada');
        
        if (tareasCompletadas.length === 0) {
            alert('No hay tareas completadas para eliminar');
            return;
        }
        
        tareasCompletadas.forEach(tarea => {
            tarea.parentElement.remove();
        });
        
        // Actualizar localStorage
        guardarTareas();
    }
    
    // Función para guardar tareas en localStorage
    function guardarTareas() {
        const tareas = [];
        
        document.querySelectorAll('#listaTareas li').forEach(li => {
            const texto = li.querySelector('.tarea-texto').textContent;
            const completada = li.querySelector('.checkbox').checked;
            
            tareas.push({
                texto: texto,
                completada: completada
            });
        });
        
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    
    // Función para cargar tareas desde localStorage
    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = tarea.completada;
            checkbox.addEventListener('change', function() {
                textoSpan.classList.toggle('completada');
                guardarTareas();
            });
            
            const textoSpan = document.createElement('span');
            textoSpan.className = 'tarea-texto';
            if (tarea.completada) {
                textoSpan.classList.add('completada');
            }
            textoSpan.textContent = tarea.texto;
            
            li.appendChild(checkbox);
            li.appendChild(textoSpan);
            
            listaTareas.appendChild(li);
        });
    }
});