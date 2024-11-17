// Get all input elements
const inputs = {
    annualLeave: document.getElementById('annualLeave'),
    bankHolidays: document.getElementById('bankHolidays'),
    sickLeave: document.getElementById('sickLeave'),
    hoursPerDay: document.getElementById('hoursPerDay'),
    programValue: document.getElementById('programValue'),
    designHoursPerProject: document.getElementById('designHoursPerProject'),
    supervisionHoursPerProject: document.getElementById('supervisionHoursPerProject'),
    adminHoursPerProject: document.getElementById('adminHoursPerProject')
};

// Get all result elements
const results = {
    netDays: document.getElementById('netDays'),
    availableHours: document.getElementById('availableHours'),
    totalDesignHours: document.getElementById('totalDesignHours'),
    totalSupervisionHours: document.getElementById('totalSupervisionHours'),
    totalAdminHours: document.getElementById('totalAdminHours'),
    totalRequiredHours: document.getElementById('totalRequiredHours'),
    utilizationRate: document.getElementById('utilizationRate')
};

function calculateUtilization() {
    // Get input values
    const values = Object.fromEntries(
        Object.entries(inputs).map(([key, input]) => [key, parseFloat(input.value) || 0])
    );

    // Calculate working days
    const workingDays = 260; // 52 weeks × 5 days
    const netDays = workingDays - values.annualLeave - values.bankHolidays - values.sickLeave;
    const availableHours = netDays * values.hoursPerDay;

    // Calculate hours
    const totalDesignHours = values.designHoursPerProject;
    const totalSupervisionHours = values.supervisionHoursPerProject;
    const totalAdminHours = values.adminHoursPerProject;
    const totalRequiredHours = totalDesignHours + totalSupervisionHours + totalAdminHours;
    
    // Calculate utilization rate
    const utilizationRate = (totalRequiredHours / availableHours) * 100;

    // Update results
    results.netDays.textContent = netDays.toFixed(0);
    results.availableHours.textContent = availableHours.toFixed(1);
    results.totalDesignHours.textContent = totalDesignHours.toFixed(1);
    results.totalSupervisionHours.textContent = totalSupervisionHours.toFixed(1);
    results.totalAdminHours.textContent = totalAdminHours.toFixed(1);
    results.totalRequiredHours.textContent = totalRequiredHours.toFixed(1);
    results.utilizationRate.textContent = utilizationRate.toFixed(1) + '%';
}

// Add event listeners to all inputs
Object.values(inputs).forEach(input => {
    input.addEventListener('input', calculateUtilization);
});

// Calculate initially when the page loads
document.addEventListener('DOMContentLoaded', calculateUtilization);