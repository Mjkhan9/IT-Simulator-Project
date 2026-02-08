// Ticket Generation Engine

const ticketDatabase = {
    users: [
        "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Park",
        "Jessica Williams", "Robert Taylor", "Amanda Martinez", "James Anderson",
        "Linda Brown", "Christopher Davis", "Maria Garcia", "John Wilson"
    ],
    
    devices: [
        "LAPTOP-NYC-2847", "DESKTOP-BRK-5621", "LAPTOP-MAN-3942",
        "DESKTOP-QNS-7834", "LAPTOP-STN-1256", "DESKTOP-BRX-9047",
        "LAPTOP-NYC-8823", "DESKTOP-BRK-3371", "LAPTOP-MAN-5594"
    ],
    
    operatingSystems: [
        "Windows 11 Pro (22H2)", "Windows 11 Pro (21H2)", "Windows 10 Pro (22H2)",
        "Windows 10 Enterprise (21H2)", "Windows 11 Enterprise (22H2)"
    ],
    
    issues: [
        {
            category: "Software - Microsoft Office",
            priority: "High",
            description: "Microsoft Outlook is not launching. When user clicks the Outlook icon, the application briefly appears in the task manager but then immediately closes. User has tried restarting the computer multiple times with no success. This is impacting user's ability to access email and calendar.",
            relatedScripts: ["Reset-OutlookProfile", "Repair-OfficeInstallation", "Clear-OutlookCache"],
            keywords: ["outlook", "crash", "won't launch"]
        },
        {
            category: "Network - VPN",
            priority: "Critical",
            description: "User cannot connect to VPN. Error message 'The remote connection was denied because the user name and password combination you provided is not recognized'. User confirms password is correct and account is not locked.",
            relatedScripts: ["Reset-VPNConfiguration", "Test-NetworkConnectivity", "Clear-CredentialCache"],
            keywords: ["vpn", "authentication", "remote access"]
        },
        {
            category: "Software - Microsoft Teams",
            priority: "Medium",
            description: "Microsoft Teams is stuck on the loading screen with 'Getting things ready...' message. Application does not progress beyond this point even after waiting 10+ minutes. User needs Teams for daily meetings.",
            relatedScripts: ["Reset-TeamsCache", "Reinstall-Teams", "Clear-TeamsData"],
            keywords: ["teams", "loading", "frozen"]
        },
        {
            category: "Network - WiFi",
            priority: "High",
            description: "WiFi shows as connected but there is no internet access. Network icon shows 'No internet, secured'. User can see the WiFi network and is connected but cannot browse websites or access network resources.",
            relatedScripts: ["Reset-NetworkAdapter", "Flush-DNSCache", "Reset-TCPIPStack"],
            keywords: ["wifi", "no internet", "network"]
        },
        {
            category: "Hardware - Printer",
            priority: "Medium",
            description: "Network printer shows as 'Offline' in Devices and Printers. User cannot print any documents. Printer is powered on and connected to network. Other users can print to the same printer successfully.",
            relatedScripts: ["Reset-PrintSpooler", "Reinstall-PrinterDriver", "Clear-PrintQueue"],
            keywords: ["printer", "offline", "printing"]
        },
        {
            category: "Identity - Account Access",
            priority: "Critical",
            description: "User account is locked after multiple failed login attempts. User needs immediate access to complete time-sensitive work. Account shows as locked in Active Directory.",
            relatedScripts: ["Unlock-UserAccount", "Reset-UserPassword", "Check-AccountStatus"],
            keywords: ["locked", "account", "login"]
        },
        {
            category: "Software - Windows Update",
            priority: "Low",
            description: "Windows Update is stuck at 'Installing updates: 35%' for over 2 hours. Computer cannot be shut down or restarted normally. User attempted to pause updates but option is grayed out.",
            relatedScripts: ["Reset-WindowsUpdate", "Clear-UpdateCache", "Repair-WindowsImage"],
            keywords: ["windows update", "stuck", "frozen"]
        },
        {
            category: "Performance - System Slow",
            priority: "Medium",
            description: "Computer is running extremely slow. Applications take 5+ minutes to open. Task Manager shows 100% disk usage but no specific application is responsible. Issue started after latest Windows update.",
            relatedScripts: ["Optimize-SystemPerformance", "Disable-StartupPrograms", "Check-DiskHealth"],
            keywords: ["slow", "performance", "disk usage"]
        },
        {
            category: "Software - Browser Issues",
            priority: "Low",
            description: "Chrome browser crashes when opening specific websites. Error message 'Aw, Snap! Something went wrong'. Browser works fine with other websites. Issue occurs in both normal and incognito mode.",
            relatedScripts: ["Reset-BrowserSettings", "Clear-BrowserCache", "Reinstall-Chrome"],
            keywords: ["chrome", "browser", "crash"]
        },
        {
            category: "Identity - Profile Corruption",
            priority: "High",
            description: "User profile failed to load. Logged in to temporary profile instead. User cannot access their desktop files, documents, or settings. Error in Event Viewer: 'The User Profile Service failed the logon'.",
            relatedScripts: ["Repair-UserProfile", "Create-NewProfile", "Migrate-UserData"],
            keywords: ["profile", "corruption", "temporary profile"]
        }
    ]
};

