import { client as notion } from "$lib/server/notion_client.js"
import { redirect } from "@sveltejs/kit"
import { ROUTES } from "$lib/config.js"

async function fetchArticle(article_id) {
  const page = await notion.pages.retrieve({
    page_id: article_id
  })

  const pageBlocks = await notion.blocks.children.list({
    block_id: article_id
  })

  return {
    id: page.id,
    title: page.properties['Document']?.title?.at(0)?.text?.content ?? page.properties?.title?.title?.at(0).plain_text ?? 'Untitled',
    createdAt: page.created_time,
    lastEditedAt: page.last_edited_time,
    blocks: pageBlocks.results
  }
}

export function load({ params }) {
  const { article_id } = params
  if (!article_id) {
    throw redirect(302, ROUTES.articles)
  }

  return {
    article: fetchArticle(article_id)
  }
}
