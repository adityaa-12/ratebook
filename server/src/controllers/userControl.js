import users from "../models/userModel.js";

export const createAccount = async (req, res) => {
  try {
    
    if (!req.body) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let userBody = req.body;

    let email = req.body.email;

    let isExistEmail = await users.findOne({
        email: email,
    });

    if (isExistEmail) {
        return res.status(400).json({
            message: "Email already exist!"
        });
    }

    let userCreate = await users.create(userBody);

    if (!userCreate) {
      return res.status(400).json({
        message: "Failed to create account!",
      });
    }

    return res.status(200).json({
      message: "Account Created!",
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
