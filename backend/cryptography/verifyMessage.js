import crypto from 'crypto'
import fs from 'fs'
import decryptWithPublicKey from './decrypt.js'
import packageOfData from './signMessage.js'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hash = crypto.createHash(packageOfData.algorithm)

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8')

const verifyMessage = decryptWithPublicKey(privateKey, packageOfData.signedAndEncryptedData)

const decryptedMessageHex = verifyMessage.toString()

const hashOfOriginal = hash.update(JSON.stringify(packageOfData.originalData))
const hashofOriginalHex = hash.digest('hex')

if(hashofOriginalHex === decryptedMessageHex) {
    console.log("success")
} else {
    console.log("failed")
}