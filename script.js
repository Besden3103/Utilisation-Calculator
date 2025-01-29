// Add console log for debugging
function calculateUtilisation() {
    console.log('Calculation started');
    
    // Get all input elements
    const inputs = {
        annualLeave: document.getElementById('annualLeave'),
        bankHolidays: document.getElementById('bankHolidays'),
        sickLeave: document.getElementById('sickLeave'),
        hoursPerDay: document.getElementById('hoursPerDay'),
        projectName: document.getElementById('projectName'),
        projectValue: document.getElementById('projectValue'),
        designHoursPerProject: document.getElementById('designHoursPerProject'),
        supervisionHoursPerProject: document.getElementById('supervisionHoursPerProject'),
        administrationHoursPerProject: document.getElementById('administrationHoursPerProject')
    };

    // Get all result elements
    const results = {
        displayProjectName: document.getElementById('displayProjectName'),
        displayProjectValue: document.getElementById('displayProjectValue'),
        netDays: document.getElementById('netDays'),
        availableHours: document.getElementById('availableHours'),
        totalDesignHours: document.getElementById('totalDesignHours'),
        totalSupervisionHours: document.getElementById('totalSupervisionHours'),
        totalAdministrationHours: document.getElementById('totalAdministrationHours'),
        totalRequiredHours: document.getElementById('totalRequiredHours'),
        utilisationRate: document.getElementById('utilisationRate')
    };

    console.log('Input values:', inputs);
    console.log('Result elements:', results);

    // Get input values
    const values = {
        annualLeave: parseFloat(inputs.annualLeave.value) || 0,
        bankHolidays: parseFloat(inputs.bankHolidays.value) || 0,
        sickLeave: parseFloat(inputs.sickLeave.value) || 0,
        hoursPerDay: parseFloat(inputs.hoursPerDay.value) || 0,
        projectName: inputs.projectName.value,
        projectValue: parseNumberWithCommas(inputs.projectValue.value),
        designHoursPerProject: parseFloat(inputs.designHoursPerProject.value) || 0,
        supervisionHoursPerProject: parseFloat(inputs.supervisionHoursPerProject.value) || 0,
        administrationHoursPerProject: parseFloat(inputs.administrationHoursPerProject.value) || 0
    };

    console.log('Parsed values:', values);

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

    console.log('Calculations:', {
        netDays,
        availableHours,
        totalRequiredHours,
        utilisationRate
    });

    // Update results
    try {
        results.displayProjectName.textContent = values.projectName || '-';
        results.displayProjectValue.textContent = values.projectValue ? formatNumber(values.projectValue) : '-';
        results.netDays.textContent = netDays.toFixed(0);
        results.availableHours.textContent = availableHours.toFixed(1);
        results.totalDesignHours.textContent = totalDesignHours.toFixed(1);
        results.totalSupervisionHours.textContent = totalSupervisionHours.toFixed(1);
        results.totalAdministrationHours.textContent = totalAdministrationHours.toFixed(1);
        results.totalRequiredHours.textContent = totalRequiredHours.toFixed(1);
        results.utilisationRate.textContent = utilisationRate.toFixed(1) + '%';
        console.log('Results updated successfully');
    } catch (error) {
        console.error('Error updating results:', error);
    }
}

// Helper functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseNumberWithCommas(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}

// Function to format project value input
function formatProjectValue(input) {
    let value = input.value.replace(/[^\d,]/g, '');
    value = value.replace(/,/g, '');
    value = value ? formatNumber(parseInt(value)) : '';
    input.value = value;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.id === 'projectValue') {
            input.addEventListener('input', function() {
                formatProjectValue(this);
                calculateUtilisation();
            });
        } else {
            input.addEventListener('input', calculateUtilisation);
        }
    });
    
    // Initial calculation
    calculateUtilisation();
});
