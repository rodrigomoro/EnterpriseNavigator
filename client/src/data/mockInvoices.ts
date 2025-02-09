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
        // Incoming invoice statuses
        | "draft"
        | "pending_approval"
        | "approved"
        | "rejected"
        | "paid"
        | "cancelled"
        // Outgoing invoice statuses
        | "submitted_to_verifactu"
        | "verified_by_verifactu"
        | "sent_to_client";
    approvalWorkflow?: {
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

// Example invoices with correct status workflows
export const mockInvoices: Invoice[] = [
    // Outgoing invoice - Draft (can be edited)
    {
        id: "OUT-1",
        direction: "outgoing",
        operationDate: "2025-02-09",
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
        issueDate: "2025-02-09",
        dueDate: "2025-03-11",
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
        status: "draft",
        paymentMethod: "direct_debit",
        paymentStatus: "pending",
        signatureInfo: {},
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-001",
        pdfUrl: "/invoices/INV-2025-001.pdf",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-02-09T10:00:00Z",
                action: "created",
                actor: "Dana R.",
                details: "Invoice created as draft",
            }
        ],
    },

    // Outgoing invoice - Submitted to VERIFACTU
    {
        id: "OUT-2",
        direction: "outgoing",
        operationDate: "2025-02-08",
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
        issueDate: "2025-02-08",
        dueDate: "2025-03-10",
        items: [
            {
                description: "Curriculum Development Services",
                quantity: 1,
                price: 3500,
                total: 3500,
            },
        ],
        totalAmount: 3500,
        status: "submitted_to_verifactu",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        signatureInfo: {
            signedAt: "2025-02-08T14:20:00Z",
            signedBy: "Dana R.",
        },
        submissionInfo: {
            submittedAt: "2025-02-08T14:25:00Z",
            verificationId: "VF-2025-002-DEF",
            response: {
                status: "pending",
                message: "Verification in progress",
            },
        },
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-002",
        pdfUrl: "/invoices/INV-2025-002.pdf",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-02-08T14:20:00Z",
                action: "signed",
                actor: "Dana R.",
                details: "Digital signature applied",
            },
            {
                timestamp: "2025-02-08T14:25:00Z",
                action: "submitted",
                actor: "System",
                details: "Submitted to VERIFACTU",
            }
        ],
    },

    // Outgoing invoice - Verified by VERIFACTU
    {
        id: "OUT-3",
        direction: "outgoing",
        operationDate: "2025-02-07",
        type: "standard",
        invoiceNumber: "INV-2025-003",
        customer: {
            name: "Digital Learning Institute",
            taxId: "B98765432",
            address: "Calle Innovación 789",
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
        notes: "E-learning platform setup and annual license",
        issueDate: "2025-02-07",
        dueDate: "2025-03-09",
        items: [
            {
                description: "E-learning Platform License",
                quantity: 1,
                price: 5000,
                total: 5000,
            }
        ],
        totalAmount: 5000,
        status: "verified_by_verifactu",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        signatureInfo: {
            signedAt: "2025-02-07T10:00:00Z",
            signedBy: "Dana R.",
        },
        submissionInfo: {
            submittedAt: "2025-02-07T10:05:00Z",
            verificationId: "VF-2025-003-ABC",
            response: {
                status: "accepted",
                message: "Invoice successfully verified",
            },
        },
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-003",
        pdfUrl: "/invoices/INV-2025-003.pdf",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-02-07T10:00:00Z",
                action: "signed",
                actor: "Dana R.",
                details: "Digital signature applied",
            },
            {
                timestamp: "2025-02-07T10:05:00Z",
                action: "submitted",
                actor: "System",
                details: "Submitted to VERIFACTU",
            },
            {
                timestamp: "2025-02-07T10:10:00Z",
                action: "verified",
                actor: "VERIFACTU",
                details: "Invoice verified successfully",
            }
        ],
    },

    // Outgoing invoice - Sent to client
    {
        id: "OUT-4",
        direction: "outgoing",
        operationDate: "2025-02-06",
        type: "standard",
        invoiceNumber: "INV-2025-004",
        customer: {
            name: "International School of Madrid",
            taxId: "B34567890",
            address: "Paseo de la Educación 234",
            postalCode: "28003",
            city: "Madrid"
        },
        issuer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        notes: "Educational software licenses",
        issueDate: "2025-02-06",
        dueDate: "2025-03-08",
        items: [
            {
                description: "Student Management System - Annual License",
                quantity: 1,
                price: 3000,
                total: 3000,
            }
        ],
        totalAmount: 3000,
        status: "sent_to_client",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        signatureInfo: {
            signedAt: "2025-02-06T09:00:00Z",
            signedBy: "Dana R.",
        },
        submissionInfo: {
            submittedAt: "2025-02-06T09:05:00Z",
            verificationId: "VF-2025-004-XYZ",
            response: {
                status: "accepted",
                message: "Invoice successfully verified",
            },
        },
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-004",
        pdfUrl: "/invoices/INV-2025-004.pdf",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-02-06T09:00:00Z",
                action: "signed",
                actor: "Dana R.",
                details: "Digital signature applied",
            },
            {
                timestamp: "2025-02-06T09:05:00Z",
                action: "submitted",
                actor: "System",
                details: "Submitted to VERIFACTU",
            },
            {
                timestamp: "2025-02-06T09:10:00Z",
                action: "verified",
                actor: "VERIFACTU",
                details: "Invoice verified successfully",
            },
            {
                timestamp: "2025-02-06T09:15:00Z",
                action: "status_changed",
                actor: "System",
                details: "Invoice sent to client",
            }
        ],
    },

    // Incoming invoice - Draft
    {
        id: "IN-1",
        direction: "incoming",
        operationDate: "2025-02-09",
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
        notes: "Professional development workshops",
        issueDate: "2025-02-09",
        dueDate: "2025-03-11",
        items: [
            {
                description: "Advanced Teaching Methods Workshop",
                quantity: 1,
                price: 2500,
                total: 2500,
            }
        ],
        totalAmount: 2500,
        status: "draft",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        signatureInfo: {},
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-001",
        pdfUrl: "/invoices/VINV-2025-001.pdf",
        bankInfo: {
            iban: "ES7100750327630600000573",
            bic: "BSCHESMMXXX",
            bankName: "Banco Santander"
        },
        auditTrail: [
            {
                timestamp: "2025-02-09T12:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            }
        ],
    },

    // Incoming invoice - Pending Approval
    {
        id: "IN-2",
        direction: "incoming",
        operationDate: "2025-02-08",
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
        notes: "IT Equipment and Installation",
        issueDate: "2025-02-08",
        dueDate: "2025-03-10",
        items: [
            {
                description: "Interactive Whiteboards",
                quantity: 5,
                price: 1200,
                total: 6000,
            },
            {
                description: "Installation Service",
                quantity: 5,
                price: 150,
                total: 750,
            }
        ],
        totalAmount: 6750,
        status: "pending_approval",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 1,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Department Manager",
                    status: "pending"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "pending"
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "pending"
                }
            ]
        },
        signatureInfo: {
            signedAt: "2025-02-08T10:00:00Z",
            signedBy: "Maria T."
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-002",
        pdfUrl: "/invoices/VINV-2025-002.pdf",
        bankInfo: {
            iban: "ES9121000418450200051332",
            bic: "CAIXESBBXXX",
            bankName: "CaixaBank"
        },
        auditTrail: [
            {
                timestamp: "2025-02-08T10:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-02-08T10:00:00Z",
                action: "signed",
                actor: "Maria T.",
                details: "Digital signature verified"
            },
            {
                timestamp: "2025-02-08T10:30:00Z",
                action: "approval_requested",
                actor: "System",
                details: "Approval workflow initiated"
            }
        ]
    },

    // Incoming invoice - Approved
    {
        id: "IN-3",
        direction: "incoming",
        operationDate: "2025-02-07",
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
        issueDate: "2025-02-07",
        dueDate: "2025-03-09",
        items: [
            {
                description: "Interactive Course Development",
                quantity: 1,
                price: 3500,
                total: 3500,
            },
            {
                description: "Video Production",
                quantity: 10,
                price: 250,
                total: 2500,
            }
        ],
        totalAmount: 6000,
        status: "approved",
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        approvalWorkflow: {
            currentLevel: 3,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Content Manager",
                    status: "approved",
                    userId: "CM123",
                    timestamp: "2025-02-07T11:30:00Z",
                    comments: "Content quality verified"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "approved",
                    userId: "FC456",
                    timestamp: "2025-02-07T14:00:00Z",
                    comments: "Within budget allocation"
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "approved",
                    userId: "CFO789",
                    timestamp: "2025-02-07T15:30:00Z",
                    comments: "Final approval granted"
                }
            ]
        },
        signatureInfo: {
            signedAt: "2025-02-07T10:15:00Z",
            signedBy: "Carlos R."
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-003",
        pdfUrl: "/invoices/VINV-2025-003.pdf",
        bankInfo: {
            iban: "ES8200810658610001234567",
            bic: "BSABESBBXXX",
            bankName: "Banco Sabadell"
        },
        auditTrail: [
            {
                timestamp: "2025-02-07T10:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-02-07T10:15:00Z",
                action: "signed",
                actor: "Carlos R.",
                details: "Digital signature verified"
            },
            {
                timestamp: "2025-02-07T11:30:00Z",
                action: "approved",
                actor: "Content Manager",
                details: "Content quality verification completed",
                level: 1
            },
            {
                timestamp: "2025-02-07T14:00:00Z",
                action: "approved",
                actor: "Financial Controller",
                details: "Budget verification completed",
                level: 2
            },
            {
                timestamp: "2025-02-07T15:30:00Z",
                action: "approved",
                actor: "CFO",
                details: "Final approval granted",
                level: 3
            }
        ]
    },

    // Incoming invoice - Rejected
    {
        id: "IN-4",
        direction: "incoming",
        operationDate: "2025-02-06",
        type: "standard",
        invoiceNumber: "VINV-2025-004",
        customer: {
            name: "Educational Platform Inc",
            taxId: "A87654321",
            address: "Avenida Central 456",
            postalCode: "28002",
            city: "Madrid"
        },
        issuer: {
            name: "Office Supplies Pro",
            taxId: "B67890123",
            address: "Gran Vía 567",
            postalCode: "28013",
            city: "Madrid"
        },
        notes: "Office Supplies and Equipment",
        issueDate: "2025-02-06",
        dueDate: "2025-03-08",
        items: [
            {
                description: "Premium Office Chairs",
                quantity: 20,
                price: 300,
                total: 6000,
            },
            {
                description: "Ergonomic Desks",
                quantity: 20,
                price: 400,
                total: 8000,
            }
        ],
        totalAmount: 14000,
        status: "rejected",
        paymentMethod: "bank_transfer",
        paymentStatus: "cancelled",
        approvalWorkflow: {
            currentLevel: 2,
            maxLevels: 3,
            approvers: [
                {
                    level: 1,
                    role: "Office Manager",
                    status: "approved",
                    userId: "OM123",
                    timestamp: "2025-02-06T11:00:00Z",
                    comments: "Equipment specifications verified"
                },
                {
                    level: 2,
                    role: "Financial Controller",
                    status: "rejected",
                    userId: "FC456",
                    timestamp: "2025-02-06T14:00:00Z",
                    comments: "Budget exceeded for this quarter"
                },
                {
                    level: 3,
                    role: "CFO",
                    status: "pending"
                }
            ]
        },
        signatureInfo: {
            signedAt: "2025-02-06T10:00:00Z",
            signedBy: "Laura M."
        },
        submissionInfo: {},
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=VINV-2025-004",
        pdfUrl: "/invoices/VINV-2025-004.pdf",
        bankInfo: {
            iban: "ES7100750327630600000573",
            bic: "BSCHESMMXXX",
            bankName: "Banco Santander"
        },
        auditTrail: [
            {
                timestamp: "2025-02-06T10:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-02-06T11:00:00Z",
                action: "approved",
                actor: "Office Manager",
                details: "Equipment specifications verified",
                level: 1
            },
            {
                timestamp: "2025-02-06T14:00:00Z",
                action: "rejected",
                actor: "Financial Controller",
                details: "Budget exceeded for this quarter",
                level: 2
            }
        ]
    }
];