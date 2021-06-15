package com.rootcodelabs.translationinfoparser.parser;

import com.rootcodelabs.translationinfoparser.excelsingleton.GenerateExcel;
import org.apache.poi.ss.usermodel.*;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class ExcelFileWrite {

    Workbook workbook;
    int rowIncrementor = 1;

    public void writeExcelContent() throws IOException, URISyntaxException, TikaException {

        List<File> filesInFolder ;
        try (Stream<Path> paths = Files.walk(Paths.get(getClass().getResource("/translations").toURI()))) {
            filesInFolder = paths
                    .filter(Files::isRegularFile)
                    .map(Path::toFile)
                    .collect(Collectors.toList());;
        }
        for (File file : filesInFolder) {
            Tika tika = new Tika();
            String filecontent = tika.parseToString (file);
            String truncatedString = filecontent.substring(15,filecontent.length()-4).trim();

            HashMap<String, String> map = new HashMap<String, String>();
            while( truncatedString.indexOf("\"") != ( truncatedString.length() -2 ) || truncatedString.indexOf(":") != -1) {
                String key = truncatedString.substring(1, truncatedString.indexOf(":"));
                String truncatedFromColon = truncatedString.substring(truncatedString.indexOf(":")+1);
                String truncatedFromQuote = truncatedFromColon.substring(truncatedFromColon.indexOf("\"")+1);
                String value = truncatedFromQuote.substring(0, truncatedFromQuote.indexOf("\"")).replaceAll("\"", "");
                truncatedString = truncatedFromQuote.substring(truncatedFromQuote.indexOf("\"") +1);
                map.put(key,value);
            }
            excelGenerator(map,file.toString().substring(file.toString().indexOf("translations") + 19),file.toString().substring(file.toString().indexOf("translations")+13,file.toString().indexOf("translations") + 18));
        }
    }

    private void excelGenerator( HashMap<String, String> map , String filename, String language) throws IOException {

    if(workbook == null){
         GenerateExcel generateExcel = GenerateExcel.getInstance();
         workbook = generateExcel.getWorkBook();
     }

     if (language.equals("da-DK")){

         map.forEach((k,v)-> {
             Row rowToFill = workbook.getSheet("New Translation Sheet").getRow(rowIncrementor);
             Cell cell0 = rowToFill.createCell(0);
             cell0.setCellValue(filename);
             Cell cell1 = rowToFill.createCell(1);
             cell1.setCellValue(k);
             Cell cell2 = rowToFill.createCell(2);
             cell2.setCellValue(v);
             rowIncrementor++;
             workbook.getSheet("New Translation Sheet").createRow(rowIncrementor);

         });
     }
     else if (language.equals("de-DE")) {
         Sheet sheet = workbook.getSheet("New Translation Sheet");
        for (Row row : sheet) {
            if (row.getCell(0) != null && row.getCell(1) != null && map.containsKey(row.getCell(1).getStringCellValue()) && row.getCell(0).getStringCellValue().equals(filename)) {
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(map.get(row.getCell(1).getStringCellValue()));
            }
        }
     } else if (language.equals("en-US")){
         Sheet sheet = workbook.getSheet("New Translation Sheet");
         for (Row row : sheet) {
             if (row.getCell(0) != null && row.getCell(1) != null && map.containsKey(row.getCell(1).getStringCellValue()) && row.getCell(0).getStringCellValue().equals(filename)) {
                 Cell cell4 = row.createCell(4);
                 cell4.setCellValue(map.get(row.getCell(1).getStringCellValue()));

             }
         }

     } else if (language.equals("nb-NO")){
         Sheet sheet = workbook.getSheet("New Translation Sheet");
         for (Row row : sheet) {
             if (row.getCell(0) != null && row.getCell(1) != null && map.containsKey(row.getCell(1).getStringCellValue()) && row.getCell(0).getStringCellValue().equals(filename)) {
                 Cell cell5 = row.createCell(5);
                 cell5.setCellValue(map.get(row.getCell(1).getStringCellValue()));

             }
         }

     } else if (language.equals("sv-SE")){
         Sheet sheet = workbook.getSheet("New Translation Sheet");

         for (Row row : sheet) {
             if (row.getCell(0) != null && row.getCell(1) != null && map.containsKey(row.getCell(1).getStringCellValue()) && row.getCell(0).getStringCellValue().equals(filename)) {
                 Cell cell6 = row.createCell(6);
                 cell6.setCellValue(map.get(row.getCell(1).getStringCellValue()));
             }
         }
     }

        File currDir = new File(".");
        String path = currDir.getAbsolutePath();
        String fileLocation = path.substring(0, path.length() - 1) + "temp.xlsx";

        FileOutputStream outputStream = new FileOutputStream("D:\\rootcodelabs\\excel-folder\\temp.xlsx");
        workbook.write(outputStream);
        outputStream.close();
        //workbook.close();
    }

}
