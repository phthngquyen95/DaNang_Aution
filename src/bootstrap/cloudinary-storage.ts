import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

export const CloudinaryStorageEngine = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'cccd_images',
    format: 'png',
    public_id: `${Date.now()}-${file.originalname}`,
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  }),
});
