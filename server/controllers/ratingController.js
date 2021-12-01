const uuid = require('uuid');
const path = require('path');
const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res, next) {
    try {
      let { userId, deviceId, rate } = req.body;
      const rating = await Rating.create({ userId, deviceId, rate });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const rating = await Rating.findAll({});
    return res.json(rating);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const rating = await Rating.findAll({
      where: { deviceId: id },
    });
    return res.json(rating);
  }
}

module.exports = new RatingController();
