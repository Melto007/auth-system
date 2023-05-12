import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
        },
        hash: {
            type: String,
        },
        salt: {
            type: String
        },
        admin: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)
export default mongoose.model('User', userSchema)