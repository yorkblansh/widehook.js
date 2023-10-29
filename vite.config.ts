import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
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
			insertTypesEntry: false,
			// include: [
			// 	resolve('src', 'widehook.ts'),
			//   resolve('src', 'createWidehoo.ts'),

			// 	resolve('src', 'epithets', 'createEpithet.ts'),
			// ],
			exclude: [
				resolve('src', 'RxService.ts'),
				resolve('example'),
				resolve('src', 'passage'),
				resolve('src', 'internal-types.ts'),
			],
			beforeWriteFile: (filePath, content) => {
				const isEpithetDir = filePath.split('/').some((p) => p === 'epithets')
				console.log({ filePath, isEpithetDir })

				// if (isEpithetDir) {
				return {
					filePath: filePath.replace('/src', ''),
					content,
				}
				// }
			},
		}),
	],
	base: '/example',
	// root: 'example',
	build: {
		outDir: 'lib',
		sourcemap: true,
		minify: true,
		lib: {
			formats: ['es'],

			// entry:
			entry: [
				resolve('src', 'widehook.ts'),
				// resolve('src', 'epithets', 'createEpithet.ts'),
			],
			name: 'ReactFeatureFlag',
			fileName: (format, entryName) => {
				// console.log({ format, entryName })

				if (entryName === 'createEpithet') {
					return `epithets/${entryName}.js`
				} else {
					return `${entryName}.js`
				}
			},
		},

		rollupOptions: {
			// input: {
			// 	'epithet.js': fileURLToPath(
			// 		new URL('./src/epithets/createEpithets.ts', import.meta.url)
			// 	),
			// },
			// input: ['example'],
			external: ['react'],
		},
	},
}))
