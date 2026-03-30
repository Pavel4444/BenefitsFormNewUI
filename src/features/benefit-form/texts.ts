export const benefitFormDemoTexts = {
    introPrefix: "Výše příspěvku je až",
    introSuffix: "Pro doložení nároku na příspěvek nahrajte kopie požadovaných dokladů.",
    steps: {
        documents: {
            label: "Doklady",
            description: "Nahrání a validace",
        },
        overview: {
            label: "Souhrn",
            description: "Kontrola a odeslání",
        },
    },
} as const;

export const benefitFormValidationTexts = {
    referenceNumberRequired: "Číslo dokladu je povinné.",
    identificationNumberRequired: "IČ organizace je povinné.",
    prefixMaxLength: "Předčíslí může obsahovat maximálně 6 číslic.",
    prefixDigitsOnly: "Předčíslí může obsahovat jen číslice.",
    accountNumberLength: "Číslo účtu musí obsahovat 2 až 10 číslic.",
    accountNumberDigitsOnly: "Číslo účtu musí obsahovat 2 až 10 číslic.",
    bankCodeLength: "Kód banky musí mít 4 číslice.",
    bankCodeDigitsOnly: "Kód banky musí mít 4 číslice.",
    dateOfIssueRequired: "Datum vystavení je povinné.",
    amountGreaterThanOne: "Částka musí být vyšší než 1 Kč.",
    transferProofRequired: "Nahrajte potvrzení o převodu.",
    invoiceProofRequired: "Nahrajte fakturu.",
    proofPaymentRequired: "Nahrajte platební doklad.",
    swornStatementConsentRequired: "Potvrďte čestné prohlášení.",
    totalAmountGreaterThanHundred: "Součet částek musí být vyšší než 100 Kč.",
    proofTooOldPrefix: "Doklad nesmí být starší než",
    paymentTypeLabels: {
        cash: "V hotovosti",
        invoice: "Faktura",
        transfer: "Převodem",
    },
} as const;
