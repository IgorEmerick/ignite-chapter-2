import csvParse from "csv-parse";
import fs from "fs";

import { Category } from "../model/Category";
import CreateCategoryService from "./CreateCategoryService";

export default class ImportCategoriesService {
  private categories: Category[] = [];

  // eslint-disable-next-line prettier/prettier
  constructor(private createCategoryService: CreateCategoryService) { }

  public async execute(file: Express.Multer.File): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      const categories: Category[] = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          const category = this.createCategoryService.execute({
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
