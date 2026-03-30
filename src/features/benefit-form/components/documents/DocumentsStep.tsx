import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Group,
    Paper,
    Stack,
    Text,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconChevronLeft,
    IconChevronRight,
    IconPlus,
} from "@tabler/icons-react";

import { mockBenefit } from "../../../../data/mockBenefit";
import { useBenefitFormContext } from "../../context";
import { createEmptyProofOfPurchase, getErrorText } from "../../form";
import { benefitFormValidationTexts } from "../../texts";
import { SectionHeading } from "../SectionHeading";
import { BankAccountFields } from "./BankAccountFields";
import { documentsStepTexts } from "./texts";
import { ProofOfPurchaseCard } from "./ProofOfPurchaseCard";

export interface DocumentsStepProps {
    onNext: () => void;
    validationAttempted: boolean;
}


export const DocumentsStep: React.FunctionComponent<DocumentsStepProps> = (props) => {
    const form = useBenefitFormContext();
    const swornStatementHeadingId = React.useId();
    const totalProofOfPurchaseAmount = form.values.proofOfPurchase.reduce(
        (sum, item) => sum + (item.amount || 0),
        0,
    );
    const minimumProofOfPurchaseTotalAmount =
        mockBenefit.requirements.proofOfPurchase?.minTotalAmount ?? 100;
    const proofOfPurchaseSummaryError =
        props.validationAttempted && totalProofOfPurchaseAmount <= minimumProofOfPurchaseTotalAmount
            ? benefitFormValidationTexts.totalAmountGreaterThanHundred
            : undefined;

    React.useEffect(() => {
        if (proofOfPurchaseSummaryError) {
            form.validateField("proofOfPurchase");
        }
    }, [form, form.values.proofOfPurchase, proofOfPurchaseSummaryError]);

    return (
        <Stack
            component="form"
            gap="xl"
            pt="xl"
            onSubmit={(event) => {
                event.preventDefault();
                props.onNext();
            }}
        >
            <Paper radius="xs" withBorder  p={{ base: "xs", sm: "xl" }}>
                <Stack gap="lg" pb="lg">
                    <SectionHeading
                        number={1}
                        title={documentsStepTexts.proofsSection.title}
                        description={documentsStepTexts.proofsSection.description}
                    />
                    {proofOfPurchaseSummaryError && (
                        <Box data-documents-error-summary="true" tabIndex={-1}>
                            <Alert color="red" icon={<IconAlertCircle size={16} />}>
                                {proofOfPurchaseSummaryError}
                            </Alert>
                        </Box>
                    )}
                    <Stack gap="xl">
                        {form.values.proofOfPurchase.map((_, index) => (
                            <ProofOfPurchaseCard key={index} index={index} />
                        ))}
                    </Stack>
                    <Button
                        maw={250}
                        variant="default"
                        leftSection={<IconPlus size={16} aria-hidden="true" />}
                        type="button"
                        onClick={() =>
                            form.insertListItem("proofOfPurchase", createEmptyProofOfPurchase())
                        }
                    >
                        {documentsStepTexts.proofsSection.addButton}
                    </Button>
                </Stack>

                <Stack gap="xs" pt="lg" pb="lg">
                    <SectionHeading
                        number={2}
                        title={documentsStepTexts.bankAccountSection.title}
                    />
                    <BankAccountFields />
                </Stack>

                <Box role="group" aria-labelledby={swornStatementHeadingId}>
                    <Stack gap="md" pt="lg">
                        <SectionHeading
                            id={swornStatementHeadingId}
                            number={3}
                            title={documentsStepTexts.swornStatementSection.title}
                        />
                        <Stack gap="lg">
                            {mockBenefit.requirements.swornStatements.map((statement, index) => (
                                <Checkbox
                                    key={statement.type}
                                    label={
                                        <Box>
                                            <Text lh={1.3} fw={600}>
                                                {statement.label}
                                            </Text>
                                            <Text mt={3} size="sm" c="dimmed">
                                                {statement.description}
                                            </Text>
                                        </Box>
                                    }
                                    error={getErrorText(form.errors[`swornStatements.${index}.consent`])}
                                    checked={form.values.swornStatements[index].consent}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            `swornStatements.${index}.consent`,
                                            event.currentTarget.checked,
                                        )
                                    }
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Box>
            </Paper>

            <Group justify="space-between">
                <Button
                    size="lg"
                    radius={0}
                    variant="light"
                    color="gray"
                    leftSection={<IconChevronLeft size={14} aria-hidden="true" />}
                    disabled
                    type="button"
                >
                    {documentsStepTexts.navigation.back}
                </Button>
                <Button
                    size="lg"
                    radius={0}
                    type="submit"
                    color="#d22d0f"
                    rightSection={<IconChevronRight size={14} aria-hidden="true" />}
                >
                    {documentsStepTexts.navigation.next}
                </Button>
            </Group>
        </Stack>
    );
};
