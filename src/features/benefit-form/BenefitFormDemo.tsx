import { Container, Paper, Stack, Stepper, Text, Title } from "@mantine/core";
import { IconCreditCard, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

import { mockBenefit } from "../../data/mockBenefit";
import { fakeApi } from "../../lib/fakeApi";
import type { BenefitApplicationPayload } from "../../types/benefit";
import { CompletedStep } from "./components/completed/CompletedStep";
import { DocumentsStep } from "./components/documents/DocumentsStep";
import { OverviewStep } from "./components/overview/OverviewStep";
import { benefitFormDemoTexts } from "./texts";
import { currencyFormatter } from "./constants";
import { BenefitFormProvider, useBenefitForm } from "./context";
import { benefitFormValidate, createInitialValues } from "./form";

const renderStepperIcon = (icon: React.ReactNode) => (
    <span
        style={{
            width: 16,
            height: 16,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
        }}
    >
        {icon}
    </span>
);

export const BenefitFormDemo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(0);
    const [documentsValidationAttempted, setDocumentsValidationAttempted] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{
        applicationId: string;
        caseId: string;
    } | null>(null);

    const form = useBenefitForm({
        initialValues: createInitialValues(),
        validate: benefitFormValidate,
    });

    const moveToStep = (nextStep: number) => {
        if (nextStep < 0 || nextStep > 2) {
            return;
        }

        setActiveStep(nextStep);
        setHighestStepVisited((current) => Math.max(current, nextStep));
    };

    const handleNextFromDocuments = () => {
        setDocumentsValidationAttempted(true);
        const validation = form.validate();

        if (validation.hasErrors) {
            return;
        }

        moveToStep(1);
    };

    const handleFinalSubmit = async () => {
        const payload: BenefitApplicationPayload = {
            benefitId: mockBenefit.id,
            draftId: "draft-demo-001",
            refundBankAccount: form.values.refundBankAccount,
            proofOfPurchase: form.values.proofOfPurchase,
            swornStatements: form.values.swornStatements
                .filter((statement) => statement.consent)
                .map((statement) => statement.type),
            attachments: [],
            customFields: form.values.customFields,
        };

        const result = await fakeApi.submitBenefitApplication(payload);
        setSubmissionResult(result);
        moveToStep(2);
    };

    const handleReset = () => {
        form.setInitialValues(createInitialValues());
        form.reset();
        setSubmissionResult(null);
        setActiveStep(0);
        setHighestStepVisited(0);
        setDocumentsValidationAttempted(false);
    };

    return (
        <BenefitFormProvider form={form}>
            <Container size={1100} px={{ base: "md", md: "xl", xl: 40 }} py="xl">
                <Stack gap="xl" className="page-column-main" maw={1120} mx="auto">
                    <Paper withBorder shadow="sm" p={{ base: "md", sm: "xl" }}>
                        <Stack gap="xs" pb="lg" align="center">
                            <Title order={1} ta="center" fz={{ base: 22, sm: 30 }}>
                                {mockBenefit.name}
                            </Title>
                            <Text ta="center" size="sm" maw={720}>
                                <strong>
                                    {benefitFormDemoTexts.introPrefix}{" "}
                                    {currencyFormatter.format(mockBenefit.refundLimit)}.
                                </strong>{" "}
                                {benefitFormDemoTexts.introSuffix}
                            </Text>
                        </Stack>

                        <Stepper
                            active={activeStep}
                            onStepClick={(step) => {
                                if (highestStepVisited >= step) {
                                    moveToStep(step);
                                }
                            }}
                            allowNextStepsSelect={false}
                            color="blue"
                            size="md"
                            styles={{
                                stepIcon: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 2.5,
                                },
                            }}
                        >
                            <Stepper.Step
                                label={benefitFormDemoTexts.steps.documents.label}
                                description={benefitFormDemoTexts.steps.documents.description}
                                icon={renderStepperIcon(<IconUpload size={16} aria-hidden="true" />)}
                            >
                                <DocumentsStep
                                    onNext={handleNextFromDocuments}
                                    validationAttempted={documentsValidationAttempted}
                                />
                            </Stepper.Step>
                            <Stepper.Step
                                label={benefitFormDemoTexts.steps.overview.label}
                                description={benefitFormDemoTexts.steps.overview.description}
                                icon={renderStepperIcon(
                                    <IconCreditCard size={16} aria-hidden="true" />,
                                )}
                            >
                                <OverviewStep
                                    onPrevious={() => moveToStep(0)}
                                    onSubmit={handleFinalSubmit}
                                />
                            </Stepper.Step>
                            <Stepper.Completed>
                                <CompletedStep
                                    onReset={handleReset}
                                    result={submissionResult}
                                />
                            </Stepper.Completed>
                        </Stepper>
                    </Paper>
                </Stack>
            </Container>
        </BenefitFormProvider>
    );
};
