import * as React from "react";
import { Anchor, Group, Paper, Stack, Text, ThemeIcon, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCheck, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

import type { StoredFile } from "../../../../types/benefit";
import { uploadFieldTexts } from "./texts";

export interface UploadFieldProps {
    file: StoredFile | null;
    loading: boolean;
    onUpload: (file: File | null) => void;
    onRemove: () => void;
    error?: string | null;
}

export const UploadField: React.FunctionComponent<UploadFieldProps> = (props) => (
    <Stack gap="sm">
        {props.file ? (
            <Paper
                withBorder
                p="lg"
                radius="md"
                bg="green.0"
                style={{
                    borderStyle: "dashed",
                    borderColor: "var(--mantine-color-green-3)",
                }}
            >
                <Stack align="center" gap="sm">
                    <ThemeIcon size={40} radius="xl" color="green" variant="light">
                        <IconCheck size={22} aria-hidden="true" />
                    </ThemeIcon>

                    <Stack gap={2} align="center">
                        <Text fw={600}>
                            {`${uploadFieldTexts.successPrefix} ${props.file.name} ${uploadFieldTexts.successSuffix}`}
                        </Text>
                        <Text size="sm" c="dimmed">
                            {(props.file.size / 1024).toFixed(1)} KB
                        </Text>
                    </Stack>

                    <Group gap="lg">
                        <Anchor
                            component="button"
                            type="button"
                            size="sm"
                            c="dimmed"
                            style={{ pointerEvents: "none", opacity: 0.6 }}
                        >
                            {uploadFieldTexts.download}
                        </Anchor>
                        <Anchor component="button" type="button" size="sm" onClick={props.onRemove}>
                            {uploadFieldTexts.remove}
                        </Anchor>
                    </Group>
                </Stack>
            </Paper>
        ) : (
            <Dropzone
                onDrop={(files) => props.onUpload(files[0] ?? null)}
                onReject={() => props.onUpload(null)}
                accept={[
                    MIME_TYPES.png,
                    MIME_TYPES.jpeg,
                    MIME_TYPES.pdf,
                    MIME_TYPES.doc,
                    MIME_TYPES.docx,
                ]}
                maxFiles={1}
                loading={props.loading}
                radius="md"
                styles={{
                    root: {
                        minHeight: rem(144),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    inner: {
                        width: "100%",
                    },
                }}
            >
                <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: "none" }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size={52}
                            stroke={1.5}
                            color="var(--mantine-color-blue-6)"
                            aria-hidden="true"
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size={52}
                            stroke={1.5}
                            color="var(--mantine-color-red-6)"
                            aria-hidden="true"
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            size={52}
                            stroke={1.5}
                            color="var(--mantine-color-dimmed)"
                            aria-hidden="true"
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="md" inline>
                            {uploadFieldTexts.dropzoneTitle}
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            {uploadFieldTexts.dropzoneDescription}
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        )}

        {props.error && (
            <Text c="red" size="sm">
                {props.error}
            </Text>
        )}
    </Stack>
);
