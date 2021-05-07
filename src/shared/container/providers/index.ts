import { container } from "tsyringe";
import IDateProvider from "../../providers/dateProvider/IDateProvider";
import DayjsDateProvider from "../../providers/dateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)