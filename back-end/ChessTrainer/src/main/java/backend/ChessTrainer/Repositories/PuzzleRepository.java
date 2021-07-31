package backend.ChessTrainer.Repositories;

import backend.ChessTrainer.Model.Puzzle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuzzleRepository extends JpaRepository<Puzzle, Integer> {
}
