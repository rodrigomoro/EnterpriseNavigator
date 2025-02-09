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

// Update mock data to include both incoming and outgoing invoices
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
    // Add an example incoming invoice
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
    }
];