export type PaymentType = "cash" | "invoice" | "transfer";

export interface StoredFile {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
}

export interface BankAccount {
    prefix: string;
    accountNumber: string;
    bankCode: string;
}

export interface SwornStatementRequirement {
    type: string;
    label: string;
    description: string;
    isRequired: boolean;
    skipConsent: boolean;
    defaultConsent: boolean;
}

export interface BenefitRequirements {
    proofOfPurchase?: {
        minTotalAmount: number;
        minDateAll: Date;
    };
    swornStatements: SwornStatementRequirement[];
}

export interface BenefitInfo {
    id: string;
    partnerId: number;
    name: string;
    refundLimit: number;
    requirements: BenefitRequirements;
    defaultBankAccount: BankAccount;
}

export interface ProofOfPurchaseItem {
    referenceNumber: string;
    dateOfIssue: Date | null;
    amount: number;
    identificationNumber: string;
    proofPayment: StoredFile | null;
    paymentType: PaymentType;
    proofInvoicePayment: StoredFile | null;
    proofTransferPayment: StoredFile | null;
}

export interface SwornStatementValue extends SwornStatementRequirement {
    consent: boolean;
}

export interface BenefitFormValues {
    attachments: StoredFile[];
    proofOfPurchase: ProofOfPurchaseItem[];
    refundBankAccount: BankAccount;
    swornStatements: SwornStatementValue[];
    customFields: Record<string, string | number | Date>;
}

export interface BenefitApplicationPayload {
    benefitId: string;
    draftId: string;
    attachments: StoredFile[];
    proofOfPurchase: ProofOfPurchaseItem[];
    refundBankAccount: BankAccount;
    swornStatements: string[];
    customFields: Record<string, string | number | Date>;
}
