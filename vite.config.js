import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://www.le11amarseille.fr",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		port: 3000,
		open: true,
	},
	css: {
		devSourcemap: true,
	},
	plugins: [
		svgr(),
		react({
			jsxRuntime: "classic",
		}),
	],
	base: "./",
})

