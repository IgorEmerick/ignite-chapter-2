import { container } from "tsyringe";

import IDateProvider from "../../providers/dateProvider/IDateProvider";
import DayjsDateProvider from "../../providers/dateProvider/implementations/DayjsDateProvider";
import IMailProvider from "../../providers/mailProvider/IMailProvider";
import EtherealMailProvider from "../../providers/mailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IMailProvider>(
  "EtherealMailProvider",
  EtherealMailProvider
);
