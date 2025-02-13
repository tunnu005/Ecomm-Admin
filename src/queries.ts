import { pool } from "./dbconnection";
import { checkAttribute_byId, checkCategory, checkCategory_byId, checkSubcategory_byId } from "./utilities";
/*
    update user Role,
    create category,
    create subcategory,
    create attributes,
    create attribute value types,


*/

interface category {
    category_id: number,
    category_name: string,
    description: string

}

interface subcategory{
    subcategory_id: number,
    name: string,
    description: string,
    category_id: number
}


interface attribute{
    attribute_id: number,
    category_id: number,
    name: string,
    description: string,
    attribute_type_id: number,
    subcategory_id: number,
    admin:number
}

interface attributeandvalues {
    attribute_id: number,
    category_id: number,
    name: string,
    description: string,
    attribute_type_id: number,
    subcategory_id: number,
    admin:number,
    value:string,
}

interface all {
    category_name: string,
    description: string,
    subcategory_name: string,
    attribute_name: string,
    value:string
}

interface Seller {
    seller_id: number;
    user_id: number;
    adharcard_number: string;
    pancard_number: string;
    kyc_number: string;
    kyc_status: boolean;
    bussiness_register_number: string;
    gst_number: string;
    verification_status: string;

}


export const UpdateUserRole = async (userId: number, role: string) => {
    try {
        const query = `
        UPDATE "User"
        SET "role" = $2
        WHERE "user_id" = $1
    `;

        await pool.query(query, [userId, role]);
    } catch (error) {
        console.error(error);
        throw new Error('Error updating user role');
    }
}

export const CreateCategory = async (name: string, description: string,adminId:number) => {
    try {
        const query = `
        INSERT INTO "category" ("category_name", "description","admin_id")
        VALUES ($1, $2,$3)
    `;

        await pool.query(query, [name, description,adminId]);
    } catch (error) {
        console.error(error);
        throw new Error('Error creating category');
    }
}

export const CreateSubcategory = async (categoryId: number, name: string, description: string,adminId:number) => {

    try {
        const query = `
        INSERT INTO "subcategory" ("category_id", "name", "description","admin_id")
        VALUES ($1, $2, $3, $4)
    `;

        await pool.query(query, [categoryId, name, description,adminId]);
    } catch (error) {
        console.error(error);
        throw new Error('Error creating subcategory');
    }
}

export const CreateAttributes = async (userId: number, categoryId: number, subcategoryId: number, name: string, description: string, attribute_type_id: string,adminId:number):Promise<number> => {
    try {
        const query = `
        INSERT INTO "attributes" 
        ("user_id", "categoryId", "subcategoryId", "name", "description", "attribute_type_id","admin_id")
        VALUES ($1, $2, $3, $4, $5,$6,$7)
    `

        const value = [userId, categoryId, subcategoryId, name, description, attribute_type_id,adminId]

        return (await pool.query(query, value)).rows[0].attribute_id;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating attribute');
    }
}

export const GetAllCategory = async ():Promise<category[] | []> => {
    try {
        const query = `
        SELECT * FROM "category"
    `

        return (await pool.query(query)).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all category');
    }
}

export const GetAllSubcategory = async (categoryId: number):Promise<subcategory[] | []> => {

    try {
        await checkCategory_byId(categoryId);
        const query = `
    SELECT * FROM "subcategory" WHERE "categoryId" = $1
`
        return (await pool.query(query, [categoryId])).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all subcategory');
    }
}

export const GetAllAttributes = async (categoryId: number, subcategoryId: number):Promise<attribute[] | []> => {
    try {
        await checkCategory_byId(categoryId);
        await checkSubcategory_byId(subcategoryId);
        const query = `
    SELECT * FROM "attributes" WHERE "categoryId" = $1 AND "subcategoryId" = $2
`
        return (await pool.query(query, [categoryId, subcategoryId])).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all attributes');
    }
}

export const GetAllAttributeType = async () => {
    try {
        const query = `
        SELECT * FROM "attribute_type"
    `
        return (await pool.query(query)).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all attribute type');
    }
}

