import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 交互控制
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // 模型加载器

// 1. 初始化场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e); // 深色背景

// 2. 相机设置
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10); // 调整相机位置，便于观察

// 3. 渲染器设置
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 抗锯齿
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // 适配高分辨率屏幕
renderer.shadowMap.enabled = true; // 启用阴影
document.getElementById('container').appendChild(renderer.domElement);

// 4. 光照系统（多种光源组合）
// 环境光（基础照明，无阴影）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// 平行光（主光源，产生阴影）
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 15, 10); // 光源位置
directionalLight.castShadow = true; // 允许投射阴影
// 调整阴影范围
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
scene.add(directionalLight);

// 点光源（辅助照明）
const pointLight = new THREE.PointLight(0x00ffff, 0.5, 20);
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);

// 5. 创建带纹理的立方体
// 加载纹理（使用在线纹理，本地纹理可放 assets/textures 目录）
const textureLoader = new THREE.TextureLoader();
const cubeTexture = textureLoader.load('https://threejs.org/examples/textures/crate.gif');

// 带纹理的材质（受光照影响）
const cubeMaterial = new THREE.MeshStandardMaterial({
  map: cubeTexture, // 纹理贴图
  roughness: 0.5, // 粗糙度
  metalness: 0.2 // 金属感
});

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 1, 0);
cube.castShadow = true; // 立方体投射阴影
cube.receiveShadow = false;
scene.add(cube);

// 6. 加载 3D 模型（使用 GLTF 格式模型）
const loader = new GLTFLoader();
// 加载在线模型（本地模型路径：'../assets/models/模型文件名.gltf'）
loader.load(
  'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.position.set(3, 1, 0); // 模型位置
    model.scale.set(0.3, 0.3, 0.3); // 缩放模型
    model.castShadow = true;
    scene.add(model);
  },
  (xhr) => {
    // 加载进度
    console.log(`模型加载中：${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error('模型加载失败：', error);
  }
);

// 7. 创建地面（接收阴影）
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x333333,
  roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // 旋转平面使其水平
ground.position.y = 0; // 地面高度
ground.receiveShadow = true; // 接收阴影
scene.add(ground);

// 8. 交互控制（鼠标拖拽旋转、滚轮缩放）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 阻尼效果，使旋转更平滑
controls.dampingFactor = 0.05;
controls.enableZoom = true; // 允许缩放
controls.zoomSpeed = 0.5;

// 9. 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 10. 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 立方体自动旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update(); // 更新控制器（阻尼效果需要）
  renderer.render(scene, camera);
}

// 启动动画
animate();
console.log('增强版 Three.js 场景加载成功！');