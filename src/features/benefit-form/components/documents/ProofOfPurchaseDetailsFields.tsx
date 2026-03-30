import * as React from "react";
import { Box, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendarMonth } from "@tabler/icons-react";

import { mockBenefit } from "../../../../data/mockBenefit";
import { today } from "../../constants";
import { useBenefitFormContext } from "../../context";
import { proofOfPurchaseTexts } from "./texts";

export interface ProofOfPurchaseDetailsFieldsProps {
    index: number;
}

export const ProofOfPurchaseDetailsFields: React.FunctionComponent<
    ProofOfPurchaseDetailsFieldsProps
> = (props) => {
    const form = useBenefitFormContext();

    return (
        <Stack gap="md" align="flex-start">
            <Box maw={380} w="100%">
                <TextInput
                    label={proofOfPurchaseTexts.referenceNumber.label}
                    description={proofOfPurchaseTexts.referenceNumber.description}
                    placeholder={proofOfPurchaseTexts.referenceNumber.placeholder}
                    {...form.getInputProps(`proofOfPurchase.${props.index}.referenceNumber`)}
                />
            </Box>

            <Box maw={380} w="100%">
                <DateInput
                    rightSection={<IconCalendarMonth size={14} stroke={1.5} aria-hidden="true" />}
                    rightSectionPointerEvents="none"
                    valueFormat="DD. MM. YYYY"
                    label={proofOfPurchaseTexts.dateOfIssue.label}
                    placeholder={proofOfPurchaseTexts.dateOfIssue.placeholder}
                    clearable={false}
                    maxDate={today}
                    minDate={mockBenefit.requirements.proofOfPurchase?.minDateAll}
                    {...form.getInputProps(`proofOfPurchase.${props.index}.dateOfIssue`)}
                />
            </Box>

            <Box maw={380} w="100%">
                <NumberInput
                    label={proofOfPurchaseTexts.amount.label}
                    suffix={proofOfPurchaseTexts.amount.suffix}
                    min={0}
                    thousandSeparator=" "
                    hideControls
                    {...form.getInputProps(`proofOfPurchase.${props.index}.amount`)}
                />
            </Box>

            <Box maw={380} w="100%">
                <TextInput
                    label={proofOfPurchaseTexts.identificationNumber.label}
                    {...form.getInputProps(`proofOfPurchase.${props.index}.identificationNumber`)}
                />
            </Box>
        </Stack>
    );
};
