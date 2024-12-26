import { type paths } from "./api-types";

type GenerateQueryParams =
  paths["/api/py/generate"]["get"]["parameters"]["query"];
export type GenerateResponse =
  paths["/api/py/generate"]["get"]["responses"]["200"]["content"]["application/json"];
type ValidationError =
  paths["/api/py/generate"]["get"]["responses"]["422"]["content"]["application/json"];

export default async function fetchGenerate(
  params: GenerateQueryParams,
): Promise<GenerateResponse> {
  console.log("fetch generate ", params);

  if (!params) {
    throw new Error("Query parameters are required.");
  }

  const url = new URL(
    `${process.env.VERCEL_URL ?? "http://127.0.0.1:8000"}/api/py/generate`,
  );
  url.searchParams.append("address", params.address);
  url.searchParams.append("chain_id", params.chain_id.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
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
