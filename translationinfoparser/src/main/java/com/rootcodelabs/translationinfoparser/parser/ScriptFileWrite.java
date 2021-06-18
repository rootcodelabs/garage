package com.rootcodelabs.translationinfoparser.parser;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.HashMap;
import java.util.Iterator;

/*
 Create typescript files from excel file.
 */
public class ScriptFileWrite {

/*
This method arranges data from the excel file to write into typescript files.And it is assumed that the
columns of the excel sheet follows below order
  column 0 :- Filename
  column 1 :- Translation key
  column 2 :- da-DK (Danish)
  column 3 :- de-DE (German)
  column 4 :- en-US (English)
  column 5 :- nb-NO (Norwegien)
  column 6 :- sv-SE (Swedish)
  And any cells with the same name are not merged.
 */
public void writeScriptContent() throws IOException   {

        String filePath = getClass().getResource("/excels/temp.xlsx").getPath().toString();
        FileInputStream inputStream = new FileInputStream(new File(filePath));

        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        if(sheet.getNumMergedRegions() != 0){
            throw new UserPrincipalNotFoundException(" Please unmerge merged columns and fill all empty cells generated after unmerging with correct data");
        }

        if(!sheet.getRow(0).getCell(0).getStringCellValue().equals("Filename")
                || !sheet.getRow(0).getCell(1).getStringCellValue().equals("Translation key")
                || !sheet.getRow(0).getCell(2).getStringCellValue().equals("da-DK (Danish)")
                || !sheet.getRow(0).getCell(3).getStringCellValue().equals("de-DE (German)")
                || !sheet.getRow(0).getCell(4).getStringCellValue().equals("en-US (English)")
                || !sheet.getRow(0).getCell(5).getStringCellValue().equals("nb-NO (Norwegien)")
                || !sheet.getRow(0).getCell(6).getStringCellValue().equals("sv-SE (Swedish)")){
            throw new UserPrincipalNotFoundException("columns of the excel sheet follows below order\n" +
                    "  column 0 :- Filename\n" +
                    "  column 1 :- Translation key\n" +
                    "  column 2 :- da-DK (Danish)\n" +
                    "  column 3 :- de-DE (German)\n" +
                    "  column 4 :- en-US (English)\n" +
                    "  column 5 :- nb-NO (Norwegien)\n" +
                    "  column 6 :- sv-SE (Swedish)");
        }

        String previousRow = sheet.getRow(1).getCell(0).getStringCellValue();

        int lastRowNum = sheet.getLastRowNum() - 1;
        Iterator<Row> iterator = sheet.iterator();
        HashMap<String, String> valuesMapDa = new HashMap<>();
        HashMap<String, String> valuesMapDe = new HashMap<>();
        HashMap<String, String> valuesMapEn = new HashMap<>();
        HashMap<String, String> valuesMapNb = new HashMap<>();
        HashMap<String, String> valuesMapSv = new HashMap<>();
        String key = null;
        String fileName = null;

        while (iterator.hasNext()) {
            Row nextRow = iterator.next();
            Iterator<Cell> cellIterator = nextRow.cellIterator();
            if (nextRow.getRowNum() == 0) {
                continue;
            } else {

                while (cellIterator.hasNext()) {

                    Cell cell = cellIterator.next();
                    if (cell.getColumnIndex() == 0) {
                        if (previousRow == cell.getStringCellValue() && nextRow.getRowNum() != lastRowNum) {
                            fileName = cell.getStringCellValue();

                        } else if (nextRow.getRowNum() == lastRowNum) {

                            valuesMapDa.put(nextRow.getCell(1).getStringCellValue(), nextRow.getCell(2).getStringCellValue().equals("null") ? nextRow.getCell(2).getStringCellValue().trim() : "\"" + nextRow.getCell(2).getStringCellValue().trim() + "\"");
                            scriptFileGenerator("da-DK", valuesMapDa, fileName);
                            valuesMapDa.clear();

                            valuesMapDe.put(nextRow.getCell(1).getStringCellValue(), nextRow.getCell(3).getStringCellValue().equals("null") ? nextRow.getCell(3).getStringCellValue().trim() : "\"" + nextRow.getCell(3).getStringCellValue().trim() + "\"");
                            scriptFileGenerator("de-DE", valuesMapDe, fileName);
                            valuesMapDe.clear();

                            valuesMapEn.put(nextRow.getCell(1).getStringCellValue(), nextRow.getCell(4).getStringCellValue().equals("null") ? nextRow.getCell(4).getStringCellValue().trim() : "\"" + nextRow.getCell(4).getStringCellValue().trim() + "\"");
                            scriptFileGenerator("en-US", valuesMapEn, fileName);
                            valuesMapEn.clear();

                            valuesMapNb.put(nextRow.getCell(1).getStringCellValue(), nextRow.getCell(5).getStringCellValue().equals("null") ? nextRow.getCell(5).getStringCellValue().trim() : "\"" + nextRow.getCell(5).getStringCellValue().trim() + "\"");
                            scriptFileGenerator("nb-NO", valuesMapNb, fileName);
                            valuesMapNb.clear();

                            valuesMapSv.put(nextRow.getCell(1).getStringCellValue(), nextRow.getCell(6).getStringCellValue().equals("null") ? nextRow.getCell(6).getStringCellValue().trim() : "\"" + nextRow.getCell(6).getStringCellValue().trim() + "\"");
                            scriptFileGenerator("sv-SE", valuesMapSv, fileName);
                            valuesMapSv.clear();
                        } else {

                            scriptFileGenerator("da-DK", valuesMapDa, fileName);
                            previousRow = cell.getStringCellValue();
                            valuesMapDa.clear();

                            scriptFileGenerator("de-DE", valuesMapDe, fileName);
                            valuesMapDe.clear();

                            scriptFileGenerator("en-US", valuesMapEn, fileName);
                            valuesMapEn.clear();

                            scriptFileGenerator("nb-NO", valuesMapNb, fileName);
                            valuesMapNb.clear();

                            scriptFileGenerator("sv-SE", valuesMapSv, fileName);
                            valuesMapSv.clear();

                        }
                    } else if (cell.getColumnIndex() == 1) {
                        key = cell.getStringCellValue();
                    } else if (cell.getColumnIndex() == 2) {
                        valuesMapDa.put(key, cell.getStringCellValue().equals("null") ? cell.getStringCellValue().trim() : "\"" + cell.getStringCellValue().trim() + "\"");
                    } else if (cell.getColumnIndex() == 3) {
                        valuesMapDe.put(key, cell.getStringCellValue().equals("null") ? cell.getStringCellValue().trim() : "\"" + cell.getStringCellValue().trim() + "\"");
                    } else if (cell.getColumnIndex() == 4) {
                        valuesMapEn.put(key, cell.getStringCellValue().equals("null") ? cell.getStringCellValue().trim() : "\"" + cell.getStringCellValue().trim() + "\"");
                    } else if (cell.getColumnIndex() == 5) {
                        valuesMapNb.put(key, cell.getStringCellValue().equals("null") ? cell.getStringCellValue().trim() : "\"" + cell.getStringCellValue().trim() + "\"");
                    } else if (cell.getColumnIndex() == 6) {
                        valuesMapSv.put(key, cell.getStringCellValue().equals("null") ? cell.getStringCellValue().trim() : "\"" + cell.getStringCellValue().trim() + "\"");
                    }
                }
            }
        }
    }

    private void scriptFileGenerator(String language, HashMap<String, String> map, String filename) throws IOException {

        File dir = new File("D:\\rootcodelabs\\excelToTypescript\\" + language);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        FileWriter fileWriter = new FileWriter(new File("D:\\rootcodelabs\\excelToTypescript\\" + language, filename));
        fileWriter.write("export default " + map.toString().replaceAll("=", ": ").replaceAll("}$", ",};"));
        fileWriter.close();
    }
}
