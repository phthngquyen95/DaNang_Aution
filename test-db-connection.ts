import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  console.log('🔍 Đang kiểm tra kết nối database...\n');
  
  console.log('📋 Thông tin kết nối:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   Database: ${process.env.DB_NAME}\n`);

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
    console.log('✅ Kết nối database thành công!');
    
    // Test query
    const result = await dataSource.query('SELECT VERSION() as version');
    console.log(`📊 MySQL Version: ${result[0].version}`);
    
    // List tables
    const tables = await dataSource.query('SHOW TABLES');
    console.log(`\n📁 Số lượng bảng trong database: ${tables.length}`);
    
    await dataSource.destroy();
    console.log('\n✅ Test hoàn tất!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', (error as Error).message);
    process.exit(1);
  }
}

testDatabaseConnection();
