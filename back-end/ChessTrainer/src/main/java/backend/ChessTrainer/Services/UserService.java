package backend.ChessTrainer.Services;


import backend.ChessTrainer.Model.User;
import backend.ChessTrainer.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Transactional
public class UserService {

    private static final Pattern patternName = Pattern.compile("[A-Za-z]{2,}");

    private static final Pattern patternUsername = Pattern.compile("[A-Za-z0-9_]{2,}");

    private static final Pattern patternEmail=Pattern.compile("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");

    @Autowired
    private UserRepository userRepository;

    public User findUserById(Integer id)
    {
        Optional<User> foundUser = userRepository.findById(id);
        return foundUser.orElse(null);
    }

    public List<User> findAllUsers()
    {
        return userRepository.findAll();
    }

    public User findUser(String username, String password)
    {
        Optional<User> foundUser = userRepository.findByUsernameAndPassword(username, password);
        return foundUser.orElse(null);
    }

    public boolean checkUsernameExists(String username)
    {
        Optional<User> existingUserByUsername = userRepository.findByUsername(username);

        return existingUserByUsername.isPresent();

    }

    public boolean checkEmailExists(String email)
    {
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        return existingUserByEmail.isPresent();
    }

    public boolean addUser(User newUser)
    {
        List<User> allUsers=userRepository.findAll();
        newUser.setRole("user");
        newUser.setId(allUsers.get(allUsers.size()-1).getId()+1);
        try {
            userRepository.save(newUser);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public boolean deleteUser(Integer id)
    {

        try{
            userRepository.deleteById(id);
            return  true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    public boolean updateUser(Integer id, User newUser)
    {
        Optional<User> foundUser = userRepository.findById(id);
        if(foundUser.isPresent())
        {
            foundUser.get().setUsername(newUser.getUsername());

            foundUser.get().setPassword(newUser.getPassword());

            foundUser.get().setLastName(newUser.getLastName());

            foundUser.get().setFirstName(newUser.getFirstName());

            foundUser.get().setEmail(newUser.getEmail());

            foundUser.get().setRole(newUser.getRole());

            userRepository.save(foundUser.get());

            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean checkPatternFirstAndLastName(String name){
        return patternName.matcher(name).matches();
    }

    public boolean checkPatternEmail(String email){
        return patternEmail.matcher(email).matches();
    }

    public boolean checkPatternUsername(String username){
        return patternUsername.matcher(username).matches();
    }

}
