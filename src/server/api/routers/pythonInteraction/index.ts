import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Web3, { type AbiFunctionFragment } from "web3";
import { TRPCError } from "@trpc/server";
import fetchGenerateFromAddress from "./fetchGenerateFromAddress";
import fetchGenerateFromAbi from "./fetchGenerateFromAbi";

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const web3 = new Web3();

const ethSchema = z.object({
  value: z.union([
    z.string().regex(ethAddressRegex, { message: "Invalid Ethereum address" }),
    z.string().refine(
      (abi) => {
        try {
          // Validate the ABI using web3.js
          web3.eth.abi.encodeFunctionSignature(abi);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid ABI" },
    ),
  ]),
});

export const pythonInteractionRouter = createTRPCRouter({
  generate: publicProcedure
    .input(ethSchema)
    .mutation(async ({ input: { value } }) => {
      if (typeof value === "string" && ethAddressRegex.test(value)) {
        try {
          const chainId = 1;

          const erc7730 = await fetchGenerateFromAddress({
            address: value,
            chain_id: chainId,
          });

          console.log("result", erc7730);
          return { erc7730 };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              error instanceof Error ? error.message : "Unknown error occurred",
            cause:
              error instanceof Error ? error.message : "Unknown error occurred",
          });
        }
      }

      console.log("ici");
      console.log(
        "web3.eth.abi.encodeFunctionSignature(abi)",
        web3.eth.abi.encodeFunctionSignature(value),
      );
      const erc7730 = await fetchGenerateFromAbi({
        abi: JSON.stringify(value),
      });

      console.log("result", erc7730);
      if (erc7730)
        return {
          erc7730,
        };

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: "Invalid input.",
      });
    }),
});
