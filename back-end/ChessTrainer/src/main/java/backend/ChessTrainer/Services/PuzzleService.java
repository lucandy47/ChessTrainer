package backend.ChessTrainer.Services;

import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Model.User;
import backend.ChessTrainer.Repositories.PuzzleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class PuzzleService {

    @Autowired
    private PuzzleRepository puzzleRepository;

    private static Puzzle dailyPuzzle=new Puzzle();

    public Puzzle getDailyPuzzle(){
        return dailyPuzzle;
    }

    public List<Puzzle> getAllPuzzles(){
        return puzzleRepository.findAll();
    }

    public List<Puzzle> getPuzzlessOfType(String type){
        List<Puzzle> listPuzzle=puzzleRepository.findAll();
        List<Puzzle> result=new ArrayList<>();
        for (Puzzle puzzle : listPuzzle) {
            if (puzzle.getType().equals(type)) {
                result.add(puzzle);
            }
        }
        return result;
    }

    public Puzzle getPuzzle(Integer id){
        Optional<Puzzle> puzzle= puzzleRepository.findById(id);
        if(puzzle.isPresent()){
            return puzzle.get();
        }else{
            return null;
        }

    }

    public boolean addPuzzle(Puzzle puzzle)
    {
        List<Puzzle> allPuzzles=puzzleRepository.findAll();
        puzzle.setId(allPuzzles.get(allPuzzles.size()-1).getId()+1);
        try {
            puzzleRepository.save(puzzle);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    @PostConstruct
    public void createDailyPuzzle(){
        List<Puzzle> puzzles=this.puzzleRepository.findAll();
        Random rand = new Random();
        dailyPuzzle= puzzles.get(rand.nextInt(puzzles.size()));
    }
}
