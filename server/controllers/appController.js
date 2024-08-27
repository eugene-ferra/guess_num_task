import User from "../models/userModel.js";

export const startGame = async (req, res, next) => {
  try {
    const { minNumber, maxNumber } = req.body;
    const userData = req.user;

    const randomIntNumber =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    await User.findOneAndUpdate(
      { telegramId: userData.id },
      { currentGameNumber: randomIntNumber },
      { new: true }
    );

    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const guess = async (req, res, next) => {
  try {
    const { number } = req.body;
    const userData = req.user;

    const userFromDb = await User.findOne({ telegramId: userData.id });

    if (!number)
      return res.status(400).json({ message: "Invalid number. Try anouther one!" });

    if (+userFromDb.currentGameNumber === +number) {
      await User.findOneAndUpdate(
        { telegramId: userData.id },
        { currentGameNumber: null }
      );
      return res
        .status(200)
        .json({ message: "You guessed the number!", isGuessed: true });
    }

    if (userFromDb.currentGameNumber < number)
      return res
        .status(200)
        .json({ message: "The number is smaller!", isGuessed: false });

    if (userFromDb.currentGameNumber > number)
      return res
        .status(200)
        .json({ message: "The number is bigger!", isGuessed: false });

    res.status(400).json({ message: "Invalid number. Try anouther one!" });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const userData = req.user;

    const userFromDb = await User.findOne({ telegramId: userData.id });

    if (!userFromDb) await User.create({ telegramId: userData.id });

    res.status(200).json({ data: userData });
  } catch (error) {
    next(error);
  }
};
