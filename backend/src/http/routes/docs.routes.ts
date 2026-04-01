import type { Request, Response } from 'express'
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import fs from 'fs'

const docsRouter = Router()

const swaggerPath = path.resolve('./src/http/docs/swagger.yaml')
const swaggerDocument = YAML.load(swaggerPath)

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

docsRouter.get('/json', (request: Request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.send(swaggerDocument)
})

docsRouter.get('/yaml', (request: Request, response) => {
    response.setHeader('Content-Type', 'text/yaml')
    response.send(fs.readFileSync(swaggerPath, 'utf8'))
})

export default docsRouter 