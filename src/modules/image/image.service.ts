import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from 'cloudinary';
import * as streamifier from 'streamifier';

type CloudinaryUploadResponse = {
  message: string;
  user_id: string;
  file_name: string;
  url: string;
  public_id: string;
  mimetype: string;
  size: number;
};

@Injectable()
export class ImagesService {
  async storeCloudinaryImageTemp(
    userId: string,
    file: Express.Multer.File,
    side: 'front' | 'back',
  ): Promise<CloudinaryUploadResponse> {
    const uploadResult = await this.uploadToCloudinary(
      file,
      `cccd/${userId}`,
      `${side}_${Date.now()}`,
    );

    return {
      message: `Tải ảnh mặt ${side === 'front' ? 'trước' : 'sau'} thành công`,
      user_id: userId,
      file_name: file.originalname,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
    publicId?: string,
  ): Promise<UploadApiResponse> {
    const uploadOptions: UploadApiOptions = {
      folder,
      public_id: publicId ?? `${Date.now()}-${file.originalname}`,
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error || !result) {
            return reject(new Error(error?.message || 'Upload failed'));
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }
  async deleteFromCloudinary(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
