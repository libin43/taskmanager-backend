import bcryptjs from "bcryptjs"

export const bcryptService = {
    generateHash: async(value: string) => {
        const salt = await bcryptjs.genSalt(10)
        const hashValue = await bcryptjs.hash(value, salt)
        return hashValue
    },

    compareHashedValue: (value: string, hashedValue: string) => {
        return bcryptjs.compare(value, hashedValue)
    }
}
