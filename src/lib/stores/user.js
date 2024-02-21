import { derived } from "svelte/store"
import { page } from '$app/stores'

export const currentUser = derived(page, ($page, set) => {
  set($page?.data?.session?.user)
}, null)