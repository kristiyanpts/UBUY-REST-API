const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const URL_PATTERN = /^https?:\/\/.+$/i;
const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const LATIN_LETTERS_PATTERN = /[a-zA-Z0-9]+/g;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [2, "First Name should be at least 2 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, "Last Name should be at least 2 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return EMAIL_PATTERN.test(v);
        },
        message: (props) => `Email format is invalid!`,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Username should be at least 5 characters"],
      validate: {
        validator: function (v) {
          return LATIN_LETTERS_PATTERN.test(v);
        },
        message: (props) =>
          `${props.value} must contains only latin letters and digits!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [5, "Password should be at least 5 characters"],
      validate: {
        validator: function (v) {
          return LATIN_LETTERS_PATTERN.test(v);
        },
        message: (props) =>
          `${props.value} must contains only latin letters and digits!`,
      },
    },
    pfpUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return URL_PATTERN.test(value);
        },
        message: "Image URL is invalid",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["buyer", "seller", "both"],
        message: "Role is invalid!",
      },
      required: true,
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
