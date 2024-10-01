import _ from 'lodash'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
	return <main className="App">123</main>
}

export const Router = () => {
	return (
		<RouterProvider
			router={createBrowserRouter([
				{
					path: '/',
					element: <App />,
				},
			])}
		/>
	)
}
