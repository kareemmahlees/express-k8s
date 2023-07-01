import { ZodSchema, ZodError } from "zod";

export async function validatePayload<T>(
  payload: any,
  schema: ZodSchema
): Promise<{
  success: boolean;
  error?: ZodError;
  data?: T;
}> {
  const result = await schema.safeParseAsync(payload);
  return result;
}
