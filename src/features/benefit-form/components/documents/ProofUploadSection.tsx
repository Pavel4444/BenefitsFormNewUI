import * as React from "react";
import { Box, Text, Title } from "@mantine/core";

import type { StoredFile } from "../../../../types/benefit";
import { UploadField } from "./UploadField";

export interface ProofUploadSectionProps {
    title: string;
    description: string;
    file: StoredFile | null;
    loading: boolean;
    onUpload: (file: File | null) => void;
    onRemove: () => void;
    error?: string | null;
    indented?: boolean;
}

export const ProofUploadSection: React.FunctionComponent<ProofUploadSectionProps> = (props) => (
    <Box ml={props.indented ? 32 : undefined} w={props.indented ? "calc(100% - 32px)" : "100%"}>
        <Title order={4} fz={props.indented ? "sm" : "md"}>
            {props.title}
        </Title>
        <Text c="dimmed" size="sm" pb="sm">
            {props.description}
        </Text>
        <UploadField
            file={props.file}
            loading={props.loading}
            onUpload={props.onUpload}
            onRemove={props.onRemove}
            error={props.error}
        />
    </Box>
);
