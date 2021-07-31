package backend.ChessTrainer.Services;

import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Model.SolvedPuzzle;
import backend.ChessTrainer.Model.User;
import backend.ChessTrainer.Repositories.PuzzleRepository;
import backend.ChessTrainer.Repositories.SolvedPuzzleRepository;
import backend.ChessTrainer.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SolvedPuzzleService {


    @Autowired
    private SolvedPuzzleRepository solvedRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PuzzleService puzzleService;


    public List<SolvedPuzzle> getALlSolvedPuzzles(){
        return this.solvedRepository.findAll();
    }


    public SolvedPuzzle getSolvedPuzzle(int id_user,int id_puzzle){
        Optional<User> user = Optional.ofNullable(this.userService.findUserById(id_user));
       Puzzle puzzle = this.puzzleService.getPuzzle(id_puzzle);
        if(user.isPresent() && puzzle!=null){
            return this.solvedRepository.findByUserAndPuzzle(user.get(),puzzle);
        }
        return null;
    }

    public SolvedPuzzle addSolvedPuzzle(SolvedPuzzle solvedPuzzle){

        Optional<User> user = Optional.ofNullable(this.userService.findUserById(solvedPuzzle.getUser().getId()));
        Puzzle puzzle = this.puzzleService.getPuzzle(solvedPuzzle.getPuzzle().getId());
        if(user.isPresent() && puzzle!=null){
            SolvedPuzzle alreadyExistPuzzle=this.solvedRepository.findByUserAndPuzzle(user.get(),puzzle);
            if(alreadyExistPuzzle == null) {
                this.solvedRepository.addSolvedPuzzle(solvedPuzzle.getUser().getId(), solvedPuzzle.getPuzzle().getId(), true);
            }
        }
        return solvedPuzzle;

    }

    public int getCountSolvedPuzzlesByUser(int id_user){
        int count=0;
        List<SolvedPuzzle> allPuzzlesSolved=this.solvedRepository.findAll();
        for (SolvedPuzzle solvedPuzzle : allPuzzlesSolved) {
            if (solvedPuzzle.getUser().getId() == id_user) {
                count++;
            }
        }
        return count;
    }


}
