import { create } from "zustand";
import { type Erc7730 } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  erc7730: Erc7730 | null;
  setErc7730: (by: Erc7730) => void;
  getMetadata: () => Erc7730["metadata"] | null;
  getContractAddress: () => string | null;
  setMetadata: (metadata: Erc7730["metadata"]) => void;
}

const useErc7730Store = create<State>()(
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
    },
  ),
);

export default useErc7730Store;
