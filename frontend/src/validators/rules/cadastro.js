export const rules = {
    Username: {
        min: 4,
        max: 12,
        type: String,
        required: true
    },
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
    Termos: {
        type: Boolean,
        required: true
    },
}