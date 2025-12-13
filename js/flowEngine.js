// Workflow Automation Engine

const workflowSteps = [
    {
        id: 1,
        title: "Identify Issue",
        description: "Analyzing ticket description and categorizing the problem",
        status: "pending",
        duration: 1000
    },
    {
        id: 2,
        title: "Run Diagnostics",
        description: "Executing system diagnostics to identify root cause",
        status: "pending",
        duration: 2000
    },
    {
        id: 3,
        title: "Analyze Logs",
        description: "Reviewing event logs and error messages",
        status: "pending",
        duration: 1500
    },
    {
        id: 4,
        title: "Apply Fix",
        description: "Executing automated remediation script",
        status: "pending",
        duration: 2500
    },
    {
        id: 5,
        title: "Validate Fix",
        description: "Testing to ensure the issue is resolved",
        status: "pending",
        duration: 1500
    },
    {
        id: 6,
        title: "Generate Resolution Notes",
        description: "Creating detailed resolution documentation",
        status: "pending",
        duration: 1000
    }
];

let currentWorkflowStep = 0;

function startAutomation() {
    const container = document.getElementById('workflowContainer');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    const canvas = document.getElementById('workflowCanvas');
    canvas.innerHTML = '';
    
    // Reset workflow
    currentWorkflowStep = 0;
    workflowSteps.forEach(step => step.status = 'pending');
    
    // Build workflow UI
    workflowSteps.forEach((step, index) => {
        const stepElement = createWorkflowStep(step, index);
        canvas.appendChild(stepElement);
        
        if (index < workflowSteps.length - 1) {
            const connector = document.createElement('div');
            connector.className = 'workflow-connector';
            canvas.appendChild(connector);
        }
    });
    
    showToast('Starting automated troubleshooting workflow...', 'info');
    
    // Start executing steps
    executeNextStep();
}

function createWorkflowStep(step, index) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'workflow-step';
    stepDiv.id = `step-${step.id}`;
    stepDiv.style.animationDelay = `${index * 0.1}s`;
    
    const statusClass = step.status === 'completed' ? 'completed' : 
                       step.status === 'active' ? 'active' : 
                       step.status === 'error' ? 'error' : '';
    
    stepDiv.innerHTML = `
        <div class="step-icon">
            ${getStepIcon(step.status)}
        </div>
        <div class="step-content">
            <div class="step-title">${step.title}</div>
            <div class="step-description">${step.description}</div>
        </div>
        <span class="step-status">${capitalizeFirst(step.status)}</span>
    `;
    
    return stepDiv;
}

function getStepIcon(status) {
    if (status === 'completed') {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                    <path d="M8 12l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
    } else if (status === 'active') {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                </svg>`;
    } else if (status === 'error') {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                    <path d="M12 8v5M12 16h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
    } else {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#94A3B8" stroke-width="2"/>
                </svg>`;
    }
}

function executeNextStep() {
    if (currentWorkflowStep >= workflowSteps.length) {
        completeWorkflow();
        return;
    }
    
    const step = workflowSteps[currentWorkflowStep];
    step.status = 'active';
    updateStepUI(step);
    
    // Simulate step execution
    setTimeout(() => {
        step.status = 'completed';
        updateStepUI(step);
        currentWorkflowStep++;
        
        // Move to next step
        setTimeout(() => executeNextStep(), 500);
    }, step.duration);
}

function updateStepUI(step) {
    const stepElement = document.getElementById(`step-${step.id}`);
    if (!stepElement) return;
    
    // Remove all status classes
    stepElement.classList.remove('active', 'completed', 'error');
    
    // Add current status class
    if (step.status !== 'pending') {
        stepElement.classList.add(step.status);
    }
    
    // Update icon
    const iconContainer = stepElement.querySelector('.step-icon');
    iconContainer.innerHTML = getStepIcon(step.status);
    
    // Update status text
    const statusSpan = stepElement.querySelector('.step-status');
    statusSpan.textContent = capitalizeFirst(step.status);
}

function completeWorkflow() {
    showToast('Automation workflow completed successfully!', 'success');
    
    // Update ticket status
    if (currentTicket) {
        currentTicket.status = 'Resolved';
        document.getElementById('ticketStatus').textContent = 'Resolved';
    }
    
    // Show resolution summary
    setTimeout(() => {
        const canvas = document.getElementById('workflowCanvas');
        const summary = document.createElement('div');
        summary.className = 'resolution-summary';
        
        summary.innerHTML = `
            <div class="resolution-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="16" stroke="white" stroke-width="3"/>
                    <path d="M11 18l5 5 9-9" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </div>
            <h2 class="resolution-title">Issue Resolved</h2>
            <p class="resolution-text">
                The automation workflow successfully diagnosed and resolved the issue. 
                Resolution notes have been generated and attached to the ticket.
            </p>
            <div class="resolution-details">
                <h3>Resolution Summary</h3>
                <ul>
                    <li>
                        <strong>Root Cause:</strong> Corrupted Outlook profile
                    </li>
                    <li>
                        <strong>Action Taken:</strong> Reset Outlook profile and cleared cache
                    </li>
                    <li>
                        <strong>Script Used:</strong> Reset-OutlookProfile.ps1
                    </li>
                    <li>
                        <strong>Validation:</strong> Outlook launches successfully
                    </li>
                </ul>
            </div>
            <button class="primary-btn" onclick="generateNewTicket(); document.getElementById('workflowContainer').style.display='none';">
                Process Next Ticket
            </button>
        `;
        
        canvas.appendChild(summary);
        summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Console simulation for script execution
function simulateScriptExecution(scriptName) {
    const consoleOutput = [
        { type: 'prompt', text: `PS C:\\Windows\\System32> .\\${scriptName}.ps1` },
        { type: 'info', text: `[INFO] Initializing ${scriptName}...` },
        { type: 'info', text: `[INFO] Checking system prerequisites...` },
        { type: 'success', text: `[SUCCESS] Prerequisites met` },
        { type: 'info', text: `[INFO] Executing main procedure...` },
        { type: 'info', text: `[INFO] Processing system data...` },
        { type: 'success', text: `[SUCCESS] Operation completed successfully` },
        { type: 'info', text: `[INFO] Validating results...` },
        { type: 'success', text: `[SUCCESS] Validation passed` },
        { type: 'success', text: `\n${scriptName} completed successfully!` }
    ];
    
    return consoleOutput;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startAutomation,
        executeNextStep,
        completeWorkflow
    };
}
