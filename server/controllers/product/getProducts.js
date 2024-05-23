import expressAsyncHandler from "express-async-handler"
import Product from "../../models/product.js"

const getProducts = expressAsyncHandler(async (req, res) => {


    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20


    const skip = (page - 1) * limit

    const selected = req?.query?.selected

    const category = req.query.category

    if (selected === "mostPopular") {
        const products = await Product.find().skip(skip).limit(limit)
        res.send(products)

    } else if (selected === "bestSeller") {
        const products = await Product.find().skip(skip).limit(limit)
        res.send(products)
    } else {
        const products = await Product.find().sort("createdAt").skip(skip).limit(limit)
        res.send(products)
    }



})

export default getProducts


const getProductFilter = expressAsyncHandler(async (req, res) => {

    const { categories, discount, page = 1, pageSize = 10 } = req.query;

    // Construct the query object based on provided parameters
    const query = {};
    if (categories && Array.isArray(categories)) {
        query.category = { $in: categories };
    }
    if (discount) {
        query.$expr = { $lte: [{ $divide: [{ $subtract: ["$topPrice", "$price"] }, "$topPrice"] }, parseFloat(discount)] }

    }

    // Execute the query with pagination
    const products = await Product.find(query)
        .select('_id title price imgUrl topPrice description category discount')
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));

    res.json(products);

}

)

export { getProductFilter };



