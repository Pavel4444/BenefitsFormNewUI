import { AppShell, MantineProvider } from "@mantine/core";

import { BenefitFormDemo } from "./features/benefit-form/BenefitFormDemo";
import { appTheme } from "./features/benefit-form/constants";

function App() {
    return (
        <MantineProvider theme={appTheme}>
            <AppShell padding={0} >
                <AppShell.Main bg="var(--mantine-color-gray-0)">
                    <BenefitFormDemo />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}

export default App;
