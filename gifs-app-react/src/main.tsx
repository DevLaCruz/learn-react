import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import { GifsApp } from "./GifsApp.tsx";
import { MyCounterApp } from "./counter/components/MyCounterApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <GifsApp />,
  {/* <MyCounterApp /> */}
  </StrictMode>,
);
