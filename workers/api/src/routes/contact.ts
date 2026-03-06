/**
 * Contact Form Route Handler
 * 
 * Placeholder for future contact form processing.
 * Can be extended to send emails, store in D1, etc.
 */

import type { Env } from '../index';

export async function handleContact(
    request: Request,
    env: Env,
    headers: Record<string, string>
): Promise<Response> {
    let body: { name?: string; email?: string; message?: string };
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: 'Invalid JSON body.' },
            { status: 400, headers }
        );
    }

    const { name, email, message } = body;
    if (!name || !email || !message) {
        return Response.json(
            { error: 'name, email, and message are required.' },
            { status: 400, headers }
        );
    }

    // TODO: Add email sending via Mailgun/SendGrid, or store in Cloudflare D1
    console.log('Contact form submission:', { name, email, message });

    return Response.json(
        { success: true, message: 'Thank you for contacting us! We will get back to you soon.' },
        { headers }
    );
}
