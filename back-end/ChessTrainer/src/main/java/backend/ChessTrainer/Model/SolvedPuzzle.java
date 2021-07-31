package backend.ChessTrainer.Model;

import javax.persistence.*;

@Entity
@Table(name = "solved_puzzles")
public class SolvedPuzzle {

    @EmbeddedId
    private SolvedPuzzlePK id;

    @ManyToOne
    @MapsId("id_user")
    @JoinColumn(name="id_user")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @MapsId("id_puzzle")
    @JoinColumn(name="id_puzzle")
    private Puzzle puzzle;

    public Puzzle getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(Puzzle puzzle) {
        this.puzzle = puzzle;
    }

    public SolvedPuzzle() {
    }

    public SolvedPuzzle(User user, Puzzle puzzle, boolean solved) {
        this.user = user;
        this.puzzle = puzzle;
        this.solved = solved;
    }

    @Column(name="solved")
    private boolean solved;


    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }
}
