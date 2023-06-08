import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap';

const PARAMS = {
    visible: false,
    checkVisible: () => {
        if (PARAMS.visible) {
            hemisphereLightHelper.visible = true == hemisphereLight.visible
            directionalLightHelper.visible = true == directionalLight.visible
            pointLightHelper.visible = true == pointLight.visible
            spotLightHelper.visible = true == spotLight.visible
            fesquerdorectLightHelper.visible = true == farolEsquerdoRectAreaLight.visible
            fdireitorectLightHelper.visible = true === farolDireitoRectAreaLight.visible
        }
    },
    visibleLightHelper: () => {
        if (PARAMS.visible) {
            hemisphereLightHelper.visible = true == hemisphereLight.visible
            directionalLightHelper.visible = true == directionalLight.visible
            pointLightHelper.visible = true == pointLight.visible
            spotLightHelper.visible = true == spotLight.visible
            fesquerdorectLightHelper.visible = true == farolEsquerdoRectAreaLight.visible
            fdireitorectLightHelper.visible = true === farolDireitoRectAreaLight.visible
        } else {
            hemisphereLightHelper.visible = false
            directionalLightHelper.visible = false
            pointLightHelper.visible = false
            spotLightHelper.visible = false
            fesquerdorectLightHelper.visible = false
            fdireitorectLightHelper.visible = false
        }

    },
    download: () => {
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = document.getElementById("myCanvas").toDataURL('image/png');
        link.click()
    }
};

const pane = new Pane();

pane.addButton({
    title: 'download'
}).on("click", PARAMS.download)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const gltfLoader = new GLTFLoader()
const carrAnimation = gsap.timeline({ yoyo: true, repeat: -1 });
let carro = null
gltfLoader.load(
    '/models/carro/carro.gltf',
    (gltf) => {
        console.log("sucess")
        console.log(gltf)
        carro = gltf.scene.children[0]
        scene.add(carro)
        carro.position.x + 1
        carro.position.set(0, -0.6, 0)

        gltf.scene.traverse(function (node) {
            if (node.isMesh) { node.castShadow = true; }
        });

        carro.castShadow = true
        carro.receiveShadow = true
            
        }
        )

pane.addButton({
    title: 'Andar carrro'
}).on("click", handleCarro)

function handleCarro() {
    if (carrAnimation.isActive()) {
        carrAnimation.pause()
    } else {
        carrAnimation.resume()
    }
}
document.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (e.key === 'w') {
        carro.position.z += 0.1

        if (carro.rotation.y > 0) {
            //   direita
            console.log( carro.rotation.y, carro.position.x)
            carro.position.x += 0.15 *  carro.rotation.y
        } else {
            // esquerda
            carro.position.x -= 0.15 *  carro.rotation.y
        }
    }

    if (e.key === 's') {
        carro.position.z -= 0.1
    }

    if (e.key === "a") {
        carro.rotation.y -= 0.2
    }

    if (e.key === "d") {
        carro.rotation.y += 0.2
    }
})

function andarParaFrente() {

}

gltfLoader.load(
    "/models/placa/placa.gltf",
    (gltf) => {
        console.log(gltf)
        scene.add(gltf.scene)
        gltf.scene.position.set(3, -0.6, 1)

        gltf.scene.traverse(function (node) {

            if (node.isMesh) { node.castShadow = true; }


        });
    }
)

gltfLoader.load(
    "/models/poste_de_luz_1/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene.children[0] })
        const poste = gltf.scene
        scene.add(poste)
        poste.position.set(-3.2, -0.6, 0)
        poste.scale.set(0.015, 0.015, 0.01)
    }
)

gltfLoader.load(
    "/models/banco/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene.children[0] })
        const banco =  gltf.scene.children[0]
        scene.add(banco)
        banco.position.set(-3.2, 0, 1.5)
        banco.scale.set(0.3, 0.3, 0.3)
        banco.rotation.z = 1.6
    }
)

gltfLoader.load(
    "/models/banco/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene.children[0] })
        const banco =  gltf.scene.children[0]
        scene.add(banco)
        banco.position.set(-3.2, 0, -1.5)
        banco.scale.set(0.3, 0.3, 0.3)
        banco.rotation.z = 1.6
    }
)

gltfLoader.load(
    "/models/lata_de_lixo_de_ps1/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene.children[0] })
        const lata_de_lixo_de_ps1 =  gltf.scene.children[0]
        scene.add(lata_de_lixo_de_ps1)
        lata_de_lixo_de_ps1.position.set(-3.2, -0.5, 3)
        lata_de_lixo_de_ps1.scale.set(0.3, 0.3, 0.3)
        lata_de_lixo_de_ps1.rotation.z = 1.6
    }
)

gltfLoader.load(
    "/models/lata_de_lixo_de_ps1/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene })
        const lata_de_lixo_de_ps1 =  gltf.scene.children[0]
        scene.add(lata_de_lixo_de_ps1)
        lata_de_lixo_de_ps1.position.set(-3.2, -0.5, -3.2)
        lata_de_lixo_de_ps1.scale.set(0.3, 0.3, 0.3)
        lata_de_lixo_de_ps1.rotation.z = 1.6
    }
)

