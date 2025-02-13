import { Router } from "express";
import { add_valueto_attribute, create_store_category, createProductAttribute, CreateProductCategory, CreateProductSubcategory, delete_attribute, Delete_category, delete_subcategory, getAllAttributes_byID, GetAllAttributeswithvalue, GetAllCategoryOfProduct, GetallSelles, GetAllSubcategoryOfProduct, GetEverything, update_attribute, update_category, update_subcategory, update_value, UpdateRole } from "./controller";

const router:Router = Router()

router.put('/updaterole',UpdateRole)

router.post('/createproductcategory',CreateProductCategory)

router.post('/createproductsuncategory',CreateProductSubcategory)

router.post('/createproductattribute',createProductAttribute)

router.get('/getallcategory',GetAllCategoryOfProduct)

router.get('/getsubcategory',GetAllSubcategoryOfProduct)

router.get('/getallattribute',getAllAttributes_byID)

router.get('/getallattributewithvalue',GetAllAttributeswithvalue)

router.get('/getall',GetEverything)

router.get('/getallsellers',GetallSelles)

router.post('/createstorecategory',create_store_category)

router.delete('/deletecategory',Delete_category)

router.delete('/deletesubcategory',delete_subcategory)

router.delete('/deleteattribute',delete_attribute)

router.put('/updatecategory',update_category)

router.put('/updatesubcategory',update_subcategory)

router.put('/updateattribute',update_attribute)

router.put('/updatevalue',update_value)

router.put('/add_value',add_valueto_attribute)


export default router;