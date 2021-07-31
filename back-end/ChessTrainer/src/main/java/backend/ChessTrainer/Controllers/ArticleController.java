package backend.ChessTrainer.Controllers;

import backend.ChessTrainer.Model.Article;
import backend.ChessTrainer.Utilities.ArticleManagement;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/articles")
public class ArticleController {



    @GetMapping("")
    public List<Article> getNews() {
        return ArticleManagement.getLatestNews();
    }

}