gltfLoader.load(
    "/models/plantas/scene.gltf",
    (gltf) => {
        console.log({ f: gltf.scene })
        const planta =  gltf.scene.children[0]
        scene.add(planta)
        planta.position.set(3.2, -0.6, -3.2)
        planta.scale.set(0.2, 0.2, 0.2)
        planta.rotation.z = 1.6
    }
)














/**


 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
pane.addInput(ambientLight, "intensity", {
    label: "amb. level",
    min: 0,
    max: 1,
    step: 0.001
})

pane.addInput(PARAMS, "visible", {
    label: "show helpers"
}).on("change", (ev) => {
    PARAMS.visibleLightHelper()
})

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)
directionalLight.visible = true
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = 11
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

pane.addInput(directionalLight, "visible", {
    "label": "luz direcional",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1.5)
scene.add(hemisphereLight)
hemisphereLight.visible = false
pane.addInput(hemisphereLight, "visible", {
    "label": "luz hemisphere",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(0.1, 0.9, 0.9)
scene.add(pointLight)
pointLight.visible = false
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 8

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false

pane.addInput(pointLight, "visible", {
    "label": "luz pontual",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

const farolEsquerdoRectAreaLight = new THREE.RectAreaLight(0xffffff, 10, 1, 1)
farolEsquerdoRectAreaLight.position.set(-0.5, 0, 1.5)
farolEsquerdoRectAreaLight.lookAt(new THREE.Vector3(-0.5, 0, 2))
scene.add(farolEsquerdoRectAreaLight)

farolEsquerdoRectAreaLight.visible = true

const farolDireitoRectAreaLight = new THREE.RectAreaLight(0xffffff, 10, 1, 1)
farolDireitoRectAreaLight.position.set(0.5, 0, 1.5)
farolDireitoRectAreaLight.lookAt(new THREE.Vector3(0.5, 0, 2))
scene.add(farolDireitoRectAreaLight)

farolDireitoRectAreaLight.visible = true

pane.addInput(farolEsquerdoRectAreaLight, "visible", {
    "label": "farol esquerdo",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

pane.addInput(farolDireitoRectAreaLight, "visible", {
    "label": "farol direito",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.target.position.x = -0.75
scene.add(spotLight.target)
scene.add(spotLight)

spotLight.visible = true
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.fov = 35
spotLight.shadow.camera.near = 2
spotLight.shadow.camera.far = 7


const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
spotLightCameraHelper.visible = false



pane.addInput(spotLight, "visible", {
    "label": "luz spot",
}).on("change", (ev) => {
    PARAMS.checkVisible()
})

// Luz poste
const luzDoPoste = new THREE.RectAreaLight(0xffff00, 100, 1, 1)
luzDoPoste.position.set(-1.3, 8.2, 0)
luzDoPoste.lookAt(new THREE.Vector3(-1.3, 4, 0))
scene.add(luzDoPoste)

luzDoPoste.visible = true

const luzDoPoste1 = new THREE.RectAreaLight(0xffff00, 100, 1, 1)
luzDoPoste1.position.set(-5, 8.2, 0)
luzDoPoste1.lookAt(new THREE.Vector3(-5, 4, 0))
scene.add(luzDoPoste1)

luzDoPoste1.visible = true


const luzDoPoste2 = new THREE.RectAreaLight(0xffff00, 100, 1, 1)
luzDoPoste2.position.set(-3.2, 8.2, 1.2)
luzDoPoste2.lookAt(new THREE.Vector3(-3.5, 4, 1.2))
scene.add(luzDoPoste2)

luzDoPoste2.visible = true

const luzDoPoste3 = new THREE.RectAreaLight(0xffff00, 100, 1, 1)
luzDoPoste3.position.set(-3.2, 8.2, -1.2)
luzDoPoste3.lookAt(new THREE.Vector3(-3.5, 4, -1.2))
scene.add(luzDoPoste3)

luzDoPoste3.visible = true

//terxtura


const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}
loadingManager.onProgress = () => {
    console.log('loading progressing')
}
loadingManager.onError = () => {
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const tijoloTexture = textureLoader.load("/textures/environmentMaps/3/ny.jpg")
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')



/** 
 * Helpers
 */

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)
hemisphereLightHelper.visible = false

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false


const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
pointLightHelper.visible = false


const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLightHelper.visible = false

const fesquerdorectLightHelper = new RectAreaLightHelper(farolEsquerdoRectAreaLight)
scene.add(fesquerdorectLightHelper)
fesquerdorectLightHelper.visible = false

const fdireitorectLightHelper = new RectAreaLightHelper(farolDireitoRectAreaLight)
scene.add(fdireitorectLightHelper)
fdireitorectLightHelper.visible = false

const luzDoPostehelper = new RectAreaLightHelper(luzDoPoste3)
scene.add(luzDoPostehelper)
luzDoPostehelper.visible = false
/**
 * Objects
 */
// Material
// const material = new THREE.MeshBasicMaterial({ map: asfaltotexture })
const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 5

// Objects



// PAREDES
const paredeMaterial = new THREE.MeshStandardMaterial({
    map: tijoloTexture
})

const paredeGeometry = new THREE.BoxGeometry(10, 3, 0.1)
const parede1 = new THREE.Mesh(
    paredeGeometry, paredeMaterial
)
parede1.position.z = -5
parede1.position.y = 0.85

scene.add(parede1)




const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10,12),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true


scene.add(plane)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    preserveDrawingBuffer: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()