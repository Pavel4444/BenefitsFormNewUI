export const documentsStepTexts = {
    proofsSection: {
        title: "Platební doklady",
        description:
            "Vyplňte údaje dokladu, který byl vystaven při nákupu zboží nebo služby (např. faktura, příjmový pokladní doklad, účtenka). Můžete připojit i více dokladů. Alespoň jeden doklad musí být uhrazen k datu 30. 6. 2025 nebo později. Celková suma částek uvedených na dokladech musí být vyšší než 100 Kč.",
        addButton: "Přidat další doklad",
    },
    bankAccountSection: {
        title: "Číslo účtu, na který chcete příspěvek poslat",
        prefixLabel: "Předčíslí účtu",
        prefixPlaceholder: "volitelné",
        accountNumberLabel: "Číslo účtu",
        bankCodeLabel: "Kód banky",
    },
    swornStatementSection: {
        title: "Čestné prohlášení",
        legend: "Čestné prohlášení",
    },
    navigation: {
        back: "Zpět",
        next: "Pokračovat",
    },
} as const;

export const proofOfPurchaseTexts = {
    cardTitle: "Platební doklad",
    removeButton: "Odebrat",
    referenceNumber: {
        label: "Číslo dokladu",
        description:
            "Pokud není uvedeno číslo dokladu, vyplňte datum uhrazení dokladu ve formátu DDMMRRRR",
        placeholder: "Např. 2026-001258",
    },
    dateOfIssue: {
        label: "Datum vystavení dokladu",
        placeholder: "dd. mm. yyyy",
    },
    amount: {
        label: "Částka na dokladu",
        suffix: " Kč",
    },
    identificationNumber: {
        label: "IČ organizace, která doklad vystavila",
    },
    proofPayment: {
        title: "Naskenovaný platební doklad",
        description:
            "Nahrajte fotografii, sken nebo jinou elektronickou formu dokladu (např. faktura, příjmový pokladní doklad, účtenka).",
    },
    paymentType: {
        label: "Jak byla platba uhrazena?",
        cash: "V hotovosti",
        transfer: "Převodem z účtu nebo platební kartou",
        invoice: "Dokladem",
    },
    paymentConfirmation: {
        title: "Kopie potvrzení o zaplacení",
        description:
            "Nahrajte výpis z bankovního účtu nebo z internetového bankovnictví, který dokládá, že platba byla z účtu skutečně odeslána a odečtena (nestačí např. doložit jenom pokyn k úhradě platby, nebo blokovanou částku).",
    },
} as const;

export const uploadFieldTexts = {
    successPrefix: "Soubor",
    successSuffix: "byl úspěšně nahrán",
    download: "Stáhnout soubor",
    remove: "Odebrat soubor",
    dropzoneTitle: "Sem přetáhněte soubor nebo ho vyberte z počítače",
    dropzoneDescription: "Podporované formáty: JPG, PNG, PDF, DOC, DOCX.",
} as const;
