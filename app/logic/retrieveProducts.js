import { API_URL } from "@env"

async function retrieveProducts(drawerId) {

    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/drawers/${drawerId}/products`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        return res.json()

    } catch (error) {

        console.error('Fetch error:', error)
        throw new Error(`Network request failed: ${error.message}`)

    }
}

export default retrieveProducts