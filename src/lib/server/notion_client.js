import { env } from '$env/dynamic/private'
import { Client } from '@notionhq/client'

export const client = new Client({
  auth: env.NOTION_API_KEY,
})
