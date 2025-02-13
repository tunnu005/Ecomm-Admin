import { Request, RequestHandler, Response } from "express";
import { CreateAttributes, CreateCategory, CreateStoreCategory, CreateSubcategory, CreateValueOfAttribute, DeleteAttribute, DeleteCategory, DeletesubCategory, GetAll, GetAllAttributeandValue, GetAllAttributes, GetAllCategory, GetAllSeller, GetAllSubcategory, UpdateAttribute, updateAttributeValue, UpdateCategory, UpdateSubcategory, UpdateUserRole } from "./queries";

/*
    update user Role,
    create category,
    create subcategory,
    create attributes,
   


*/


export const UpdateRole:RequestHandler = async(req:Request,res:Response) =>{
    const userId = parseInt(req.params.userId)
    
    const { role} = req.body;
    try {
        if(!userId ||!role){
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        await UpdateUserRole(userId,role);
        res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating user role"})
    }
}


export const CreateProductCategory:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const adminId = (req as any).adminId; // Ensure `adminId` is coming from middleware

        if (!name || !description || !adminId) {
             res.status(400).json({ message: "Name and description are required" });
             return
        }

        await CreateCategory(name, description, adminId);
         res.status(201).json({ message: "Product category created successfully" });

    } catch (error) {
        console.error("Error creating product category:", error);
         res.status(500).json({ message: "Error creating product category", error: (error as Error).message });
    }
};

export const CreateProductSubcategory:RequestHandler = async(req:Request, res: Response) =>{
    const { categoryId, name, description } = req.body;
    const adminId = (req as any).adminId; // Ensure `adminId` is coming from middleware
    try {
        if(!categoryId ||!name ||!description || !adminId){
            res.status(400).json({ message:'All fields are required'})
            return
        }
        await CreateSubcategory(categoryId, name, description,adminId);
        res.status(201).json({ message:'Product subcategory created successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message:'Error creating product subcategory'})
    }
}

export const createProductAttribute:RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const { categoryId, subcategoryId, name, description, attribute_type_id, values } = req.body;
        const adminId = (req as any).adminId; // Ensure adminId is extracted properly

        // Validate required fields
        if (!userId || !categoryId || !subcategoryId || !name || !attribute_type_id || !values || !Array.isArray(values)) {
             res.status(400).json({ message: "Invalid input. Ensure all required fields are provided." });
             return;
        }

        // Create attribute and get its ID
        const attribute_id = await CreateAttributes(userId, categoryId, subcategoryId, name, description, attribute_type_id, adminId);

        // Create attribute values
        for (let i = 0; i < values.length; i++) {
            await CreateValueOfAttribute(attribute_id, values[i], adminId);
        }

         res.status(201).json({ message: "Product attribute created successfully" });

    } catch (error) {
        console.error("Error creating product attribute:", error);
         res.status(500).json({ message: "Error creating product attribute", error: (error as Error).message });
    }
};

export const GetAllCategoryOfProduct:RequestHandler = async(req:Request, res:Response) =>{

    try {
        const productCategory = await GetAllCategory();
        res.status(200).json(productCategory)
    } catch (error) {
        console.error()
        res.status(500).json({message:"error getting productscategory"})
    }
}

export const GetAllSubcategoryOfProduct:RequestHandler = async(req:Request, res:Response) =>{

    const categoryId = parseInt(req.params.categoryId);

    try {
        if(!categoryId){
            res.status(400).json({ message:'categoryId is required'})
            return
        }
        const productsubCategory = await GetAllSubcategory(categoryId);
        res.status(200).json(productsubCategory)  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error getting productssubcategory"})
    }
}


