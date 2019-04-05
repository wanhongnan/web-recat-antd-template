
export default interface IValidity{
  validate(value: string) : boolean;
  error() : string;
}
