const InventoryService = require('../services/inventory-service');


class InventoryController {

    async getIventory(req, res) {
        try {
            const userId = req.query.userId;
            const inventoryService = new InventoryService();
            const inventory = await inventoryService.getUserInventory(userId);

            return res.status(200).send(inventory);
        } catch(error) {
            return res.status(400).send({error: error.message});
        }
    }

    async addPokemonToUserInventory(req, res) {
        try {
            const { userId, pokemonId} = req.body;
            const inventoryService = new InventoryService();
            const inventory = await inventoryService.addPokemonToUserInventory(userId, pokemonId);

            return res.status(200).send(inventory);
        } catch(error) {
            return res.status(400).send({error: error.message});
        }
    }
}

module.exports = new InventoryController();