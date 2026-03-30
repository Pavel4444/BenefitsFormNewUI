import * as React from "react";
import { Alert, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";

import { mockBenefit } from "../../../../data/mockBenefit";
import { completedStepTexts } from "./texts";

export interface CompletedStepProps {
    result: { applicationId: string; caseId: string } | null;
    onReset: () => void;
}

export const CompletedStep: React.FunctionComponent<CompletedStepProps> = (props) => (
    <Stack gap="xl" pt="xl">
        <Paper withBorder radius={0} p="xl">
            <Stack gap="xl">
                <Alert
                    color="green"
                    variant="light"
                    radius="sm"
                    icon={<IconCheck size={16} aria-hidden="true" />}
                >
                    {completedStepTexts.successTitle}
                </Alert>

                <Stack gap="lg" maw={760}>
                    <Text size="sm" lh={1.7}>
                        {completedStepTexts.messagePrefix} {mockBenefit.name}{" "}
                        {completedStepTexts.messageMiddle}{" "}
                        {props.result?.applicationId
                            ? `${completedStepTexts.messageApplicationIdPrefix} ${props.result.applicationId}${completedStepTexts.messageApplicationIdSuffix}`
                            : "."}{" "}
                        {completedStepTexts.messageSuffix}
                    </Text>

                    <Text size="sm" lh={1.7}>
                        {completedStepTexts.thankYou}
                    </Text>
                </Stack>
            </Stack>
        </Paper>

        <Group justify="flex-end">
            <Button
                radius={0}
                size="lg"
                variant="default"
                rightSection={<IconChevronRight size={14} aria-hidden="true" />}
                onClick={props.onReset}
            >
                {completedStepTexts.resetButton}
            </Button>
        </Group>
    </Stack>
);
