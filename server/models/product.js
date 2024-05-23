import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
   title: String,
   category: String,
   description: String,
   price: Number,
   topPrice: Number,
   imgUrl: String
});

productSchema.virtual('discount').get(function () {
   return ((this.topPrice - this.price) / this.topPrice);
});

const Product = mongoose.model('Product', productSchema);

export default Product