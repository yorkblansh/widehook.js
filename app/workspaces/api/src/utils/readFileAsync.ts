import { PathOrFileDescriptor, readFile } from 'fs'

export const readFileAsync = (path: PathOrFileDescriptor): Promise<string> => {
	return new Promise((resolve, reject) => {
		readFile(
			path,
			{
				encoding: 'utf8',
			},
			(err, data) => {
				err ? reject() : resolve(data)
			},
		)
	})
}
