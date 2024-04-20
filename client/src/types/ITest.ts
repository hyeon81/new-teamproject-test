export interface ITest {
  id?: number;
  title: string;
  mainColor: string;
  backColor: string;
  description: string;
  questions?: IQuestion[];
  results?: IResult[];
}

export interface IQuestion {
  id?: number;
  option: string;
  question1: string;
  question2: string;
  answers: IAnswer[];
}

export interface IResult {
  id?: number;
  testId: number;
  subhead: string;
  nickname1: string;
  nickname2: string;
  img: string;
  description: string;
}

export interface IAnswer {
  id?: number | string;
  type: string; // E 또는 I
  content1: string;
  content2: string;
}
