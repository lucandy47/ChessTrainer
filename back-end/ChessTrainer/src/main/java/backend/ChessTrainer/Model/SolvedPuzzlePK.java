package backend.ChessTrainer.Model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class SolvedPuzzlePK implements Serializable {

    @Column(name="id_user")
    private Integer id_user;

    @Column(name="id_puzzle")
    private Integer id_puzzle;

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }

    public Integer getId_puzzle() {
        return id_puzzle;
    }

    public void setId_puzzle(Integer id_puzzle) {
        this.id_puzzle = id_puzzle;
    }
}
