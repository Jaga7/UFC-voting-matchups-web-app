import Fighter from "../models/Fighter.js";
import { StatusCodes } from "http-status-codes";
// import checkPermissions from "../utils/checkPermissions.js";

const getAllFighters = async (req, res) => {
  const { search, weightclass, sort } = req.query;

  const queryObject = {};

  if (weightclass && weightclass !== "all") {
    queryObject.weightclass = weightclass;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = Fighter.find(queryObject);

  //   if (sort === "highest ranked") {
  //     result = result.sort("-rank");
  //   }
  //   if (sort === "lowest ranked") {
  //     result = result.sort("rank");
  //   }
  if (sort === "a-z") {
    result = result.sort("fullname");
  }
  if (sort === "z-a") {
    result = result.sort("-fullname");
  }

  const fighters = await result;

  const totalFighters = await Fighter.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFighters / req.query._limit);

  res.status(StatusCodes.OK).json({ fighters, totalFighters, numOfPages });
};

export { getAllFighters };
