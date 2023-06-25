export function dashboardData(stats, settingsLeague1, settingsLeague2) {
  function getPositionalRank(sortedData, league) {
    let pos_counter = {};
    const fpts_rank = sortedData.map((elem, index) => {
      let position_rank = pos_counter[elem.position] + 1 || 1;
      pos_counter = { ...pos_counter, [elem.position]: position_rank };
      return {
        ...elem,
        [`position_rank${league}`]: position_rank,
        [`rank${league}`]: index + 1,
      };
    });
    return fpts_rank;
  }

  function getTopPlayers(rankings, num_players, starters) {
    const fpts_rank = [];
    for (let i = 1; i <= num_players; i++) {
      let top_num1 = rankings.filter((elem) => elem.position_rank1 === i);
      let top_num2 = rankings.filter((elem) => elem.position_rank2 === i);

      const top1 = {};
      top_num1.forEach((elem) => {
        if (starters[elem.position] >= i) {
          top1[`${elem.position}-L1`] = elem.fpts1;
        }
      });

      const top2 = {};
      top_num2.forEach((elem) => {
        if (starters[elem.position] >= i) {
          top2[`${elem.position}-L2`] = elem.fpts2;
        }
      });

      fpts_rank.push({ rank: i, ...top1, ...top2 });
    }
    return fpts_rank;
  }

  function getAvgPointsPosition(rankings, numPlayersPosition) {
    let fpts_avg = [];
    for (const position in numPlayersPosition) {
      const scores1 = rankings
        .filter(
          (obj) =>
            obj.position_rank1 <= numPlayersPosition[position] &&
            obj.position === position
        )
        .map((obj) => obj.fpts_per_game1);

      const avg1 = Number(
        (scores1.reduce((a, b) => a + b, 0) / scores1.length).toFixed(1)
      );

      const scores2 = rankings
        .filter(
          (obj) =>
            obj.position_rank2 <= numPlayersPosition[position] &&
            obj.position === position
        )
        .map((obj) => obj.fpts_per_game2);

      const avg2 = Number(
        (scores2.reduce((a, b) => a + b, 0) / scores2.length).toFixed(1)
      );

      fpts_avg.push({
        position,
        avg1,
        avg2,
      });
    }
    return fpts_avg;
  }

  let fpts = stats.map((elem) => {
    let fpts1 = 0;
    let fpts2 = 0;
    for (const key in elem.stats) {
      if (key in settingsLeague1) {
        fpts1 += Number(elem.stats[key]) * settingsLeague1[key];
        fpts2 += Number(elem.stats[key]) * settingsLeague2[key];
      }
    }
    fpts1 = Number(fpts1.toFixed(1));
    fpts2 = Number(fpts2.toFixed(1));
    const fpts_per_game1 = Number((fpts1 / elem.stats.gp).toFixed(1));
    const fpts_per_game2 = Number((fpts2 / elem.stats.gp).toFixed(1));

    return { ...elem, fpts1, fpts2, fpts_per_game1, fpts_per_game2 };
  });

  fpts.sort((a, b) => b.fpts1 - a.fpts1);
  fpts = getPositionalRank(fpts, 1);
  fpts.sort((a, b) => b.fpts2 - a.fpts2);
  fpts = getPositionalRank(fpts, 2);

  const starters = {
    QB: 16,
    RB: 36,
    TE: 16,
    K: 16,
    DEF: 16,
    WR: 36,
  };

  const fpts_rank = getTopPlayers(fpts, 36, starters);

  const fpts_avg = getAvgPointsPosition(fpts, starters);

  return {
    fpts,
    fpts_rank,
    fpts_avg,
  };
}
