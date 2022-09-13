import express from 'express'

const app = express()

app.get('/ads', () => {
  console.log('Acessou ads...')
})

app.listen(3333)