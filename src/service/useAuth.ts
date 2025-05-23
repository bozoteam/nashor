import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../service/endpoints/user";
import { authenticateUser, logoutUser, registerUser } from "./endpoints/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();
  // Current authenticated user
  const {
    data: authUser,
    isLoading: authLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    refetchOnMount: true,
    staleTime: 0, // 0 means always refetch when component mounts
    enabled: !!localStorage.getItem("access_token"),
    queryFn: async () => {
      try {
        return await fetchUser();
      } catch (error) {
        queryClient.setQueryData(["authUser"], null);
        throw error;
      }
    },
  });

  // Sign in
  const signIn = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { access_token } = await authenticateUser(email, password);
      localStorage.setItem("access_token", access_token);
      return access_token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  // Sign up
  const signUp = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const res = await registerUser(email, name, password);

      if (!res.ok) throw new Error("Sign up failed");
      return signIn.mutateAsync({ email, password });
    },
  });

  // Sign out
  const signOut = () => {
    logoutUser().then(() => {
      localStorage.removeItem("access_token");
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    queryClient.setQueryData(["authUser"], null);
  };

  return {
    authUser,
    authLoading,
    isError,
    signIn,
    signUp,
    signOut,
    unauthenticated: !authUser && !authLoading,
  };
};
