// Hint: Action is triggered by user interaction, network request, ...

import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {RootState} from '../store';
import {Board} from '../../models/board';

@Injectable()
export class BoardActions {
  static UPDATE_BOARD_COLOR: string = 'UPDATE_BOARD_COLOR';
  static UPDATE_BOARDS: string = 'UPDATE_BOARDS';
  static REMOVE_ALL_BOARDS: string = 'REMOVE_ALL_BOARDS';
  static REMOVE_BOARDS: string = 'REMOVE_BOARDS';
  static RESET_BOARD_STORE: string = 'RESET_BOARD_STORE';
  static UPDATE_PULLED_AT: string = 'UPDATE_PULLED_AT';

  constructor(private ngRedux: NgRedux<RootState>) {
  }

  public updateBoardColor(id: string, backgroundColor: string) {
    this.ngRedux.dispatch({type: BoardActions.UPDATE_BOARD_COLOR, id, backgroundColor});
  };

  // updates Boards from API
  public updateBoards(boards: Board[]) {
    this.ngRedux.dispatch({type: BoardActions.UPDATE_BOARDS, payload: boards});
  };

  public removeAllBoards() {
    this.ngRedux.dispatch({type: BoardActions.REMOVE_BOARDS});
  };

  public removeBoards(boards: Board[]) {
    this.ngRedux.dispatch({type: BoardActions.REMOVE_BOARDS, payload: boards});
  };

  public resetStore() {
    this.ngRedux.dispatch({type: BoardActions.RESET_BOARD_STORE});
  }

}
