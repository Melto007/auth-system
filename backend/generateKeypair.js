import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateKeypair() {
    const keypair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keypair.publicKey)

    fs.writeFileSync(__dirname + '/id_rsa_private.pem', keypair.privateKey)
}
generateKeypair()