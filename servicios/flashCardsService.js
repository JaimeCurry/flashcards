const MongoLib = require('../lib/mongo')

class FlashCardsService{
    constructor(){
        this.collection = 'FlashCards'
        this.mongoDB = new MongoLib()
    }
    async findAllFlashCards(idMazo){
        const flashCards = await this.mongoDB.findAllFlashCards(this.collection,idMazo);
        return flashCards || [];
    }
    async addFlashCard(idMazo, textoFrontal, textoTrasero ){
        const flashcard = await this.mongoDB.addFlashCard(this.collection,idMazo, textoFrontal, textoTrasero);
        return flashcard || [];
    }
    async deleteFlashCardId(idFlashCard){
        const flashcard = await this.mongoDB.deleteFlashCardId(this.collection,idFlashCard);
        return flashcard || [];
    }
    async modFlashCard(id,textoFrontal,textoTrasero){
        const flashcard = await this.mongoDB.modFlashCard(this.collection,id,textoFrontal,textoTrasero);
        return flashcard || [];
    }
}
module.exports = FlashCardsService