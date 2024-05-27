import prisma from '../db'; // Corrected import statement

export const getUpdate = async (req, res) => {
    try {
        const id = req.params.id;

        const update = await prisma.update.findFirst({
            where: {
                id,
                product: {
                    belongsToId: req.user.id
                }
            },
            include: {
                product: true,
            }
        });

        if (!update) {
            return res.status(404).json({ message: 'Update not found' });
        }

        res.json({ data: update });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUpdates = async (req, res) => {
    try {
        const updates = await prisma.update.findMany({
            where: {
                product: {
                    belongsToId: req.user.id
                }
            },
            include: {
                product: true,
            }
        });

        res.json({ data: updates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUpdate = async (req, res) => {
    try {
        const { title, body, productId, asset } = req.body;

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
                belongsToId: req.user.id
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const update = await prisma.update.create({
            data: {
                title,
                body,
                asset,
                updatedAt: new Date(),
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        });

        res.status(201).json({ data: update });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, asset } = req.body;

        // Check if the update exists and belongs to a product of the current user
        const update = await prisma.update.findFirst({
            where: {
                id,
                product: {
                    belongsToId: req.user.id
                }
            }
        });

        if (!update) {
            return res.status(404).json({ message: 'Update not found' });
        }

        // Perform the update
        const updated = await prisma.update.update({
            where: {
                id
            },
            data: {
                title,
                body,
                asset,
                updatedAt: new Date()
            }
        });

        res.json({ data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the update exists and belongs to a product of the current user
        const update = await prisma.update.findFirst({
            where: {
                id,
                product: {
                    belongsToId: req.user.id
                }
            }
        });

        if (!update) {
            return res.status(404).json({ message: 'Update not found' });
        }

        // Perform the delete
        await prisma.update.delete({
            where: {
                id
            }
        });

        res.json({ message: "Update deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
