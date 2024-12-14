import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: false,
			exclude: ['**/node_modules/**'],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/src', ''),
				content,
			}),
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/widehook.ts'),
			name: 'widehook',
			fileName: 'widehook',
			formats: ['es'] as ['es'],
		},
		rollupOptions: {
			external: ['react'],
		},
	},
})
