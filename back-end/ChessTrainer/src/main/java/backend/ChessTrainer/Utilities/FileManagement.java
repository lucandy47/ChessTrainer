package backend.ChessTrainer.Utilities;

import backend.ChessTrainer.Model.Player;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Component
public class FileManagement {
    private static final int BUFFER_SIZE = 4096;
    private static final String urlFile="http://ratings.fide.com/download/standard_rating_list_xml.zip";
    private static final String pathSaveDir="src/main/resources";
    private static  List<Player> top10Players=new ArrayList<>();

    public static List<Player> getTop10Players() {
        return top10Players;
    }

    public static void setTop10Players(List<Player> top10Players) {
        FileManagement.top10Players = top10Players;
    }

    public static String downloadFile() throws IOException {
        URL url=new URL(urlFile);
        HttpURLConnection httpConn = (HttpURLConnection)url.openConnection();
        int bytesRead;
        byte[] buffer = new byte[BUFFER_SIZE];
        if(httpConn.getResponseCode() == HttpURLConnection.HTTP_OK){
            String fileName = "";
            String disposition = httpConn.getHeaderField("Content-Disposition"); //se obtine un string de tipul Content-Disposition: attachment; filename="numefisier"

            if (disposition != null) {
                int index = disposition.indexOf("filename=");
                if (index > 0) {
                    fileName = disposition.substring(index + 10, disposition.length() - 1);
                }
            } else {
                fileName = urlFile.substring(urlFile.lastIndexOf("/") + 1);
            }
            InputStream inputStream = httpConn.getInputStream();
            String saveFilePath = pathSaveDir + File.separator + fileName;

            FileOutputStream outputStream = new FileOutputStream(saveFilePath);

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            outputStream.close();
            inputStream.close();
            System.out.println("S-a descarcat arhiva "+saveFilePath);
            return saveFilePath;
        }
            httpConn.disconnect();
            return null;
        }

        public static String unZipFile() throws IOException {
            String zipPath= downloadFile();
            FileInputStream fis; //se obtin octetii dintr-un fisier

            byte[] buffer = new byte[1024];
            try {
                fis = new FileInputStream(zipPath);
                ZipInputStream zis = new ZipInputStream(fis); //filtru pentru a putea citi fisierele dintr-un zip
                ZipEntry ze = zis.getNextEntry(); //un fisier dintr-un zip
                    String fileName = ze.getName();
                    File newFile = new File(pathSaveDir + File.separator + fileName);
                    FileOutputStream fos = new FileOutputStream(newFile);
                    int len;
                    while ((len = zis.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }
                    fos.close();
                    zis.closeEntry();
                    System.out.println("Fisier dedzarhivat "+newFile.getPath());
                    return newFile.getPath();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
        @PostConstruct
        public void getPlayers() throws ParserConfigurationException, IOException, SAXException {
            String xmlPathFile=unZipFile();
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            List<Player> players=new ArrayList<>();
            Document document = builder.parse(new File(xmlPathFile));
            document.getDocumentElement().normalize();
            NodeList nList = document.getElementsByTagName("player");

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node node = nList.item(temp);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) node;
                    Player player=new Player();
                    player.setId(Integer.parseInt(eElement.getElementsByTagName("fideid").item(0).getTextContent()));
                    player.setName(eElement.getElementsByTagName("name").item(0).getTextContent());
                    if(eElement.getElementsByTagName("rating").item(0).getTextContent().equals("")){
                        player.setRating(0);
                    }else{
                        player.setRating(Integer.parseInt(eElement.getElementsByTagName("rating").item(0).getTextContent()));
                    }
                    if(eElement.getElementsByTagName("birthday").item(0).getTextContent().equals("")){
                        player.setBirthday(0);
                    }else{
                        player.setBirthday(Integer.parseInt(eElement.getElementsByTagName("birthday").item(0).getTextContent()));
                    }
                    player.setFlag(eElement.getElementsByTagName("flag").item(0).getTextContent());
                    player.setTitle(eElement.getElementsByTagName("title").item(0).getTextContent());
                    player.setW_title(eElement.getElementsByTagName("w_title").item(0).getTextContent());
                    player.setSex(eElement.getElementsByTagName("sex").item(0).getTextContent());
                    player.setCountry(eElement.getElementsByTagName("country").item(0).getTextContent());

                    players.add(player);
                }
            }
            players.sort(
                    (Player a,Player b)-> b.getRating() - a.getRating());
            for(Player player: players){
                if(player.getFlag().equals("")){
                    top10Players.add(player);
                }
                if(top10Players.size() == 10){
                    break;
                }
            }

        }






    }


