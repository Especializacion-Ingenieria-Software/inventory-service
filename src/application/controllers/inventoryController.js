function isThereIngredientsAvailable(req, res) {
    if(!req.body || !req.body.name || !req.body.description || !req.body.ingredients) {
        return res.status(400).send({
            message: 'Su solicitud no es valida',
            error: true
        });
    }
}

module.exports = { isThereIngredientsAvailable };