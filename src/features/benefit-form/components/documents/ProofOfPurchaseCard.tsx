import * as React from "react";
import { Box, Button, Group, Paper, Radio, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

import { fakeApi } from "../../../../lib/fakeApi";
import type { PaymentType } from "../../../../types/benefit";
import { useBenefitFormContext } from "../../context";
import { getErrorText } from "../../form";
import { ProofOfPurchaseDetailsFields } from "./ProofOfPurchaseDetailsFields";
import { ProofUploadSection } from "./ProofUploadSection";
import { proofOfPurchaseTexts } from "./texts";

export interface ProofOfPurchaseCardProps {
    index: number;
}

export const ProofOfPurchaseCard: React.FunctionComponent<ProofOfPurchaseCardProps> = (props) => {
    const form = useBenefitFormContext();
    const [isUploading, { open: startUploading, close: stopUploading }] = useDisclosure(false);
    const item = form.values.proofOfPurchase[props.index];
    const hasMultipleItems = form.values.proofOfPurchase.length > 1;

    const uploadFile = async (
        target:
            | `proofOfPurchase.${number}.proofPayment`
            | `proofOfPurchase.${number}.proofTransferPayment`
            | `proofOfPurchase.${number}.proofInvoicePayment`,
        file: File | null,
    ) => {
        if (!file) {
            return;
        }

        startUploading();
        try {
            const uploaded = await fakeApi.uploadFile(file);
            form.setFieldValue(target, uploaded);
        } finally {
            stopUploading();
        }
    };

    return (
        <Paper radius="xs" withBorder p="xl" pt="lg" bg="gray.0">
            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <Box>
                        <Title order={3} c="dimmed" fw={500} fz="md">
                            {proofOfPurchaseTexts.cardTitle}
                        </Title>
                    </Box>
                    {hasMultipleItems && (
                        <Button
                            leftSection={<IconX size={12} stroke={2.2} aria-hidden="true" />}
                            variant="subtle"
                            color="gray"
                            onClick={() => form.removeListItem("proofOfPurchase", props.index)}
                        >
                            {proofOfPurchaseTexts.removeButton}
                        </Button>
                    )}
                </Group>

                <ProofOfPurchaseDetailsFields index={props.index} />

                <ProofUploadSection
                    title={proofOfPurchaseTexts.proofPayment.title}
                    description={proofOfPurchaseTexts.proofPayment.description}
                    file={item.proofPayment}
                    loading={isUploading}
                    onUpload={(file) => uploadFile(`proofOfPurchase.${props.index}.proofPayment`, file)}
                    onRemove={() =>
                        form.setFieldValue(`proofOfPurchase.${props.index}.proofPayment`, null)
                    }
                    error={getErrorText(form.errors[`proofOfPurchase.${props.index}.proofPayment`])}
                />

                <Box w="100%">
                    <Radio.Group
                        label={proofOfPurchaseTexts.paymentType.label}
                        value={item.paymentType}
                        onChange={(value) =>
                            form.setFieldValue(
                                `proofOfPurchase.${props.index}.paymentType`,
                                value as PaymentType,
                            )
                        }
                        error={getErrorText(form.errors[`proofOfPurchase.${props.index}.paymentType`])}
                    >
                        <Stack gap="xs" mt="xs">
                            <Radio value="cash" label={proofOfPurchaseTexts.paymentType.cash} />
                            <Radio
                                value="transfer"
                                label={proofOfPurchaseTexts.paymentType.transfer}
                            />
                            {item.paymentType === "transfer" &&
                                (
                                    <ProofUploadSection
                                        title={proofOfPurchaseTexts.paymentConfirmation.title}
                                        description={
                                            proofOfPurchaseTexts.paymentConfirmation.description
                                        }
                                        file={item.proofTransferPayment}
                                        loading={isUploading}
                                        onUpload={(file) =>
                                            uploadFile(
                                                `proofOfPurchase.${props.index}.proofTransferPayment`,
                                                file,
                                            )
                                        }
                                        onRemove={() =>
                                            form.setFieldValue(
                                                `proofOfPurchase.${props.index}.proofTransferPayment`,
                                                null,
                                            )
                                        }
                                        error={getErrorText(
                                            form.errors[
                                                `proofOfPurchase.${props.index}.proofTransferPayment`
                                            ],
                                        )}
                                        indented
                                    />
                                )}
                            <Radio value="invoice" label={proofOfPurchaseTexts.paymentType.invoice} />
                            {item.paymentType === "invoice" &&
                                (
                                    <ProofUploadSection
                                        title={proofOfPurchaseTexts.paymentConfirmation.title}
                                        description={
                                            proofOfPurchaseTexts.paymentConfirmation.description
                                        }
                                        file={item.proofInvoicePayment}
                                        loading={isUploading}
                                        onUpload={(file) =>
                                            uploadFile(
                                                `proofOfPurchase.${props.index}.proofInvoicePayment`,
                                                file,
                                            )
                                        }
                                        onRemove={() =>
                                            form.setFieldValue(
                                                `proofOfPurchase.${props.index}.proofInvoicePayment`,
                                                null,
                                            )
                                        }
                                        error={getErrorText(
                                            form.errors[
                                                `proofOfPurchase.${props.index}.proofInvoicePayment`
                                            ],
                                        )}
                                        indented
                                    />
                                )}
                        </Stack>
                    </Radio.Group>
                </Box>
            </Stack>
        </Paper>
    );
};
