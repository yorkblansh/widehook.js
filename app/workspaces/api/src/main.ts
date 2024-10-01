import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import express from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('index.pdf')
		.setDescription('API description')
		.setVersion('0.1')
		.addTag('genpdf')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)

	app.use(express.json({ limit: '50mb' }))
	app.use(express.urlencoded({ limit: '50mb' }))
	app.enableCors({ origin: '*' })
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	const port = Number(5055)

	await app.listen(port, () => {
		const address = 'https' + '://' + 'hostname' + ':' + port + '/'
		Logger.log('Listening at ' + address)
	})
}

bootstrap()

export const viteNodeApp = NestFactory.create(AppModule)
