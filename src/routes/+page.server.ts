import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

interface Item {
	id: number;
	name: string;
	created_at: string;
}

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env.DB;
	if (!db) throw new Error('D1 database not available');
	const { results } = await db
		.prepare('SELECT id, name, created_at FROM items ORDER BY created_at DESC')
		.all<Item>();
	return { items: results };
};

export const actions: Actions = {
	create: async ({ request, platform }) => {
		const db = platform?.env.DB;
		if (!db) return fail(500, { error: 'D1 database not available' });
		const data = await request.formData();
		const name = data.get('name');
		if (typeof name !== 'string' || name.trim() === '') {
			return fail(400, { error: 'name is required' });
		}
		await db.prepare('INSERT INTO items (name) VALUES (?)').bind(name.trim()).run();
		return { success: true as const };
	},
	delete: async ({ request, platform }) => {
		const db = platform?.env.DB;
		if (!db) return fail(500, { error: 'D1 database not available' });
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, { error: 'id is required' });
		await db.prepare('DELETE FROM items WHERE id = ?').bind(id).run();
		return { success: true as const };
	}
};
