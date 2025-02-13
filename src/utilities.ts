import { pool } from "./dbconnection";


export const checkUser = async(userId:number)=>{
    try {
        const query = `SELECT count(*) FROM users WHERE user_id = $1`

        const result = await pool.query(query, [userId]);
        if(result.rows[0].count === 0){
            throw new Error('User not found')
        }
    } catch (error) {
        console.error(error);;
        throw new Error('User not found')
    }
}


export const checkCategory = async(category_name:string):Promise<boolean> =>{
    try {
        const query = `SELECT count(*) FROM category WHERE category_name = $1`

        const result = await pool.query(query, [category_name]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking category')
    }
}

export const checkSubcategory = async(subcategory_name:string, category_id:number):Promise<boolean> =>{
    try {
        const query = `SELECT count(*) FROM subcategory WHERE name = $1 AND category_id = $2`

        const result = await pool.query(query, [subcategory_name, category_id]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking subcategory')
    }
}

export const checkAttribute = async(attribute_name:string, subcategory_id:number):Promise<boolean> =>{
    try {
        const query = `SELECT count(*) FROM attributes WHERE name = $1 AND subcategory_id = $2`

        const result = await pool.query(query, [attribute_name, subcategory_id]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking attribute')
    }
}

export const checkCategory_byId  = async(categoryId:number)=>{
    try {
        const query = `SELECT count(*) FROM categories WHERE category_id = $1`
        const result = await pool.query(query, [categoryId]);
       if(parseInt(result.rows[0].count) === 0){
        throw new Error('Category not found')
       }
    } catch (error) {
        console.error(error);
        throw new Error('Error checking category by id')
    }
}

export const checkSubcategory_byId  = async(subcategoryId:number)=>{
    try {
        const query = `SELECT count(*) FROM subcategories WHERE subcategory_id = $1`
        const result = await pool.query(query, [subcategoryId]);
        if(parseInt(result.rows[0].count)===0){
            throw new Error('Subcategory not found')
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error checking subcategory by id')
    }
}

export const checkAttribute_byId  = async(attributeId:number)=>{
    try {
        const query = `SELECT count(*) FROM attributes WHERE attribute_id = $1`
        const result = await pool.query(query, [attributeId]);
        if(parseInt(result.rows[0].count)===0){
            throw new Error('Attribute not found')
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error checking attribute by id')
    }
}


export const checkAdmin = async(userId:number):Promise<boolean>=>{
    try {
        const query = `SELECT role FROM users WHERE user_id = $1;`
        const result = await pool.query(query, [userId]);
        if(result.rows[0].role!== 'admin'){
            return false
        }
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking admin')
    }
}