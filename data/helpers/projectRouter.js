const express = require("express");
const projRouter = require("./projectModel");
const router = express.Router();



router.post("/", (req, res) => {
  const { name, description, completed } = req.body;
  !name || !description
    ? res
        .status(400)
        .json({
          success: false,
          errorMessage: "Please provide name and description for the project."
        })
    : console.log("name", name);
  projRouter.insert({ name, description, completed})
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage:
          "There was an error while saving the post to the database",
        error
      });
    });
});


//GET /api/ Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
  projRouter.get(req.query.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        errorMessage: "The posts information could not be retrieved.",
        err
      });
    });
});



//GET /api/project/:id/actions	
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  !id
    ? res
        .status(404)
        .json({
          success: false,
          errorMessage: "The post with the specified ID does not exist."
        })
    : projRouter.getProjectActions(id)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            errorMessage: "The comments information could not be retrieved.",
            err
          });
        });
});

//DELETE /api/project/:id	
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projRouter.get(id)
    .then(data => {
      data
        ? projRouter.remove(id)
            .then(i => {
              if (i) {
                res.status(200).json({
                  url: `/${id}`,
                  operation: `Delete post with id ${id}`
                });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "The post could not be removed"
              });
            })
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//PUT /api/project/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;

  projRouter.update(id, req.body)
    .then(info => {
      res.status(200).json({ success: "Updated Info", info: req.body });
    })
    .catch(err => {
      res.status(500).json({
        error: "Info could not be updated"
      });
    });
});

module.exports = router;