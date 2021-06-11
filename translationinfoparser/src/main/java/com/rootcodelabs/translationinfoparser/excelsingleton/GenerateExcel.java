package com.rootcodelabs.translationinfoparser.excelsingleton;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class GenerateExcel {

    private static GenerateExcel instance = new GenerateExcel();

    private GenerateExcel(){}

    public static GenerateExcel getInstance(){
        return instance;
    }

    public Workbook getWorkBook(){

        Workbook workbook = new XSSFWorkbook();


        Sheet sheet = workbook.createSheet("New Translation Sheet");
        sheet.setColumnWidth(0, 6000);
        //sheet.setColumnWidth(1, 4000);

        Row header = sheet.createRow(0);

        CellStyle headerStyle = workbook.createCellStyle();
//        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
//        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFFont font = ((XSSFWorkbook) workbook).createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 12);
        font.setBold(false);
        headerStyle.setFont(font);

        Cell headerCell = header.createCell(0);
        headerCell.setCellValue("Filename");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(1);
        headerCell.setCellValue("Translation key");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(2);
        headerCell.setCellValue("da-DK (Danish)");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(3);
        headerCell.setCellValue("de-DE (German)");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(4);
        headerCell.setCellValue("en-US (English)");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(5);
        headerCell.setCellValue("nb-NO (Norwegien)");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(6);
        headerCell.setCellValue("sv-SE (Swedish)");
        headerCell.setCellStyle(headerStyle);

        Row row = workbook.getSheet("New Translation Sheet").createRow(1);
        Cell cell = row.createCell(0);

        return workbook;

    }

}
