/**
 * Samar Designs API Worker
 * 
 * Modular Cloudflare Worker for server-side API endpoints.
 * Currently handles:
 *   - /api/ai-discovery  — AI product discovery via Google Gemini
 * 
 * To add new endpoints, create a handler in routes/ and register it in the router.
 */

export interface Env {
    GOOGLE_API_KEY: string;
    ALLOWED_ORIGIN: string;
}

// Import route handlers
import { handleAiDiscovery } from './routes/ai-discovery';
import { handleContact } from './routes/contact';

// CORS headers
function corsHeaders(origin: string, allowedOrigin: string): Record<string, string> {
    const allowed = allowedOrigin === '*' || origin === allowedOrigin || origin?.endsWith('.pages.dev');
    return {
        'Access-Control-Allow-Origin': allowed ? origin : allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);
        const origin = request.headers.get('Origin') || '';
        const headers = corsHeaders(origin, env.ALLOWED_ORIGIN || '*');

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        try {
            // ======== ROUTER ========
            // Add new routes here as your API grows

            if (url.pathname === '/api/ai-discovery' && request.method === 'POST') {
                return await handleAiDiscovery(request, env, headers);
            }

            if (url.pathname === '/api/contact' && request.method === 'POST') {
                return await handleContact(request, env, headers);
            }

            // Health check
            if (url.pathname === '/api/health') {
                return Response.json({ status: 'ok', timestamp: new Date().toISOString() }, { headers });
            }

            // 404 for unknown routes
            return Response.json(
                { error: 'Not Found', availableEndpoints: ['/api/ai-discovery', '/api/contact', '/api/health'] },
                { status: 404, headers }
            );

        } catch (error: any) {
            return Response.json(
                { error: 'Internal Server Error', message: error.message },
                { status: 500, headers }
            );
        }
    },
};
