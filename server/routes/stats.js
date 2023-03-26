import { Router } from "express";
import Statistics from "../models/Stats.js";

const router = Router();

router.get("/:sport/:season", async (req, res) => {
  try {
    const stats = await Statistics.aggregate([
      {
        $match: {
          sport: req.params.sport,
          season: req.params.season,
          "stats.gp": { $ne: null }, //Games played
        },
      },
      {
        $project: {
          _id: false,
          player_id: true,
          player_name: {
            $concat: ["$player.first_name", " ", "$player.last_name"],
          },
          stats: true,
          position: { $last: "$player.fantasy_positions" }, //Last element in positions array
        },
      },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
