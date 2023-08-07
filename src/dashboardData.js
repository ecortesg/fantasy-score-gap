export function dashboardData(
  stats,
  settingsLeague1,
  settingsLeague2,
  positionsLeague1,
  positionsLeague2
) {
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

  function getTopPlayers(rankings, positions1, positions2) {
    const num_players = Math.max(
      Math.max(...Object.values(positions1)),
      Math.max(...Object.values(positions2))
    );

    const fpts_rank = [];
    for (let i = 1; i <= num_players; i++) {
      const top = {};
      rankings.forEach((elem) => {
        if (elem.position_rank1 === i && positions1[elem.position] >= i) {
          top[`${elem.position}-L1`] = elem.fpts1;
        }

        if (elem.position_rank2 === i && positions2[elem.position] >= i) {
          top[`${elem.position}-L2`] = elem.fpts2;
        }
      });

      fpts_rank.push({ rank: i, ...top });
    }
    return fpts_rank;
  }

  function getAvgPointsPosition(rankings, positions1, positions2) {
    let fpts_avg = [];

    for (const position in positions1) {
      const positionRank1 = positions1[position];
      const positionRank2 = positions2[position];

      const combinedScores = rankings.reduce(
        (acc, obj) => {
          if (obj.position === position) {
            if (obj.position_rank1 <= positionRank1) {
              acc.avg1Sum += obj.fpts_per_game1;
              acc.avg1Count += 1;
            }

            if (obj.position_rank2 <= positionRank2) {
              acc.avg2Sum += obj.fpts_per_game2;
              acc.avg2Count += 1;
            }
          }
          return acc;
        },
        {
          avg1Sum: 0,
          avg1Count: 0,
          avg2Sum: 0,
          avg2Count: 0,
        }
      );

      const avg1 = Number(
        (combinedScores.avg1Sum / combinedScores.avg1Count).toFixed(1)
      );

      const avg2 = Number(
        (combinedScores.avg2Sum / combinedScores.avg2Count).toFixed(1)
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

  const fpts_rank = getTopPlayers(fpts, positionsLeague1, positionsLeague2);

  const fpts_avg = getAvgPointsPosition(
    fpts,
    positionsLeague1,
    positionsLeague2
  );

  return {
    fpts,
    fpts_rank,
    fpts_avg,
  };
}
