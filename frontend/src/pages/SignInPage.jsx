import { Navigate } from "react-router-dom";

/** Legacy /sign-in route — redirect to the custom login page. */
export default function SignInPage() {
  return <Navigate to="/login" replace />;
}
