const express = require('express');
const TemasService = require('../servicios/temasService')
const MazosService = require('../servicios/mazosService')
const FlashCardsService = require('../servicios/flashCardsService')

function API(app){
    const router = express.Router();
    app.use('/flashCards/', router);
    const temasService = new TemasService();
    const mazosService = new MazosService();
    const flashCardsService = new FlashCardsService();
    router.get('/temas/', async function (req, res){
        try{
            const temas = await temasService.findAllTemas();
            res.status(200).json(
                {
                    data: temas,
                    message: 'Temas obtenidos correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.post('/temas/', async function (req, res){
        try{
            const { titulo, descripcion } = req.body;
            const nuevoTema = await temasService.addTema(titulo, descripcion);
            res.status(201).json({
                data: nuevoTema,
                message: 'Tema añadido correctamente'
            });
        }catch (err) {
            console.error('Error al añadir tema:', err);
            res.status(500).json({
                message: 'Error al añadir tema'
            });
        }
    });
    router.get('/mazos/',async function (req, res){
        try{
            const idTema = parseInt(req.query.idTema);
            const mazos = await mazosService.findAllMazos(idTema);
            res.status(200).json(
                {
                    data: mazos,
                    message: 'Mazos obtenidos correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.post('/mazos/', async function (req, res){
        try{
            const { idTema, titulo, descripcion } = req.body;
            const nuevoMazo= await mazosService.addMazo(parseInt(idTema), titulo, descripcion);
            res.status(201).json({
                data: nuevoMazo,
                message: 'Mazo añadido correctamente'
            });
        }catch (err) {
            console.error('Error al añadir mazo:', err);
            res.status(500).json({
                message: 'Error al añadir mazo'
            });
        }
    });
    router.get('/flashcards/', async function (req, res){
        const idMazo = parseInt(req.query.idMazo);
        try{
            const flashCards = await flashCardsService.findAllFlashCards(idMazo);
            res.status(200).json(
                {
                    data: flashCards,
                    message: 'FlashCards obtenidas correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.post('/flashcards', async function (req, res){
        try{
            const {idMazo, textoFrontal, textoTrasero}= req.body;
            const nuevoFlashCard = await flashCardsService.addFlashCard(parseInt(idMazo), textoFrontal, textoTrasero);
            res.status(201).json({
                data: nuevoFlashCard,
                message: 'FlashCard añadida correctamente'
            });
        }catch(err){
            console.error('Error al añadir la flashcard:', err);
        }
    })
    router.delete('/temas/',async function (req, res){
        try{
            const idTema = parseInt(req.query.idTema);
            const temaEliminado = await temasService.deleteTemaId(idTema);
            res.status(200).json(
                {
                    data: temaEliminado,
                    message: 'Tema eliminado correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.delete('/mazos/',async function (req, res){
        try{
            const idMazo = parseInt(req.query.idMazo);
            const mazoEliminado = await mazosService.deleteMazoId(idMazo);
            res.status(200).json(
                {
                    data: mazoEliminado,
                    message: 'Tema eliminado correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.delete('/flashcards/',async function (req, res){
        try{
            const idFlashCard = parseInt(req.query.idFlashCard);
            const flashCardEliminado = await flashCardsService.deleteFlashCardId(idFlashCard);
            res.status(200).json(
                {
                    data: flashCardEliminado,
                    message: 'flashCard eliminado correctamente'
                }
            )
        }catch(err){
            console.log('Error: ${err}');
        }
    });
    router.put('/temas/', async function (req, res){
        try{
            const { id, titulo, descripcion } = req.body;
            const modificadoTema = await temasService.modTema(id,titulo, descripcion);
            res.status(201).json({
                data: modificadoTema,
                message: 'Tema modificado correctamente'
            });
        }catch (err) {
            console.error('Error al modificar tema:', err);
            res.status(500).json({
                message: 'Error al modificar tema'
            });
        }
    });
    router.put('/mazos/', async function (req, res){
        try{
            const { id, titulo, descripcion } = req.body;
            const idTema = await mazosService.modMazo(id,titulo, descripcion);
            res.status(201).json({
                data: idTema,
                message: 'Mazi modificado correctamente'
            });
        }catch (err) {
            console.error('Error al modificar mazo:', err);
            res.status(500).json({
                message: 'Error al modificar mazo'
            });
        }
    });
    router.put('/flashcards/', async function (req, res){
        try{
            const { id, textoFrontal, textoTrasero } = req.body;
            const flashcardmod = await flashCardsService.modFlashCard(id,textoFrontal, textoTrasero);
            res.status(201).json({
                data: flashcardmod,
                message: 'FlashCard modificado correctamente'
            });
        }catch (err) {
            console.error('Error al modificar flashcard:', err);
            res.status(500).json({
                message: 'Error al modificar flashcard'
            });
        }
    });
}

module.exports = API;
