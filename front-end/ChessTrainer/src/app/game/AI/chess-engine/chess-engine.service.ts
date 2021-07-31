import { Injectable } from '@angular/core';

const pawnValue: number = 100;
const knightValue: number = 290;
const bishopValue: number = 320;
const rookValue: number = 480;
const queenValue: number = 900;
const kingValue: number = 10000;

const totalNumberOfPawns = 16;
const totalNumberOfPieces = 32;



@Injectable({
  providedIn: 'root'
})
export class ChessEngineService {

  constructor() { }
  depth: number = 2;
  movesMade = 0;
  currentEvalSum = 0;
  kingCastled = false;
  myKingCastled = false;


  whitePiecesBoardEval = {
    p: [
      [100, 100, 100, 100, 105, 100, 100, 100],
      [80, 85, 85, 70, 105, 80, 85, 90],
      [15, 30, 25, 50, 45, 15, 35, 10],
      [-5, 15, 5, 30, 28, 5, 10, -15],
      [-25, 0, 5, 20, 20, 5, 0, -25],
      [-30, 10, 0, -10, -10, -5, 10, -30],
      [-30, 5, -10, -35, -35, -15, 5, -30],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    n: [
      [-80, -20, -25, -25, -25, -25, -20, -80],
      [-20, -5, 25, 5, 5, 25, -5, -20],
      [15, 65, 10, 75, 75, 30, 55, 10],
      [10, 15, 40, 45, 45, 40, 15, 10],
      [-5, 5, 25, 20, 20, 25, 5, -5],
      [-15, 10, 20, 25, 25, 20, 10, -15],
      [-20, -15, -5, 0, -6, -5, -15, -20],
      [-80, -20, -25, -25, -25, -25, -20, -80]
    ],
    b: [
      [-15, -10, -10, -10, -10, -10, -10, -15],
      [-15, 20, 35, -35, -35, 35, 15, -15],
      [0, 35, -20, 45, 45, -15, 30, 0],
      [10, 20, 15, 30, 30, 15, 20, 10],
      [15, 5, 15, 25, 25, 15, 5, 15],
      [15, 25, 30, 30, 30, 30, 25, 15],
      [15, 30, 10, 5, 5, 10, 30, 15],
      [-15, -10, -10, -10, -10, -10, -10, -15]
    ],
    r: [
      [40, 30, 35, 20, 20, 35, 30, 40],
      [55, 30, 55, 65, 65, 55, 30, 55],
      [20, 35, 25, 35, 35, 25, 35, 20],
      [0, 5, 16, 13, 18, -4, -9, -6],
      [-30, -30, -15, -25, -25, -15, -30, -30],
      [-50, -40, -40, -10, -10, -40, -40, -50],
      [-50, -40, -40, -10, -10, -40, -40, -50],
      [-30, -30, -20, 10, 10, -20, -30, -30]
    ],
    q: [
      [25, 10, -10, -100, 70, 25, 90, 25],
      [15, 30, 60, 10, 10, 75, 60, 25],
      [5, 40, 30, 60, 70, 65, 45, 10],
      [5, -15, 20, 25, 25, 20, -15, -5],
      [-10, -15, 5, 5, 5, 5, -15, -20],
      [-30, -10, 0, 0, 0, 0, -10, -30],
      [-40, -20, 0, -5, -10, -15, -20, -40],
      [-50, -40, -30, -10, -20, -35, -40, -50]
    ],
    k: [
      [-40, -50, -50, -55, -55, -50, -50, -40],
      [-40, -50, -50, -55, -55, -50, -50, -40],
      [-40, -50, -50, -55, -55, -50, -50, -40],
      [-40, -50, -50, -55, -55, -50, -50, -40],
      [-30, -40, -40, -50, -50, -40, -40, -30],
      [-25, -30, -30, -50, -50, -30, -30, -25],
      [-5, 5, -15, -35, -35, -10, 10, 5],
      [20, 30, 40, -20, 0, 0, 50, 20]
    ],
    k_end: [
      [-30, -30, -10, -10, -10, -10, -30, -30],
      [-30, 10, 20, 40, 40, 20, 10, -20],
      [-20, 10, 30, 30, 30, 30, 10, -20],
      [-20, 10, 30, 50, 50, 30, 10, -20],
      [-20, 10, 30, 40, 40, 30, 10, -20],
      [-20, 0, 20, 30, 30, 20, 0, -20],
      [-30, -30, -10, -10, -10, -10, -30, -30],
      [-50, -40, -30, -30, -30, -30, -40, -50]
    ]
  }

  blackPiecesBoardEval = {
    p: this.whitePiecesBoardEval["p"].slice().reverse(),
    n: this.whitePiecesBoardEval["n"].slice().reverse(),
    b: this.whitePiecesBoardEval["b"].slice().reverse(),
    r: this.whitePiecesBoardEval["r"].slice().reverse(),
    q: this.whitePiecesBoardEval["q"].slice().reverse(),
    k: this.whitePiecesBoardEval["k"].slice().reverse(),
    k_end: this.whitePiecesBoardEval["k_end"].slice().reverse()
  }

  public makeAImove(game: any, board: any, player: string, depth: number) {
    if(player == 'w'){
      var aiMove = this.findBestMoveForAI(game, player, depth,true);
    }else{
      var aiMove = this.findBestMoveForAI(game, player, depth,false);
    }
    
    this.movesMade++;
    console.log("MOVES MADE " + this.movesMade);
    game.move(aiMove);
    board.position(game.fen())

    if (game.game_over() ||  game.in_checkmate()) {
      alert('GAME OVER!');
    }
    if((game.in_draw() || game.in_threefold_repetition() || game.in_stalemate() || game.insufficient_material())){
      alert('GAME OVER! YOU HAVE DRAWN!');
    }
  }
  public findBestMoveForAI(game: any, player: string, depth: number,isPlayerMaximising: boolean) {
    var moves = game.moves({ verbose: true });
    console.log(game.board());
    var bestMove;
    if (moves.length === 0) return
    var maxEvaluation = -100000;
    var minEvaluation = 100000;
    var bestMove: any;
    var minimaxForChildOfRoot;
    for (var i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      minimaxForChildOfRoot = this.minimax(depth-1, game, !isPlayerMaximising, -10000, 10000, player, moves[i]);
      game.undo();
      if (player == 'w') {
        if (minimaxForChildOfRoot >= maxEvaluation) {
          maxEvaluation = minimaxForChildOfRoot;
          bestMove = moves[i];
        }
      } else {
        if (minimaxForChildOfRoot <= minEvaluation) {
          minEvaluation = minimaxForChildOfRoot;
          bestMove = moves[i];
        }
      }

      console.log(minimaxForChildOfRoot + " " + moves[i].san);
    }
    if ((bestMove.flags == 'q' || bestMove.flags == 'k') && bestMove.color != player) {
      this.kingCastled = true;
    }

    return bestMove;
  }


  public minimax(depth: number, game: any, isPlayerMaximising: boolean, alpha: number, beta: number, player: string, move: any): any {
    if (depth == 0 || game.game_over()) {
        return -this.evaluateBoard(game, player, move);      
    }
    var moves = game.moves({ verbose: true });
    var maxEvaluation = -10000;
    var minEvaluation = 10000;

    if (isPlayerMaximising) {
      for (var i = 0; i < moves.length; i++) {
        game.move(moves[i]);
        var minimaxEval = this.minimax(depth - 1, game, !isPlayerMaximising, alpha, beta, player, moves[i]);
        maxEvaluation = Math.max(maxEvaluation, minimaxEval);
        game.undo();
        alpha = Math.max(alpha, maxEvaluation);
        if (beta <= alpha) {
            return maxEvaluation;
        }
      }
      return maxEvaluation;
    } else {
      for (var i = 0; i < moves.length; i++) {
        game.move(moves[i]);
        var minimaxEval = this.minimax(depth - 1, game, !isPlayerMaximising, alpha, beta, player, moves[i]);
        minEvaluation = Math.min(minEvaluation, minimaxEval);
        game.undo();
        beta = Math.min(beta, minEvaluation);
            if (beta <= alpha) {
                return minEvaluation;
            }
      }
      return minEvaluation;
    }

  }



  public evaluateBoard(game: any, player: string, move: any) {
    let valueBoard = 0;
    var board = game.board();
    var possibleMoves = game.moves({ verbose: true });
    var count_knights = 0;
    var count_bishops = 0;
    var countPossibleCaptures = 0;
    var countPawnShield = 0;
    var countPiecesShield = 0;

    for (let idx = 0; idx < possibleMoves.length; idx++) {
      if (possibleMoves[idx]["flags"].includes("c") === true) {
        countPossibleCaptures++;
      }
    }
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var piece = board[i][j];
        if (piece != null) {
          if (piece.type == 'n' && piece.color != player) {
            count_knights++;
          }
          if (piece.type == 'b' && piece.color == player) {
            count_bishops++;
          }
          if (piece.type == 'p') {
            if (piece.color == player) {
              if (this.checkPawnsDoubled(piece, board, i, j) == true) {
                valueBoard = valueBoard + 150;
              }
            } else {
              if (this.checkPawnsDoubled(piece, board, i, j) == true) {
                valueBoard = valueBoard - 150;
              }
            }
          }
          if (piece.type == 'k' && piece.color != player) {
            [countPawnShield, countPiecesShield] = this.checkKingSafety(board, i, j, piece);
          }

        }

        valueBoard = valueBoard + this.evaluatePieceValue(board, piece, i, j, player);
      }
    }
    valueBoard = valueBoard + countPossibleCaptures * 20 + countPawnShield * 70 + countPiecesShield * 50;
    if (count_bishops == count_knights || count_bishops > count_knights) {
      valueBoard = valueBoard + 150;
    }
    this.currentEvalSum = valueBoard;
    return valueBoard;
  }


  public evaluatePieceValue(board: any, piece: any, i: number, j: number, player: string) {
    var pieceValue = 0;
    if (piece === null) {
      return 0;
    }

    var numberOfPawnsMissing = totalNumberOfPawns - this.countNrOfPawns(board);
    var numberOfPiecesMissing = totalNumberOfPieces - this.countNrOfPieces(board);

    if (piece.type === 'p') {
      if (this.movesMade == 0) {
        pieceValue = pawnValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["p"][i][j] : this.blackPiecesBoardEval["p"][i][j]) + 100;
      } else if (this.movesMade == 1) {
        pieceValue = pawnValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["p"][i][j] : this.blackPiecesBoardEval["p"][i][j]) - 100;
      } else {

        pieceValue = pawnValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["p"][i][j] : this.blackPiecesBoardEval["p"][i][j]);

      }


    } else if (piece.type === 'n') {
      if (this.movesMade > 0 && this.movesMade <= 2) {
        pieceValue = knightValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["n"][i][j] : this.blackPiecesBoardEval["n"][i][j]) + 100;
      } else {
        pieceValue = knightValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["n"][i][j] : this.blackPiecesBoardEval["n"][i][j]);
      }


      if (numberOfPawnsMissing > 8) {
        pieceValue = pieceValue - numberOfPawnsMissing * 6;
      }

    } else if (piece.type === 'b') {
      if (this.checkFianchettoBishop(board, i, j) === true) {
        pieceValue = pieceValue + 80;
      }
      pieceValue = bishopValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["b"][i][j] : this.blackPiecesBoardEval["b"][i][j]);
      if (numberOfPawnsMissing > 8) {
        pieceValue = pieceValue + numberOfPawnsMissing * 6;
      }

      if (this.checkBishopInFrontOfPawn(board, i, j, piece) == true) {
        pieceValue = pieceValue - 50;
      }

    } else if (piece.type === 'r') {

      pieceValue = rookValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["r"][i][j] : this.blackPiecesBoardEval["r"][i][j]);
      if (numberOfPawnsMissing > 8) {
        var nrLinesAvailableForRook = this.countFreeSquaresInLine(board, i, j);
        pieceValue = pieceValue + numberOfPawnsMissing * 10 + nrLinesAvailableForRook * 12;
      }

    } else if (piece.type === 'q') {
      if (this.movesMade > 0 && this.movesMade < 5) {
        pieceValue = queenValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["q"][i][j] : this.blackPiecesBoardEval["q"][i][j]) - 400;
      } else {
        pieceValue = queenValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["q"][i][j] : this.blackPiecesBoardEval["q"][i][j]);
      }

    } else if (piece.type === 'k') {
      if (numberOfPiecesMissing > 24) {
        pieceValue = kingValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["k_end"][i][j] : this.blackPiecesBoardEval["k_end"][i][j]);
      } else {
        pieceValue = kingValue + ((piece.type === 'w') ? this.whitePiecesBoardEval["k"][i][j] : this.blackPiecesBoardEval["k"][i][j]);

      }

    }

    if (piece.color === 'b') {
      pieceValue = -pieceValue;
    }

    return pieceValue;
  }

  public checkBishopInFrontOfPawn(board: any, i: number, j: number, piece: any) {
    if (i == 2) {
      if (board[i - 1][j] != null) {
        if (board[i - 1][j].type == 'p' && board[i - 1][j].color == piece.color) {
          return true;
        }
      }
    }
    if (i == 5) {
      if (board[i + 1][j] != null) {
        if (board[i + 1][j].type == 'p' && board[i + 1][j].color == piece.color) {
          return true;
        }
      }
    }
    return false;
  }

  public countNrOfPawns(board: any) {
    var count = 0;
    for (var i = 1; i < 7; i++) {
      for (var j = 0; j < 8; j++) {
        if (board[i][j] != null) {
          if (board[i][j].type == 'p') {
            count++;
          }
        }
      }
    }
    return count;
  }

  public countNrOfPieces(board: any) {
    var count = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (board[i][j] != null) {
          count++;
        }
      }
    }
    return count;
  }

  public countFreeSquaresInLine(board: any, i: number, j: number) {
    var nrLinesOnBack = 0;
    var nrLinesInFront = 0;
    var nrLinesOnRight = 0;
    var nrLinesOnLeft = 0;
    if (i > 0) {
      for (let idx = i - 1; idx >= 0; idx--) {
        if (board[idx][j] == null) {
          nrLinesOnBack++;
        } else {
          break;
        }
      }
    }
    if (i < 8) {
      for (let idx = i + 1; idx < 8; idx++) {
        if (board[idx][j] == null) {
          nrLinesInFront++;
        } else {
          break;
        }
      }
    }
    if (j < 8) {
      for (let idx = j + 1; idx < 8; idx++) {
        if (board[i][idx] == null) {
          nrLinesOnRight++;
        } else {
          break;
        }
      }
    }
    if (j > 0) {
      for (let idx = j - 1; idx < 8; idx++) {
        if (board[i][idx] == null) {
          nrLinesOnLeft++;
        } else {
          break;
        }
      }
    }

    return nrLinesOnLeft + nrLinesOnRight + nrLinesOnBack + nrLinesInFront;
  }

  public checkPawnsDoubled(piece: any, board: any, i: number, j: number) {
    var countPawnsSameColumn = 0;
    for (let idx = 1; idx < 5; idx++) {
      var inFrontPiece = board[idx][j];
      if (inFrontPiece != null && piece.color == inFrontPiece.color && piece.type == inFrontPiece.type && idx != i) {
        countPawnsSameColumn++;
      }
    }
    if (countPawnsSameColumn >= 1) {
      return true;
    }
    return false;
  }

  public checkKingSafety(board: any, i: number, j: number, piece: any) {
    var countPawns = 0;
    var countPieces = 0;
    if (this.kingCastled == true) {
      for (var idxI = i + 1; idxI <= i + 2; idxI++) {
        for (let idxJ = j - 1; idxJ <= j + 1; idxJ++) {
          if (board[idxI][idxJ] != null) {
            if (board[idxI][idxJ].type == 'p' && board[idxI][idxJ].color == piece.color) {
              countPawns++;
            } else if (board[idxI][idxJ].type != 'p' && board[idxI][idxJ].color == piece.color) {
              countPieces++;
            }
          }
        }
      }
    }
    if (piece.color == 'b') {
      return [-countPawns, -countPieces];
    }
    return [countPawns, countPieces];
  }
  public checkFianchettoBishop(board: any, i: number, j: number) {
    var countPawns = 0;
    if ((i == 1 && j == 1) || (i == 1 && j == 6)) {
      if (board[i][j - 1] != null) {
        if (board[i][j - 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i][j + 1] != null) {
        if (board[i][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i + 1][j] != null) {
        if (board[i + 1][j].type == 'p') {
          countPawns++;
        }
      }
      if (board[i + 1][j - 1] != null) {
        if (board[i + 1][j - 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i + 1][j + 1] != null) {
        if (board[i + 1][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i + 2][j + 1] != null) {
        if (board[i + 2][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i + 2][j - 1] != null) {
        if (board[i + 2][j - 1].type == 'p') {
          countPawns++;
        }
      }
    }
    if ((i == 6 && j == 6) || (i == 6 && j == 1)) {
      if (board[i][j - 1] != null) {
        if (board[i][j - 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i][j + 1] != null) {
        if (board[i][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i - 1][j] != null) {
        if (board[i - 1][j].type == 'p') {
          countPawns++;
        }
      }
      if (board[i - 1][j - 1] != null) {
        if (board[i - 1][j - 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i - 1][j + 1] != null) {
        if (board[i - 1][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i - 2][j + 1] != null) {
        if (board[i - 2][j + 1].type == 'p') {
          countPawns++;
        }
      }
      if (board[i - 2][j - 1] != null) {
        if (board[i - 2][j - 1].type == 'p') {
          countPawns++;
        }
      }
    }
    if (countPawns >= 2) {
      return true;
    }
    return false;
  }


}