export const getAllAttributes_byID:RequestHandler = async(req: Request, res: Response) =>{
    const categoryId = parseInt(req.params.categoryId)
    const subCategoryId = parseInt(req.params.subCategoryId)

    try {
        if(!categoryId ||!subCategoryId){
            res.status(400).json({ message:'categoryId and subcategoryId are required'})
            return
        }
        const AllAttributes = await GetAllAttributes(categoryId,subCategoryId);
        res.status(200).json(AllAttributes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error getting attributes'})
    }
}

export const GetAllAttributeswithvalue:RequestHandler = async(req: Request, res: Response) =>{
    

    try {
        
        const attributes = await GetAllAttributeandValue();
        res.status(200).json(attributes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error getting attributes with value'})
    }
}

export const GetEverything:RequestHandler = async(req:Request,res:Response) =>{

    try {
        const All = await GetAll();
        res.status(200).json(All);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error getting everything'})
    }
}

export const GetallSelles:RequestHandler = async(req:Request, res:Response) =>{
    try {
        const selles = await GetAllSeller();
        res.status(200).json(selles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error getting all sellers'})
    }
}

export const create_store_category:RequestHandler = async(req: Request, res: Response) =>{

    const { name, description} = req.body;
    const adminId = (req as any).adminId

    try {
        if(!name ||!description){
            res.status(400).json({ message:'All fields are required'})
            return
        }
        await CreateStoreCategory(name, description,adminId);
        res.status(201).json({ message:'Store category created successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating store category"})
    }
}

export const Delete_category:RequestHandler = async(req:Request, res:Response) =>{

    const categoryId = parseInt(req.params.categoryId);

    try {
        if(!categoryId){
            res.status(400).json({ message:'categoryId is required'})
            return
        }
        await DeleteCategory(categoryId)
        res.status(200).json({ message:'Category deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting category"})
    }
}

export const update_category:RequestHandler = async(req:Request,res:Response)=>{
    const categoryId = parseInt(req.params.categoryId);
    const { name, description} = req.body;

    try {
        if(!categoryId ||!name ||!description){
            res.status(400).json({ message:'categoryId, name and description are required'})
            return
        }
        await UpdateCategory(categoryId, name, description);
        res.status(200).json({ message:'Category updated successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating category"})
    }
}

export const delete_subcategory:RequestHandler = async(req:Request,res:Response)=>{
    const subcategoryId = parseInt(req.params.subcategoryId);

    try {
        if(!subcategoryId){
            res.status(400).json({ message:'subcategoryId is required'})
            return
        }
        await DeletesubCategory(subcategoryId)
        res.status(200).json({ message:'Subcategory deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting subcategory"})
    }
}

export const update_subcategory:RequestHandler = async(req:Request,res:Response)=>{
    const subcategoryId = parseInt(req.params.subcategoryId);
    const { name, description,category_id} = req.body;

    try {
        if(!subcategoryId ||!name ||!description ||!category_id){
            res.status(400).json({ message:'subcategoryId, name, description and category_id are required'})
            return
        }
        await UpdateSubcategory(subcategoryId, name, description,category_id);
        res.status(200).json({ message:'Subcategory updated successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating subcategory"})
    }
}

export const delete_attribute:RequestHandler = async(req: Request, res: Response) =>{
    const attributeId = parseInt(req.params.attributeId);

    try {
        if(!attributeId){
            res.status(400).json({ message:'attributeId is required'})
            return
        }
        await DeleteAttribute(attributeId)
        res.status(200).json({ message:'Attribute deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting attribute"})
    }
}

export const update_attribute:RequestHandler = async(req:Request,res:Response)=>{
    const attributeId = parseInt(req.params.attributeId);
    const { name, description, attribute_type_id, subcategory_id,category_id} = req.body;

    try {
        if(!attributeId ||!name ||!description ||!attribute_type_id ||!subcategory_id ||!category_id){
            res.status(400).json({ message:'attributeId, name, description, attribute_type_id, subcategory_id and category_id are required'})
            return
        }
        await UpdateAttribute(attributeId, name, description, attribute_type_id, subcategory_id,category_id);
        res.status(200).json({ message:'Attribute updated successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating attribute"})
    }
}

export const update_value:RequestHandler = async(req:Request, res:Response)=>{
    const valueId = parseInt(req.params.valueId);
    const { value} = req.body;
    try {
        if(!valueId ||!value){
            res.status(400).json({ message:'valueId and value are required'})
            return
        }
        await updateAttributeValue(valueId,value)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error updating value'})
    }
}

export const add_valueto_attribute:RequestHandler = async(req:Request, res:Response)=>{
    const attributeId = parseInt(req.params.attributeId);
    const { value} = req.body;
    const adminId = (req as any).adminId

    try {
        if(!attributeId ||!value){
            res.status(400).json({ message:'attributeId and value are required'})
            return
        }
        await CreateValueOfAttribute(attributeId, value,adminId)
        res.status(201).json({ message:'Value added to attribute successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Error creating value to attribute'})
    }
}