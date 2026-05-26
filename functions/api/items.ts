import type { EventContext } from '@cloudflare/workers-types'

interface Env {
  DB: D1Database
}

interface Item {
  id: number
  name: string
  created_at: string
}

export const onRequest = async (context: EventContext<Env, string, Record<string, unknown>>) => {
  const { request, env } = context
  const method = request.method

  if (method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT id, name, created_at FROM items ORDER BY created_at DESC'
    ).all<Item>()
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (method === 'POST') {
    let body: { name?: unknown }
    try {
      body = await request.json()
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const name = body.name
    if (typeof name !== 'string' || name.trim() === '') {
      return new Response(JSON.stringify({ error: 'name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const stmt = env.DB.prepare(
      'INSERT INTO items (name) VALUES (?) RETURNING id, name, created_at'
    )
    const result = await stmt.bind(name.trim()).first<Item>()
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response('Method Not Allowed', { status: 405 })
}
