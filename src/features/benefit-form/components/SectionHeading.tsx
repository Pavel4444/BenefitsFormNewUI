import * as React from "react";
import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";

export interface SectionHeadingProps {
    id?: string;
    number: number;
    title: string;
    description?: string;
    order?: 2 | 3 | 4 | 5 | 6;
}

export const SectionHeading: React.FunctionComponent<SectionHeadingProps> = (props) => (
    <Group align="flex-start" gap="md" wrap="nowrap">
        <ThemeIcon radius="xl" size={30} color="blue">
            {props.number}
        </ThemeIcon>
        <Stack gap={2}>
            <Title id={props.id} order={props.order ?? 2} fz="md" lh={2}>
                {props.title}
            </Title>
            {props.description && <Text c="dimmed" size="sm" lh={1.35}>{props.description}</Text>}
        </Stack>
    </Group>
);
