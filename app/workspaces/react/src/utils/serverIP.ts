const NODE_ENV = process.env.NODE_ENV as 'development' | 'production'

export const serverIP = () =>
	NODE_ENV === 'development' ? 'localhost' : '10.10.10.10'
