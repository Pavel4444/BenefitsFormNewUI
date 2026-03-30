import type { BenefitInfo } from "../types/benefit";

export const mockBenefit: BenefitInfo = {
    id: "benefit-oncology-aids",
    partnerId: 5161,
    name: "Pomůcky při onkologické léčbě a alopecii",
    refundLimit: 3000,
    defaultBankAccount: {
        prefix: "",
        accountNumber: "123456789",
        bankCode: "0300",
    },
    requirements: {
        proofOfPurchase: {
            minTotalAmount: 100,
            minDateAll: new Date("2025-01-01T00:00:00"),
        },
        swornStatements: [
            {
                type: "oncologyTreatmentDeclaration",
                label: "Čestné prohlášení při onkologické léčbě",
                description:
                    "Čestně prohlašuji, že jsem já, nebo osoba, kterou zastupuji, podstoupil(a) onkologickou léčbu, nebo má stanovenu diagnózu alopecie, nebo že podstoupila preventivní odstranění prsu/prsů z důvodu genetické zátěže a vysokého rizika onkologického onemocnění.",
                isRequired: true,
                skipConsent: false,
                defaultConsent: true,
            },
        ],
    },
};
