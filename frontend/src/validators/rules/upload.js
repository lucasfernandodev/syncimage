export const rules = {
    Title: {
        min: 4,
        max: 16,
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Privacy: {
        type: String,
        required: true
    },
    Description: {
        min: 8,
        max: 300,
        type: String,
        required: true
    },
    EditionOn: {
        type: Boolean,
        required: false
    },
}