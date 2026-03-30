import * as React from "react";
import { Grid, Stack, Text, TextInput } from "@mantine/core";

import { useBenefitFormContext } from "../../context";
import { documentsStepTexts } from "./texts";

export const BankAccountFields: React.FunctionComponent = () => {
    const form = useBenefitFormContext();

    return (
        <>
            <Stack gap="md" hiddenFrom="sm" w="100%">
                <Grid gutter="xs" align="end">
                    <Grid.Col span={3}>
                        <TextInput
                            c="dimmed"
                            label={documentsStepTexts.bankAccountSection.prefixLabel}
                            placeholder={documentsStepTexts.bankAccountSection.prefixPlaceholder}
                            {...form.getInputProps("refundBankAccount.prefix")}
                        />
                    </Grid.Col>

                    <Grid.Col span="content">
                        <Text aria-hidden="true" role="presentation" c="dimmed" fw={700} mb={10}>
                            -
                        </Text>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <TextInput
                            c="dimmed"
                            label={documentsStepTexts.bankAccountSection.accountNumberLabel}
                            {...form.getInputProps("refundBankAccount.accountNumber")}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{ base: 12, xs: 6 }}>
                        <TextInput
                            c="dimmed"
                            label={documentsStepTexts.bankAccountSection.bankCodeLabel}
                            {...form.getInputProps("refundBankAccount.bankCode")}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>

            <Grid gutter="xs" align="end" visibleFrom="sm">
                <Grid.Col span={2}>
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.prefixLabel}
                        placeholder={documentsStepTexts.bankAccountSection.prefixPlaceholder}
                        {...form.getInputProps("refundBankAccount.prefix")}
                    />
                </Grid.Col>

                <Grid.Col span="content">
                    <Text aria-hidden="true" role="presentation" c="dimmed" fw={700} mb={10}>
                        -
                    </Text>
                </Grid.Col>

                <Grid.Col span={5}>
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.accountNumberLabel}
                        {...form.getInputProps("refundBankAccount.accountNumber")}
                    />
                </Grid.Col>

                <Grid.Col span="content">
                    <Text aria-hidden="true" role="presentation" c="dimmed" fw={700} mb={10}>
                        /
                    </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                    <TextInput
                        c="dimmed"
                        label={documentsStepTexts.bankAccountSection.bankCodeLabel}
                        {...form.getInputProps("refundBankAccount.bankCode")}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
};
