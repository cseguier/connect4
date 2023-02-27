import React from "react";
import getNewBoard from './GetNewBoard.js'
import { FULL, EMPTY, BUTTONS, BOARD } from './Parameters'
import { getHistoryLayout } from './History'
import { downloadPdf } from './DownloadPdf'
import { PDFDownloadLink } from '@react-pdf/renderer'


export default class Connect4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWin: false,
      winner: '',
      player: true,
      board: Array(42).fill(''),
      boardHistory: [],
      winnerHistory: [],
    };
    this.addNewToken = this.addNewToken.bind(this);
  }

  resetBoard() {
    this.setState({
      isWin: false,
      winner: '',
      player: (this.state.winner !== '' ? !(this.state.winner) : true),
      board: Array(42).fill(''),
    });
  }


  addNewToken(e) {
    const getStatus = getNewBoard(e, this.state.player, this.state.board)

    if (getStatus.isWin) {
      this.setState({
        isWin: getStatus.isWin,
        winner: this.state.player,
        boardHistory: [getStatus.newBoard, ...this.state.boardHistory],
        winnerHistory: [this.state.player, ...this.state.winnerHistory],
      })
    }

    this.setState({
      board: getStatus.newBoard,
      player: (JSON.stringify(getStatus.newBoard) === JSON.stringify(this.state.board)) ? this.state.player : !this.state.player
    });
  }

  render() {

    const renderBoard =
      BOARD.map(row =>
        <tr>
          {row.map(j =>
            <td className={this.state.board[j]}>
              {this.state.board[j] === '' ? EMPTY : FULL}
            </td>
          )}
        </tr>
      )

    const historyLayout = getHistoryLayout(this.state.boardHistory, this.state.winnerHistory)

    const renderButtons =
      <table className="tokenB">
        <tbody>
          <tr>
            {BUTTONS.map(id =>
              <td>
                <button className='arrows' onClick={() => this.addNewToken(id)}>
                  ⬇
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>

    const victoryBanner =
      <div className="victoryBanner">
        <span className={this.state.winner ? 'yPlayer' : 'rPlayer'}>
          {this.state.winner ? 'Yellow' : 'Red'}
        </span> Victory
      </div>


    const displayLine = (this.state.isWin ? victoryBanner : renderButtons)

    return (
      <div>

        <button className="topMenu"
          onClick={() => this.resetBoard()}>New Game</button>



        <PDFDownloadLink document={downloadPdf(this.state.boardHistory, this.state.winnerHistory)} fileName="somename.pdf">
          {({ blob, url, loading, error }) => <button className="topMenu">Download</button>}
        </PDFDownloadLink>

        {/* <button className="topMenu"
          onClick={() => downloadPdf(this.state.boardHistory, this.state.winnerHistory)}>Download</button>

        <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink> */}



        {/* <button className="topMenu" onClick={() => this.resetHistory()}>Reset</button> */}

        <p className="playing"> Playing <span className={this.state.player ? 'yPlayer' : 'rPlayer'}>{FULL}</span></p>


        <div>

          <div className="rowContainer">{displayLine}</div>

          <table className="gameGridBoard">
            <tbody>

              {renderBoard}

            </tbody>
          </table>
        </div>
        {historyLayout}

      </div >
    );
  }
}