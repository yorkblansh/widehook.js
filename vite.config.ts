import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Функция для создания конфигурации для демо
const setupDemoConfig = (demoPath: string): UserConfig => ({
	plugins: [react()],
	resolve: {
		alias: {
			'@widehook': resolve(__dirname, 'packages/widehook/src/widehook.ts'),
		},
	},
	build: {
		outDir: `dist/${demoPath}`,
		sourcemap: true,
	},
})

// Конфигурация для библиотеки
const setupLibConfig = (): UserConfig => ({
	root: __dirname,
	plugins: [
		react(),
		dts({
			insertTypesEntry: false,
			include: [resolve('packages/widehook')],
			exclude: [
				...[
					'RxService.ts', //
					'utils',
					'passage',
					'internal-types.ts',
				].map((path) => resolve('packages/widehook/src', path)),
			],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/packages/widehook/src', ''),
				content,
			}),
		}),
	],
	build: {
		outDir: 'packages/widehook/lib',
		sourcemap: false,
		minify: false,
		lib: {
			formats: ['es'],
			entry: [resolve('packages/widehook/src/widehook.ts')],
			name: 'ReactFeatureFlag',
			fileName: () => 'widehook.js',
		},
		rollupOptions: {
			external: ['react'],
		},
	},
})

// Экспортируем конфигурацию в зависимости от переменной окружения MODE
export default defineConfig(({ mode }) => {
	switch (mode) {
		case 'demo':
			return setupDemoConfig('demo')
		case 'todo':
			return setupDemoConfig('todo')
		default:
			return setupLibConfig()
	}
})
