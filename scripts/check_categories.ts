import { createClient } from 'next-sanity';

const client = createClient({
    projectId: 'zhi2v4xf',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function run() {
    const query = `*[_type == "category"] | order(_createdAt asc) {
    "id": _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    "subCategories": subCategories[] {
      name,
      "imageUrl": image.asset->url
    }
  }`;

    const res = await client.fetch(query);
    console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);
