import { DataSource } from 'typeorm';
import { ImageRelation } from '../src/modules/image-relation/entities/image-relation.entity';
import { Image } from '../src/modules/image/entities/image.entity';

export async function seedImageRelations(dataSource: DataSource) {
  const relationRepo = dataSource.getRepository(ImageRelation);
  const imageRepo = dataSource.getRepository(Image);

  const image = await imageRepo.findOneBy({ publicId: 'sample-public-id' });
  if (!image) {
    console.warn('⚠️ Missing image to relate');
    return;
  }

  const exists = await relationRepo.findOneBy({
    imageId: image.id,
    imageFkId: 1,
  });

  if (!exists) {
    const relation = relationRepo.create({
      imageId: image.id,
      imageFkId: 1,
    });
    await relationRepo.save(relation);
    console.log('✅ Seeded 1 image relation');
  }
}
