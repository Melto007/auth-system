import crypto from 'crypto'
const hash = crypto.createHash('sha256')
import fs from 'fs'
import encryptWithPublicKey from './encrypt.js'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const myData = {
    firstName: 'Shehin',
    lastName: 'Melto',
    greetings: 'Hello Melto..!'
}

const myDataString = JSON.stringify(myData)

hash.update(myDataString)

const hashedData = hash.digest('hex')

const senderPublicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8')

const signedMessage = encryptWithPublicKey(senderPublicKey, hashedData)

const packageOfData = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
}

export default packageOfData