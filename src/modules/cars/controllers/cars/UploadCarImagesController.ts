import { Request, Response } from "express";
import { container } from "tsyringe";
import UploadCarImageService from "../../services/cars/UploadCarImageService";

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { car_id } = req.params;
    const images = req.files as IFiles[];
    const uploadCarImagesService = container.resolve(UploadCarImageService);

    const images_name = images.map(file => file.filename);

    await uploadCarImagesService.execute({ car_id, images_name, });

    return res.status(201).send();
  }
}