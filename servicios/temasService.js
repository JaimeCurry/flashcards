const MongoLib = require('../lib/mongo')

class TemasService{
    constructor(){
        this.collection = 'Temas'
        this.mongoDB = new MongoLib()
    }
    async findAllTemas(){
        const temas = await this.mongoDB.findAllTemas(this.collection);
        return temas || [];
    }
    async addTema(titulo, descripcion ){
        const tema = await this.mongoDB.addTema(this.collection, titulo, descripcion);
        return tema || [];
    }
    async deleteTemaId(idTema){
        const tema = await this.mongoDB.deleteTemaId(this.collection,idTema);
        return tema || [];
    }
    async modTema(id,titulo,descripcion){
        const tema = await this.mongoDB.modTema(this.collection,id,titulo,descripcion);
        return tema || [];
    }
} 

module.exports = TemasService