import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
   title:String,
   category:String,
   description:String,
   price:Number,
   topPrice:Number,
   imgUrl:String
});

const Product = mongoose.model('Product', productSchema);

export default Product