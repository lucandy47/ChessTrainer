package backend.ChessTrainer.Repositories;

import backend.ChessTrainer.Model.Opening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpeningRepository extends JpaRepository<Opening,Integer> {
}
