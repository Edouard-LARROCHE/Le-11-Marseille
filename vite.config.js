import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
	server: {
		open: true,
		port: 3000,
	},
	css: {
		devSourcemap: true,
	},
	plugins: [svgr()],
})

