import * as React from "react";
import {
    Anchor,
    Box,
    Button,
    Divider,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { IconCheck, IconChevronLeft } from "@tabler/icons-react";

import { currencyFormatter } from "../../constants";
import { useBenefitFormContext } from "../../context";
import { bankAccountToString } from "../../form";
import { overviewStepTexts } from "./texts";

export interface OverviewStepProps {
    onPrevious: () => void;
    onSubmit: () => void;
}

const formatDateOfIssue = (value: Date | string | null | undefined) => {
    if (!value) {
        return overviewStepTexts.fields.missingDate;
    }

    if (value instanceof Date) {
        return value.toLocaleDateString("cs-CZ");
    }

    const parsedDate = new Date(value);

    return Number.isNaN(parsedDate.getTime())
        ? String(value)
        : parsedDate.toLocaleDateString("cs-CZ");
};

const getBankNameByCode = (bankCode: string) => {
    switch (bankCode) {
        case "0100":
            return "Komerční banka, a.s.";
        case "0300":
            return "Československá obchodní banka, a. s.";
        case "0800":
            return "Česká spořitelna, a.s.";
        default:
            return null;
    }
};

const OverviewFieldRow: React.FunctionComponent<{
    label: string;
    value: React.ReactNode;
}> = (props) => (
    <Grid gutter={{ base: 8, sm: 20 }}>
        <Grid.Col span={{ base: 12, sm: 5, md: 4 }}>
            <Text size="sm" c="dimmed">
                {props.label}
            </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7, md: 8 }}>
            <Text size="sm" fw={600}>
                {props.value}
            </Text>
        </Grid.Col>
    </Grid>
);

export const OverviewStep: React.FunctionComponent<OverviewStepProps> = (props) => {
    const form = useBenefitFormContext();
    const bankName = getBankNameByCode(form.values.refundBankAccount.bankCode);
    const bankAccountText = bankName
        ? `${bankAccountToString(form.values.refundBankAccount)} - ${bankName}`
        : bankAccountToString(form.values.refundBankAccount);

    return (
        <Stack
            component="form"
            gap="xl"
            pt="xl"
            onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit();
            }}
        >
            <Paper withBorder radius={0} p="xl">
                <Stack gap="xl">
                    <Stack gap="lg">
                        <Title order={2} size="h4" c="dimmed" tt="uppercase">
                            {overviewStepTexts.sections.proofs}
                        </Title>

                        {form.values.proofOfPurchase.map((item, index) => (
                            <Stack key={`${item.referenceNumber}-${index}`} gap="sm">
                                <Group gap="xs" wrap="nowrap" align="center">
                                    <ThemeIcon size={20} radius={0} color="green" variant="light">
                                        <IconCheck size={14} aria-hidden="true" />
                                    </ThemeIcon>
                                    <Title order={3} size="h5">
                                        {overviewStepTexts.proofCardTitle}
                                        {form.values.proofOfPurchase.length > 1 ? ` ${index + 1}` : ""}
                                    </Title>
                                </Group>

                                <Stack gap={8} pl={{ base: 0, sm: 28 }}>
                                    <OverviewFieldRow
                                        label={overviewStepTexts.fields.referenceNumber}
                                        value={
                                            item.referenceNumber ||
                                            overviewStepTexts.fields.missingValue
                                        }
                                    />
                                    <OverviewFieldRow
                                        label={overviewStepTexts.fields.dateOfIssue}
                                        value={formatDateOfIssue(item.dateOfIssue)}
                                    />
                                    <OverviewFieldRow
                                        label={overviewStepTexts.fields.amount}
                                        value={currencyFormatter.format(item.amount)}
                                    />
                                    <OverviewFieldRow
                                        label={overviewStepTexts.fields.issuerId}
                                        value={
                                            item.identificationNumber ||
                                            overviewStepTexts.fields.missingValue
                                        }
                                    />
                                    {item.proofPayment && (
                                        <Box>
                                            <Anchor
                                                size="sm"
                                                href="#"
                                                onClick={(event) => event.preventDefault()}
                                            >
                                                {overviewStepTexts.actions.download}
                                            </Anchor>
                                        </Box>
                                    )}
                                </Stack>

                                {index < form.values.proofOfPurchase.length - 1 && <Divider />}
                            </Stack>
                        ))}
                    </Stack>

                    <Stack gap="lg">
                        <Title order={2} size="h4" c="dimmed" tt="uppercase">
                            {overviewStepTexts.sections.payout}
                        </Title>
                        <OverviewFieldRow
                            label={overviewStepTexts.fields.bankAccount}
                            value={bankAccountText}
                        />
                    </Stack>

                    <Text size="sm" maw={760}>
                        {overviewStepTexts.personalDataNotice}{" "}
                        <Anchor href="#" onClick={(event) => event.preventDefault()}>
                            {overviewStepTexts.personalDataLink}
                        </Anchor>{" "}
                        {overviewStepTexts.personalDataNoticeSuffix}
                    </Text>
                </Stack>
            </Paper>

            <Group justify="space-between">
                <Button
                    radius={0}
                    size="lg"
                    variant="light"
                    color="gray"
                    leftSection={<IconChevronLeft size={14} aria-hidden="true" />}
                    onClick={props.onPrevious}
                    type="button"
                >
                    {overviewStepTexts.actions.back}
                </Button>
                <Button radius={0} size="lg" color="#d22d0f" type="submit">
                    {overviewStepTexts.actions.submit}
                </Button>
            </Group>
        </Stack>
    );
};
