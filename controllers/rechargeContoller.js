let rechargeData = [];

/* CREATE RECHARGE */

const createRecharge = (req, res) => {

  const newRecharge = {
    id: Date.now(),
    ...req.body
  };

  rechargeData.push(newRecharge);

  res.status(201).json({
    message: "Recharge Added",
    data: newRecharge
  });
};

/* GET ALL RECHARGES */

const getRecharges = (req, res) => {

  res.status(200).json(rechargeData);
};

/* UPDATE RECHARGE */

const updateRecharge = (req, res) => {

  const id = parseInt(req.params.id);

  const recharge = rechargeData.find(
    item => item.id === id
  );

  if (!recharge) {

    return res.status(404).json({
      message: "Recharge Not Found"
    });
  }

  Object.assign(recharge, req.body);

  res.status(200).json({
    message: "Recharge Updated",
    data: recharge
  });
};

/* DELETE RECHARGE */

const deleteRecharge = (req, res) => {

  const id = parseInt(req.params.id);

  rechargeData = rechargeData.filter(
    item => item.id !== id
  );

  res.status(200).json({
    message: "Recharge Deleted"
  });
};

module.exports = {
  createRecharge,
  getRecharges,
  updateRecharge,
  deleteRecharge
};