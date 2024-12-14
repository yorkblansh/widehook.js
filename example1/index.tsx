import React from 'react'
import ReactDOM from 'react-dom/client'
import { Example1Component } from './components/Example1Component'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<Example1Component />
	</React.StrictMode>,
)
