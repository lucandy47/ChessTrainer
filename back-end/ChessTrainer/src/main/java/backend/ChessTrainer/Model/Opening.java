package backend.ChessTrainer.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "openings")
public class Opening {
    @Id
    @Column(name = "id_opening")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "eco")
    private String eco;
    @Column(name = "description")
    private String description;
    @Column(name = "fen")
    private String fen;
    @Column(name = "pgn")
    private String pgn;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEco() {
        return eco;
    }

    public void setEco(String eco) {
        this.eco = eco;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
}
