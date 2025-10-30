// test_threejs - 主程序文件
console.log("Three.js 项目已启动!");

// 1. 创建场景（舞台）
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222233); // 深蓝色背景

// 2. 创建相机（观众的眼睛）
const camera = new THREE.PerspectiveCamera(
    75, // 视野角度
    window.innerWidth / window.innerHeight, // 宽高比
    1, // 近平面
    1000 // 远平面
);
camera.position.z = 5;

// 3. 创建渲染器（摄影师和胶片）
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // 更好的视网膜显示支持
document.getElementById('container').appendChild(renderer.domElement);

// 4. 创建一个绿色立方体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    wireframe: false 
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// 5. 创建一个红色球体
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000 
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -2;
scene.add(sphere);

// 6. 创建一个蓝色圆环
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x0088ff 
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 2;
scene.add(torus);

// 7. 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 旋转立方体
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // 旋转球体
    sphere.rotation.y += 0.02;
    
    // 旋转圆环
    torus.rotation.x += 0.02;
    torus.rotation.y += 0.01;
    
    // 渲染场景
    renderer.render(scene, camera);
}

// 启动动画
animate();

// 8. 处理窗口大小变化
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 9. 添加点击交互
renderer.domElement.addEventListener('click', function() {
    // 随机改变立方体颜色
    cube.material.color.setHex(Math.random() * 0xffffff);
    console.log('立方体颜色已改变!');
});

console.log("场景创建完成！你应该能看到三个旋转的3D物体。");