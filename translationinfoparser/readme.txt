
This project can be used to parse translation files to excel and excel file to translation files.
When parsing the excel files to translation files the application is written by assuming that columns of the excel sheet follows below order
  column 0 :- Filename
  column 1 :- Translation key
  column 2 :- da-DK (Danish)
  column 3 :- de-DE (German)
  column 4 :- en-US (English)
  column 5 :- nb-NO (Norwegien)
  column 6 :- sv-SE (Swedish)
  And any cells with the same name are not merged.