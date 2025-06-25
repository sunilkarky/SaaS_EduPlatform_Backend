import { Response } from "express";
import { IExtendedRequest } from "../../../../middleware/type";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class categoryController {
    static async getAllCategories(req:IExtendedRequest, res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const [categories] = await sequelize.query(`SELECT * FROM category_${instituteNumber}`);
        res.status(200).json({  
            message: "Categories fetched successfully",
            data: categories
        });
    }
    static async createCategory(req:IExtendedRequest, res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        if (!req.body) {
            res.status(400).json({
                message: "Please provide category details in the request body"
            });
            return;
        }
        const { categoryName, categoryDescription } = req.body;
        if (!categoryName || !categoryDescription) {
            res.status(400).json({
                message: "Please provide all fields: categoryName, categoryDescription"
            });
            return;
        }
        await sequelize.query(`INSERT INTO category_${instituteNumber} (categoryName, categoryDescription) VALUES (?, ?)`, {
            replacements: [categoryName, categoryDescription]
        });
        res.status(201).json({
            message: "Category created successfully"
        });
    }
    static async getSingleCategory(req:IExtendedRequest, res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(400).json({
                message: "Please provide category ID in the request parameters"
            });
            return;
        }
        const category = await sequelize.query(`SELECT * FROM category_${instituteNumber} WHERE id=?`, {
            type: QueryTypes.SELECT,
            replacements: [categoryId]
        });
        if (category.length === 0) {
            res.status(404).json({
                message: "Category not found with that id"
            });
            return;
        }
        res.status(200).json({
            message: "Category fetched successfully",
            data: category[0]
        });
    }
    static async deleteCategory(req:IExtendedRequest, res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(400).json({
                message: "Please provide category ID in the request parameters"
            });
            return;
        }
        const [category] = await sequelize.query(`SELECT * FROM category_${instituteNumber} WHERE id=?`, {
            type: QueryTypes.SELECT,
            replacements: [categoryId]
        });
        if (!category) {
            res.status(404).json({
                message: "Category not found with that id"
            });
            return;
        }
        await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id=?`, {
            type: QueryTypes.DELETE,
            replacements: [categoryId]
        });
        res.status(200).json({
            message: "Category deleted successfully"
        });
    }
    
}

export default categoryController;