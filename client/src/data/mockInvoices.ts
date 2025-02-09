export interface Invoice {
    operationDate: string;
    issuer: {
        name: string;
        taxId: string;
        address: string;
        postalCode: string;
        city: string;
    };
    notes: string;
    type: "standard" | "simplified" | "rectificative";
    direction: "outgoing" | "incoming";
    id: string;
    invoiceNumber: string;
    customer: {
        name: string;
        taxId: string;
        address: string;
        postalCode: string;
        city: string;
    };
    issueDate: string;
    dueDate: string;
    items: {
        description: string;
        quantity: number;
        price: number;
        total: number;
    }[];
    totalAmount: number;
    status:
    | "draft"
    | "pending_approval"
    | "approved"
    | "rejected"
    | "signed"
    | "submitted"
    | "accepted";
    approvalWorkflow: {
        currentLevel: number;
        maxLevels: number;
        approvers: {
            level: number;
            role: string;
            status: "pending" | "approved" | "rejected";
            userId?: string;
            timestamp?: string;
            comments?: string;
        }[];
    };
    signatureInfo: {
        signedAt?: string;
        signedBy?: string;
    };
    submissionInfo: {
        submittedAt?: string;
        verificationId?: string;
        response?: {
            status: "pending" | "accepted" | "rejected";
            message?: string;
        };
    };
    qrCode: string;
    pdfUrl?: string;
    bankInfo?: {
        iban: string;
        bic: string;
        bankName: string;
    };
    paymentMethod: "bank_transfer" | "direct_debit" | "credit_card";
    paymentStatus: "pending" | "paid" | "overdue" | "cancelled";
    auditTrail: {
        timestamp: string;
        action:
        | "created"
        | "signed"
        | "submitted"
        | "verified"
        | "status_changed"
        | "approval_requested"
        | "approved"
        | "rejected"
        | "payment_processed"
        | "norma34_generated";
        actor: string;
        details: string;
        level?: number;
    }[];
}

