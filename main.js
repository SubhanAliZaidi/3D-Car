// Naziya = 'naziya'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelURL = new URL('./textures/ferrari2k.glb', import.meta.url);
const secondurl = new URL('./textures/fordmustang.glb', import.meta.url);

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x111111, 5, 15);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0.1, 1.2, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;

// CanvasSize
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.enablePan = false;
controls.maxDistance = 10;
controls.maxPolarAngle = 1.5;

// Blender Model
function loadGLBModel(url) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(url, function (gltf) {
      resolve(gltf.scene);
    }, undefined, reject);
  });
}

// Adding Model To The Scene
async function addGLBModel(name, url, position, scene) {
  name = await loadGLBModel(url);
  name.position.set(position.x, position.y, position.z);
  name.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    } else {
      name.castShadow = true;
    }
  });
  name.rotation.y = -0.9;
  scene.add(name);
  return name;
};

// DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.castShadow = true;
scene.add(directionalLight);
directionalLight.position.set(0, 0, 5)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight2.castShadow = true;
scene.add(directionalLight2);
directionalLight2.position.set(0, 0, -5);

directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight2.shadow.mapSize.width = 2048;
directionalLight2.shadow.mapSize.height = 2048;

// AmbiendLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// PointLight
const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;

// SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 0.6);
scene.add(spotLight);
spotLight.position.set(0, 15, 0);
spotLight.angle = 0.28;
spotLight.castShadow = true;
spotLight.penumbra = 0.1;

// Plane
const PlaneGeometry = new THREE.CircleGeometry(100, 32);
const PlaneMaterial = new THREE.MeshStandardMaterial({
  color: 0x1b1b1b, side: THREE.DoubleSide,
});
const Plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
Plane.receiveShadow = true;
Plane.position.set(0, 0.008, 0);
Plane.rotation.x = -0.5 * Math.PI;
scene.add(Plane);

// Getting Button and Animating Object OnClick
const leftbtn = document.getElementById('leftbtn');
const rightbtn = document.getElementById('rightbtn');

function moveitem(element, element1, object, object1, array, array1, array2, array3) {

  const specs = document.querySelector('.specs');
  element.addEventListener('click', () => {

    specs.innerHTML = "";
    specs.innerHTML = "<h1>Ferrari Force GT </h1><ul><li>Engine: 3.0L TI V8 + 3 Diesel</li><li>Power: 689 hp (combined)</li><li>Torque: 390 lb-ft</li><li>0-60 mph: 4.5 s</li><li>0-124 mph: 8.7 s</li><li>Top Speed: 191 mph</li></ul><button>Customize</button>";
    
    gsap.to(object.position, { duration: 1, x: array[0], y: array[1], z: array[2], repeat: 0, ease: "power1.inOut" })

    gsap.to(object1.position, { duration: 1, x: array1[0], y: array1[1], z: array1[2], repeat: 0, ease: "power1.inOut" });

    gsap.ticker.add(() => {
      object.traverse((node) => {
        if (node.isMesh) {
          if (node.material.transparent !== undefined) {
            node.material.opacity = 1;
            node.material.transparent = true;
          }
        }
      });
    });

    setTimeout(function () {
      gsap.ticker.add(() => {
        object1.traverse((node) => {
          if (node.isMesh) {
            if (node.material.transparent !== undefined) {
              node.material.opacity = 0;
              node.material.transparent = true;
            }
          }
        });
      });
    }, 1000);
  });

  element1.addEventListener('click', () => {

    specs.innerHTML = "";
    specs.innerHTML = "<h1>FERRARI GT NEO</h1><ul><li>Engine: 4.0L TT V8 + 3 electric</li><li>Power: 989 hp (combined)</li><li>Torque: 590 lb-ft</li><li>0-60 mph: 2.5 s</li><li>0-124 mph: 6.7 s</li><li>Top Speed: 211 mph</li></ul><button>Customize</button>";

    gsap.to(object.position, { duration: 1, x: array2[0], y: array2[1], z: array2[2], repeat: 0, ease: "power1.inOut", })

    gsap.to(object1.position, { duration: 1, x: array3[0], y: array2[1], z: array3[2], repeat: 0, ease: "power1.inOut" });

    gsap.ticker.add(() => {
      object1.traverse((node) => {
        if (node.isMesh) {
          if (node.material.transparent !== undefined) {
            node.material.opacity = 1;
            node.material.transparent = true;
          }
        }
      });
    });

    setTimeout(function () {
      gsap.ticker.add(() => {
        object.traverse((node) => {
          if (node.isMesh) {
            if (node.material.transparent !== undefined) {
              node.material.opacity = 0;
              node.material.transparent = true;
            }
          }
        });
      });
    },1000)
  });
};

// Create Object With Asynchronous  
async function Naziya() {
  const model = await addGLBModel('model1', modelURL.href, { x: 0, y: 0, z: 0 }, scene);

  const secondmodel = await addGLBModel('secondmodel', secondurl.href, { x: 25, y: 1, z: 0 }, scene);
  secondmodel.scale.set(3, 3, 3);
  secondmodel.traverse((node) => {
    if (node.isMesh) {
      node.material.opacity = 0;
      node.material.transparent = true;
    }
  })
  moveitem(rightbtn, leftbtn, secondmodel, model, [0, 0, 0], [-25, 0, 0], [25, 0, 0], [0, 0, 0]);
}
Naziya();

// Animation
function Animate() {
  requestAnimationFrame(Animate);
  controls.update();
  renderer.render(scene, camera);
};
Animate();

// Windows Resizer
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize)