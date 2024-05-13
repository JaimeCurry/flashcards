const MongoClient = require('mongodb').MongoClient;
const USER = 'Jaime1'
const PASSWORD = 'jaimesss'
const DB_NAME = 'FlashCard'
const DB_HOST = 'flashcard.pnvfrby.mongodb.net'

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=${DB_NAME}`;

class MongoLib {
    constructor(){
        this.veces = 0;
    }

    async connect() {
            this.veces++;     
            console.log(`Connect invocado ${this.veces} veces`);

            if (MongoLib.connection != null) {
                console.log(`Conexión a la BBDD ya activa`);
                return MongoLib.connection.db(DB_NAME);
            } else {
                console.log(`creando nueva conexión a la BBDD`);
                try {
                    MongoLib.connection = await MongoClient.connect(MONGO_URI)
                    return MongoLib.connection.db(DB_NAME)
                } catch(e){
                    console.log('error en conexión a BBDD')
                    return e
                }
            }
    }
    async  findAllTemas(collection) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).find({}, { projection: { _id: 0, id: 1, titulo: 1, descripcion: 1 } }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
    async addTema(collection,titulo,descripcion){
        try{
            let db = await this.connect();
            const temaIdMayor = await db.collection(collection).findOne({}, { projection: { id: 1 }, sort: { id: -1 } });
            let id = 0;
            if (temaIdMayor) {
                id = temaIdMayor.id + 1;
            }
            const result = await db.collection(collection).insertOne({ id: id, titulo: titulo, descripcion: descripcion });
            return result;
        }catch(e){
            return e;
        }
    }
    async  findAllMazos(collection, idTema) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).find({idTema:idTema}, { projection: { _id: 0, id: 1, idTema:1, titulo: 1, descripcion: 1 } }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
    async addMazo(collection, idTema, titulo, descripcion){
        try{
            let db = await this.connect();
            const mazoIdMayor = await db.collection(collection).findOne({}, { projection: { id: 1 }, sort: { id: -1 } });
            let id = 0;
            if (mazoIdMayor) {
                id = mazoIdMayor.id + 1;
            }
            const result = await db.collection(collection).insertOne({ id: id,idTema: idTema, titulo: titulo, descripcion: descripcion });
            return result;
        }catch(e){
            return e;
        }
    }
    async  findAllFlashCards(collection,idMazo) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).find({idMazo: idMazo}, { projection: { _id: 0, id: 1, idMazo:1, textoFrontal: 1, textoTrasero: 1 } }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
    async addFlashCard(collection, idMazo, textoFrontal, textoTrasero){
        try{
            let db = await this.connect();
            const flashCardIdMayor = await db.collection(collection).findOne({},{projection: {id:1}, sort: {id:-1}});
            let id = 0;
            if(flashCardIdMayor){
                id = flashCardIdMayor.id +1;
            }
            const result = await db.collection(collection).insertOne({id: id, idMazo: idMazo, textoFrontal: textoFrontal,textoTrasero: textoTrasero});
            console.log(result);
            return result;
        }catch(e){
            return e;
        }
    }
    async deleteTemaId(collection,idTema){
        try {
            let db = await this.connect();
            await db.collection(collection).deleteOne({ id: idTema });
            const mazosEliminados = await db.collection('Mazos').find({ idTema: idTema }, { projection: { id: 1 } }).toArray();
            const mazoIds = mazosEliminados.map(mazo => mazo.id);
            await db.collection('Mazos').deleteMany({ idTema: idTema });
            console.log(mazoIds);
            const result = await db.collection('FlashCards').deleteMany({ idMazo: { $in: mazoIds } });
            return result;
        } catch (e) {
            return e;
        }
    }
    async deleteMazoId(collection,idMazo){
        try {
            let db = await this.connect();
            await db.collection(collection).deleteOne({ id: idMazo });
            result = await db.collection('FlashCards').deleteMany({ idMazo: idMazo });
            return result;
        } catch (e) {
            return e;
        }
    }
    async deleteFlashCardId(collection,idFlashCard){
        try {
            let db = await this.connect();
            result = await db.collection(collection).deleteOne({ id: idFlashCard });
            return result;
        } catch (e) {
            return e;
        }
    }
    async modTema(collection,id,titulo,descripcion){
        try{
            let db = await this.connect();
            const idint = parseInt(id);
            const result = await db.collection(collection).updateOne({id: idint},{$set:{titulo:titulo,descripcion:descripcion}});
            return result;
        }catch(e){
            return e;
        }
    }
    async modMazo(collection,id,titulo,descripcion){
        try{
            let db = await this.connect();
            const idint = parseInt(id);
             result = await db.collection(collection).updateOne({id: idint},{$set:{titulo:titulo,descripcion:descripcion}});
            return result;
        }catch(e){
            return e;
        }
    }
    async modFlashCard(collection,id,textoFrontal,textoTrasero){
        try{
            let db = await this.connect();
            const idint = parseInt(id);
             result = await db.collection(collection).updateOne({id: idint},{$set:{textoFrontal:textoFrontal,textoTrasero:textoTrasero}});
            return result;
        }catch(e){
            return e;
        }
    }
}
module.exports = MongoLib;


