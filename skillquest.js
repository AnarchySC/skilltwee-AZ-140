// Skill quest data for AZ-140 Azure Virtual Desktop
const skillQuests = {
    // Tier 1: Plan Skills
    'avd-architecture': {
        icon: '🏗️',
        quests: {
            'Understand Core Concepts': [
                'Explain the AVD architecture components (control plane, data plane)',
                'Understand workspace, host pool, and app group relationships',
                'Know the difference between pooled and personal desktop types',
                'Understand load balancing algorithms (breadth-first, depth-first)',
                'Explain RemoteApp vs full desktop deployment scenarios'
            ],
            'Plan Requirements': [
                'Determine licensing requirements (M365, Windows, CAL)',
                'Plan for multi-session vs single-session hosts',
                'Design for different user personas and workload types',
                'Calculate Azure consumption costs',
                'Plan for Azure region selection and availability'
            ],
            'Hands-on Practice': [
                'Create a basic AVD proof of concept',
                'Document an AVD architecture diagram',
                'Compare pricing for different scenarios'
            ]
        },
        resources: [
            { name: 'MS Learn - AVD Architecture', url: 'https://learn.microsoft.com/en-us/training/modules/azure-virtual-desktop-architecture/' },
            { name: 'AVD Documentation', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/' },
            { name: 'AVD Pricing Calculator', url: 'https://azure.microsoft.com/en-us/pricing/calculator/' }
        ]
    },
    
    'network-design': {
        icon: '🌐',
        quests: {
            'Network Architecture': [
                'Design hub-spoke network topology for AVD',
                'Understand ExpressRoute and VPN connectivity options',
                'Plan for Azure Virtual Network peering',
                'Configure DNS for AVD environments',
                'Design network segmentation and isolation'
            ],
            'Connectivity Planning': [
                'Plan for RDP Shortpath implementation',
                'Understand reverse connect and connection flow',
                'Design for optimal user connectivity',
                'Plan bandwidth requirements per user',
                'Configure outbound internet access'
            ]
        },
        resources: [
            { name: 'AVD Network Connectivity', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/network-connectivity' }
        ]
    },
    
    'capacity-planning': {
        icon: '📊',
        quests: {
            'Sizing Requirements': [
                'Determine VM sizes based on workload types',
                'Calculate user density per VM',
                'Plan for peak vs off-peak capacity',
                'Understand GPU requirements',
                'Size storage requirements'
            ]
        },
        resources: [
            { name: 'VM Sizing Guidelines', url: 'https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/virtual-machine-recs' }
        ]
    },
    
    'identity-integration': {
        icon: '🔑',
        quests: {
            'Identity Architecture': [
                'Configure Azure AD integration',
                'Implement hybrid identity',
                'Set up Azure AD Domain Services',
                'Configure Azure AD Connect sync'
            ]
        },
        resources: [
            { name: 'AVD Identity', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/identity-access-management' }
        ]
    },

    // Tier 2: Implementation Skills
    'host-pools': {
        icon: '🖥️',
        quests: {
            'Create Host Pools': [
                'Deploy pooled desktop host pools',
                'Create personal desktop host pools',
                'Configure RemoteApp host pools',
                'Set validation environment properties',
                'Configure load balancing algorithms'
            ],
            'Advanced Configuration': [
                'Set maximum session limits',
                'Configure RDP properties',
                'Implement Start VM on Connect'
            ]
        },
        resources: [
            { name: 'Create Host Pool', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/create-host-pools-azure-marketplace' }
        ]
    },

    'session-hosts': {
        icon: '💻',
        quests: {
            'Deploy Session Hosts': [
                'Create session host VMs',
                'Deploy using custom images',
                'Implement Shared Image Gallery',
                'Join session hosts to domain'
            ]
        },
        resources: [
            { name: 'Session Host Deployment', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/create-host-pools-powershell' }
        ]
    },

    'workspaces': {
        icon: '🗂️',
        quests: {
            'Configure Workspaces': [
                'Create and configure workspaces',
                'Assign application groups',
                'Configure workspace properties'
            ]
        },
        resources: [
            { name: 'Manage App Groups', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/manage-app-groups' }
        ]
    },

    'storage-solutions': {
        icon: '💾',
        quests: {
            'FSLogix Implementation': [
                'Deploy FSLogix profile containers',
                'Configure Office containers',
                'Set up Cloud Cache'
            ]
        },
        resources: [
            { name: 'FSLogix Documentation', url: 'https://learn.microsoft.com/en-us/fslogix/' }
        ]
    },

    'networking': {
        icon: '🔌',
        quests: {
            'Network Security': [
                'Configure NSGs',
                'Implement Azure Firewall rules',
                'Set up Private Link'
            ]
        },
        resources: [
            { name: 'Network Security', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/security-guide#network-security' }
        ]
    },

    // Tier 3: Access Skills
    'rbac': {
        icon: '🛡️',
        quests: {
            'Role Configuration': [
                'Understand built-in AVD roles',
                'Create custom role definitions',
                'Implement least privilege access'
            ]
        },
        resources: [
            { name: 'AVD RBAC', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/rbac' }
        ]
    },

    'conditional-access': {
        icon: '🔐',
        quests: {
            'Policy Configuration': [
                'Create Conditional Access policies',
                'Implement MFA requirements',
                'Configure device compliance'
            ]
        },
        resources: [
            { name: 'Conditional Access', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/set-up-mfa' }
        ]
    },

    'app-management': {
        icon: '📱',
        quests: {
            'MSIX App Attach': [
                'Create MSIX packages',
                'Configure MSIX app attach',
                'Manage app updates'
            ]
        },
        resources: [
            { name: 'MSIX App Attach', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/what-is-app-attach' }
        ]
    },

    'user-profiles': {
        icon: '👤',
        quests: {
            'Profile Configuration': [
                'Set up FSLogix containers',
                'Configure profile size limits',
                'Implement profile exclusions'
            ]
        },
        resources: [
            { name: 'FSLogix Profiles', url: 'https://learn.microsoft.com/en-us/fslogix/profile-container-configuration-reference' }
        ]
    },

    'device-redirection': {
        icon: '🔄',
        quests: {
            'Basic Redirection': [
                'Configure USB redirection',
                'Set up printer redirection',
                'Enable clipboard redirection'
            ]
        },
        resources: [
            { name: 'Device Redirection', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/device-redirection' }
        ]
    },

    // Tier 4: Management Skills
    'automation': {
        icon: '🤖',
        quests: {
            'Infrastructure as Code': [
                'Create ARM templates',
                'Develop Bicep templates',
                'Implement PowerShell automation'
            ]
        },
        resources: [
            { name: 'AVD Automation', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/automation-cli-powershell' }
        ]
    },

    'scaling': {
        icon: '📈',
        quests: {
            'Scaling Plans': [
                'Create autoscale plans',
                'Configure peak hours',
                'Set capacity thresholds'
            ]
        },
        resources: [
            { name: 'Autoscale', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/autoscale-scaling-plan' }
        ]
    },

    'updates': {
        icon: '🔄',
        quests: {
            'Update Management': [
                'Configure Windows Updates',
                'Update golden images',
                'Manage agent updates'
            ]
        },
        resources: [
            { name: 'Update Management', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/configure-automatic-updates' }
        ]
    },

    'backup-dr': {
        icon: '💾',
        quests: {
            'Backup Strategy': [
                'Implement Azure Backup',
                'Configure retention policies',
                'Test restoration procedures'
            ]
        },
        resources: [
            { name: 'Disaster Recovery', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/disaster-recovery' }
        ]
    },

    'cost-management': {
        icon: '💰',
        quests: {
            'Cost Analysis': [
                'Use Azure Cost Management',
                'Create budgets and alerts',
                'Track resource consumption'
            ]
        },
        resources: [
            { name: 'Cost Optimization', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/cost-optimization' }
        ]
    },

    // Tier 5: Monitoring Skills
    'azure-monitor': {
        icon: '📊',
        quests: {
            'Setup Monitoring': [
                'Enable Azure Monitor for AVD',
                'Configure Log Analytics',
                'Create custom workbooks'
            ]
        },
        resources: [
            { name: 'Azure Monitor for AVD', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/azure-monitor' }
        ]
    },

    'diagnostics': {
        icon: '🔍',
        quests: {
            'Configure Diagnostics': [
                'Enable diagnostic logs',
                'Configure log retention',
                'Set up event log collection'
            ]
        },
        resources: [
            { name: 'Diagnostic Settings', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/diagnostics-log-analytics' }
        ]
    },

    'alerts': {
        icon: '🚨',
        quests: {
            'Alert Rules': [
                'Create metric alerts',
                'Configure log alerts',
                'Set up action groups'
            ]
        },
        resources: [
            { name: 'Alert Best Practices', url: 'https://learn.microsoft.com/en-us/azure/azure-monitor/best-practices-alerts' }
        ]
    },

    'performance': {
        icon: '⚡',
        quests: {
            'Optimization': [
                'Configure GPU for graphics',
                'Implement Teams optimization',
                'Optimize network performance'
            ]
        },
        resources: [
            { name: 'Performance Guidelines', url: 'https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-vdi-recommendations' }
        ]
    },

    'troubleshooting': {
        icon: '🔧',
        quests: {
            'Connection Issues': [
                'Troubleshoot connectivity',
                'Resolve authentication failures',
                'Fix black screen issues'
            ]
        },
        resources: [
            { name: 'Troubleshooting Guide', url: 'https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-desktop/welcome-virtual-desktop' }
        ]
    },

    'security-monitoring': {
        icon: '🛡️',
        quests: {
            'Security Config': [
                'Configure Defender for Cloud',
                'Implement Sentinel',
                'Set up security baselines'
            ]
        },
        resources: [
            { name: 'Security Best Practices', url: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/security-guide' }
        ]
    }
};
