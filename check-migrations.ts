import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkMigrations() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    await dataSource.initialize();
    console.log('📊 Kiểm tra migrations đã chạy:\n');
    
    const migrations = await dataSource.query('SELECT * FROM migrations ORDER BY timestamp DESC');
    
    if (migrations.length === 0) {
      console.log('⚠️  Chưa có migration nào được chạy');
    } else {
      migrations.forEach((m: any, index: number) => {
        console.log(`${index + 1}. ${m.name} (${new Date(m.timestamp).toLocaleString()})`);
      });
    }
    
    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Lỗi:', (error as Error).message);
  }
}

checkMigrations();
