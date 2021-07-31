package backend.ChessTrainer.Controllers;

import backend.ChessTrainer.Model.Player;
import backend.ChessTrainer.Utilities.FileManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/players")
public class PlayersController {

    private final FileManagement fileManagement =new FileManagement();

    @GetMapping("")
    public List<Player> getFile(){
            return FileManagement.getTop10Players();
    }
}
