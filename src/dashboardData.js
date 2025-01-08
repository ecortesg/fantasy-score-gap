export function dashboardData(
  stats,
  settingsLeague1,
  settingsLeague2,
  positions
) {
  function getPositionalRank(sortedData, league) {
    const posCounter = {}
    return sortedData.map((elem, index) => {
      const positionRank = (posCounter[elem.position] || 0) + 1
      posCounter[elem.position] = positionRank
      return {
        ...elem,
        [`positionRank${league}`]: positionRank,
        [`rank${league}`]: index + 1,
      }
    })
  }

  function getTopPlayers(rankings, positions) {
    const validPositions = Object.entries(positions).filter(
      ([, pos]) => pos.start > 0 && pos.start <= pos.end
    )
    const minRank = Math.min(...validPositions.map(([, pos]) => pos.start))
    const maxRank = Math.max(...validPositions.map(([, pos]) => pos.end))

    const fptsRank = []
    for (let i = minRank; i <= maxRank; i++) {
      const top = {}
      for (const elem of rankings) {
        const posSettings = positions[elem.position]
        if (!posSettings || i < posSettings.start || i > posSettings.end)
          continue

        if (elem.positionRank1 === i) {
          top[`${elem.position}-L1`] = elem.fpts1
          top[
            `${elem.position}-L1-NAME`
          ] = `${elem.first_name} ${elem.last_name}`
        }
        if (elem.positionRank2 === i) {
          top[`${elem.position}-L2`] = elem.fpts2
          top[
            `${elem.position}-L2-NAME`
          ] = `${elem.first_name} ${elem.last_name}`
        }
      }
      fptsRank.push({ rank: i, ...top })
    }
    return fptsRank
  }

  function getAvgPointsPosition(rankings, positions) {
    return Object.entries(positions)
      .filter(([, pos]) => pos.start > 0 && pos.start <= pos.end)
      .map(([position, posSettings]) => {
        const { start, end } = posSettings
        const { avg1Sum, avg1Count, avg2Sum, avg2Count } = rankings.reduce(
          (acc, obj) => {
            if (obj.position === position) {
              if (obj.positionRank1 >= start && obj.positionRank1 <= end) {
                acc.avg1Sum += obj.fptsPerGame1
                acc.avg1Count += 1
              }
              if (obj.positionRank2 >= start && obj.positionRank2 <= end) {
                acc.avg2Sum += obj.fptsPerGame2
                acc.avg2Count += 1
              }
            }
            return acc
          },
          { avg1Sum: 0, avg1Count: 0, avg2Sum: 0, avg2Count: 0 }
        )

        const avg1 = avg1Count ? Number((avg1Sum / avg1Count).toFixed(2)) : 0
        const avg2 = avg2Count ? Number((avg2Sum / avg2Count).toFixed(2)) : 0
        const diff = Number((avg2 - avg1).toFixed(2))
        const diffPct = avg1 ? Number(((diff / avg1) * 100).toFixed(2)) : 0

        return { position, avg1, avg2, diff, diffPct }
      })
  }

  // Main logic
  const fpts = stats
    .map((elem) => {
      let fpts1 = 0,
        fpts2 = 0
      for (const key in elem.stats) {
        if (settingsLeague1[key]) {
          const value = Number(elem.stats[key])
          fpts1 += value * settingsLeague1[key]
          fpts2 += value * settingsLeague2[key]
        }
      }
      const gp = elem.stats.gp || 1 // Avoid division by zero
      return {
        ...elem,
        fpts1: Number(fpts1.toFixed(2)),
        fpts2: Number(fpts2.toFixed(2)),
        fptsPerGame1: Number((fpts1 / gp).toFixed(2)),
        fptsPerGame2: Number((fpts2 / gp).toFixed(2)),
      }
    })
    .filter(
      (elem) =>
        positions[elem.position] &&
        positions[elem.position].start > 0 &&
        positions[elem.position].start <= positions[elem.position].end
    )

  fpts.sort((a, b) => b.fpts1 - a.fpts1)
  const rankedFpts1 = getPositionalRank(fpts, 1)

  rankedFpts1.sort((a, b) => b.fpts2 - a.fpts2)
  const rankedFpts2 = getPositionalRank(rankedFpts1, 2)

  return {
    fpts: rankedFpts2,
    fptsRank: getTopPlayers(rankedFpts2, positions),
    fptsAvg: getAvgPointsPosition(rankedFpts2, positions),
  }
}
