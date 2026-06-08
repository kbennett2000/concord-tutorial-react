import ReactDOM from "react-dom/client";

import { App } from "./App.jsx";
import "./index.css";

// The same render(<App/>) line from your earlier lessons — now in a real project.
// The difference: instead of three <script> tags, we IMPORT what we need at the top.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
