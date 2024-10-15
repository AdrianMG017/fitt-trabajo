// Abrir el modal cuando se hace clic en el botón de registro
document.getElementById("open-register").onclick = function() {
    document.getElementById("register-modal").style.display = "flex";
}

// Cerrar el modal cuando se hace clic en la 'x' o en el botón de cancelar
document.querySelector(".close").onclick = function() {
    document.getElementById("register-modal").style.display = "none";
}

document.getElementById("cancel-btn").onclick = function() {
    document.getElementById("register-modal").style.display = "none";
}

// Cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById("register-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const calendarDialog = document.getElementById('calendar-dialog');
const horariosBtn = document.getElementById('horarios-btn');
const closeBtn = document.querySelector('.close-btn');
const currentMonthDiv = document.getElementById('current-month');
const calendarDaysDiv = document.querySelector('.calendar-days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

// Variables de fecha
let currentDate = new Date();
let selectedDate = null;

// Función para mostrar el diálogo
horariosBtn.onclick = function() {
    calendarDialog.style.display = 'block';
    renderCalendar();
};

// Cierra el diálogo al hacer clic en la "X"
closeBtn.onclick = function() {
    calendarDialog.style.display = 'none';
};

// Cierra el diálogo al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target == calendarDialog) {
        calendarDialog.style.display = 'none';
    }
};

// Renderiza el calendario
function renderCalendar() {
    // Establece el mes actual
    currentMonthDiv.textContent = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    calendarDaysDiv.innerHTML = '';

    // Calcula el primer día del mes y cuántos días hay
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Calcula el número de espacios en blanco antes del primer día del mes
    const blankDays = firstDayOfMonth.getDay();

    // Añade los días en blanco
    for (let i = 0; i < blankDays; i++) {
        const blankDay = document.createElement('div');
        calendarDaysDiv.appendChild(blankDay);
    }

    // Añade los días del mes
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.className = 'calendar-day';
        dayDiv.onclick = function() {
            selectDate(day);
        };
        calendarDaysDiv.appendChild(dayDiv);
    }
}

// Selecciona un día
function selectDate(day) {
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const allDays = document.querySelectorAll('.calendar-day');
    allDays.forEach(d => d.classList.remove('selected')); // Quitar selección
    allDays[day - 1].classList.add('selected'); // Agregar clase seleccionada
}

// Cambia al mes anterior
prevMonthBtn.onclick = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

// Cambia al próximo mes
nextMonthBtn.onclick = function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};