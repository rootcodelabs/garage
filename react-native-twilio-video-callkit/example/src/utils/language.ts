import codes from 'iso-language-codes';
import { LangType } from 'src/redux/rootActions';

export type ISOLangCode = {
  iso639_1: string;
  iso639_2B: string;
  iso639_2T: string;
  name: string;
  nativeName: string;
};

export function getLanguageList(language: LangType[]): string[] {
  let resultObject: string[] = [];
  for (let j = 0; j < language.length; j++) {
    const element = language[j];
    search(element.language, codes);
  }
  function search(nameKey: string, codeList: ISOLangCode[]) {
    if (codeList && codeList.length) {
      codeList.forEach(element => {
        if (element.iso639_2B === nameKey) {
          let oneWord = element.name.split(',')[0];
          resultObject.push(oneWord);
        }
      });
    }
  }
  return resultObject;
}
