import { create } from "zustand";

interface AuthDialogStore {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  closeDialogs: () => void;
}

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  isSignInOpen: false,
  isSignUpOpen: false,
  openSignIn: () => set({ isSignInOpen: true, isSignUpOpen: false }),
  openSignUp: () => set({ isSignInOpen: false, isSignUpOpen: true }),
  closeDialogs: () => set({ isSignInOpen: false, isSignUpOpen: false }),
}));
