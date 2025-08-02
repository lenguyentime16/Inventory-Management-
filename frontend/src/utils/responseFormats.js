// Backend Response Format Analysis
// Based on the Swagger documentation image

/**
 * Backend Response Format:
 * {
 *   "statusCode": 200,
 *   "message": "Success", 
 *   "data": {
 *     "access_token": "eyJ3bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 * }
 * 
 * For other endpoints, the format should be similar:
 * {
 *   "statusCode": 200,
 *   "message": "Success",
 *   "data": [products] | product | [categories] | category
 * }
 */

// Test login response format
export const testLoginResponse = {
    statusCode: 200,
    message: "Success",
    data: {
        access_token: "eyJ3bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
};

// Expected products response format
export const testProductsResponse = {
    statusCode: 200,
    message: "Success",
    data: [
        {
            id: "uuid",
            name: "Product Name",
            description: "Product Description",
            quantity: 10,
            price: 99.99,
            categoryId: "category-uuid",
            category: {
                id: "category-uuid",
                name: "Category Name"
            }
        }
    ]
};

// Expected categories response format
export const testCategoriesResponse = {
    statusCode: 200,
    message: "Success",
    data: [
        {
            id: "uuid",
            name: "Category Name",
            description: "Category Description"
        }
    ]
};
