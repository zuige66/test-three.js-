import * as THREE from 'three';
import { SceneManager } from './scene.js';
import { ObjectManager } from './objects.js';
import { UIManager } from './utils.js';

export class App {
    constructor() {
        this.sceneManager = null;
        this.objectManager = null;
        this.uiManager = null;
        this.clock = new THREE.Clock();
        this.isRotating = true;
    }

    async init() {
        // 初始化管理器
        this.sceneManager = new SceneManager();
        this.objectManager = new ObjectManager(this.sceneManager.scene);
        this.uiManager = new UIManager(this);
        
        // 创建场景
        this.sceneManager.setupScene();
        
        // 创建3D物体
        await this.objectManager.createDefaultObjects();
        
        // 设置UI事件
        this.uiManager.setupEventListeners();
        
        // 添加到DOM
        document.getElementById('container').appendChild(this.sceneManager.renderer.domElement);
        
        // 处理窗口大小变化
        this.setupResizeHandler();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        
        if (this.isRotating) {
            this.objectManager.updateAnimations(deltaTime);
        }
        
        this.uiManager.updateStats(this.sceneManager.renderer);
        this.sceneManager.render();
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            this.sceneManager.handleResize();
        });
    }

    toggleRotation() {
        this.isRotating = !this.isRotating;
    }

    changeColors() {
        this.objectManager.randomizeColors();
    }

    addRandomObject() {
        this.objectManager.addRandomObject();
    }
}