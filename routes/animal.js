var express = require('express');
var router = express.Router();

let animals = [
    {
        id: 1,
        animalType: "dog"
    },
    {
        id: 2,
        animalType: "cat"
    },
        {
        id: 1,
        animalType: "horse"
    }
]

router.get('/', function(req, res, next) {
    let foundAnimal = null;

    if (Object.keys(req.query).length === 0) {
        res.json({ animals })
    } else {
        animals.forEach(item => {
            if (item.animalType === req.query.animalType.toLowerCase()) {
                foundAnimal = item;
            }
        })

        if (!foundAnimal) {
            return res.status(404).json({ message: "No animal found" })
        } else {
            res.json({message: "success", foundAnimal});
        }
    }
    res.json({ animals })
});

router.get('/get-animal-by-id/:id', function(req, res) {
    
    const { id } = req.params;
    let foundAnimal = null;

    animals.forEach(function(item) {

        if (item.id === +id) {
            foundAnimal = item;
        }
    })
    
    if (!foundAnimal) {
        res
            .status(404)
            .json({ message: "Item not found" })
    } else {
        res.json({ foundAnimal})
    }
});

module.exports = router;

