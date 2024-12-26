import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Web3, { type AbiFunctionFragment } from "web3";
import fetchGenerate from "./fetchGenerate";
import { TRPCError } from "@trpc/server";

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const web3 = new Web3();

const ethSchema = z.object({
  value: z.union([
    z.string().regex(ethAddressRegex, { message: "Invalid Ethereum address" }),
    z.array(
      z.any().refine(
        (abi: string | AbiFunctionFragment) => {
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

          const abi = await fetchGenerate({
            address: value,
            chain_id: chainId,
          });

          console.log("result", abi);
          return { abi };
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

      if (Array.isArray(value)) {
        return {
          message:
            "ABI validation successful. Further logic can be implemented here.",
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: "Invalid input.",
      });
    }),
});
