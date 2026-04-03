import sql from '../config/db.js'

export const getProducts = async (req, res) => {
    
    try {
        const products = await sql `
            SELECT * FROM products
            ORDER BY created_at DESC
            `;

            console.log(products);
            res.status(200).json({success:true, data:products});
    } catch(error){
        console.log('Error in getProducts function ', error);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}

export const getProduct = async (req, res) => {
    res.send('Hello from GET getProduct');
}

export const createProduct = async (req, res) => {
    
    const {name, price, image} = req.body;
    if(!name, !price, !image) {
        return res.status(400).json({success:false, message:'All fields are required.'})
    }

    try {

    } catch(error) { 
        console.log('Error in createProduct function ', error);
        res.status(500).json({success:false, message:'Internal server error'});
    }





   
}

export const updateProduct = async (req, res) => {
    res.send('Hello from PUT updateProducts');
}

export const deleteProduct = async (req, res) => {
    res.send('Hello from DELETE deleteProduct');
}