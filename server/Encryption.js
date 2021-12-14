const crypto = require('crypto');
const secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function Encrypt(password)
{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(secret),iv);

    const encryptedpassword = Buffer.concat([cipher.update(password),cipher.final()]);

    return {iv: iv.toString("hex"), password: encryptedpassword.toString("hex")};
}

function Decrypt(encrypted)
{
    const decipher = crypto.createDecipheriv('aes-256-ctr',Buffer.from(secret),Buffer.from(encrypted.iv,"hex"));
    const decryptedpassword = Buffer.concat([decipher.update(Buffer.from(encrypted.password,"hex")),decipher.final()]);
    return decryptedpassword.toString();
}

module.exports = {Encrypt, Decrypt};