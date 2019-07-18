import express = require('express')
import { Metric , MetricsHandler } from './metrics'

//Declaracion de variables constantes
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient // Create a new MongoClient
const path = require('path')
const app = express()
const port: string = process.env.PORT || '8080'
const bodyparser = require('body-parser')
var db: any
app.use(express.static(path.join(__dirname, 'public')))
//Configurar los views para el front end
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

//Establecer conexion con la base de datos MongoDB
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err: any, client: any) => {
  if(err) throw err
  db = client.db('mydb')

  // Start the application after the database connection is ready
  const port: string = process.env.PORT || '8115'
  app.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
  })
});

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//Ruta ROOT!!
app.get(
    '/', 
    (req:any, res:any) => res.render('index.ejs', {name: "asdasdasd"})
)

//Ruta para insertar informacion en la base de datos MongoDB
app.post('/metrics', (req: any, res: any) => {
    if(req.body){
       const metric = new Metric("String",parseInt(req.body.value));
       console.log(metric)
      new MetricsHandler(db).save(metric, (err: any, result: any) => {
        if (err)
          return res.status(500).json({error: err, result: result});
        res.status(201).json({error: err, result: true})
      })
    }else{
      return res.status(400).json({error: 'Wrong request parameter',});
    }
})

//Ruta para obtener informacion de la base de datos
app.get('/metrics', (req: any, res: any) => {
    new MetricsHandler(db).getAll((err: any, result: any) => {
        if (err)
          return res.status(500).json({error: err, result: result});
        res.status(201).json(result)
    })
})


//Ruta para obtener informacion de la base de datos
app.get('/find', (req: any, res: any) => {
        new MetricsHandler(db).findDocument({value: parseInt(req.query.value)},(err: any, result: any) => {
            if (err)
              return res.status(500).json({error: err, result: result});
            res.status(201).json(result)
        })
})

//Ruta para eliminar un documento
app.delete('/metrics', (req: any, res: any) => {
    new MetricsHandler(db).deleteDocument({value: parseInt(req.query.value)},(err: any, result: any) => {
        if (err)
          return res.status(500).json({error: err, result: result});
        res.status(201).json(result)
    })
})
