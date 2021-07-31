package backend.ChessTrainer.Utilities;

import backend.ChessTrainer.Model.Article;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ArticleManagement {

    private final static String newsAPIurl=" https://newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22sourceUri%22%3A%22chess.com%22%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%2C%22dataType%22%3A%5B%22news%22%5D%7D%7D&resultType=articles&articlesSortBy=date&articlesCount=20&includeArticleImage=true&includeArticleExtractedDates=true&includeArticleOriginalArticle=true&articleBodyLen=-1&apiKey=5bd7b655-52ed-486c-938a-b868333c36a7";

    private static List<Article> latestNews=new ArrayList<>();

    public static List<Article> getLatestNews() {
        return latestNews;
    }

    public void setLatestNews(List<Article> latestNews) {
        ArticleManagement.latestNews = latestNews;
    }

    @PostConstruct
    public static List<Article> getNews() throws IOException {
        try {
            URL url = new URL(newsAPIurl);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("HttpResponseCode: " + conn.getResponseCode());
            } else {
                String line = "";
                Scanner scanner = new Scanner(url.openStream());

                while (scanner.hasNext()) {
                    line += scanner.nextLine();
                }
                scanner.close();

                JSONParser parse = new JSONParser();
                JSONObject data_obj = (JSONObject) parse.parse(line);
                JSONObject json= (JSONObject)data_obj.get("articles");
                JSONArray articles_array = (JSONArray) json.get("results");

                for (Object art : articles_array) {
                    Article article = new Article();
                    JSONObject new_obj = (JSONObject) art;
                    article.setDate((String) new_obj.get("date"));
                    article.setDescription((String) new_obj.get("body"));
                    article.setUrl((String) new_obj.get("url"));
                    article.setUrlToImage((String) new_obj.get("image"));
                    article.setTitle((String) new_obj.get("title"));
                    latestNews.add(article);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return latestNews;
    }

}

