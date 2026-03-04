import { MulterModule } from '@nestjs/platform-express';

export default () =>
  MulterModule.register({
    dest: 'uploads/',
    limits: {
      // fileSize: 1024 * 1024 * 5, // 5 MB
    },
    // fileFilter: (req, file, callback) => {
    //   const allowedMimeTypes = [
    //     'image/jpeg',
    //     'image/png',
    //     'image/gif',
    //     'image/webp',
    //     'image/svg+xml',
    //   ];

    //   if (allowedMimeTypes.includes(file.mimetype)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Invalid file type'), false);
    //   }
    // },
  });
