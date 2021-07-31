package backend.ChessTrainer.Controllers;

import backend.ChessTrainer.Model.User;
import backend.ChessTrainer.Services.JwtUtilService;
import backend.ChessTrainer.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/users")
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtilService jwtUtilService;

    @GetMapping(path = "")
    public List<User> findUsers()
    {
        return userService.findAllUsers();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findUser(@PathVariable Integer id){

        User foundUser = userService.findUserById(id);
        if(foundUser != null)
        {
            return ResponseEntity.ok(foundUser);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }

    }
    @PostMapping("")
    public ResponseEntity<?> registerUser(@RequestBody User newUser)
    {

        if(!userService.checkEmailExists(newUser.getEmail()))
        {

            if(!userService.checkUsernameExists(newUser.getUsername()))
            {
                if(userService.checkPatternUsername(newUser.getUsername())){
                    if(userService.checkPatternFirstAndLastName(newUser.getFirstName())){
                        if(userService.checkPatternFirstAndLastName(newUser.getLastName())){
                            if(userService.checkPatternEmail(newUser.getEmail())){
                                if(userService.addUser(newUser))
                                {
                                    return new ResponseEntity<Object>(newUser, HttpStatus.CREATED);
                                }
                                else
                                {
                                    return ResponseEntity.badRequest().build();
                                }
                            }else{
                                return new ResponseEntity<>("Email is not correct written!", HttpStatus.BAD_REQUEST);
                            }


                        }else{
                            return new ResponseEntity<>("Last name must contain only letters and more than 2!", HttpStatus.BAD_REQUEST);
                        }

                    }else{
                        return new ResponseEntity<>("First name must contain only letters and more than 2!", HttpStatus.BAD_REQUEST);
                    }

                }else{
                    return new ResponseEntity<>("Username must contain only letters, numbers or underscore is not correct!", HttpStatus.BAD_REQUEST);
                }

            }
            else{
                return new ResponseEntity<>("Username already exist!", HttpStatus.BAD_REQUEST);
            }

        }
        else
        {
            return new ResponseEntity<>("Email already exist!", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User requestedUser)
    {
        User foundUser = userService.findUser(requestedUser.getUsername(), requestedUser.getPassword());

        if(foundUser == null)
        {

            return ResponseEntity.notFound().build();
        }
        else{

            String jwt = jwtUtilService.generateToken(foundUser);
            return new ResponseEntity<>(jwt, HttpStatus.ACCEPTED);

        }
    }
    @GetMapping("/get")
    public ResponseEntity<?> getUser( @RequestHeader("Authorization") String authorizationHeader) {

        String jwt = jwtUtilService.getJwtFromAuthorizationHeader(authorizationHeader);
        System.out.println(jwt);
        if(jwt != null && jwtUtilService.validateToken(jwt))
        {
            try {
                User user=userService.findUserById(jwtUtilService.extractId(jwt));
                return new ResponseEntity<User>(user,HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);

    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User updatedUser){

        if(userService.updateUser(id, updatedUser))
        {
                if(userService.checkPatternFirstAndLastName(updatedUser.getFirstName())){
                    if(userService.checkPatternFirstAndLastName(updatedUser.getLastName())){
                        if(userService.checkPatternEmail(updatedUser.getEmail())){
                            return new ResponseEntity<Object>(updatedUser, HttpStatus.OK);
                        }else{
                            return new ResponseEntity<>("Email is not correct written!", HttpStatus.BAD_REQUEST);
                        }
                    }else{
                        return new ResponseEntity<>("Last name must contain only letters and more than 2!", HttpStatus.BAD_REQUEST);
                    }

                }else{
                    return new ResponseEntity<>("First name must contain only letters and more than 2!", HttpStatus.BAD_REQUEST);
                }
        }
        else
        {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }

    }
}
