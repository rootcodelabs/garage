package com.rootcodelabs.translationinfoparser;

import com.rootcodelabs.translationinfoparser.parser.ExcelFileWrite;
import org.apache.tika.exception.TikaException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
public class TranslationinfoparserApplication {

	public static void main(String[] args) {

		SpringApplication.run(TranslationinfoparserApplication.class, args);
		initializer();
	}

	public static void initializer(){
		ExcelFileWrite reader = new ExcelFileWrite();
		try {
			 reader.writeExcelContent();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} catch (TikaException e) {
			e.printStackTrace();
		}
//		ScriptFileWrite scriptFileWrite = new ScriptFileWrite();
//		try {
//			scriptFileWrite.writeExcelContent();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
	}
}
