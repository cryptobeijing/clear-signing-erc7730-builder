import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type State = {
  validateOperation: string[];
  selectedOperation: string | null;
};

type Action = {
  setSelectedOperation: (selectedOperation: State["selectedOperation"]) => void;
  setValidateOperation: (f: string) => void;
};

export const useOperationStore = create<State & Action>()(
  persist(
    (set) => ({
      validateOperation: [],
      selectedOperation: null,
      setValidateOperation: (operation) =>
        set((state) => ({
          validateOperation: state.validateOperation.includes(operation)
            ? state.validateOperation
            : [...state.validateOperation, operation],
        })),
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
