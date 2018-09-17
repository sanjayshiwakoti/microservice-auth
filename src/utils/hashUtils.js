import bcrypt from 'bcrypt';

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

export function hashText(plainText) {
  let salt = bcrypt.genSaltSync(SALT_ROUND);

  return bcrypt.hashSync(plainText, salt);
}

export function compare(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}
