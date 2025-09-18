// Configuración de empleados y turnos
const employees = ['tania', 'carlos', 'bryan', 'dilan'];
const shifts = ['TD', 'TM', 'TT', 'TN'];
const shiftNames = {
    'TM': 'Turno Mañana',
    'TT': 'Turno Tarde', 
    'TN': 'Turno Nocturno',
    'TD': 'Turno Descanso'
};

// Patrón base correcto extraído del Excel (primeros 30 días)
const basePattern = {
    1: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TD', 'dilan': 'TT' },
    2: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TD', 'dilan': 'TT' },
    3: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TD' },
    4: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TD' },
    5: { 'tania': 'TD', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TN' },
    6: { 'tania': 'TD', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TN' },
    7: { 'tania': 'TM', 'carlos': 'TD', 'bryan': 'TT', 'dilan': 'TN' },
    8: { 'tania': 'TM', 'carlos': 'TD', 'bryan': 'TT', 'dilan': 'TN' },
    9: { 'tania': 'TM', 'carlos': 'TT', 'bryan': 'TD', 'dilan': 'TN' },
    10: { 'tania': 'TM', 'carlos': 'TT', 'bryan': 'TD', 'dilan': 'TN' },
    11: { 'tania': 'TM', 'carlos': 'TT', 'bryan': 'TN', 'dilan': 'TD' },
    12: { 'tania': 'TM', 'carlos': 'TT', 'bryan': 'TN', 'dilan': 'TD' },
    13: { 'tania': 'TD', 'carlos': 'TT', 'bryan': 'TN', 'dilan': 'TM' },
    14: { 'tania': 'TD', 'carlos': 'TT', 'bryan': 'TN', 'dilan': 'TM' },
    15: { 'tania': 'TT', 'carlos': 'TD', 'bryan': 'TN', 'dilan': 'TM' },
    16: { 'tania': 'TT', 'carlos': 'TD', 'bryan': 'TN', 'dilan': 'TM' },
    17: { 'tania': 'TT', 'carlos': 'TN', 'bryan': 'TD', 'dilan': 'TM' },
    18: { 'tania': 'TT', 'carlos': 'TN', 'bryan': 'TD', 'dilan': 'TM' },
    19: { 'tania': 'TT', 'carlos': 'TN', 'bryan': 'TM', 'dilan': 'TD' },
    20: { 'tania': 'TT', 'carlos': 'TN', 'bryan': 'TM', 'dilan': 'TD' },
    21: { 'tania': 'TD', 'carlos': 'TN', 'bryan': 'TM', 'dilan': 'TT' },
    22: { 'tania': 'TD', 'carlos': 'TN', 'bryan': 'TM', 'dilan': 'TT' },
    23: { 'tania': 'TN', 'carlos': 'TD', 'bryan': 'TM', 'dilan': 'TT' },
    24: { 'tania': 'TN', 'carlos': 'TD', 'bryan': 'TM', 'dilan': 'TT' },
    25: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TD', 'dilan': 'TT' },
    26: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TD', 'dilan': 'TT' },
    27: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TD' },
    28: { 'tania': 'TN', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TD' },
    29: { 'tania': 'TD', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TN' },
    30: { 'tania': 'TD', 'carlos': 'TM', 'bryan': 'TT', 'dilan': 'TN' }
};

class ScheduleGenerator {
    constructor() {
        this.initializeCurrentDate();
    }

    initializeCurrentDate() {
        const now = new Date();
        document.getElementById('month').value = now.getMonth();
        document.getElementById('year').value = now.getFullYear();
    }

    // Genera el horario para un mes específico usando el patrón base
    generateMonthSchedule(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const schedule = {};

        // Generar horario día por día usando el patrón cíclico de 30 días
        for (let day = 1; day <= daysInMonth; day++) {
            // Calcular el día en el ciclo de 30 días (1-30)
            const cycleDay = ((day - 1) % 30) + 1;
            
            // Obtener el patrón para este día del ciclo
            schedule[day] = { ...basePattern[cycleDay] };
        }

        return schedule;
    }

    // Organiza el horario por turnos para mostrar en tabla
    organizeScheduleByShifts(schedule) {
        const organized = {
            'TD': {},
            'TM': {},
            'TT': {},
            'TN': {}
        };

        Object.keys(schedule).forEach(day => {
            shifts.forEach(shift => {
                organized[shift][day] = [];
                employees.forEach(employee => {
                    if (schedule[day] && schedule[day][employee] === shift) {
                        organized[shift][day].push(employee);
                    }
                });
            });
        });

        return organized;
    }

    // Renderiza la tabla de horarios dividida en semanas
    renderScheduleTable(schedule, month, year) {
        const organized = this.organizeScheduleByShifts(schedule);
        const daysInMonth = Object.keys(schedule).length;
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        let html = `<h2 class="month-title">${monthNames[month]} ${year}</h2>`;

        // Dividir el mes en semanas de máximo 7 días
        let currentDay = 1;
        let weekNumber = 1;

        while (currentDay <= daysInMonth) {
            const endDay = Math.min(currentDay + 6, daysInMonth);
            
            html += `
                <div class="week-container">
                    <h3 class="week-title">Semana ${weekNumber} (Días ${currentDay}-${endDay})</h3>
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>Turno</th>`;

            // Generar encabezados de días para esta semana
            for (let day = currentDay; day <= endDay; day++) {
                const date = new Date(year, month, day);
                const dayName = dayNames[date.getDay()];
                html += `<th>${day}<br><small>${dayName}</small></th>`;
            }

            html += `</tr></thead><tbody>`;

            // Generar filas por turno para esta semana
            shifts.forEach(shift => {
                html += `<tr><td class="turn-label">${shift}</td>`;
                
                for (let day = currentDay; day <= endDay; day++) {
                    const employeesInShift = organized[shift][day] || [];
                    const cellClass = `cell-${shift.toLowerCase()}`;
                    
                    if (employeesInShift.length > 0) {
                        const employeeNames = employeesInShift.map(emp => 
                            emp.charAt(0).toUpperCase() + emp.slice(1)
                        ).join('<br>');
                        html += `<td class="${cellClass}">${employeeNames}</td>`;
                    } else {
                        html += `<td class="${cellClass}">-</td>`;
                    }
                }
                
                html += `</tr>`;
            });

            html += `</tbody></table></div>`;
            
            currentDay = endDay + 1;
            weekNumber++;
        }

        document.getElementById('scheduleTable').innerHTML = html;
    }
}

// Instancia global del generador
const scheduleGenerator = new ScheduleGenerator();

// Función principal para generar horario
function generateSchedule() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    if (!year || year < 2020 || year > 2030) {
        alert('Por favor, ingrese un año válido entre 2020 y 2030');
        return;
    }

    const schedule = scheduleGenerator.generateMonthSchedule(month, year);
    scheduleGenerator.renderScheduleTable(schedule, month, year);
}

// Generar horario inicial al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generateSchedule();
});

// Permitir generar con Enter en el campo de año
document.getElementById('year').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateSchedule();
    }
});

// Auto-generar cuando cambie el mes
document.getElementById('month').addEventListener('change', generateSchedule);