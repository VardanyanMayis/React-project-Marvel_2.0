import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const response = useCallback(async (url, method='GET', body=null,
        headers={'Content-Type': 'application/json'}) => {

        setLoading(true);    

        try {
            const request = await fetch(url, {method, body, headers});

            if (!request.ok) {
                throw new Error(`Could not fetch ${url}, status: ${request.status}`);
            }     

            const data = await request.json();

            setLoading(false);
            return data; 
        } catch(error) {
            setLoading(false);
            setError(true);
        }
    })

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, clearError, response}
}
