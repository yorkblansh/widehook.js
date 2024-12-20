import ReactDOM from 'react-dom'
import './scss/index.scss'
import { MainComponent } from './components/MainComponent'
import { AnotherComponent } from './components/AnotherComponent'
import { OneMoreComponent } from './components/OneMoreComponent'

const PlayGround = () => {
	return (
		<div className="playground">
			{/* <ToDo />
			<Panel /> */}
			<MainComponent />
			<AnotherComponent />
			<OneMoreComponent />
		</div>
	)
}

ReactDOM.render(<PlayGround />, document.getElementById('root'))
