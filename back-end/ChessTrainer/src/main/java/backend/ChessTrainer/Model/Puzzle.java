package backend.ChessTrainer.Model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "puzzles")
public class Puzzle {

    @Id
    @Column(name = "id_puzzle")
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "type")
    private String type;
    @Column(name = "description")
    private String description;
    @Column(name = "fen")
    private String fen;
    @Column(name = "pgn")
    private String pgn;




    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }



    public String getFen() {
        return fen;
    }

    public void setFen(String fen) {
        this.fen = fen;
    }

    public String getPgn() {
        return pgn;
    }

    public void setPgn(String pgn) {
        this.pgn = pgn;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }



    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
