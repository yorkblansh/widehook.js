import { resolve } from 'node:path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

// Функция для создания конфигурации для примера
const setupExampleConfig = (examplePath: string): UserConfig => ({
	define: {
		'process.env': { ...process.env },
	},
	plugins: [react(), tsConfigPaths()],
	base: `/${examplePath}`,
	build: {
		outDir: `dist/${examplePath}`,
		sourcemap: true,
	},
	resolve: {
		alias: {
			'@widehook': resolve(__dirname, 'src/widehook.ts'),
		},
	},
})

// Конфигурация для библиотеки
const setupLibConfig = (): UserConfig => ({
	define: {
		'process.env': { ...process.env },
	},
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: false,
			exclude: [
				resolve('src', 'RxService.ts'),
				resolve('example'),
				resolve('example1'),
				resolve('src', 'passage'),
				resolve('src', 'internal-types.ts'),
			],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/src', ''),
				content,
			}),
		}),
	],
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

// Экспортируем конфигурацию в зависимости от переменной окружения EXAMPLE
export default defineConfig(({ mode }) => {
	switch (mode) {
		case 'example':
			return setupExampleConfig('example')
		case 'example1':
			return setupExampleConfig('example1')
		default:
			return setupLibConfig()
	}
})
