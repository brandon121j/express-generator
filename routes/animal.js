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

router.post('/', function(req, res) {
    let answer = null;

    animals.forEach(item => {
        if (item.animalType === req.params.animal) {
            res.send('Error, animal already present in array');
            res.status(409);
            res.end();
        } else {answer = req.body}
    })
    animals.push(answer);
    res.json({ animals });
});

router.delete("/delete-by-id/:id", function(req, res) {
    let answer = null;

    animals.forEach((item, index )=> {
        if (item.id === +req.params.id) {
            answer = item;
            animals.splice(index, 1);
        }
    })
    if (!answer) {
        res.send("Animal not found");
    } else {
        animals.splice(answer, 1);
        res.json({ animals, message: `Successfully deleted: ${answer.animalType}`})
    }
});

router.put("/:id", function(req, res) {
    let foundAnimal = null;

    animals.forEach((item) => {
        if (item.id === +req.params.id) {
            foundAnimal = item
        }
    })
    if (!foundAnimal) {
        res.status(409);
        res.send('Not Found');
    } else {
        foundAnimal.animalType = req.body.newName;
        res.json({ animals });
    }
});

router.post("/create-new-animal", function(req, res) {
    const { id, animalType } = req.body;

    let duplicateAnimal = false;

    animals.forEach(function(item) {
        if (item.animalType === animalType) {
            duplicateAnimal = true;
        }
    })

    if (duplicateAnimal) {
        res.status(409).json({
            message: "Animal already exists"
        })
    } else {
        animal.push({ id, animalType });
        res.json({ message: "animal created", animal: { id, animalType } })
    }
    res.json(req.body);
})

module.exports = router;

