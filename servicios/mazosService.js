const MongoLib = require('../lib/mongo')

class MazosService{
    constructor(){
        this.collection = 'Mazos'
        this.mongoDB = new MongoLib()
    }
    async findAllMazos(idTema){
        const mazos = await this.mongoDB.findAllMazos(this.collection, idTema);
        return mazos || [];
    }
    async addMazo(idTema, titulo, descripcion ){
        const mazo = await this.mongoDB.addMazo(this.collection,idTema, titulo, descripcion);
        return mazo || [];
    }
    async deleteMazoId(idMazo){
        const mazo = await this.mongoDB.deleteMazoId(this.collection,idMazo);
        return mazo;
    }
    async modMazo(id, titulo, descripcion){
        const idTema = await this.mongoDB.modMazo(this.collection,id,titulo,descripcion);
        console.log(idTema);
        return idTema || [];
    }
}
module.exports = MazosService