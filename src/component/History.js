import React from "react";
import { FULL, EMPTY, BOARD } from './Parameters'

export function getHistoryLayout(boardHistory, winnerHistory) {

  var layout = []

  boardHistory.forEach((e, i) => {
    var styleDiv, styleTable = ''
    switch (winnerHistory[i]) {
      case 'Yellow':
        styleDiv = 'yellowColor'
        styleTable = 'yellowBorder'
        break;
      case 'Red':
        styleDiv = 'redColor'
        styleTable = 'redBorder'
        break;
      default:
        styleDiv = 'drawColor'
        styleTable = 'drawBorder'
        break;
    }
    layout.push(
      <div className='lineup'>
        <div className={styleDiv}>{winnerHistory[i] === '' ? 'Draw' : winnerHistory[i]}</div>
        <table className={styleTable + ' gameHistory'}>
          <tbody>
            {BOARD.map(row =>
              <tr>
                {row.map(j =>
                  <td className={e[j] + ' gameHistory'}>
                    {e[j] === '' ? EMPTY : FULL}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  })

  return layout
}