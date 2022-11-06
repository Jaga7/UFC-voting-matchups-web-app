import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { options } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  if (user.id !== req.user.userID) {
    throw new UnauthorizedError("Not authorized to access this route");
  }

  const foundUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (foundUser) {
    res.status(StatusCodes.OK);
  }
};

export { updateUser };
