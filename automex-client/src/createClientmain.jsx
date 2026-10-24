import {BrowserRouter} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreateLead from "./createClient.jsx";
import "./index.css";
import "./styles.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <CreateLead />
   </BrowserRouter>
  </StrictMode>
);
