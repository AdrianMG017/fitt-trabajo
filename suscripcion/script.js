// script.js
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



// Selecciona los elementos de los botones
const monthlyBtn = document.getElementById('monthly');
const yearlyBtn = document.getElementById('yearly');

// Precios originales de los planes (mensuales)
const originalPrices = {
    price1: 29,
    price2: 49,
    price3: 79
};

// Función para cambiar los precios a anual
function switchToYearly() {
    document.getElementById('price1').innerText = originalPrices['price1'] * 12;
    document.getElementById('price2').innerText = originalPrices['price2'] * 12;
    document.getElementById('price3').innerText = originalPrices['price3'] * 12;
    document.querySelectorAll('.price-period').forEach((period) => {
        period.innerText = '/yr';
    });
    yearlyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
}

// Función para cambiar los precios a mensual
function switchToMonthly() {
    document.getElementById('price1').innerText = originalPrices['price1'];
    document.getElementById('price2').innerText = originalPrices['price2'];
    document.getElementById('price3').innerText = originalPrices['price3'];
    document.querySelectorAll('.price-period').forEach((period) => {
        period.innerText = '/mo';
    });
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
}

// Event listeners para los botones
monthlyBtn.addEventListener('click', switchToMonthly);
yearlyBtn.addEventListener('click', switchToYearly);

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