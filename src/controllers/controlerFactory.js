
//Create new doc
exports.createOne = (Model) => async (req, resp) => {
  const doc = new Model(req.body);
  try {
    await doc.save();
    resp.status(201).send(doc);
  } catch (e) {
    resp.status(500).send(e);
    console.log(e);
  }
};

//Get all
exports.getAll = (Model) => async (req, resp) => {
  try {
    const docs = await Model.find({});
    resp.send(docs);
  } catch (e) {
    resp.status(500).send(e);
    console.log(e);
  }
};

//Delete by id
exports.deleteOneByID = (Model) => async (req, resp) => {
  try {
    const doc = await Model.deleteOne({ _id: req.params.id });

    if (!doc) {
      throw new Error("No document found with that ID");
    }

    resp.status(204).send();
  } catch (e) {
    resp.status(500).send(e);
    console.log(e);
  }
};

//Update by id
exports.updateOneID = (Model) => async (req, resp) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

    if (!doc) {
      throw new Error("No document found with that ID");
    }

    resp.send(doc);
  } catch (e) {
    resp.status(500).send(e);
    console.log(e);
  }
};
