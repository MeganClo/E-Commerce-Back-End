const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {const categoryData = await Category.findAll({
  // be sure to include its associated Products  
    include: [
      {
        model: Product
      }
    ]
  })
 res.json(categoryData)}
  catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {const categoryData = await Category.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Products
    include: [
      {
        model: Product
      }
    ]
  })
    if (!categoryData) {
      res.status(404).json({ message: "No category found by this id" });
      return;
     }
      res.json(categoryData);
    }
  catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
