import { type paths } from "~/generate/api-types";

type GenerateBodyParams =
  paths["/api/py/generateFromAddress"]["post"]["requestBody"]["content"]["application/json"];
export type GenerateResponse =
  paths["/api/py/generateFromAddress"]["post"]["responses"]["200"]["content"]["application/json"];
type ValidationError =
  paths["/api/py/generateFromAddress"]["post"]["responses"]["422"]["content"]["application/json"];

export default async function fetchGenerateFromAddress(
  body: GenerateBodyParams,
): Promise<GenerateResponse> {
  const response = await fetch("/api/py/generateFromAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 422) {
      const errorData: ValidationError =
        (await response.json()) as ValidationError;
      throw new Error(`Validation Error: ${JSON.stringify(errorData)}`);
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = (await response.json()) as GenerateResponse;
  return data;
}
