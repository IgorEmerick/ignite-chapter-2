import csvParse from "csv-parse";
import fs from "fs";
import { injectable, container } from 'tsyringe';

import { Category } from "../../entities/Category";
import CreateCategoryService from "./CreateCategoryService";

@injectable()
export default class ImportCategoriesService {
  public async execute(file: Express.Multer.File): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      const categories: Category[] = [];
      const createCategoryService = container.resolve(CreateCategoryService);

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          const category = await createCategoryService.execute({
            description,
            name,
          });

          categories.push(category);
        })
        .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
