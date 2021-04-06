import fs from "fs";

export default class File {
  public async deleteFile(fileName: string) {
    try {
      await fs.promises.stat(fileName);
    } catch {
      return;
    }
    await fs.promises.unlink(fileName);
  }
}