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

document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        const closeButton = this.querySelector('.close-btn');
        if (closeButton.style.display === 'none') {
            closeButton.style.display = 'inline'; // Mostrar la "X"
        } else {
            closeButton.style.display = 'none'; // Ocultar la "X"
            this.classList.add('disabled'); // Añadir clase 'disabled'
        }
    });
});

// Añadir evento para eliminar la "X" pero mantener la palabra clave visible
document.querySelectorAll('.close-btn').forEach(item => {
    item.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que el clic en la "X" active el evento de la palabra clave
        this.parentElement.classList.add('disabled'); // Añadir clase 'disabled' para ocultar la X
        this.style.display = 'none'; // Ocultar la "X"
    });
});

// Función para ordenar productos
function sortProducts(orderBy) {
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(productsGrid.children);

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        const ratingA = parseFloat(a.getAttribute('data-rated'));
        const ratingB = parseFloat(b.getAttribute('data-rated'));
        const discountA = a.getAttribute('data-discount') === 'true' ? 1 : 0;
        const discountB = b.getAttribute('data-discount') === 'true' ? 1 : 0;

        if (orderBy === 'price-asc') {
            return priceA - priceB; // Ordenar por precio ascendente
        } else if (orderBy === 'price-desc') {
            return priceB - priceA; // Ordenar por precio descendente
        } else if (orderBy === 'discount') {
            return discountB - discountA; // Mostrar los productos en descuento primero
        } else if (orderBy === 'rated') {
            return ratingB - ratingA; // Mostrar los productos mejor valorados
        }
        return 0;
    });

    // Vaciar la grid y reinsertar los productos ordenados
    productsGrid.innerHTML = '';
    products.forEach(product => productsGrid.appendChild(product));
}

// Asignar eventos a los botones
document.getElementById('sort-price-asc').addEventListener('click', () => {
    sortProducts('price-asc');
});

document.getElementById('sort-price-desc').addEventListener('click', () => {
    sortProducts('price-desc'); // Evento para el nuevo botón
});

document.getElementById('sort-discount').addEventListener('click', () => {
    sortProducts('discount');
});

document.getElementById('sort-best-rated').addEventListener('click', () => {
    sortProducts('rated');
});

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