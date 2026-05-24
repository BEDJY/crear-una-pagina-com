// Cloudflare D1 Serverless Database Wrapper
window.db = {
    async select(table, options = {}) {
        const response = await fetch('/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'select',
                table: table,
                columns: options.columns || ['*'],
                where: options.where || {},
                order: options.order || ''
            })
        });
        const res = await response.json();
        if (!res.success) throw new Error(res.error);
        return res.data;
    },
    async insert(table, data) {
        const response = await fetch('/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'insert',
                table: table,
                data: data
            })
        });
        const res = await response.json();
        if (!res.success) throw new Error(res.error);
        return res.data;
    },
    async update(table, data, where) {
        const response = await fetch('/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'update',
                table: table,
                data: data,
                where: where
            })
        });
        const res = await response.json();
        if (!res.success) throw new Error(res.error);
        return res;
    },
    async delete(table, where) {
        const response = await fetch('/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'delete',
                table: table,
                where: where
            })
        });
        const res = await response.json();
        if (!res.success) throw new Error(res.error);
        return res;
    }
};

// ==========================================
// NEXUS INTERACTIVITY MODULE - 2089
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración del Contador Regresivo ---
    // Fecha y hora de destino (año, mes - 1, día, hora, minuto, segundo)
    const launchDate = new Date(2024, 11, 31, 23, 59, 59); // Ejemplo: 31 de Diciembre de 2024, 23:59:59

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.querySelector('.countdown-container');
    const titleEl = document.querySelector('.title');
    const subtitleEl = document.querySelector('.subtitle');
    const formMessageEl = document.getElementById('formMessage');
    const subscriptionForm = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('emailInput');

    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;

        if (difference <= 0) {
            // Si la fecha ha pasado, muestra el mensaje de lanzamiento
            clearInterval(countdownInterval);
            if (countdownContainer) countdownContainer.innerHTML = '<p class="subtitle" style="color: var(--primary); font-weight: 600;">¡El portal está abierto!</p>';
            if (titleEl) titleEl.innerHTML = 'El Futuro <span class="gradient-text">Ha Llegado</span>';
            if (subtitleEl) subtitleEl.style.display = 'none'; // Ocultar subtítulo si no es necesario
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        if (daysEl) daysEl.textContent = formatTime(days);
        if (hoursEl) hoursEl.textContent = formatTime(hours);
        if (minutesEl) minutesEl.textContent = formatTime(minutes);
        if (secondsEl) secondsEl.textContent = formatTime(seconds);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Ejecutar la actualización del contador cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial para mostrar el tiempo inmediatamente

    // --- Lógica del Formulario de Suscripción ---
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Previene el envío tradicional del formulario

            const email = emailInput.value.trim();

            if (!email) {
                if (formMessageEl) {
                    formMessageEl.textContent = 'Por favor, introduce una dirección de correo electrónico válida.';
                    formMessageEl.style.color = 'var(--secondary)';
                }
                return;
            }

            // Simulación de conexión/suscripción exitosa
            // En un entorno de producción, aquí iría una llamada a una API
            console.log(`Simulando conexión para: ${email}`);

            if (formMessageEl) {
                formMessageEl.textContent = 'Conexión establecida. Preparándote para el futuro...';
                formMessageEl.style.color = 'var(--primary)';
            }

            // Limpiar el campo de entrada después de la simulación
            emailInput.value = '';

            // Opcional: Mostrar un mensaje de éxito temporal y luego ocultarlo
            setTimeout(() => {
                if (formMessageEl) formMessageEl.textContent = '';
            }, 5000); // Mensaje visible por 5 segundos
        });
    }
});
