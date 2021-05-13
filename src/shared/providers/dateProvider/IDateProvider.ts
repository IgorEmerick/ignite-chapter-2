export default interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): Promise<number>;
  compareInDays(start_date: Date, end_date: Date): Promise<number>;
}
