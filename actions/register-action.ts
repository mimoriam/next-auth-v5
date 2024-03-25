"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register_action = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  console.log(values);

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
