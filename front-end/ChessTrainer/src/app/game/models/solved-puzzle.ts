import { User } from 'src/app/authentication/model/user';
import { Puzzle } from './puzzle';

export class SolvedPuzzle {
    user!:User;
    puzzle!:Puzzle;
    solved!:boolean;
    constructor(){}
}
