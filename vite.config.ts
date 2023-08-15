import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	plugins: [
		react(),
		tsConfigPaths(),
		// linterPlugin({
		// 	include: ["./src}/**/*.{ts,tsx}"],
		// 	linters: [new EsLinter({ configEnv })],
		// }),
		dts({
			insertTypesEntry: true,

			include: ['lib/widehook.tsx'],

			beforeWriteFile: (filePath, content) => {
				return {
					filePath: filePath.replace('/lib', ''),
					content,
				}
			},
		}),
	],

	build: {
		minify: true,
		lib: {
			formats: ['es', 'cjs'],
			entry: resolve('lib', 'widehook.tsx'),
			name: 'ReactFeatureFlag',
			fileName: (format, entryName) => {
				return `widehook.${format}.js`
			},
		},
		rollupOptions: {
			external: ['react'],
		},
	},
}))
