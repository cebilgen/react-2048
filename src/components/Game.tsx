import {h, Component} from 'preact'
import * as R from 'ramda'

import Board from './Board'
import { Direction, BoardOps } from '../logic'


interface GameState {
    board: number[]
    score: number
    noChange: boolean[] 
}

export default class Game extends Component<any, GameState> {
    constructor(props: any) {
        super(props)
        this.newGame()
    }

    newGame() {
        this.setState({
            board: BoardOps.newSquare(R.repeat(0, 16)),
            score: 0,
            noChange: R.repeat(false, 4)
        })
    } 

    onKeyDown(ev: KeyboardEvent) {
        if (ev.key === 'ArrowUp') {
            this.slideUp()
        }
        if (ev.key === 'ArrowRight') {
            this.slideRight()
        }
        else if (ev.key === 'ArrowDown') {
            this.slideDown()
        } 
        else if (ev.key === 'ArrowLeft') {
            this.slideLeft()
        } 
        else if (ev.key === 'Backspace') {
            // undo?
        }
    }

    slideUp() {
        const [slid, score] = BoardOps.slideUp(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Up] = true
            return this.setState({noChange: noChange})
        }

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    slideRight() {
        const [slid, score] = BoardOps.slideRight(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Right] = true
            return this.setState({noChange: noChange})
        }

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    slideDown() {
        const [slid, score] = BoardOps.slideDown(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Down] = true
            return this.setState({noChange: noChange})
        }

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    slideLeft() {
        const [slid, score] = BoardOps.slideLeft(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Left] = true
            return this.setState({noChange: noChange})
        }

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    render(): JSX.Element {
        return (
            <div class="game">
                <Board
                    onKeyDown={(ev: KeyboardEvent) => this.onKeyDown(ev)}
                    values={this.state.board}
                />
            </div>
        )
    }
}