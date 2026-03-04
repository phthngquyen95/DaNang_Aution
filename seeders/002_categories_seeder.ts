import { DataSource } from 'typeorm';
import { Category } from '../src/modules/category/entities/category.entity';

export async function seedCategories(dataSource: DataSource) {
  const repo = dataSource.getRepository(Category);

  const defaultCategories = [
    'Bất động sản',
    'Phương tiện - xe cộ',
    'Sưu tầm - nghệ thuật',
    'Thiết bị công nghiệp',
  ];

  for (const name of defaultCategories) {
    const exists = await repo.findOneBy({ name });
    if (!exists) {
      const cat = repo.create({
        name,
        description: `${name} - mô tả mặc định`,
      });
      await repo.save(cat);
      console.log(`✅ Seeded category: ${name}`);
    }
  }
}
