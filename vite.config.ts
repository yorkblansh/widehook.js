import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Функция для создания конфигурации для примера
const setupExampleConfig = (examplePath: string): UserConfig => ({
	plugins: [react()],
	resolve: {
		alias: {
			'@widehook': resolve(__dirname, 'packages/widehook/src/widehook.ts'),
		},
	},
	build: {
		outDir: `dist/${examplePath}`,
		sourcemap: true,
	},
})

// Конфигурация для библиотеки
const setupLibConfig = (): UserConfig => ({
	plugins: [
		react(),
		dts({
			insertTypesEntry: false,
			exclude: ['**/node_modules/**'],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/packages/widehook/src', ''),
				content,
			}),
		}),
	],
	build: {
		outDir: 'packages/widehook/lib',
		lib: {
			entry: resolve(__dirname, 'packages/widehook/src/widehook.ts'),
			name: 'widehook',
			fileName: 'widehook',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react'],
		},
	},
})

// Экспортируем конфигурацию в зависимости от переменной окружения MODE
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
