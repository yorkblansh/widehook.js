import ReactDOM from 'react-dom'
import './scss/index.scss'
import { MainComponent } from './components/MainComponent'
import { AnotherComponent } from './components/AnotherComponent'

const PlayGround = () => {
	return (
		<div className="playground">
			<MainComponent />
			<AnotherComponent />
		</div>
	)
}

ReactDOM.render(<PlayGround />, document.getElementById('root'))
