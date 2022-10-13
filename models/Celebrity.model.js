const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 21,
      required: true,
    },
    occupation: { type: String, maxLength: 21 },
    catchPhrase: { type: String, maxLength: 42 },
  },
  { timestamps: true }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
