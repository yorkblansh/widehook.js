import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { pipe } from 'fp-ts/lib/function'
import path, { join } from 'path'
import { readFileAsync } from './utils/readFileAsync'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/')
	// @Redirect('http://localhost/api', 301)
	getHello() {
		return pipe(
			join(process.cwd(), '..', 'react', 'dist', 'index.html'),
			path.resolve,
			readFileAsync,
		)
	}
}
