import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/crimson-text/400.css";
import "@fontsource/crimson-text/600.css";
import "@fontsource/crimson-text/700.css"; 
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

createRoot(document.getElementById("root")!).render(<App />);