export const CreateValueOfAttribute = async (attribute_id: number, value: string,adminId:number) => {
    try {
        await checkAttribute_byId(attribute_id);
        const query = `
        INSERT INTO "value" ("attribute_id", "value","admin_Id")
        VALUES ($1, $2,$3)
    `

        await pool.query(query, [attribute_id, value,adminId]);
    } catch (error) {
        console.error(error);
        throw new Error('Error creating attribute value');
    }
}



export const GetAllAttributeandValue = async ():Promise<attributeandvalues[] | []> => {
    try {
        const query = `
        SELECT a.*, v.value 
        FROM "attributes" a 
        JOIN "value" v ON a.attribute_id = v.attribute_id
    `
        return (await pool.query(query)).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all attribute and value');
    }
}

export const GetAll = async ():Promise<all[] | []> => {

    try {
        const query = `
    SELECT 
 c.category_name AS category_name, 
 c.description as category_description,
 s.name AS subcategory_name, 
 a.name AS attribute_name, 
 v.value 
FROM "attributes" a  
JOIN "value" v ON a.attribute_id = v.attribute_id  
JOIN "subcategory" s ON a.subcategory_id = s.subcategory_id  
JOIN "category" c ON s.category_id = c.category_id;
 `

        return (await pool.query(query)).rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all');
    }
}

export const GetAllSeller = async ():Promise<Seller[] | []> => {

    try {
        const query = `
    SELECT * FROM "Seller";
`
        return (await pool.query(query)).rows;
    } catch (error) {
        console.error(error)
        throw new Error('Error getting all seller')
    }
}

export const CreateStoreCategory = async (name: string, description: string,adminId:number) => {
    try {
        const query = `
        INSERT INTO "storecategory" 
        ("name", "description","admin_id")
    `

        await pool.query(query, [name, description,adminId]);
    } catch (error) {
        console.error(error)
        throw new Error('Error creating store category')
    }
}

export const DeleteCategory = async (category_id: number) => {

    try {
        await checkCategory_byId(category_id)
        const query = `
        DELETE FROM "Category" WHERE "category_id" = $1;
    `

        await pool.query(query, [category_id]);
    } catch (error) {
        console.error(error)
        throw new Error('Error deleting category')
    }
}

export const UpdateCategory = async (category_id: number, name: string, description: string) => {

    try {
        await checkCategory_byId(category_id)
        const query = `
        UPDATE "Category" 
        SET "name" = $2, "description" = $3
        WHERE "category_id" = $1;
    `
        await pool.query(query, [category_id, name, description]);
    } catch (error) {
        console.error(error)
        throw new Error('Error updating category')
    }
}

export const DeletesubCategory = async (subcategory_id: number) => {
    try {
        const query = `
        DELETE FROM "subcategory" WHERE "subcategory_id" = $1;
    `
        await pool.query(query, [subcategory_id]);
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting subcategory');
    }
}

export const UpdateSubcategory = async (subcategory_id: number, name: string, description: string, category_id: number) => {
    try {
        const query = `
        UPDATE "subcategory" 
        SET "name" = $2, "description" = $3, "category_id" = $4
        WHERE "subcategory_id" = $1;
    `
        await pool.query(query, [subcategory_id, name, description, category_id]);
    } catch (error) {
        console.error(error);
        throw new Error('Error updating subcategory');
    }
}

export const DeleteAttribute = async (attribute_id: number) => {
    try {
        const query = `
        DELETE FROM "attributes" WHERE "attribute_id" = $1;
    `
        await pool.query(query, [attribute_id]);
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting attribute');
    }
}

export const UpdateAttribute = async (attribute_id: number, name: string, description: string, subcategory_id: number, attribute_type_id: string, categoryId: number) => {
    try {
        const query = `
        UPDATE "attributes"
        SET "name" = $2, "description" = $3, "subcategory_id" = $4, "attribute_type_id" = $5, "categoryId" = $6
        WHERE "attribute_id" = $1;
    `
        await pool.query(query, [attribute_id, name, description, subcategory_id, attribute_type_id, categoryId]);
    } catch (error) {
        console.error(error);
        throw new Error('Error updating attribute');
    }
}

export const updateAttributeValue = async (valueId: number, value: string) => {
    try {
        const query = `
        UPDATE "value" 
        SET "value" = $2
        WHERE "value_id" = $1;
    `
    await pool.query(query, [valueId, value]);
    } catch (error) {
        console.error(error);
        throw new Error('Error updating attribute value');
    }
}

