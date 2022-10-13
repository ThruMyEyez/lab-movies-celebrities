const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
      unique: true,
    },
    genre: String, //min max length

    plot: String,
    cast: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Celebrity",
      },
    ],
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
