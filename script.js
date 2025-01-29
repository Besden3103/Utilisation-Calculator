// Get all input elements
const inputs = {
    annualLeave: document.getElementById('annualLeave'),
    bankHolidays: document.getElementById('bankHolidays'),
    sickLeave: document.getElementById('sickLeave'),
    hoursPerDay: document.getElementById('hoursPerDay'),
    programmeValue: document.getElementById('programmeValue'),
    designHoursPerProject: document.getElementById('designHoursPerProject'),
    supervisionHoursPerProject: document.getElementById('supervisionHoursPerProject'),
    administrationHoursPerProject: document.getElementById('administrationHoursPerProject')
};

// Get all result elements
const results = {
    netDays: document.getElementById('netDays'),
    availableHours: document.getElementById('availableHours'),
    totalDesignHours: document.getElementById('totalDesignHours'),
    totalSupervisionHours: document.getElementById('totalSupervisionHours'),
    totalAdministrationHours: document.getElementById('totalAdministrationHours'),
    totalRequiredHours: document.getElementById('totalRequiredHours'),
    utilisationRate: document.getElementById('utilisationRate')
};

function calculateUtilisation() {
    // Get input values
    const values = Object.fromEntries(
        Object.entries(inputs).map(([key, input]) => [key, parseFloat(input.value) || 0])
    );

    // Calculate working days
    const workingDays = 260; // 52 weeks × 5 days
    const netDays = workingDays - values.annualLeave - values.bankHolidays - values.sickLeave;
    const availableHours = netDays * values.hoursPerDay;

    // Use hours directly from inputs (single project)
    const totalDesignHours = values.designHoursPerProject;
    const totalSupervisionHours = values.supervisionHoursPerProject;
    const totalAdministrationHours = values.administrationHoursPerProject;
    const totalRequiredHours = totalDesignHours + totalSupervisionHours + totalAdministrationHours;
    
    // Calculate utilisation rate
    const utilisationRate = (totalRequiredHours / availableHours) * 100;

    // Update results
    results.netDays.textContent = netDays.toFixed(0);
    results.availableHours.textContent = availableHours.toFixed(1);
    results.totalDesignHours.textContent = totalDesignHours.toFixed(1);
    results.totalSupervisionHours.textContent = totalSupervisionHours.toFixed(1);
    results.totalAdministrationHours.textContent = totalAdministrationHours.toFixed(1);
    results.totalRequiredHours.textContent = totalRequiredHours.toFixed(1);
    results.utilisationRate.textContent = utilisationRate.toFixed(1) + '%';
}

// Add event listeners to all inputs
Object.values(inputs).forEach(input => {
    input.addEventListener('input', calculateUtilisation);
});

// Calculate initially when the page loads
document.addEventListener('DOMContentLoaded', calculateUtilisation);
