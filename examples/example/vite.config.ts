import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@widehook': resolve(
				__dirname,
				'../../packages/widehook/src/widehook.ts',
			),
		},
	},
})
