export const getAllProducts = async (req, res) => {
    res.send('Hello from GET getAllProducts');
}

export const createProduct = async (req, res) => {
    res.send('Hello from POST createProducts');
}

export const modifyProduct = async (req, res) => {
    res.send('Hello from PUT modifyProducts');
}

export const deleteProduct = async (req, res) => {
    res.send('Hello from DELETE deleteProduct');
}