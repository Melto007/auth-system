import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import decryptWithPublicKey from './decrypt.js'
import encryptWithPublicKey from './encrypt.js'

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8')
const encryptedMessage = encryptWithPublicKey(publicKey, 'Super secret message')
console.log(encryptedMessage.toString())

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8')
const decryptedMessage = decryptWithPublicKey(privateKey, encryptedMessage)
console.log(decryptedMessage.toString())