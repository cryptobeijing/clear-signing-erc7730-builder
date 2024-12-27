import { type paths } from "./api-types";

type GenerateBodyParams =
  paths["/api/py/generateFromAddress"]["post"]["requestBody"]["content"]["application/json"];
export type GenerateResponse =
  paths["/api/py/generateFromAddress"]["post"]["responses"]["200"]["content"]["application/json"];
type ValidationError =
  paths["/api/py/generateFromAddress"]["post"]["responses"]["422"]["content"]["application/json"];

export default async function fetchGenerateFromAddress({
  address,
  chain_id,
}: GenerateBodyParams): Promise<GenerateResponse> {
  if (typeof address !== "string" || typeof chain_id !== "number") {
    throw new Error("Invalid address");
  }
  // url.searchParams.append("address", params.address);
  // url.searchParams.append("chain_id", params.chain_id.toString());

  const response = await fetch("/api/py/generateFromAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      chain_id: chain_id.toString(),
    }),
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
