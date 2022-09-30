export default interface IStrategy{
  environment:number[][];
  PickPosition():number[];
  UpdateEnvironment(env:number[][]):void;
}
