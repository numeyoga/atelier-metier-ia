<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Mon Application</title>
</svelte:head>

<h1>Mon Application</h1>

{#if form && 'error' in form}
  <p>Erreur : {form.error}</p>
{/if}

<form method="POST" action="?/create" use:enhance>
  <input type="text" name="name" placeholder="Nom de l'item" required />
  <button type="submit">Ajouter</button>
</form>

{#if data.items.length === 0}
  <p>Aucun item.</p>
{:else}
  <ul>
    {#each data.items as item (item.id)}
      <li>
        {item.name}
        <form method="POST" action="?/delete" use:enhance style="display: inline">
          <input type="hidden" name="id" value={item.id} />
          <button type="submit">Supprimer</button>
        </form>
      </li>
    {/each}
  </ul>
{/if}
