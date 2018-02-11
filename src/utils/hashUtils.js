import bcrypt from 'bcrypt';

const SALT_ROUND = process.env.SALT_ROUND;

export function hashText(plainText) {
  return bcrypt.hashSync(plainText, SALT_ROUND);
}

export function compare(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}
