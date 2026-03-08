import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'zhi2v4xf',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    stega: {
        enabled: false,
    },
});

// For client-side fetching where we want the absolute latest data
export const clientNoCache = createClient({
    projectId: 'zhi2v4xf',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    stega: {
        enabled: false,
    },
});

