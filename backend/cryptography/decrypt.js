import crypto from 'crypto'

function decryptWithPublicKey(privateKey, encryptedMessage) {
    return crypto.privateDecrypt(privateKey, encryptedMessage)
}
export default decryptWithPublicKey