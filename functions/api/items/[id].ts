import type { EventContext } from '@cloudflare/workers-types'

interface Env {
  DB: D1Database
}

export const onRequest = async (context: EventContext<Env, 'id', Record<string, unknown>>) => {
  const { request, env, params } = context
  const method = request.method

  if (method === 'DELETE') {
    const id = params.id
    await env.DB.prepare('DELETE FROM items WHERE id = ?').bind(id).run()
    return new Response(null, { status: 204 })
  }

  return new Response('Method Not Allowed', { status: 405 })
}
