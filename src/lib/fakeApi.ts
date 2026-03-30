import type { BenefitApplicationPayload, StoredFile } from "../types/benefit";

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const fakeApi = {
    async uploadFile(file: File): Promise<StoredFile> {
        await wait(450);

        return {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
        };
    },

    async submitBenefitApplication(
        _payload: BenefitApplicationPayload,
    ): Promise<{ applicationId: string; caseId: string }> {
        await wait(900);

        return {
            applicationId: `APP-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8)}`,
            caseId: `CASE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        };
    },
};
