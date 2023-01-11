import { encrypt } from 'mongoose-field-encryption';
const crypto = require('crypto');

export function encryption(value){
    const saltGenerator = function (secret) {
      return process.env.SALT_GENERATOR_KEY;
    };
   const key = crypto
   .createHash('sha256')
   .update(process.env.ENCRYPT_SECRET_KEY)
   .digest('hex')
   .substring(0, 32);
   const res = encrypt(value, key, saltGenerator);
   return res;
}
      