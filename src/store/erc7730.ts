import { createStore } from "zustand/vanilla";
import { type Erc7730 } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Erc7730Store {
  erc7730: Erc7730 | null;
  setErc7730: (by: Erc7730) => void;
  getMetadata: () => Erc7730["metadata"] | null;
  getContractAddress: () => string | null;
  setMetadata: (metadata: Erc7730["metadata"]) => void;
}

export const createErc7730Store = () => {
  return createStore<Erc7730Store>()(
    persist(
      (set, get) => ({
        erc7730: null,
        getContractAddress: () => {
          const { erc7730 } = get();
          const context = erc7730?.context;
          if (!context) return "";

          if ("contract" in context) {
            return context.contract.deployments[0]?.address ?? "";
          }
          return "";
        },
        setErc7730: (erc7730) => set(() => ({ erc7730 })),
        getMetadata: () => get().erc7730?.metadata ?? null,
        setMetadata: (metadata) =>
          set((state) => ({
            erc7730: {
              ...state.erc7730!,
              metadata,
            },
          })),
      }),
      {
        storage: createJSONStorage(() => sessionStorage),
        name: "store-erc7730",
        skipHydration: true,
      },
    ),
  );
};

export default createErc7730Store;
