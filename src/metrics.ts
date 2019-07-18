
export class Metric {
    public timestamp: string
    public value: number
  
    constructor(ts: string, v: number) {
      this.timestamp = ts
      this.value = v
    }
}
export class MetricsHandler {
    private db: any
  
    constructor(db:any) { 
      this.db = db
    }
    public save(metric: Metric, callback: (err: Error | null, result?: any) => void) {
        const collection = this.db.collection('documents')
        // Insert some document
        collection.insertOne(
          metric,
          function(err: any, result: any) {
            if(err)
                return callback(err, result)
            console.log("Document inserted into the collection")
            callback(err, result)
        });
    }
    //Funcion para sacar todos los elementos de la collection
    public getAll(callback: (err: Error | null, result?: any) => void) {
        // Get the documents collection
        const collection = this.db.collection('documents');
        // Find some documents
        collection.find({}).toArray(function(err: any, docs: object) {
            if(err)
                return callback(err, docs)
            console.log("Found the following documents");
            console.log(docs)
            callback(err, docs)
        });
    }
    //Funcion para buscar datos dentro de la base de datos
    public findDocument(query: Object, callback: (err: Error | null, result?: any) => void){
        //Get documents collection
        const collection = this.db.collection('documents')
        //Fin the documents
        collection.find(query).toArray(function(err: any, docs: object){
            if(err)
                return callback(err, docs)
            console.log("Found the following documents");
            console.log(docs)
            callback(err, docs)           
        })
    }
    //funcion para eliminar un elemento dentro de la base de datos
    public deleteDocument(query: Object, callback: (err: Error | null, result?: any)=> void){
        //Get documents collection
        const collection = this.db.collection('documents')
        //Find the document and delete it!
        collection.deleteMany(query,function(err: any, docs: object){
            if(err)
                return callback(err, docs)
            console.log("Deleted the following Documents");
            console.log(docs)
            callback(err, docs)           
        })
    }
}

  
