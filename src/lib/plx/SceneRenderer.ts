import * as THREE from 'three';

export class SceneRenderer {
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

  renderTarget: HTMLElement;

  mounted: boolean = false;

  onMount(divElement: HTMLElement) {
    if (this.mounted) {
      return;
    }
    this.mounted = true;
    this.renderTarget = divElement;
    this.renderTarget.appendChild(this.renderer.domElement);

    new ResizeObserver(this.onResize.bind(this)).observe(this.renderTarget);

    this.initRenderer();
    this.initCamera();
    this.addAxesGizmo();
    this.raf();
  }

  initCamera() {
    this.camera.fov = 90;
    this.camera.near = 0.1;
    this.camera.far = 1000;
    this.resetCameraPosition();
  }

  resetCameraPosition() {
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
  }

  initRenderer() {
    this.renderer.setClearColor(new THREE.Color("SkyBlue"), 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.renderTarget.clientWidth,
      this.renderTarget.clientHeight
    );
  }

  addAxesGizmo() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  onResize(event: UIEvent) {
    this.renderer.setSize(
      this.renderTarget.clientWidth,
      this.renderTarget.clientHeight
    );

    this.camera.aspect =
      this.renderTarget.clientWidth / this.renderTarget.clientHeight;

    this.camera.updateProjectionMatrix();

    this.render();
  }

  render() {
    if (!this.renderer) {
      return;
    }
    if (!this.scene) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
  }

  raf() {
    requestAnimationFrame(this.raf.bind(this));
    this.render();
  }
}
