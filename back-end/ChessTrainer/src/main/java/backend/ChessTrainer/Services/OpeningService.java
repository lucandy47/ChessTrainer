package backend.ChessTrainer.Services;

import backend.ChessTrainer.Model.Opening;
import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Repositories.OpeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OpeningService {

    @Autowired
    private OpeningRepository openingRepository;

    public List<Opening> getAllOpenings(){
        return this.openingRepository.findAll();
    }

    public Opening getOpeningById(int id){
        Optional<Opening> op=this.openingRepository.findById(id);

        if(op.isPresent()){
            return op.get();
        }else{
            return null;
        }
    }
    public boolean addOpening(Opening opening)
    {
        List<Opening> allOpenings=this.openingRepository.findAll();
        opening.setId(allOpenings.get(allOpenings.size()-1).getId()+1);
        try {
            this.openingRepository.save(opening);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}
