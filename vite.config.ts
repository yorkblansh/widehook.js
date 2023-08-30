import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	plugins: [
		react({
			//  jsxImportSource: 'example',
			// jsxRuntime: 'classic' // Add this line
		}),
		tsConfigPaths(),
		// linterPlugin({
		// 	include: ["./src}/**/*.{ts,tsx}"],
		// 	linters: [new EsLinter({ configEnv })],
		// }),
		dts({
			insertTypesEntry: true,
			include: ['src/widehook.ts'],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/src', ''),
				content,
			}),
		}),
	],
	base: '/example',
	// root: 'example',
	build: {
		outDir: 'lib',
		minify: true,

		lib: {
			formats: ['es', 'cjs'],
			entry: resolve('src', 'widehook.ts'),
			name: 'ReactFeatureFlag',
			fileName: (format, entryName) =>
				`widehook${format === 'es' ? '.es' : ''}.js`,
		},
		rollupOptions: {
			// input: ['example'],
			external: ['react'],
		},
	},
}))
