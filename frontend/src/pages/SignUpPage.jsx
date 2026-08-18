import { Navigate } from "react-router-dom";

/** Legacy /sign-up route — redirect to the custom register page. */
export default function SignUpPage() {
  return <Navigate to="/register" replace />;
}
