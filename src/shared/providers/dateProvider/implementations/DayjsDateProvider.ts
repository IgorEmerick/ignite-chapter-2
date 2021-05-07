import IDateProvider from "../IDateProvider";
import dayjs from "dayjs";

export default class DayjsDateProvider implements IDateProvider {
  public async compareInHours(start_date: Date, end_date: Date): Promise<number> {
    const compare = dayjs(end_date).diff(start_date, "hours");

    return compare;
  }
}