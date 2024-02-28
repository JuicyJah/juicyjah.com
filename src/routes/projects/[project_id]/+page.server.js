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

  let resp, json, readme

  try {
    resp = await fetch(project.readme, {
      headers: {
        "Accept": "application/json"
      }
    })

    try {
      json = await resp.json()
      readme = json?.payload?.blob?.richText
      updateCache(project, readme)
      return {
        project,
        readme
      }
    } catch (e) {
      console.log("Got an error parsing GitHub response: not json", e)
      console.log(`GitHub response is ${resp.ok ? 'ok' : 'not ok'} with status ${resp.status}`)
    }
  } catch (e) {
    console.log("Got an error retrieving GitHub Readme", e)
    return {
      project
    }
  }

  error(404, 'Not found')
}