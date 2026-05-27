import { AppError } from "../app/errors.js";

export async function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new AppError('Request timed out', 'TIMEOUT', 504);
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

export async function fetchWithRetry(url, retries = 3, delay = 500) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const response = await fetchWithTimeout(url);
        if (response.ok) return response;

        if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
    throw new AppError('External API unavailable after retries', 'EXTERNAL_API_ERROR', 502);
}
