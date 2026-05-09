const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String 
    },
    processingTime: { 
        type: String // <--- අනිවාර්යයෙන්ම මේක මෙතන තියෙන්න ඕනේ!
    },
    imageUrl: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);