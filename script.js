// Geometrix - 3D Viewer
class GeometrixApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentMesh = null;
        this.is2DMode = false;
        this.rotationSpeed = 0.005;
        this.autoRotate = true;
        this.currentLanguage = 'en';

        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.cameraRadius = 5;
        this.cameraPhi = Math.PI / 2;
        this.cameraTheta = 0;

        this.translations = {
            en: {
                title: 'Geometrix',
                subtitle: 'Interactive 3D Viewer',
                view3d: '3D',
                view2d: '2D',
                shape_selection: 'Shape Selection',
                triangle: 'Triangle',
                square: 'Square',
                pentagon: 'Pentagon',
                hexagon: 'Hexagon',
                heptagon: 'Heptagon',
                octagon: 'Octagon',
                enneagon: 'Enneagon',
                decagon: 'Decagon',
                hendecagon: 'Hendecagon',
                dodecagon: 'Dodecagon',
                rotation_speed: 'Rotation Speed',
                wireframe: 'Wireframe',
                show_edges_only: 'Show edges only',
                color: 'Color',
                shape_information: 'Shape Information',
                controls: 'Controls',
                control_rotate: '• Left click + drag: Rotate',
                control_pan: '• Right click + drag: Pan',
                control_zoom: '• Scroll: Zoom in/out',
                control_reset: '• Double click: Reset view',
                vertices: 'Vertices',
                edges: 'Edges',
                faces: 'Faces',
                area_formula: 'Area Formula',
            },
            fr: {
                title: 'Geometrix',
                subtitle: 'Visualiseur 3D Interactif',
                view3d: '3D',
                view2d: '2D',
                shape_selection: 'Sélection de Forme',
                triangle: 'Triangle',
                square: 'Carré',
                pentagon: 'Pentagone',
                hexagon: 'Hexagone',
                heptagon: 'Heptagone',
                octagon: 'Octogone',
                enneagon: 'Ennéagone',
                decagon: 'Décagone',
                hendecagon: 'Hendécagone',
                dodecagon: 'Dodécagone',
                rotation_speed: 'Vitesse de Rotation',
                wireframe: 'Filaire',
                show_edges_only: 'Afficher les arêtes uniquement',
                color: 'Couleur',
                shape_information: 'Informations sur la Forme',
                controls: 'Contrôles',
                control_rotate: '• Clic gauche + glisser : Pivoter',
                control_pan: '• Clic droit + glisser : Translater',
                control_zoom: '• Molette : Zoomer/Dézoomer',
                control_reset: '• Double-clic : Réinitialiser la vue',
                vertices: 'Sommets',
                edges: 'Arêtes',
                faces: 'Faces',
                area_formula: 'Formule de l\'Aire',
            }
        };

        this.shapeInfo = {
            '3': { 
                name: 'Triangle', 
                vertices: 3, 
                edges: 3, 
                faces: 1, 
                formula2D: '(base × height) / 2',
                formula3D: '2 × (base × height / 2) + (3 × side) × height',
                prismName: 'Triangular Prism',
                prismVertices: 6, 
                prismEdges: 9, 
                prismFaces: 5
            },
            '4': { 
                name: 'Square', 
                vertices: 4, 
                edges: 4, 
                faces: 1, 
                formula2D: 'side²',
                formula3D: '2 × side² + (4 × side) × height',
                prismName: 'Square Prism (Cube)',
                prismVertices: 8, 
                prismEdges: 12, 
                prismFaces: 6
            },
            '5': { 
                name: 'Pentagon', 
                vertices: 5, 
                edges: 5, 
                faces: 1, 
                formula2D: '(5 × side × apothem) / 2',
                formula3D: '2 × ((5 × side × apothem) / 2) + (5 × side) × height',
                prismName: 'Pentagonal Prism',
                prismVertices: 10, 
                prismEdges: 15, 
                prismFaces: 7
            },
            '6': { 
                name: 'Hexagon', 
                vertices: 6, 
                edges: 6, 
                faces: 1, 
                formula2D: '(6 × side × apothem) / 2',
                formula3D: '2 × ((6 × side × apothem) / 2) + (6 × side) × height',
                prismName: 'Hexagonal Prism',
                prismVertices: 12, 
                prismEdges: 18, 
                prismFaces: 8
            },
            '7': { 
                name: 'Heptagon', 
                vertices: 7, 
                edges: 7, 
                faces: 1, 
                formula2D: '(7 × side × apothem) / 2',
                formula3D: '2 × ((7 × side × apothem) / 2) + (7 × side) × height',
                prismName: 'Heptagonal Prism',
                prismVertices: 14, 
                prismEdges: 21, 
                prismFaces: 9
            },
            '8': { 
                name: 'Octagon', 
                vertices: 8, 
                edges: 8, 
                faces: 1, 
                formula2D: '(8 × side × apothem) / 2',
                formula3D: '2 × ((8 × side × apothem) / 2) + (8 × side) × height',
                prismName: 'Octagonal Prism',
                prismVertices: 16, 
                prismEdges: 24, 
                prismFaces: 10
            },
            '9': { 
                name: 'Enneagon', 
                vertices: 9, 
                edges: 9, 
                faces: 1, 
                formula2D: '(9 × side × apothem) / 2',
                formula3D: '2 × ((9 × side × apothem) / 2) + (9 × side) × height',
                prismName: 'Enneagonal Prism',
                prismVertices: 18, 
                prismEdges: 27, 
                prismFaces: 11
            },
            '10': { 
                name: 'Decagon', 
                vertices: 10, 
                edges: 10, 
                faces: 1, 
                formula2D: '(10 × side × apothem) / 2',
                formula3D: '2 × ((10 × side × apothem) / 2) + (10 × side) × height',
                prismName: 'Decagonal Prism',
                prismVertices: 20, 
                prismEdges: 30, 
                prismFaces: 12
            },
            '11': { 
                name: 'Hendecagon', 
                vertices: 11, 
                edges: 11, 
                faces: 1, 
                formula2D: '(11 × side × apothem) / 2',
                formula3D: '2 × ((11 × side × apothem) / 2) + (11 × side) × height',
                prismName: 'Hendecagonal Prism',
                prismVertices: 22, 
                prismEdges: 33, 
                prismFaces: 13
            },
            '12': { 
                name: 'Dodecagon', 
                vertices: 12, 
                edges: 12, 
                faces: 1, 
                formula2D: '(12 × side × apothem) / 2',
                formula3D: '2 × ((12 × side × apothem) / 2) + (12 × side) × height',
                prismName: 'Dodecagonal Prism',
                prismVertices: 24, 
                prismEdges: 36, 
                prismFaces: 14
            },
        };

        this.init();
        this.setupEventListeners();
        this.animate();
        
        // Load saved language preference
        const savedLanguage = localStorage.getItem('geometrix-language') || 'en';
        this.setLanguage(savedLanguage);
        this.createPrism(6);
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        const container = document.getElementById('canvas-container');
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.updateCameraPosition();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x4f46e5, 0.5);
        pointLight.position.set(-10, -10, -5);
        this.scene.add(pointLight);

        this.setViewMode(false);
    }
    
    createPrismGeometry(sides, height, radius) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const indices = [];
    
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            vertices.push(x, y, height / 2);
            vertices.push(x, y, -height / 2);
        }
    
        for (let i = 0; i < sides; i++) {
            const i2 = (i + 1) % sides;
            const top1 = i * 2;
            const bottom1 = i * 2 + 1;
            const top2 = i2 * 2;
            const bottom2 = i2 * 2 + 1;
    
            indices.push(bottom1, bottom2, top2);
            indices.push(top2, top1, bottom1);
        }
    
        for (let i = 1; i < sides - 1; i++) {
            indices.push(0, i * 2, (i + 1) * 2);
            indices.push(1, (i + 1) * 2 + 1, i * 2 + 1);
        }
    
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        return geometry;
    }

    createPrism(sides) {
        if (this.currentMesh) {
            this.scene.remove(this.currentMesh);
            this.currentMesh.geometry.dispose();
            this.currentMesh.material.dispose();
        }

        const geometry = this.createPrismGeometry(sides, 2.5, 1.5);
        const color = document.getElementById('shapeColor').value;
        const wireframe = document.getElementById('wireframe').checked;
        const material = new THREE.MeshPhongMaterial({ color, wireframe, shininess: 100, specular: 0x222222 });
        this.currentMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.currentMesh);

        this.updateInfoPanel(sides.toString());
        this.updateActiveButton(sides.toString());
    }

    create2DPolygon(sides) {
        if (this.currentMesh) {
            this.scene.remove(this.currentMesh);
            this.currentMesh.geometry.dispose();
            this.currentMesh.material.dispose();
        }

        const shape = new THREE.Shape();
        const radius = 2;
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        shape.closePath();

        const geometry = new THREE.ShapeGeometry(shape);
        const color = document.getElementById('shapeColor').value;
        const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, wireframe: document.getElementById('wireframe').checked });

        this.currentMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.currentMesh);

        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);

        this.updateInfoPanel(sides.toString());
        this.updateActiveButton(sides.toString());
    }
    
    updateCameraPosition() {
        const x = this.cameraRadius * Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta);
        const y = this.cameraRadius * Math.cos(this.cameraPhi);
        const z = this.cameraRadius * Math.sin(this.cameraPhi) * Math.sin(this.cameraTheta);
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
    }

    updateInfoPanel(shapeKey) {
        const info = this.shapeInfo[shapeKey];
        const infoPanel = document.getElementById('info-panel');
        if (info) {
            infoPanel.classList.remove('hidden');
            
            const translations = this.translations[this.currentLanguage];
            
            if (this.is2DMode) {
                document.getElementById('info-title').textContent = info.name;
                document.getElementById('info-content').innerHTML = `
                    <p><strong>${translations.vertices}:</strong> ${info.vertices}</p>
                    <p><strong>${translations.edges}:</strong> ${info.edges}</p>
                    <p><strong>${translations.faces}:</strong> ${info.faces}</p>
                    <p><strong>${translations.area_formula}:</strong> <code class="text-xs">${info.formula2D}</code></p>
                `;
            } else {
                document.getElementById('info-title').textContent = info.prismName;
                document.getElementById('info-content').innerHTML = `
                    <p><strong>${translations.vertices}:</strong> ${info.prismVertices}</p>
                    <p><strong>${translations.edges}:</strong> ${info.prismEdges}</p>
                    <p><strong>${translations.faces}:</strong> ${info.prismFaces}</p>
                    <p><strong>${translations.area_formula}:</strong> <code class="text-xs">${info.formula3D}</code></p>
                `;
            }
        } else {
            infoPanel.classList.add('hidden');
        }
    }

    updateActiveButton(key) {
        document.querySelectorAll('.shape-btn').forEach(btn => {
            if (btn.dataset.sides === key) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.getElementById('language-switcher').addEventListener('change', (e) => this.setLanguage(e.target.value));
        document.getElementById('view3d').addEventListener('click', () => this.setViewMode(false));
        document.getElementById('view2d').addEventListener('click', () => this.setViewMode(true));

        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sides = parseInt(e.target.dataset.sides);
                if (this.is2DMode) {
                    this.create2DPolygon(sides);
                } else {
                    this.createPrism(sides);
                }
            });
        });

        document.getElementById('rotationSpeed').addEventListener('input', (e) => {
            this.rotationSpeed = e.target.value / 10000;
            this.autoRotate = e.target.value > 0;
        });

        document.getElementById('wireframe').addEventListener('change', () => this.redrawCurrentShape());
        document.getElementById('shapeColor').addEventListener('change', () => {
            if (this.currentMesh) this.currentMesh.material.color.set(document.getElementById('shapeColor').value);
        });


        
        this.renderer.domElement.addEventListener('pointerdown', (e) => {
            if (!this.is2DMode) {
                this.isDragging = true;
                this.previousMousePosition.x = e.clientX;
                this.previousMousePosition.y = e.clientY;
                document.body.classList.add('no-select');
            }
        });

        window.addEventListener('pointermove', (e) => {
            if (this.isDragging && !this.is2DMode) {
                const deltaX = e.clientX - this.previousMousePosition.x;
                const deltaY = e.clientY - this.previousMousePosition.y;

                this.cameraTheta += deltaX * 0.01;
                this.cameraPhi += deltaY * 0.01;
                
                this.cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, this.cameraPhi));

                this.previousMousePosition.x = e.clientX;
                this.previousMousePosition.y = e.clientY;

                this.updateCameraPosition();
            }
        });

        window.addEventListener('pointerup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                document.body.classList.remove('no-select');
            }
        });
        
        this.renderer.domElement.addEventListener('wheel', (e) => {
            if (!this.is2DMode) {
                this.cameraRadius += e.deltaY * 0.01;
                this.cameraRadius = Math.max(2, Math.min(20, this.cameraRadius));
                this.updateCameraPosition();
            }
        });

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ': e.preventDefault(); this.autoRotate = !this.autoRotate; break;
                case 'r': case 'R': 
                    this.cameraRadius = 5;
                    this.cameraPhi = Math.PI / 2;
                    this.cameraTheta = 0;
                    this.updateCameraPosition();
                    break;
                case 'w': case 'W': document.getElementById('wireframe').click(); break;
            }
        });
    }

    setViewMode(is2D) {
        this.is2DMode = is2D;
        document.getElementById('view3d').classList.toggle('active', !is2D);
        document.getElementById('view2d').classList.toggle('active', is2D);
        
        if (is2D) {
            this.controls.enabled = false;
            this.create2DPolygon(6);
            this.camera.position.set(0, 0, 5);
            this.camera.lookAt(0, 0, 0);
        } else {
            this.controls.enabled = true;
            this.createPrism(6);
            this.camera.position.set(0, 0, 5);
            this.controls.reset();
        }
    }
    
    redrawCurrentShape() {
        const activeBtn = document.querySelector('.shape-btn.active');
        if (!activeBtn) return;
        const sides = parseInt(activeBtn.dataset.sides);
    
        if (this.is2DMode) {
            this.create2DPolygon(sides);
        } else {
            this.createPrism(sides);
        }
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        
        // Save language preference to localStorage
        localStorage.setItem('geometrix-language', lang);
        
        // Update language switcher
        document.getElementById('language-switcher').value = lang;
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (this.translations[lang] && this.translations[lang][key]) {
                el.textContent = this.translations[lang][key];
            }
        });
        
        // Redraw current shape to update info panel
        this.redrawCurrentShape();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.autoRotate && this.currentMesh && !this.is2DMode) {
            this.currentMesh.rotation.x += this.rotationSpeed;
            this.currentMesh.rotation.y += this.rotationSpeed;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GeometrixApp();
});
