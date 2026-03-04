import {
  Controller,
  Header,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { copyFileSync, mkdirSync } from 'fs';
import { format } from 'date-fns';

@Controller('api/images')
export class ImagesController {
  @Post('single')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    const { path, filename, originalname } = file;

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy/MM/dd');
    const destinationDir = `public/images/${formattedDate}`;
    const destinationFile = `${destinationDir}/${filename}_${originalname}`;
    console.log(`Path: `, path);
    console.log(`Destination: `, destinationFile);

    mkdirSync(destinationDir, { recursive: true });
    copyFileSync(path, destinationFile);

    return [file.originalname];
  }

  @Post('array')
  @UseInterceptors(FilesInterceptor('avatars'))
  uploadArrayOfFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(`Files: `, files);

    return files.map((file) => file.originalname);
  }

  @Post('multiple')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatars', maxCount: 10 },
      { name: 'backgrounds', maxCount: 3 },
    ]),
  )
  uploadMultipleFiles(
    @UploadedFiles()
    files: {
      avatars: Array<Express.Multer.File>;
      backgrounds: Array<Express.Multer.File>;
    },
  ) {
    console.log(`Avatars: `, files.avatars);
    console.log(`Backgrounds: `, files.backgrounds);

    return {
      avatars: files.avatars.map((file) => file.originalname),
      backgrounds: files.backgrounds.map((file) => file.originalname),
    };
  }
}
