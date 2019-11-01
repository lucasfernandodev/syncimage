export const rules = {
    Email: {
        min: 4,
        max: 32,
        type: String,
        required: true
    },
    Password: {
        min: 4,
        max: 12,
        type: String,
        required: true
    },
    isLogin: {
        type: Boolean,
        required: false
    },
}