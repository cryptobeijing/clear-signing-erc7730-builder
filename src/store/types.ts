import { type paths } from "~/generate/api-types";

export type Erc7730 =
  paths["/api/py/generateERC7730"]["post"]["responses"]["200"]["content"]["application/json"];

export type Operation = Erc7730["display"]["formats"][string];
