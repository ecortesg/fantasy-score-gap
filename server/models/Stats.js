import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  stats: {},
  player: {}
});

export default mongoose.model("Statistics", statsSchema);
