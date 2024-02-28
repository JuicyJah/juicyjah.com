async function getContent(projectId) {
  try {
    const list = await import.meta.glob('/src/lib/projects/*.md')
    const doc = await list[`/src/lib/projects/${projectId}.md`]()
    return doc?.default
  } catch (e) {
    console.log("Error getting markdown content", e)
    return null
  }
}

export async function load({ params, data }) {
  const projectId = params?.project_id
  const internalProjectDoc = await getContent(projectId)

  return {
    ...data,
    content: internalProjectDoc
  }
}