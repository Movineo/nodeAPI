import prisma from "../db";

//Get all products
export const getProducts = async (req, res) => {
   const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            products: true
        }
    });

    res.json({ data: user.products });
};

//Get a single product
export const getProduct = async (req, res) => {
   const id = req.params.id;

   const product = await prisma.product.findFirst({
    where:{
        id,
        belongsToId: req.user.id
    }
});
  
    res.json({ data: product });
};

export const createProduct = async (req, res,next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });
        res.json({ data: product });
    }catch(e){
        next(e);

    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;

    const updated = await prisma.product.update({
        where:{
            id
        },
        data:{
            name: req.body.name
        }
    });

    res.json({ data: updated });
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    await prisma.product.delete({
        where:{
            id,
            belongsToId: req.user.id
        }
    });

    res.json({ message: "Product deleted" });
}