let currentTicket = null;

function generateNewTicket() {
    const issue = ticketDatabase.issues[Math.floor(Math.random() * ticketDatabase.issues.length)];
    
    currentTicket = {
        id: `INC-2024-${Math.floor(Math.random() * 90000) + 10000}`,
        user: ticketDatabase.users[Math.floor(Math.random() * ticketDatabase.users.length)],
        device: ticketDatabase.devices[Math.floor(Math.random() * ticketDatabase.devices.length)],
        os: ticketDatabase.operatingSystems[Math.floor(Math.random() * ticketDatabase.operatingSystems.length)],
        category: issue.category,
        priority: issue.priority,
        status: "Open",
        description: issue.description,
        relatedScripts: issue.relatedScripts,
        keywords: issue.keywords,
        createdDate: new Date().toLocaleDateString(),
        createdTime: new Date().toLocaleTimeString()
    };
    
    updateTicketUI();
    showToast('New ticket generated successfully', 'success');
}

function updateTicketUI() {
    if (!currentTicket) return;
    
    document.querySelector('.panel-header h2').textContent = `Ticket #${currentTicket.id}`;
    document.getElementById('ticketUser').textContent = currentTicket.user;
    document.getElementById('ticketDevice').textContent = currentTicket.device;
    document.getElementById('ticketOS').textContent = currentTicket.os;
    document.getElementById('ticketCategory').textContent = currentTicket.category;
    document.getElementById('ticketPriority').textContent = currentTicket.priority;
    document.getElementById('ticketStatus').textContent = currentTicket.status;
    document.getElementById('ticketDescription').textContent = currentTicket.description;
    
    // Update priority badge color
    const priorityBadges = document.querySelectorAll('.panel-header .badge');
    if (priorityBadges[0]) {
        priorityBadges[0].textContent = `${currentTicket.priority} Priority`;
        priorityBadges[0].style.background = getPriorityColor(currentTicket.priority);
    }
    if (priorityBadges[1]) {
        priorityBadges[1].textContent = currentTicket.category.split(' - ')[0];
    }
}

