import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError(`please provide all values`);
  }

  const userAlreadyExists = await User.findOne({ username });

  if (userAlreadyExists) {
    throw new BadRequestError("username already in use");
  }

  const user = await User.create({ username, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
    },
    token,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const updateUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw new BadRequestError("Please provide the username");
  }

  const user = await User.findOne({ _id: req.user.userID });

  user.username = username;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

export { register, login, updateUser };
