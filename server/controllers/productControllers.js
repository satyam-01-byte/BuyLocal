import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc: get categorical products
//@command: GET /api/products/:cat
//@access: PUBLIC
const getCatProducts = asyncHandler(async (req, res) => {
  const category = req.params.cat;
  const catProducts = await Product.find({ type: category });
  //console.log(catProducts);
  if (length(catProducts)) res.json(catProducts);
  else {
    const subCatProducts = await Product.find({ subType: category });
    //console.log(subCatProducts);
    if (length(subCatProducts)) res.json(subCatProducts);
    else {
      res.status(400);
      throw new Error("No products found!");
    }
  }
});
//problems with this: /:cat doesn't work for categories with spaces in  their names
// so, maybe we could use ?cat="Atta, Flours and .."
//also, currently getting an error that length is not defined for processAndTicks something in Postman while getting categorical products,
// so unable to res.json(foundProducts)

export { getCatProducts };
