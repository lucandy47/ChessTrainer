package backend.ChessTrainer.Controllers;

import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Services.PuzzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/puzzles")
public class PuzzleController {



    @Autowired
    private PuzzleService puzzleService;


    
    @GetMapping("/dailyPuzzle")
    public Puzzle getRandomDailyPuzzle(){

       return puzzleService.getDailyPuzzle();

    }

    @GetMapping("")
    public List<Puzzle> getAllPuzzles(){
        return puzzleService.getAllPuzzles();
    }

    @GetMapping("/{id}")
    public Puzzle getPuzzle(@PathVariable Integer id){
        return puzzleService.getPuzzle(id);
    }

    @GetMapping("/category/{type}")
    public List<Puzzle> getPuzzleType(@PathVariable String type){
        return puzzleService.getPuzzlessOfType(type);
    }

    @PostMapping("")
    public ResponseEntity<?> addPuzzle(@RequestBody Puzzle puzzle){
        try{
            this.puzzleService.addPuzzle(puzzle);
            return new ResponseEntity<Object>(puzzle,HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Puzzle couldn't be added properly.",HttpStatus.BAD_REQUEST);
        }
    }
}
