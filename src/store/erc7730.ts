import { create } from "zustand";
import { type Erc7730 } from "./types";

interface State {
  erc7730: Erc7730 | null;
  setErc7730: (by: Erc7730) => void;
  getMetadata: () => Erc7730["metadata"] | null;
}

const useErc7730Store = create<State>()((set, get) => ({
  erc7730: null,
  setErc7730: (erc7730) => set(() => ({ erc7730 })),
  getMetadata: () => get().erc7730?.metadata ?? null,
}));

export default useErc7730Store;
