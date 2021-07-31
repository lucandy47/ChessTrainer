package backend.ChessTrainer;

import backend.ChessTrainer.Model.Puzzle;
import backend.ChessTrainer.Model.SolvedPuzzle;
import backend.ChessTrainer.Model.User;
import backend.ChessTrainer.Repositories.PuzzleRepository;
import backend.ChessTrainer.Repositories.SolvedPuzzleRepository;
import backend.ChessTrainer.Repositories.UserRepository;
import backend.ChessTrainer.Services.JwtUtilService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class ChessTrainerApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PuzzleRepository puzzleRepository;

	@Autowired
	private JwtUtilService jwtUtilService;

	@Autowired
	private SolvedPuzzleRepository solvedPuzzleRepository;

	@Test
	void contextLoads() {
	}
	@Test
	void checkUserCorrect(){
		User user =new User();
		user.setUsername("tiron");

		Optional<User> foundUser=userRepository.findByUsername(user.getUsername());

		assertThat(foundUser.get().getUsername()).isEqualTo(user.getUsername());

	}

	@Test
	void checkUserNotCorrect(){
		User user =new User();
		user.setUsername("nuTiron");

		Optional<User> foundUser=userRepository.findByUsername("tiron");

		assertThat(foundUser.get().getUsername()).isNotEqualTo(user.getUsername());

	}

	@Test
	void checkPuzzleCorrect(){
		Puzzle puzzle = new Puzzle();
		puzzle.setId(1);

		Optional<Puzzle> foundPuzzle = puzzleRepository.findById(puzzle.getId());

		assertThat(foundPuzzle.get().getId()).isEqualTo(puzzle.getId());
	}

	@Test
	void checkUsernameFromJWT(){
		assertThat(this.jwtUtilService.extractUsername("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aXJvbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2MjU0ODQ4NDUsImlhdCI6MTYyNTQ4MzA0NX0.WApW8Uje21badWReRk0GdTRYvBiLCJGYtGVnP__Zip8"))
				.isEqualTo("tiron"); //jwt creat pentru utilizatorul tiron
	}
	@Test
	void checkIdFromJWT(){
		assertThat(this.jwtUtilService.extractId("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aXJvbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2MjU0ODQ4NDUsImlhdCI6MTYyNTQ4MzA0NX0.WApW8Uje21badWReRk0GdTRYvBiLCJGYtGVnP__Zip8"))
				.isEqualTo(1); //jwt creat pentru utilizatorul tiron cu id-ul 1
	}

	@Test
	void checkedPuzzleSolved(){
		Optional<Puzzle> foundPuzzle = puzzleRepository.findById(1);
		Optional<User> foundUser = userRepository.findByUsername("tiron");

		SolvedPuzzle solvedPuzzle = this.solvedPuzzleRepository.findByUserAndPuzzle(foundUser.get(), foundPuzzle.get());

		assertThat(foundPuzzle.get().getId()).isEqualTo(solvedPuzzle.getPuzzle().getId());
		assertThat(foundUser.get().getUsername()).isEqualTo(solvedPuzzle.getUser().getUsername());
	}



}
