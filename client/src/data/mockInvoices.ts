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
        id: "1",
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

    // Outgoing invoice - Verified by VERIFACTU
    {
        id: "2",
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
        status: "verified_by_verifactu",
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
                status: "accepted",
                message: "Invoice successfully verified",
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
            },
            {
                timestamp: "2025-02-08T14:30:00Z",
                action: "verified",
                actor: "VERIFACTU",
                details: "Invoice verified successfully",
            },
        ],
    },

    // Incoming invoice - Pending Approval
    {
        id: "3",
        direction: "incoming",
        operationDate: "2025-02-07",
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
        issueDate: "2025-02-07",
        dueDate: "2025-03-09",
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
                }
            ],
        },
        signatureInfo: {
            signedAt: "2025-02-07T13:00:00Z",
            signedBy: "John Smith"
        },
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
                timestamp: "2025-02-07T12:00:00Z",
                action: "created",
                actor: "System",
                details: "Invoice received and registered"
            },
            {
                timestamp: "2025-02-07T13:00:00Z",
                action: "signed",
                actor: "John Smith",
                details: "Digital signature verified"
            },
            {
                timestamp: "2025-02-07T13:30:00Z",
                action: "approval_requested",
                actor: "System",
                details: "Approval workflow initiated",
            }
        ],
    }
];