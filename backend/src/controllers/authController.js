const authService = require("../services/authService");

/**
 * Registers a new user.
 * @async
 * @param {object} req - The request object containing user data in the body.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
  try {
    const userData = req.body;

    const user = await authService.registerUser(userData);

    res.status(201).json({
      message: "User registered successfully",
      userId: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in an existing user.
 * @async
 * @param {object} req - The request object containing user data in the body.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const userData = req.body;

    const { token, userId } = await authService.loginUser(userData);

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * A sample private endpoint handler.
 * @async
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
const someData = async (req, res) => {
  res.send("Hurray, You just accessed a private endpoint");
};

module.exports = { register, login, someData };
