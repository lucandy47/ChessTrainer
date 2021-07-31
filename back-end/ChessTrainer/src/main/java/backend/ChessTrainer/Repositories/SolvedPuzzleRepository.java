package backend.ChessTrainer.Repositories;

import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Model.SolvedPuzzle;
import backend.ChessTrainer.Model.SolvedPuzzlePK;
import backend.ChessTrainer.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface SolvedPuzzleRepository extends JpaRepository<SolvedPuzzle, SolvedPuzzlePK> {
        SolvedPuzzle findByUserAndPuzzle(User user, Puzzle puzzle);

        @Modifying
                @Query(value =
                        "insert into solved_puzzles (id_user, id_puzzle, solved) values (:id_user, :id_puzzle, :solved)",
                        nativeQuery = true)
        void addSolvedPuzzle(@Param("id_user") int id_user,@Param("id_puzzle") int id_puzzle,@Param("solved") boolean solved);



}
