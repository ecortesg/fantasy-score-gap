export function dashboardData(
  stats,
  settingsLeague1,
  settingsLeague2,
  positions
) {
  function getPositionalRank(sortedData, league) {
    let posCounter = {}
    const fptsRank = sortedData.map((elem, index) => {
      let positionRank = posCounter[elem.position] + 1 || 1
      posCounter = { ...posCounter, [elem.position]: positionRank }
      return {
        ...elem,
        [`positionRank${league}`]: positionRank,
        [`rank${league}`]: index + 1,
      }
    })
    return fptsRank
  }

  function getTopPlayers(rankings, positions) {
    const minRank = Math.min(
      ...Object.values(positions)
        .filter((pos) => pos.start > 0 && pos.start <= pos.end)
        .map((pos) => pos.start)
    )
    const maxRank = Math.max(
      ...Object.values(positions)
        .filter((pos) => pos.start > 0 && pos.start <= pos.end)
        .map((pos) => pos.end)
    )

    const fptsRank = []
    for (let i = minRank; i <= maxRank; i++) {
      const top = {}
      rankings.forEach((elem) => {
        if (
          elem.positionRank1 === i &&
          positions[elem.position].start <= i &&
          positions[elem.position].end >= i
        ) {
          top[`${elem.position}-L1`] = elem.fpts1
          top[
            `${elem.position}-L1-NAME`
          ] = `${elem.first_name} ${elem.last_name}`
        }

        if (
          elem.positionRank2 === i &&
          positions[elem.position].start <= i &&
          positions[elem.position].end >= i
        ) {
          top[`${elem.position}-L2`] = elem.fpts2
          top[
            `${elem.position}-L2-NAME`
          ] = `${elem.first_name} ${elem.last_name}`
        }
      })

      fptsRank.push({ rank: i, ...top })
    }
    return fptsRank
  }

  function getAvgPointsPosition(rankings, positions) {
    let fptsAvg = []

    for (const position in positions) {
      const positionStart = positions[position].start
      const positionEnd = positions[position].end

      if (positionEnd > 0 && positionStart > 0) {
        const combinedScores = rankings.reduce(
          (acc, obj) => {
            if (obj.position === position) {
              if (
                obj.positionRank1 <= positionEnd &&
                obj.positionRank1 >= positionStart
              ) {
                acc.avg1Sum += obj.fptsPerGame1
                acc.avg1Count += 1
              }

              if (
                obj.positionRank2 <= positionEnd &&
                obj.positionRank2 >= positionStart
              ) {
                acc.avg2Sum += obj.fptsPerGame2
                acc.avg2Count += 1
              }
            }
            return acc
          },
          {
            avg1Sum: 0,
            avg1Count: 0,
            avg2Sum: 0,
            avg2Count: 0,
          }
        )

        const avg1 = Number(
          (combinedScores.avg1Sum / combinedScores.avg1Count || 0).toFixed(2)
        ) // 0 divided by 0 returns NaN

        const avg2 = Number(
          (combinedScores.avg2Sum / combinedScores.avg2Count || 0).toFixed(2)
        )

        const diff = Number((avg2 - avg1).toFixed(2))

        const diffPct = Number(((diff / avg1) * 100).toFixed(2))

        fptsAvg.push({
          position,
          avg1,
          avg2,
          diff,
          diffPct,
        })
      }
    }

    return fptsAvg
  }

  let fpts = stats.map((elem) => {
    let fpts1 = 0
    let fpts2 = 0
    for (const key in elem.stats) {
      if (key in settingsLeague1) {
        fpts1 += Number(elem.stats[key]) * settingsLeague1[key]
        fpts2 += Number(elem.stats[key]) * settingsLeague2[key]
      }
    }
    fpts1 = Number(fpts1.toFixed(2))
    fpts2 = Number(fpts2.toFixed(2))
    const fptsPerGame1 = Number((fpts1 / elem.stats.gp).toFixed(2))
    const fptsPerGame2 = Number((fpts2 / elem.stats.gp).toFixed(2))

    return { ...elem, fpts1, fpts2, fptsPerGame1, fptsPerGame2 }
  })

  fpts = fpts.filter(
    (elem) =>
      positions[elem.position].start > 0 &&
      positions[elem.position].start <= positions[elem.position].end
  )

  fpts.sort((a, b) => b.fpts1 - a.fpts1)
  fpts = getPositionalRank(fpts, 1)
  fpts.sort((a, b) => b.fpts2 - a.fpts2)
  fpts = getPositionalRank(fpts, 2)

  const fptsRank = getTopPlayers(fpts, positions)

  const fptsAvg = getAvgPointsPosition(fpts, positions)

  return {
    fpts,
    fptsRank,
    fptsAvg,
  }
}
