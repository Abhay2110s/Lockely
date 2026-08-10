import { MotionConfig } from "framer-motion";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <AppRoutes />
      </MotionConfig>
    </ThemeProvider>
  );
}