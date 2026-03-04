import { DataSource } from 'typeorm';
import { Image } from '../src/modules/image/entities/image.entity';

export async function seedImages(dataSource: DataSource) {
  const repo = dataSource.getRepository(Image);

  const exists = await repo.findOneBy({ publicId: 'sample-public-id' });
  if (!exists) {
    const image = repo.create({
      url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      publicId: 'sample-public-id',
      type: 'image/jpeg',
      size: 123456,
    });
    await repo.save(image);
    console.log('✅ Seeded 1 image');
  }
}
