'use strict';

import * as THREE from 'three'
import { writable } from "svelte/store"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

const rendered = writable(false)

let scene,
  camera,
  renderer,
  controls,
  car,
  world,
  night = false;

let parentElement
let width,
  height;

function computedBounds(node) {
  const style = getComputedStyle(node)

  return {
    width: Number(style.width.replace(/px$/, '')),
    height: Number(style.height.replace(/px$/, ''))
  }
}

export async function init(node) {
  parentElement = node.parentElement
    ; ({ width, height } = computedBounds(parentElement));

  scene = new THREE.Scene()

  const ratio = width / height

  // camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 100)
  camera = new THREE.OrthographicCamera(-5 * ratio, 5 * ratio, 5, -5, 0.1, 10)
  camera.position.set(0, 1, 5)
  camera.lookAt(scene.position)

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  addLights()
  const objloader = new OBJLoader()
  const mtlLoader = new MTLLoader()

  await new Promise((resolve) => {
    mtlLoader.load("/assets/Tiny_vehicles.vox-5.mtl", (materials) => {
      materials.preload()
      objloader.setMaterials(materials)
      objloader.load(
        '/assets/Tiny_vehicles.vox-5.obj',
        function (object) {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.center()
            }
          })
          object.rotation.z += 0.25
          object.rotation.y += Math.PI / 2

          object.scale.set(2, 2, 2)

          object.position.set(camera.position.x - 18, -3, camera.position.z - 1)
          scene.add(object);

          car = object
          resolve()
        });
    })
  })

  world = node
  world.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = false
  controls.autoRotateSpeed = 0.3
  controls.enabled = false

  window.addEventListener('resize', onResize)
}

const unsubscribe = rendered.subscribe((isRendered) => {
  if (isRendered) {
    window.dispatchEvent(new Event("__world_loaded"))
    unsubscribe()
  }
})

function addLights() {
  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9)
  scene.add(light)

  const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8)
  directLight1.castShadow = true
  directLight1.position.set(9.5, 8.2, 8.3)
  scene.add(directLight1)

  const directLight2 = new THREE.DirectionalLight(0xc9ceff, 0.5)
  directLight2.castShadow = true
  directLight2.position.set(-15.8, 5.2, 8)
  scene.add(directLight2)
}

function onResize() {
  ({ width, height } = computedBounds(parentElement))
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function rad(degrees) {
  return degrees * (Math.PI / 180);
}


let firstAnimate = true
export function animate() {
  if (firstAnimate) rendered.set(true)
  requestAnimationFrame(animate)

  render()
  controls.update()
  firstAnimate = false
}

let bumpMove = 0
function moveCar(speed = 0.3) {
  // Is the object still in camera view?
  const frustum = new THREE.Frustum()
  const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
  frustum.setFromProjectionMatrix(matrix)
  const checkVector = car.position.clone()
  checkVector.x -= 5
  if (car.position.x > 0 && !frustum.containsPoint(checkVector)) {
    animateCar = false
    bumpMove = 0
    car.position.set(camera.position.x - 18, -3, camera.position.z - 1)
    return animateCarCallback()
  }

  // move the car right
  let xpos = car.position.x + (1 * speed)
  car.position.x = xpos

  // move the car up and down occasionally
  if (bumpMove > 4 && bumpMove <= 8) {
    let ypos = car.position.y + 0.05
    car.position.y = ypos
  } else if (bumpMove > 8 && bumpMove <= 12) {
    let ypos = car.position.y - 0.05
    car.position.y = ypos
  } else if (bumpMove > 12) {
    bumpMove = 0
  }
  bumpMove++
}

let animateCar = false, animateCarCallback
export function startCarAnimation(callback) {
  animateCar = true
  animateCarCallback = callback
}

function render() {
  if (animateCar) moveCar()
  renderer.render(scene, camera)
}
