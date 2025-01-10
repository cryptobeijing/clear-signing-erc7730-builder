import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export interface Erc7730Store {
  selectedOperation: () => string | null;
  setSelectedOperation: (f: string) => void;
}

type State = {
  selectedOperation: string | null;
};

type Action = {
  setSelectedOperation: (selectedOperation: State["selectedOperation"]) => void;
};

export const useOperationStore = create<State & Action>()(
  persist(
    (set) => ({
      selectedOperation: null,
      setSelectedOperation: (selectedOperation) =>
        set(() => ({ selectedOperation })),
    }),
    {
      storage: createJSONStorage(() => sessionStorage),
      name: "store-Operation",
      skipHydration: true,
    },
  ),
);

export default useOperationStore;
