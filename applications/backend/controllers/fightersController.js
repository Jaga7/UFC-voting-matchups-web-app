import Fighter from "../models/Fighter.js";
import { StatusCodes } from "http-status-codes";

const getFighters = async (req, res) => {
  const { search, weightclass, sort, id } = req.query;

  const queryObject = {};

  if (weightclass && weightclass !== "all") {
    queryObject.weightclass = weightclass;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (id) {
    queryObject._id = { $in: id };
  }

  // NO AWAIT
  let result = Fighter.find(queryObject);

  const fighters = await result;

  const totalFighters = await Fighter.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFighters / req.query._limit);

  res.status(StatusCodes.OK).json({ fighters, totalFighters, numOfPages });
};

export { getFighters };
