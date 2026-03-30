import { createFormContext } from "@mantine/form";

import type { BenefitFormValues } from "../../types/benefit";

export const [BenefitFormProvider, useBenefitFormContext, useBenefitForm] =
    createFormContext<BenefitFormValues>();
