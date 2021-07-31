package backend.ChessTrainer.Controllers;


import backend.ChessTrainer.Model.Opening;
import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Services.OpeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/openings")
public class OpeningController {

    @Autowired
    private OpeningService openingService;

    @GetMapping("")
    public List<Opening> getAllOpenings(){
        return this.openingService.getAllOpenings();
    }

    @GetMapping("/{id}")
    public Opening getOpeningById(@PathVariable int id){
        return this.openingService.getOpeningById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> addOpening(@RequestBody Opening opening){
        try{
            this.openingService.addOpening(opening);
            return new ResponseEntity<Object>(opening, HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Opening couldn't be added properly.",HttpStatus.BAD_REQUEST);
        }
    }

}
