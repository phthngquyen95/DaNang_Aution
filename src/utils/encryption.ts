import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto
  .createHash('sha256')
  .update(String(process.env.ENCRYPTION_KEY))
  .digest(); // 32 bytes
const iv = Buffer.alloc(16, 0); // khởi tạo IV tĩnh (nên thay bằng IV ngẫu nhiên để tăng bảo mật)

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  return encrypted.toString('hex');
}

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}
