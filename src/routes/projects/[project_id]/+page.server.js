import { error } from '@sveltejs/kit'
import { PROJECTS } from '$lib/config.js'

const cacheList = []


function updateCache(project, data) {
  const index = cacheList.indexOf(x => x.id == project.id)
  const expiration = new Date()
  expiration.setMinutes(expiration.getMinutes() + 5)
  const updated = {
    id: project.id,
    data,
    expiration
  }
  if (index) {
    cacheList[index] = updated
  } else {
    cacheList.push(updated)
  }
}

function getFromCache(project) {
  const ret = cacheList.find(x => x.id == project.id)
  if (ret?.data && new Date().getTime() < ret.expiration) return ret.data
  return null
}



export async function load({ params, fetch }) {
  if (!params?.project_id) {
    return error(404, 'Not Found')
  }

  const project = PROJECTS.find(x => x.id == params.project_id)

  if (!project) {
    return error(404, 'Not Found')
  }

  // const internalProjectDoc = await getContent(project)

  const cached = getFromCache(project)
  if (cached) {
    return {
      project,
      readme: cached.data
    }
  }

  const data = await fetch(project.readme)
  const json = await data.json()

  const readme = json?.payload?.blob?.richText
  updateCache(project, readme)

  return {
    project,
    readme
  }

  error(404, 'Not found')
}