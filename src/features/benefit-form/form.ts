import { formRootRule, hasLength, isNotEmpty, matches } from "@mantine/form";

import { mockBenefit } from "../../data/mockBenefit";
import type {
    BankAccount,
    BenefitFormValues,
    PaymentType,
    ProofOfPurchaseItem,
    StoredFile,
} from "../../types/benefit";
import { benefitFormValidationTexts } from "./texts";

const minimumProofOfPurchaseItemAmount = 1;
const minimumProofOfPurchaseTotalAmount =
    mockBenefit.requirements.proofOfPurchase?.minTotalAmount ?? 100;
const proofOfPurchaseMinDate = mockBenefit.requirements.proofOfPurchase?.minDateAll;

const normalizeValidatorError = (error: unknown) => (typeof error === "string" ? error : null);

const runStringValidators = (
    value: string,
    validators: Array<(value: string) => unknown>,
) => {
    for (const validator of validators) {
        const error = normalizeValidatorError(validator(value));

        if (error) {
            return error;
        }
    }

    return null;
};

export const benefitFormValidate = {
    proofOfPurchase: {
        [formRootRule]: (items: ProofOfPurchaseItem[]) => {
            const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

            return totalAmount <= minimumProofOfPurchaseTotalAmount
                ? benefitFormValidationTexts.totalAmountGreaterThanHundred
                : null;
        },
        referenceNumber: (value: string) =>
            normalizeValidatorError(
                isNotEmpty(benefitFormValidationTexts.referenceNumberRequired)(value),
            ),
        dateOfIssue: (value: Date | null) => {
            if (!value) {
                return benefitFormValidationTexts.dateOfIssueRequired;
            }

            if (proofOfPurchaseMinDate && value < proofOfPurchaseMinDate) {
                return `${benefitFormValidationTexts.proofTooOldPrefix} ${proofOfPurchaseMinDate.toLocaleDateString("cs-CZ")}.`;
            }

            return null;
        },
        amount: (value: number) =>
            value > minimumProofOfPurchaseItemAmount
                ? null
                : benefitFormValidationTexts.amountGreaterThanOne,
        identificationNumber: (value: string) =>
            normalizeValidatorError(
                isNotEmpty(benefitFormValidationTexts.identificationNumberRequired)(value),
            ),
        proofPayment: (value: StoredFile | null) =>
            value ? null : benefitFormValidationTexts.proofPaymentRequired,
        proofTransferPayment: (value: StoredFile | null, values: BenefitFormValues, path: string) => {
            const [, index] = path.split(".");
            const item = values.proofOfPurchase[Number(index)];

            return item?.paymentType === "transfer" && !value
                ? benefitFormValidationTexts.transferProofRequired
                : null;
        },
        proofInvoicePayment: (value: StoredFile | null, values: BenefitFormValues, path: string) => {
            const [, index] = path.split(".");
            const item = values.proofOfPurchase[Number(index)];

            return item?.paymentType === "invoice" && !value
                ? benefitFormValidationTexts.invoiceProofRequired
                : null;
        },
    },
    refundBankAccount: {
        prefix: (value: string) => {
            if (!value) {
                return null;
            }

            return runStringValidators(value, [
                hasLength({ max: 6 }, benefitFormValidationTexts.prefixMaxLength),
                matches(/^\d+$/, benefitFormValidationTexts.prefixDigitsOnly),
            ]);
        },
        accountNumber: (value: string) =>
            runStringValidators(value, [
                hasLength({ min: 2, max: 10 }, benefitFormValidationTexts.accountNumberLength),
                matches(/^\d+$/, benefitFormValidationTexts.accountNumberDigitsOnly),
            ]),
        bankCode: (value: string) =>
            runStringValidators(value, [
                hasLength({ min: 4, max: 4 }, benefitFormValidationTexts.bankCodeLength),
                matches(/^\d+$/, benefitFormValidationTexts.bankCodeDigitsOnly),
            ]),
    },
    swornStatements: {
        consent: (value: boolean) =>
            !value
                ? benefitFormValidationTexts.swornStatementConsentRequired
                : null,
    },
};

export const createEmptyProofOfPurchase = (): ProofOfPurchaseItem => ({
    referenceNumber: "",
    dateOfIssue: null,
    amount: 0,
    identificationNumber: "",
    proofPayment: null,
    paymentType: "cash",
    proofInvoicePayment: null,
    proofTransferPayment: null,
});

export const createInitialValues = (): BenefitFormValues => ({
    attachments: [],
    proofOfPurchase: [createEmptyProofOfPurchase()],
    refundBankAccount: {
        prefix: "",
        accountNumber: "",
        bankCode: "",
    },
    swornStatements: mockBenefit.requirements.swornStatements.map((statement) => ({
        ...statement,
        consent: statement.skipConsent ? true : false,
    })),
    customFields: {},
});

export const bankAccountToString = (account: BankAccount) =>
    `${account.prefix ? `${account.prefix}-` : ""}${account.accountNumber}/${account.bankCode}`;

export const getPaymentTypeLabel = (paymentType: PaymentType) => {
    switch (paymentType) {
        case "cash":
            return benefitFormValidationTexts.paymentTypeLabels.cash;
        case "invoice":
            return benefitFormValidationTexts.paymentTypeLabels.invoice;
        case "transfer":
            return benefitFormValidationTexts.paymentTypeLabels.transfer;
        default:
            return paymentType;
    }
};

export const getErrorText = (error: unknown) => (typeof error === "string" ? error : undefined);
