package backend.ChessTrainer.Services;

import backend.ChessTrainer.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtilService {

    private final String SECRET_KEY = "ChessTrainerApp";

    @Autowired
    private UserService userService;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public int extractId(String token) {
        Claims claims = extractAllClaims(token);
        return (Integer) claims.get("id");
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public String generateToken( User userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userDetails.getId());
        claims.put("role", userDetails.getRole());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) //30 de minute
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token) {

        try{
            isTokenExpired(token);
        }catch (ExpiredJwtException e)
        {
            return false;
        }
        final String usernameFromJWT = extractUsername(token);
        final int idFromJWT = extractId(token);
        User userFromDB = userService.findUserById(idFromJWT);
        System.out.println(userFromDB.getEmail()+userFromDB.getFirstName());
        return usernameFromJWT != null && usernameFromJWT.equals(userFromDB.getUsername());
    }

    public String getJwtFromAuthorizationHeader(String authorizationHeader)
    {
        String jwt = null;
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
        }
        return jwt;

    }
}
