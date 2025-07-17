import { useEffect, useState } from "react"

export function useApiData<T = any>(url: string, options?: RequestInit) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
            ...options,
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data")
                return res.json()
            })
            .then((data) => setData(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return { data, loading, error }
} 