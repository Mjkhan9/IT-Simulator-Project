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
        summary.className = 'card';
        summary.style.marginTop = '32px';
        summary.style.animation = 'fadeIn 0.5s ease-in';
        
        summary.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="14" stroke="white" stroke-width="3"/>
                        <path d="M10 16l5 5 7-7" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <h2 style="color: #047857; margin-bottom: 12px; font-size: 1.5rem;">Issue Resolved</h2>
                <p style="color: #64748B; margin-bottom: 24px; line-height: 1.6;">
                    The automation workflow successfully diagnosed and resolved the issue. 
                    Resolution notes have been generated and attached to the ticket.
                </p>
                <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 20px;">
                    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: #0F172A;">Resolution Summary</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
                            <strong>Root Cause:</strong> Corrupted Outlook profile
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
                            <strong>Action Taken:</strong> Reset Outlook profile and cleared cache
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
                            <strong>Script Used:</strong> Reset-OutlookProfile.ps1
                        </li>
                        <li style="padding: 8px 0;">
                            <strong>Validation:</strong> Outlook launches successfully
                        </li>
                    </ul>
                </div>
                <button class="primary-btn" onclick="generateNewTicket(); document.getElementById('workflowContainer').style.display='none';">
                    Process Next Ticket
                </button>
            </div>
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
