import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./i18n"

import "./scss/styles.scss"

createRoot(document.getElementById("root")).render(<App />)

