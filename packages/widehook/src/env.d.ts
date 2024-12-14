/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DEMO_TYPE: 'frontend_demo' | 'backend_demo'
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
