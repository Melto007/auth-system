import crypto from 'crypto'

function encryptWithPublicKey(publicKey, message) {
    const bufferMessage = Buffer.from(message, 'utf-8')
    return crypto.publicEncrypt(publicKey, bufferMessage)
}
export default encryptWithPublicKey