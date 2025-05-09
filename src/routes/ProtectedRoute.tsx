import { useEffect } from "react";
import { useAuth } from "src/service/useAuth";
import { useAuthDialogStore } from "src/store/useAuthDialogStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { openSignIn } = useAuthDialogStore();
  const { unauthenticated } = useAuth();

  useEffect(() => {
    if (unauthenticated) {
      openSignIn();
    }
  }, [unauthenticated, openSignIn]);

  return children;
}

export default ProtectedRoute;
