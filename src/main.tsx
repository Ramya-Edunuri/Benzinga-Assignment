import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

declare global {
  interface Window {
    renderMyWidget: (containerId: string, props: { someProp: string }) => void;
    unmountMyWidget: (containerId: string) => void;
  }
}

window.renderMyWidget = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
};

window.unmountMyWidget = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.unmount();
  }
};
