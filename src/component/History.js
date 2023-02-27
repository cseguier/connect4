import React from "react";
import { FULL, EMPTY, BOARD } from './Parameters'

export function getHistoryLayout(boardHistory, winnerHistory) {

	var layout = []

	boardHistory.forEach((e, i) => {
		layout.push(
			<div className='lineup'>
				<div className={winnerHistory[i] ? 'yPlayer' : 'rPlayer'}>{winnerHistory[i] ? 'Yellow' : 'Red'}</div>
				<table className={(winnerHistory[i] ? 'yellow' : 'red') + ' gameHistory'}>
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