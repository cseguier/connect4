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
      gameStatus: 'isGoing',
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
      gameStatus: 'isGoing',
      winner: '',
      player: (this.state.winner !== '' ? !(this.state.winner) : true),
      board: Array(42).fill(''),
    });
  }

  resetGame() {
    this.setState({
      gameStatus: 'isGoing',
      winner: '',
      player: true,
      board: Array(42).fill(''),
      boardHistory: [],
      winnerHistory: [],
    });
  }


  addNewToken(e) {
    const gameStatus = getNewBoard(e, this.state.player, this.state.board)
    switch (gameStatus.gameState) {
      case 'isWin':
        this.setState({
          gameStatus: 'isWin',
          winner: (this.state.player ? 'Yellow' : 'Red'),
          boardHistory: [gameStatus.newBoard, ...this.state.boardHistory],
          winnerHistory: [(this.state.player ? 'Yellow' : 'Red'), ...this.state.winnerHistory],
        });
        break;
      case 'isDraw':
        this.setState({
          gameStatus: 'isDraw',
          winner: '',
          boardHistory: [gameStatus.newBoard, ...this.state.boardHistory],
          winnerHistory: ['', ...this.state.winnerHistory],
        });
        break;
      default: ;
    }


    this.setState({
      board: gameStatus.newBoard,
      player: (JSON.stringify(gameStatus.newBoard) === JSON.stringify(this.state.board)) ? this.state.player : !this.state.player
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
        <span className={this.state.player ? 'redColor' : 'yellowColor'}>
          {this.state.winner}
        </span>  {this.state.gameStatus === 'isWin' ? 'Victory' : 'Draw'}
        {console.log(this.state.gameStatus)}
      </div>


    const displayLine = (this.state.gameStatus !== 'isGoing' ? victoryBanner : renderButtons)

    return (
      <div>

        <div className="topMenuContainer">
          <div>
            <button className="topMenu" onClick={() => this.resetGame()}>Reset</button>
          </div>
          <div>
            <button className="topMenu" onClick={() => this.resetBoard()}>New Game</button>
          </div>
          <div>
            <PDFDownloadLink document={downloadPdf(this.state.boardHistory, this.state.winnerHistory)} fileName="cseguier_connect4.pdf">
              {({ blob, url, loading, error }) => <button className="topMenu">Download</button>}
            </PDFDownloadLink>
          </div>
        </div>

        <p className="playing"> Playing <span className={this.state.player ? 'yellowColor' : 'redColor'}>{FULL}</span></p>


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