// Cloudflare Worker script generator

export const generateWorkerScript = (config) => {
  const script = `
// Cloudflare Worker Script for OnePageSaaS
// This script receives requests from your HTML and stores data to CF KV

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Parse the request body
    const data = await request.json()
    
    // Generate a unique ID for the entry
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
    
    // Add timestamp
    const entry = {
      ...data,
      id: id,
      timestamp: new Date().toISOString()
    }
    
    // Store in KV namespace (you need to bind KV to your worker)
    // Replace 'DATA_KV' with your KV namespace binding name
    await DATA_KV.put(id, JSON.stringify(entry))
    
    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      id: id,
      message: 'Data stored successfully' 
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    // Return error response
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
  `.trim()

  return script
}
