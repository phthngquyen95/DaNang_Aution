import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1747438149515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(255),

        -- Thông tin cá nhân
        first_name VARCHAR(100),
        middle_name VARCHAR(100),
        last_name VARCHAR(100),
        gender ENUM('male', 'female', 'other'),
        dob DATE,
        province VARCHAR(100),
        district VARCHAR(100),
        ward VARCHAR(100),
        detailed_address VARCHAR(255),
        identity_number VARCHAR(255),
        identity_issue_date DATE,
        identity_issue_place VARCHAR(255),

        -- Tài khoản ngân hàng
        bank_account_number VARCHAR(100),
        bank_name VARCHAR(255),
        bank_account_holder VARCHAR(255),

        -- Phân loại tài khoản
        account_type ENUM('personal', 'organization') DEFAULT 'personal',

        -- Trạng thái & hệ thống
        verified BOOLEAN DEFAULT FALSE,
        role VARCHAR(255) NOT NULL,
        status ENUM('active', 'banned', 'suspended') DEFAULT 'active',
        reset_token VARCHAR(255),
        reset_token_expiry DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users
    `);
  }
}
