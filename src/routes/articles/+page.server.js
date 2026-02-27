import { env } from '$env/dynamic/private'
import { client as notion } from "$lib/server/notion_client.js"

export async function load() {
  try {
    const database = await notion.databases.retrieve({
      database_id: env.NOTION_BLOG_DATABASE_ID
    })

    const dataSourceId = database.data_sources.at(0)?.id
    const dataSourceQuery = {
      data_source_id: dataSourceId,
      filter: {
        property: "Status",
        status: {
          equals: "Published"
        }
      },
      sorts: [
        {
          property: "Created time",
          direction: "descending"
        }
      ]
    }

    const blogPageList = await notion.dataSources.query(dataSourceQuery)


    const articles = blogPageList?.results?.map(page => {
      const title = page.properties['Document']?.title?.at(0)?.plain_text || 'Untitled'
      const slug = page.properties['Slug']?.rich_text?.at(0)?.plain_text || ''
      const createdTime = page.created_time
      const lastEditedTime = page.last_edited_time
      return {
        id: page.id,
        title,
        slug,
        createdTime,
        lastEditedTime
      }
    })

    return {
      articles
    }
  } catch (error) {
    return {
      articles: []
    }
  }
}