// Add more incoming invoice examples
export const mockInvoices: Invoice[] = [
    {
        id: "1",
        direction: "outgoing",
        operationDate: "2025-01-15",
        type: "standard",
        invoiceNumber: "INV-2025-001",
        customer: {
            name: "Tech Education S.L.",
            taxId: "B12345678",
            address: "Calle Principal 123",
            postalCode: "28001",
            city: "Madrid"
        },
        issuer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        notes: "Annual software license and training package",
        issueDate: "2025-01-15",
        dueDate: "2025-02-14",
        items: [
            {
                description: "Educational Software License - Annual",
                quantity: 1,
                price: 1200,
                total: 1200,
            },
            {
                description: "Training Sessions",
                quantity: 5,
                price: 300,
                total: 1500,
            },
        ],
        totalAmount: 2700,
        status: "pending_approval",
        paymentMethod: "direct_debit",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 1,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "pending",
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "pending",
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "pending",
                },
            ],
        },
        signatureInfo: {},
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-001",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-01-15T10:00:00Z",
                action: "created",
                actor: "Dana R.",
                details: "Invoice created",
            },
            {
                timestamp: "2025-01-15T10:30:00Z",
                action: "approval_requested",
                actor: "Dana R.",
                details: "Approval requested from Department Manager",
                level: 1,
            },
        ],
    },
    {
        id: "2",
        direction: "outgoing",
        operationDate: "2025-01-18",
        type: "standard",
        invoiceNumber: "INV-2025-002",
        customer: {
            name: "Educational Services Company",
            taxId: "B87654321",
            address: "Avenida Secundaria 456",
            postalCode: "08001",
            city: "Barcelona"
        },
        issuer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        notes: "Curriculum development services",
        issueDate: "2025-01-18",
        dueDate: "2025-02-17",
        items: [
            {
                description: "Curriculum Development Services",
                quantity: 1,
                price: 3500,
                total: 3500,
            },
        ],
        totalAmount: 3500,
        status: "submitted",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 3,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "approved",
                    userId: "DM123",
                    timestamp: "2025-01-18T12:00:00Z",
                    comments: "Approved after budget review",
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "approved",
                    userId: "FC456",
                    timestamp: "2025-01-18T13:30:00Z",
                    comments: "Financial terms verified",
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "approved",
                    userId: "CFO789",
                    timestamp: "2025-01-18T14:00:00Z",
                    comments: "Final approval granted",
                },
            ],
        },
        signatureInfo: {
            signedAt: "2025-01-18T14:20:00Z",
            signedBy: "Dana R.",
        },
        submissionInfo: {
            submittedAt: "2025-01-18T14:25:00Z",
            verificationId: "VF-2025-002-DEF",
            response: {
                status: "pending",
            },
        },
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-002",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-01-18T10:00:00Z",
                action: "created",
                actor: "Dana R.",
                details: "Invoice created",
            },
            {
                timestamp: "2025-01-18T12:00:00Z",
                action: "approved",
                actor: "Department Manager",
                details: "Level 1 approval granted",
                level: 1,
            },
            {
                timestamp: "2025-01-18T13:30:00Z",
                action: "approved",
                actor: "Financial Controller",
                details: "Level 2 approval granted",
                level: 2,
            },
            {
                timestamp: "2025-01-18T14:00:00Z",
                action: "approved",
                actor: "CFO",
                details: "Level 3 approval granted",
                level: 3,
            },
            {
                timestamp: "2025-01-18T14:20:00Z",
                action: "signed",
                actor: "Dana R.",
                details: "Digital signature applied",
            },
            {
                timestamp: "2025-01-18T14:25:00Z",
                action: "submitted",
                actor: "System",
                details: "Submitted to VERIFACTU",
            },
        ],
    },
    {
        id: "3",
        direction: "outgoing",
        operationDate: "2025-01-19",
        type: "standard",
        invoiceNumber: "INV-2025-003",
        customer: {
            name: "Learning Center Institute",
            taxId: "B98765432",
            address: "Plaza Principal 789",
            postalCode: "46001",
            city: "Valencia"
        },
        issuer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        notes: "Student management system setup and license",
        issueDate: "2025-01-19",
        dueDate: "2025-02-18",
        items: [
            {
                description: "Student Management System - Monthly Fee",
                quantity: 1,
                price: 800,
                total: 800,
            },
            {
                description: "Setup Service",
                quantity: 1,
                price: 500,
                total: 500,
            },
        ],
        totalAmount: 1300,
        status: "rejected",
        paymentMethod: "bank_transfer",
        paymentStatus: "cancelled",
        approvalWorkflow: {
            currentLevel: 2,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "approved",
                    userId: "DM123",
                    timestamp: "2025-01-19T11:00:00Z",
                    comments: "Initial approval granted",
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "rejected",
                    userId: "FC456",
                    timestamp: "2025-01-19T12:00:00Z",
                    comments: "Budget exceeded for this quarter",
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "pending",
                },
            ],
        },
        signatureInfo: {},
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-003",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-01-19T10:00:00Z",
                action: "created",
                actor: "Nancy W.",
                details: "Invoice created",
            },
            {
                timestamp: "2025-01-19T11:00:00Z",
                action: "approved",
                actor: "Department Manager",
                details: "Level 1 approval granted",
                level: 1,
            },
            {
                timestamp: "2025-01-19T12:00:00Z",
                action: "rejected",
                actor: "Financial Controller",
                details: "Level 2 approval rejected - Budget exceeded",
                level: 2,
            },
        ],
    },
    {
        id: "4",
        direction: "outgoing",
        operationDate: "2025-01-16",
        type: "standard",
        invoiceNumber: "INV-2025-004",
        customer: {
            name: "Digital Learning Academy",
            taxId: "B45678901",
            address: "Avenida Principal 321",
            postalCode: "41001",
            city: "Sevilla"
        },
        issuer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        notes: "LMS implementation and annual license",
        issueDate: "2025-01-16",
        dueDate: "2025-02-15",
        items: [
            {
                description: "Learning Management System - Annual License",
                quantity: 1,
                price: 4500,
                total: 4500,
            },
            {
                description: "Implementation Services",
                quantity: 1,
                price: 1500,
                total: 1500,
            },
        ],
        totalAmount: 6000,
        status: "accepted",
        paymentMethod: "bank_transfer",
        paymentStatus: "paid",
        approvalWorkflow: {
            currentLevel: 3,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "approved",
                    userId: "DM123",
                    timestamp: "2025-01-16T11:00:00Z",
                    comments: "Approved - Strategic investment",
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "approved",
                    userId: "FC456",
                    timestamp: "2025-01-16T13:00:00Z",
                    comments: "Budget verified and approved",
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "approved",
                    userId: "CFO789",
                    timestamp: "2025-01-16T14:30:00Z",
                    comments: "Final approval granted - High priority program",
                },
            ],
        },
        signatureInfo: {
            signedAt: "2025-01-16T15:00:00Z",
            signedBy: "Dana R.",
        },
        submissionInfo: {
            submittedAt: "2025-01-16T15:05:00Z",
            verificationId: "VF-2025-004-XYZ",
            response: {
                status: "accepted",
                message: "Invoice successfully verified and accepted by VERIFACTU",
            },
        },
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-004",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-01-16T10:00:00Z",
                action: "created",
                actor: "Dana R.",
                details: "Invoice created",
            },
            {
                timestamp: "2025-01-16T10:05:00Z",
                action: "approval_requested",
                actor: "Dana R.",
                details: "Approval workflow initiated",
                level: 1,
            },
            {
                timestamp: "2025-01-16T11:00:00Z",
                action: "approved",
                actor: "Department Manager",
                details: "Level 1 approval granted",
                level: 1,
            },
            {
                timestamp: "2025-01-16T13:00:00Z",
                action: "approved",
                actor: "Financial Controller",
                details: "Level 2 approval granted",
                level: 2,
            },
            {
                timestamp: "2025-01-16T14:30:00Z",
                action: "approved",
                actor: "CFO",
                details: "Level 3 approval granted",
                level: 3,
            },
            {
                timestamp: "2025-01-16T15:00:00Z",
                action: "signed",
                actor: "Dana R.",
                details: "Digital signature applied",
            },
            {
                timestamp: "2025-01-16T15:05:00Z",
                action: "submitted",
                actor: "System",
                details: "Submitted to VERIFACTU for verification",
            },
            {
                timestamp: "2025-01-16T15:10:00Z",
                action: "verified",
                actor: "VERIFACTU",
                details: "Invoice verified and accepted by VERIFACTU",
            },
            {
                timestamp: "2025-01-16T15:11:00Z",
                action: "status_changed",
                actor: "System",
                details: "Status updated to Accepted",
            },
        ],
    },
    {
        id: "5",
        direction: "incoming",
        operationDate: "2025-01-20",
        type: "standard",
        invoiceNumber: "VINV-2025-001",
        customer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        issuer: {
            name: "Professional Training Services Ltd",
            taxId: "B98765432",
            address: "Plaza del Sol 789",
            postalCode: "28003",
            city: "Madrid"
        },
        notes: "Professional development workshops for staff",
        issueDate: "2025-01-20",
        dueDate: "2025-02-19",
        items: [
            {
                description: "Advanced Teaching Methods Workshop",
                quantity: 1,
                price: 2500,
                total: 2500,
            },
            {
                description: "Educational Technology Training",
                quantity: 1,
                price: 1800,
                total: 1800,
            },
        ],
        totalAmount: 4300,
        status: "approved",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 3,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "approved",
                    userId: "DM789",
                    timestamp: "2025-01-20T14:00:00Z",
                    comments: "Workshop aligns with our training needs"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "approved",
                    userId: "FC456",
                    timestamp: "2025-01-20T15:00:00Z",
                    comments: "Within budget allocation"
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "approved",
                    userId: "CFO123",
                    timestamp: "2025-01-20T16:00:00Z",
                    comments: "Approved for payment"
                }
            ],
        },
        signatureInfo: {
            signedAt: "2025-01-20T13:00:00Z",
            signedBy: "John Smith"
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-001",
        bankInfo: {
            iban: "ES7100750327630600000573",
            bic: "BSCHESMMXXX",
            bankName: "Banco Santander"
        },
        auditTrail: [
            {
                timestamp: "2025-01-20T12:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-01-20T13:00:00Z",
                action: "signed",
                actor: "John Smith",
                details: "Digital signature verified"
            },
            {
                timestamp: "2025-01-20T14:00:00Z",
                action: "approved",
                actor: "Department Manager",
                details: "Level 1 approval granted",
                level: 1
            },
            {
                timestamp: "2025-01-20T15:00:00Z",
                action: "approved",
                actor: "Financial Controller",
                details: "Level 2 approval granted",
                level: 2
            },
            {
                timestamp: "2025-01-20T16:00:00Z",
                action: "approved",
                actor: "CFO",
                details: "Level 3 approval granted",
                level: 3
            }
        ],
    },
    {
        id: "6",
        direction: "incoming",
        operationDate: "2025-01-22",
        type: "standard",
        invoiceNumber: "VINV-2025-002",
        customer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        issuer: {
            name: "Tech Equipment Solutions",
            taxId: "B34567890",
            address: "Calle Tecnología 123",
            postalCode: "28045",
            city: "Madrid"
        },
        notes: "IT Equipment and Installation Services",
        issueDate: "2025-01-22",
        dueDate: "2025-02-21",
        items: [
            {
                description: "Interactive Whiteboards - Model X2000",
                quantity: 5,
                price: 1200,
                total: 6000
            },
            {
                description: "Installation Service",
                quantity: 5,
                price: 150,
                total: 750
            }
        ],
        totalAmount: 6750,
        status: "pending_approval",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 1,
            maxLevels: 2,
            approvers: [
                {
                    level: 1,
                    role: "IT Manager",
                    status: "pending"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "pending"
                }
            ]
        },
        signatureInfo: {
            signedAt: "2025-01-22T10:00:00Z",
            signedBy: "Maria T."
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-002",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-01-22T10:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-01-22T10:00:00Z",
                action: "signed",
                actor: "Maria T.",
                details: "Digital signature verified"
            }
        ]
    },
    {
        id: "7",
        direction: "incoming",
        operationDate: "2025-01-23",
        type: "standard",
        invoiceNumber: "VINV-2025-003",
        customer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        issuer: {
            name: "Educational Content Creators",
            taxId: "B56789012",
            address: "Rambla Catalunya 45",
            postalCode: "08007",
            city: "Barcelona"
        },
        notes: "Digital Learning Content Development",
        issueDate: "2025-01-23",
        dueDate: "2025-02-22",
        items: [
            {
                description: "Interactive Course Development - Mathematics",
                quantity: 1,
                price: 3500,
                total: 3500
            },
            {
                description: "Video Production Services",
                quantity: 10,
                price: 250,
                total: 2500
            }
        ],
        totalAmount: 6000,
        status: "approved",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 2,
            maxLevels: 2,
            approvers: [
                {
                    level: 1,
                    role: "Content Manager",
                    status: "approved",
                    userId: "CM123",
                    timestamp: "2025-01-23T11:30:00Z",
                    comments: "Content quality verified"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "approved",
                    userId: "FC456",
                    timestamp: "2025-01-23T14:00:00Z",
                    comments: "Within budget allocation"
                }
            ]
        },
        signatureInfo: {
            signedAt: "2025-01-23T10:15:00Z",
            signedBy: "Carlos R."
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-003",
        bankInfo: {
            iban: "ES8200810658610001234567",
            bic: "BSABESBBXXX",
            bankName: "Banco Sabadell"
        },
        auditTrail: [
            {
                timestamp: "2025-01-23T10:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-01-23T10:15:00Z",
                action: "signed",
                actor: "Carlos R.",
                details: "Digital signature verified"
            },
            {
                timestamp: "2025-01-23T11:30:00Z",
                action: "approved",
                actor: "Content Manager",
                details: "Content quality verification completed",
                level: 1
            },
            {
                timestamp: "2025-01-23T14:00:00Z",
                action: "approved",
                actor: "Financial Controller",
                details: "Budget verification completed",
                level: 2
            }
        ]
    }
];