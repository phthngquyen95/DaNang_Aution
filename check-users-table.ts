import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkUsersTable() {
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
    
    const cols = await dataSource.query('DESCRIBE users');
    console.log('📋 Columns in users table:\n');
    cols.forEach((c: any) => {
      console.log(`  ${c.Field.padEnd(25)} ${c.Type.padEnd(20)} ${c.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
  }
}

checkUsersTable();
