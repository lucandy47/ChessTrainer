package backend.ChessTrainer.Controllers;


import backend.ChessTrainer.Model.SolvedPuzzle;
import backend.ChessTrainer.Services.SolvedPuzzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/solvedPuzzle")
public class SolvedPuzzleController {

    @Autowired
    private SolvedPuzzleService solvedPuzzleService;

    @GetMapping("")
    public List<SolvedPuzzle> getAllSolvedPuzzles(){
        return this.solvedPuzzleService.getALlSolvedPuzzles();
    }

    @GetMapping("/user={id_user}&puzzle={id_puzzle}")
    public SolvedPuzzle getSolvedPuzzle(@PathVariable int id_user,@PathVariable int id_puzzle){
        return this.solvedPuzzleService.getSolvedPuzzle(id_user,id_puzzle);
    }

    @PostMapping("/add")
    public SolvedPuzzle addSolvedPuzzle(@RequestBody SolvedPuzzle solvedPuzzle){
        System.out.println("Puzzle adaugat");
        return this.solvedPuzzleService.addSolvedPuzzle(solvedPuzzle);
    }

    @GetMapping("/count/{id}")
    public int getCountSolvedPuzzlesByUser(@PathVariable int id){
        return this.solvedPuzzleService.getCountSolvedPuzzlesByUser(id);
    }


}
