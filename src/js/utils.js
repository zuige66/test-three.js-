export class UIManager {
    constructor(app) {
        this.app = app;
        this.stats = {
            fps: 0,
            frameCount: 0,
            lastTime: performance.now()
        };
    }

    setupEventListeners() {
        document.getElementById('toggle-rotation').addEventListener('click', () => {
            this.app.toggleRotation();
            const button = document.getElementById('toggle-rotation');
            button.textContent = this.app.isRotating ? '暂停旋转' : '开始旋转';
        });

        document.getElementById('change-color').addEventListener('click', () => {
            this.app.changeColors();
        });

        document.getElementById('add-object').addEventListener('click', () => {
            this.app.addRandomObject();
        });
    }

    updateStats(renderer) {
        this.stats.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.stats.lastTime + 1000) {
            this.stats.fps = Math.round((this.stats.frameCount * 1000) / (currentTime - this.stats.lastTime));
            this.stats.frameCount = 0;
            this.stats.lastTime = currentTime;
            
            this.updateStatsDisplay(renderer);
        }
    }

    updateStatsDisplay(renderer) {
        const statsElement = document.getElementById('stats');
        const memory = renderer.info.memory;
        const render = renderer.info.render;
        
        statsElement.innerHTML = `
            FPS: ${this.stats.fps}<br>
            几何体: ${memory.geometries}<br>
            纹理: ${memory.textures}<br>
            绘制调用: ${render.calls}
        `;
    }
}