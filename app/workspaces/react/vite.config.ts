import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),

		// VitePWA(pwaOptions),
		// replace(replaceOptions),
		viteSingleFile({
			useRecommendedBuildConfig: false,
			removeViteModuleLoader: true,
			// inlinePattern: ["glob"],
		}),
	],
	define: {
		// 'process.env.SERVER_IP': '10.212.1.217',
		'process.env': process.env,
	},
})
