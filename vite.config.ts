import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: false,
			exclude: [
				resolve('src', 'RxService.ts'),
				resolve('example'),
				resolve('src', 'passage'),
				resolve('src', 'internal-types.ts'),
			],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/src', ''),
				content,
			}),
		}),
	],
	base: '/example',
	build: {
		outDir: 'lib',
		sourcemap: false,
		minify: false,
		lib: {
			formats: ['es'],
			entry: [resolve('src', 'widehook.ts')],
			name: 'ReactFeatureFlag',
			fileName: () => 'widehook.js',
		},
		rollupOptions: {
			external: ['react'],
		},
	},
})
