import { PROJECTS } from '$lib/config.js'

export async function load() {
  return {
    projects: PROJECTS
  }
}