function getPriorityColor(priority) {
    switch(priority.toLowerCase()) {
        case 'critical': return 'rgba(220, 38, 38, 0.3)';
        case 'high': return 'rgba(245, 158, 11, 0.3)';
        case 'medium': return 'rgba(59, 130, 246, 0.3)';
        case 'low': return 'rgba(16, 185, 129, 0.3)';
        default: return 'rgba(255, 255, 255, 0.2)';
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

function showSection(section) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    showToast(`Switched to ${section} view`, 'info');
}

function openDiagnostics() {
    const drawer = document.getElementById('diagnosticsDrawer');
    const content = document.getElementById('diagnosticsContent');
    
    content.innerHTML = `
        <h3 style="margin-bottom: 24px; font-size: 1.1rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 10px;">
            <span class="status-indicator"></span>
            Running System Diagnostics...
        </h3>
        
        <div class="diagnostic-card">
            <div class="diagnostic-header">
                <span class="diagnostic-title">Network Connectivity</span>
                <span class="badge success">Pass</span>
            </div>
            <div class="diagnostic-result success">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="var(--success)" stroke-width="2"/>
                    <path d="M6 10l3 3 5-5" stroke="var(--success)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <div class="diagnostic-result-title" style="color: var(--success);">Connected</div>
                    <div class="diagnostic-result-text">Network adapter is functioning properly</div>
                </div>
            </div>
        </div>
        
        <div class="diagnostic-card">
            <div class="diagnostic-header">
                <span class="diagnostic-title">DNS Resolution</span>
                <span class="badge success">Pass</span>
            </div>
            <div class="diagnostic-result success">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="var(--success)" stroke-width="2"/>
                    <path d="M6 10l3 3 5-5" stroke="var(--success)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <div class="diagnostic-result-title" style="color: var(--success);">Resolving Correctly</div>
                    <div class="diagnostic-result-text">Primary DNS: 8.8.8.8 | Secondary: 8.8.4.4</div>
                </div>
            </div>
        </div>
        
        <div class="diagnostic-card">
            <div class="diagnostic-header">
                <span class="diagnostic-title">Application Status</span>
                <span class="badge error">Fail</span>
            </div>
            <div class="diagnostic-result error">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="var(--error)" stroke-width="2"/>
                    <path d="M10 6v5M10 14h.01" stroke="var(--error)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <div class="diagnostic-result-title" style="color: var(--error);">Microsoft Outlook - Not Responding</div>
                    <div class="diagnostic-result-text">Process crashes on startup. Corrupted profile detected.</div>
                </div>
            </div>
        </div>
        
        <div class="diagnostic-card">
            <div class="diagnostic-header">
                <span class="diagnostic-title">Disk Health</span>
                <span class="badge success">Pass</span>
            </div>
            <div class="diagnostic-result success">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="var(--success)" stroke-width="2"/>
                    <path d="M6 10l3 3 5-5" stroke="var(--success)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <div class="diagnostic-result-title" style="color: var(--success);">Healthy</div>
                    <div class="diagnostic-result-text">C: Drive - 512GB SSD | 278GB Free (54%)</div>
                </div>
            </div>
        </div>
        
        <div class="diagnostic-card">
            <div class="diagnostic-header">
                <span class="diagnostic-title">Memory Usage</span>
                <span class="badge warning">Warning</span>
            </div>
            <div class="diagnostic-result warning">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l7 12H3l7-12z" stroke="var(--warning)" stroke-width="2" fill="none"/>
                    <path d="M10 8v3M10 13h.01" stroke="var(--warning)" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <div class="diagnostic-result-title" style="color: var(--warning);">78% Utilized</div>
                    <div class="diagnostic-result-text">12.5GB / 16GB | Consider closing unused applications</div>
                </div>
            </div>
        </div>
        
        <button class="primary-btn" style="width: 100%; margin-top: 24px;" onclick="closeDrawer('diagnosticsDrawer')">
            Close Diagnostics
        </button>
    `;
    
    drawer.classList.add('open');
}

function openScriptLibrary() {
    const drawer = document.getElementById('scriptsDrawer');
    const content = document.getElementById('scriptsContent');
    
    const scripts = currentTicket ? currentTicket.relatedScripts : [
        "Reset-OutlookProfile", "Repair-OfficeInstallation", "Clear-OutlookCache"
    ];
    
    const scriptDetails = {
        "Reset-OutlookProfile": {
            description: "Resets the Outlook profile by clearing cached credentials and recreating the mail profile",
            category: "Office 365",
            estimatedTime: "2 min"
        },
        "Repair-OfficeInstallation": {
            description: "Runs Office Quick Repair to fix common installation issues without reinstalling",
            category: "Office 365",
            estimatedTime: "5 min"
        },
        "Clear-OutlookCache": {
            description: "Clears the Outlook offline cache and forces re-synchronization with Exchange server",
            category: "Office 365",
            estimatedTime: "1 min"
        },
        "Reset-VPNConfiguration": {
            description: "Removes and reconfigures VPN connection settings with fresh credentials",
            category: "Network",
            estimatedTime: "3 min"
        },
        "Test-NetworkConnectivity": {
            description: "Performs comprehensive network diagnostics including ping, traceroute, and DNS tests",
            category: "Network",
            estimatedTime: "2 min"
        },
        "Clear-CredentialCache": {
            description: "Clears stored Windows credentials and forces re-authentication",
            category: "Security",
            estimatedTime: "1 min"
        },
        "Reset-TeamsCache": {
            description: "Clears Microsoft Teams cache files and resets application state",
            category: "Office 365",
            estimatedTime: "2 min"
        },
        "Reinstall-Teams": {
            description: "Completely removes and reinstalls Microsoft Teams application",
            category: "Office 365",
            estimatedTime: "8 min"
        },
        "Clear-TeamsData": {
            description: "Removes Teams local data while preserving user settings",
            category: "Office 365",
            estimatedTime: "1 min"
        },
        "Reset-NetworkAdapter": {
            description: "Disables and re-enables network adapter to refresh connection",
            category: "Network",
            estimatedTime: "1 min"
        },
        "Flush-DNSCache": {
            description: "Clears the DNS resolver cache to fix name resolution issues",
            category: "Network",
            estimatedTime: "1 min"
        },
        "Reset-TCPIPStack": {
            description: "Resets the TCP/IP stack to default configuration",
            category: "Network",
            estimatedTime: "3 min"
        },
        "Reset-PrintSpooler": {
            description: "Stops and restarts the Print Spooler service and clears stuck jobs",
            category: "Hardware",
            estimatedTime: "1 min"
        },
        "Reinstall-PrinterDriver": {
            description: "Removes and reinstalls printer driver with latest version",
            category: "Hardware",
            estimatedTime: "4 min"
        },
        "Clear-PrintQueue": {
            description: "Removes all pending print jobs from the queue",
            category: "Hardware",
            estimatedTime: "1 min"
        }
    };
    
    let scriptsHTML = '<h3 style="margin-bottom: 20px; font-size: 1.2rem; font-weight: 600;">Recommended PowerShell Scripts</h3>';
    
    scripts.forEach(scriptName => {
        const details = scriptDetails[scriptName] || {
            description: "PowerShell script for IT automation",
            category: "System",
            estimatedTime: "2 min"
        };
        
        scriptsHTML += `
            <div class="script-card" onclick="runScript('${scriptName}')">
                <div class="script-header">
                    <div class="script-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                            <path d="M6 4l-2 2 2 2M14 4l2 2-2 2M12 2L8 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <span class="script-title">${scriptName}</span>
                </div>
                <p class="script-description">${details.description}</p>
                <div class="script-meta">
                    <span class="badge">${details.category}</span>
                    <span class="badge" style="background: #FEF3C7; color: #D97706;">${details.estimatedTime}</span>
                </div>
            </div>
        `;
    });
    
    scriptsHTML += `
        <button class="secondary-btn" style="width: 100%; margin-top: 24px;" onclick="closeDrawer('scriptsDrawer')">
            Close Script Library
        </button>
    `;
    
    content.innerHTML = scriptsHTML;
    drawer.classList.add('open');
}

function runScript(scriptName) {
    closeDrawer('scriptsDrawer');
    showToast(`Executing ${scriptName}...`, 'info');
    
    setTimeout(() => {
        showToast(`${scriptName} completed successfully`, 'success');
    }, 2000);
}

function closeDrawer(drawerId) {
    document.getElementById(drawerId).classList.remove('open');
}

function viewLogs() {
    showToast('Event logs viewer coming soon', 'info');
}

function generateResolution() {
    showToast('Generating resolution notes...', 'info');
    
    setTimeout(() => {
        showToast('Resolution notes generated successfully', 'success');
    }, 1500);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        success: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--success)" stroke-width="2"/><path d="M6 10l3 3 5-5" stroke="var(--success)" stroke-width="2" stroke-linecap="round"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--error)" stroke-width="2"/><path d="M10 6v5M10 14h.01" stroke="var(--error)" stroke-width="2" stroke-linecap="round"/></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 12H3l7-12z" stroke="var(--warning)" stroke-width="2" fill="none"/><path d="M10 8v3M10 13h.01" stroke="var(--warning)" stroke-width="2" stroke-linecap="round"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--accent)" stroke-width="2"/><path d="M10 9h.01M10 12v4" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    
    toast.innerHTML = `
        ${iconMap[type]}
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize with a ticket on page load
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ticketPanel')) {
        generateNewTicket();
    }
});
