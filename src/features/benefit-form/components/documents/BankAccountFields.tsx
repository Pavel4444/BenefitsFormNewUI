import * as React from "react";
import { Box, Group, Stack, Text, TextInput } from "@mantine/core";

import { useBenefitFormContext } from "../../context";
import { documentsStepTexts } from "./texts";

export const BankAccountFields: React.FunctionComponent = () => {
    const form = useBenefitFormContext();

    return (
        <>
            <Stack gap="md" hiddenFrom="sm">
                <Group align="flex-start" gap="xs" wrap="nowrap">
                    <Box maw={96}>
                        <TextInput
                            c="dimmed"
                            label={documentsStepTexts.bankAccountSection.prefixLabel}
                            placeholder={documentsStepTexts.bankAccountSection.prefixPlaceholder}
                            {...form.getInputProps("refundBankAccount.prefix")}
                        />
                    </Box>

                    <Text aria-hidden="true"c="dimmed" fw={700} mt={28}>
                        -
                    </Text>

                    <Box flex="auto">
                        <TextInput
                            c="dimmed"
                            label={documentsStepTexts.bankAccountSection.accountNumberLabel}
                            {...form.getInputProps("refundBankAccount.accountNumber")}
                        />
                    </Box>
                </Group>

                <Box >
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.bankCodeLabel}
                        {...form.getInputProps("refundBankAccount.bankCode")}
                    />
                </Box>
            </Stack>

            <Group align="flex-start" gap="xs"  visibleFrom="sm">
                <Box maw={100}>
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.prefixLabel}
                        placeholder={documentsStepTexts.bankAccountSection.prefixPlaceholder}
                        {...form.getInputProps("refundBankAccount.prefix")}
                    />
                </Box>

                <Text aria-hidden="true" c="dimmed" fw={700} mt={28}>
                    -
                </Text>

                <Box flex="auto">
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.accountNumberLabel}
                        {...form.getInputProps("refundBankAccount.accountNumber")}
                    />
                </Box>

                <Text aria-hidden="true" c="dimmed" fw={700} mt={28}>
                    /
                </Text>

                <Box >
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.bankCodeLabel}
                        {...form.getInputProps("refundBankAccount.bankCode")}
                    />
                </Box>
            </Group>
        </>
    );
};
