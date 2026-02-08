# ITAS - IT Automation Simulator

An interactive web-based platform for practicing IT ticket handling, automation, and troubleshooting. I built this to create a training environment that mirrors the actual ServiceNow workflows and PowerShell automation I use daily.

**[Live Demo](https://mjkhan9.github.io/IT-Simulator-Project/)**

---

## What It Does

ITAS simulates real IT support scenarios with four main components:

**Ticket Simulator**  
Generates realistic IT tickets with a 6-step troubleshooting workflow. Covers network issues, software problems, hardware failures, and account access - the same categories I handle in my actual support role.

**PowerShell Script Library**  
24 simulated automation scripts organized by category - user management, system diagnostics, network troubleshooting, and common fixes. Each script includes execution timing and realistic console output.

**Knowledge Base**  
50+ troubleshooting articles covering Security, Office 365, Network, Windows, Hardware, and Remote Access. Step-by-step guides with the PowerShell commands I actually use.

**IT Labs**  
8 scenario-based training exercises ranging from beginner to advanced. Complete walkthroughs with resolution documentation.

---

## Design

I went with a dark theme inspired by terminal interfaces and security dashboards:

- Primary: Electric Cyan (#00d4aa)
- Secondary: Electric Purple (#a855f7)  
- Typography: Plus Jakarta Sans + JetBrains Mono
- Glassmorphism effects and gradient accents

The whole thing is responsive and works on mobile - helpful for quick reference when I'm away from my desk.

---

## Project Structure

```
IT-Simulator-Project/
├── index.html              # Homepage with feature overview
├── simulator.html          # Ticket automation simulator
├── scripts.html            # PowerShell script library
├── kb.html                 # Knowledge base articles
├── labs.html               # Interactive IT labs
├── css/
│   ├── fluent-core.css     # Core design system
│   ├── layout.css          # Layout and navigation
│   └── simulator.css       # Simulator-specific styles
├── js/
│   ├── ticketEngine.js     # Ticket generation engine
│   └── flowEngine.js       # Workflow automation engine
└── assets/
    └── icons/              # SVG icons
```

---

## Deployment

Static site - no build step required. Works with:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting

### Deploy to GitHub Pages

1. Push to GitHub
2. Settings → Pages
3. Select main branch, root folder
4. Live at `https://username.github.io/IT-Simulator-Project/`

---

## Ticket Categories

The simulator covers the same issues I see regularly:

- **Software** - Outlook, Teams, Office 365, browser issues
- **Network** - VPN, WiFi, DNS, connectivity problems
- **Hardware** - Printers, devices, peripherals
- **Identity** - Account lockouts, permissions, MFA
- **Windows** - Profile corruption, updates, performance
- **Performance** - Slow systems, optimization

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Custom dark theme design system
- No external dependencies - pure frontend

---

## Who It's For

- IT Support Specialists learning ticket workflows
- Help Desk Technicians practicing troubleshooting
- System Administrators exploring automation
- Anyone studying for IT support certifications

---

## Note on Scripts

All scripts and scenarios are simulated for demonstration purposes. No actual system changes are made - this is a training and portfolio tool.

---

## Author

**Mohammad Khan**  
IT Operations Specialist  
AWS Solutions Architect Associate, Cloud Practitioner

[LinkedIn](https://linkedin.com/in/mohammad-jkhan) · [GitHub](https://github.com/Mjkhan9)
