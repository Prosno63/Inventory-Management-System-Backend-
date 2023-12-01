# Inventory-Management-System-Backend-

Link: https://inventory-management-system-backend.vercel.app/api/products

Documentation of the given API endpoints:

**POST /api/products**

* **Description:** Creates a new product
* **Request Body:**
    * `name`: The name of the product
    * `Brand`: The brand of the product
    * `description`: A description of the product
    * `Price`: The price of the product
    * `PhotoUrl`: The URL of the product's photo
* **Response:**
    * `status`: 201 Created if the product was created successfully
    * `data`: The newly created product object

**GET /api/products**

* **Description:** Retrieves all products
* **Response:**
    * `status`: 200 OK if products were found
    * `data`: An array of product objects

**GET /api/products/:id**

* **Description:** Retrieves a product by its ID
* **Path Parameters:**
    * `id`: The ID of the product to retrieve
* **Response:**
    * `status`: 200 OK if the product was found
    * `data`: The product object

**PUT /api/products/:id**

* **Description:** Updates a product by its ID
* **Path Parameters:**
    * `id`: The ID of the product to update
* **Request Body:**
    * `name`: The new name of the product (optional)
    * `Brand`: The new brand of the product (optional)
    * `description`: The new description of the product (optional)
    * `Price`: The new price of the product (optional)
    * `PhotoUrl`: The new URL of the product's photo (optional)
* **Response:**
    * `status`: 200 OK if the product was updated successfully
    * `data`: The updated product object

**DELETE /api/products/:id**

* **Description:** Deletes a product by its ID
* **Path Parameters:**
    * `id`: The ID of the product to delete
* **Response:**
    * `status`: 204 No Content if the product was deleted successfully
