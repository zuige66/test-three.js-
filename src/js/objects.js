import * as THREE from 'three';

export class ObjectManager {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
        this.materials = [];
    }

    createDefaultObjects() {
        // 创建立方体
        const cube = this.createCube(0, 1, 0);
        this.objects.push({ mesh: cube, rotationSpeed: { x: 0.01, y: 0.01, z: 0 } });

        // 创建球体
        const sphere = this.createSphere(-2, 1, 0);
        this.objects.push({ mesh: sphere, rotationSpeed: { x: 0, y: 0.02, z: 0 } });

        // 创建圆环
        const torus = this.createTorus(2, 1, 0);
        this.objects.push({ mesh: torus, rotationSpeed: { x: 0.02, y: 0.01, z: 0 } });

        return Promise.resolve();
    }

    createCube(x, y, z) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x00ff88,
            metalness: 0.3,
            roughness: 0.4
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        this.scene.add(mesh);
        
        this.materials.push(material);
        return mesh;
    }

    createSphere(x, y, z) {
        const geometry = new THREE.SphereGeometry(0.7, 32, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xff4444,
            metalness: 0.2,
            roughness: 0.5
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        this.scene.add(mesh);
        
        this.materials.push(material);
        return mesh;
    }

    createTorus(x, y, z) {
        const geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x4488ff,
            metalness: 0.6,
            roughness: 0.2
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        this.scene.add(mesh);
        
        this.materials.push(material);
        return mesh;
    }

    updateAnimations(deltaTime) {
        this.objects.forEach(obj => {
            obj.mesh.rotation.x += obj.rotationSpeed.x;
            obj.mesh.rotation.y += obj.rotationSpeed.y;
            obj.mesh.rotation.z += obj.rotationSpeed.z;
        });
    }

    randomizeColors() {
        this.materials.forEach(material => {
            material.color.setHex(Math.random() * 0xffffff);
        });
    }

    addRandomObject() {
        const shapes = ['cube', 'sphere', 'torus'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const x = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;
        
        let newObject;
        switch(shape) {
            case 'cube':
                newObject = this.createCube(x, 1, z);
                break;
            case 'sphere':
                newObject = this.createSphere(x, 1, z);
                break;
            case 'torus':
                newObject = this.createTorus(x, 1, z);
                break;
        }
        
        this.objects.push({ 
            mesh: newObject, 
            rotationSpeed: { 
                x: (Math.random() - 0.5) * 0.02, 
                y: (Math.random() - 0.5) * 0.02, 
                z: 0 
            } 
        });
    }
}