import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

// Read JSON manually to avoid import assert issues in TS node
const productsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/lib/products.json'), 'utf8'));

const client = createClient({
    projectId: 'zhi2v4xf',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'ska2wpnaZE3eoXFxjFo93dtUXol2jWdNVPxw8IkjfMe4uoSWni4aACMEGmNlCbdh0hV8gGeWEFqZzTmAz0xnQdlseNtJqGBAhsFv4mBLdowjiefpXz1wzKC5g41MJSB2pz4So8X7oOckwu5XViogvQoemaF1PJiMr1Cqm6Sd5tXGSr6VAWXl',
});

async function uploadImage(imagePath: string) {
    try {
        console.log(`Uploading ${imagePath}...`);
        const buffer = fs.readFileSync(imagePath);
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(imagePath),
        });
        return asset._id;
    } catch (error) {
        console.error(`Error uploading image ${imagePath}:`, error);
        return null;
    }
}

async function getOrCreateCategory(name: string) {
    const existing = await client.fetch(`*[_type == "category" && name == $name][0]`, { name });
    if (existing) {
        return existing._id;
    }
    console.log(`Creating category: ${name}`);
    const newCat = await client.create({
        _type: 'category',
        name: name,
        slug: { current: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
    });
    return newCat._id;
}

async function importProducts() {
    const products = productsData.products;
    for (const product of products) {
        console.log(`\nProcessing product: ${product.name}`);

        // Upload image
        // Sometimes URLs have leading slash
        const imgPath = product.imageUrl.startsWith('/') ? product.imageUrl.slice(1) : product.imageUrl;
        // Decode URI component since JSON might have spaces, but file might be literal strings
        let fullPath = path.join(process.cwd(), 'public', decodeURIComponent(imgPath));

        // Check if it exists with decoded path, if not check exactly as written
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(process.cwd(), 'public', imgPath);
        }

        let imageAssetId = null;
        if (fs.existsSync(fullPath)) {
            imageAssetId = await uploadImage(fullPath);
        } else {
            console.warn(`⚠️  Image not found at ${fullPath}`);
        }

        // Get category
        const categoryId = await getOrCreateCategory(product.category);

        const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check if product exists by id
        const existingProduct = await client.fetch(`*[_type == "product" && productId == $productId][0]`, { productId: product.id });

        const productDoc: any = {
            _type: 'product',
            name: product.name,
            slug: { _type: 'slug', current: slug },
            productId: product.id,
            description: product.description,
            category: {
                _type: 'reference',
                _ref: categoryId,
            },
            subcategory: product.subcategory || undefined,
            regular_price: product.regular_price,
            sale_price: product.sale_price,
            weight: product.weight,
            dimensions: product.dimensions,
            tags: product.tags,
            rating: product.rating,
        };

        if (imageAssetId) {
            productDoc.image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAssetId,
                },
            };
        }

        if (existingProduct) {
            console.log(`Updating product: ${product.name}`);
            await client.patch(existingProduct._id).set(productDoc).commit();
        } else {
            console.log(`Creating product: ${product.name}`);
            await client.create(productDoc);
        }
    }
    console.log("\n✅ Import complete!");
}

importProducts().catch(console.error);
