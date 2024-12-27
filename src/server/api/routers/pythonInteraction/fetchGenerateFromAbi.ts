import { type paths } from "./api-types";

type GenerateBody =
  paths["/api/py/generateFromAbi"]["post"]["requestBody"]["content"]["application/json"];
export type GenerateResponse =
  paths["/api/py/generateFromAbi"]["post"]["responses"]["200"]["content"]["application/json"];
type ValidationError =
  paths["/api/py/generateFromAbi"]["post"]["responses"]["422"]["content"]["application/json"];

export default async function fetchGenerateFromAbi(
  abiString: GenerateBody,
): Promise<GenerateResponse> {
  if (!abiString) {
    throw new Error("Query parameters are required.");
  }

  const url = new URL(
    `${process.env.VERCEL_URL ?? "http://127.0.0.1:8000"}/api/py/generateFromAbi`,
  );

  const params = {
    abi: abiString.abi, // Or remove JSON.stringify if the consumer expects an object
    // Add other required properties
  };

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
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
