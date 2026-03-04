import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmNestConfig } from '../../ormconfig';

export default function initializeDatabase(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    useFactory: () => typeOrmNestConfig,
  });
}
