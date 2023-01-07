import * as THREE from 'three';

import { Time } from '../../components/Time';

export class SceneRenderer {
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  static renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderTarget: HTMLElement;

  mounted: boolean = false;

  onMount(divElement: HTMLElement) {
    if (this.mounted) {
      return;
    }
    this.mounted = true;
    this.renderTarget = divElement;
    this.renderTarget.appendChild(SceneRenderer.renderer.domElement);

    new ResizeObserver(this.onResize.bind(this)).observe(this.renderTarget);

    this.initRenderer();
    this.initCamera();
    this.addAxesGizmo();
    this.addGridGizmo();
    this.raf();
  }

  onDestroy() {
    if (!this.mounted) {
      return;
    }
    this.mounted = false;
    this.renderTarget.removeChild(SceneRenderer.renderer.domElement);
    cancelAnimationFrame(this.rafID);
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
    SceneRenderer.renderer.setClearColor(0, 0);
    SceneRenderer.renderer.setPixelRatio(window.devicePixelRatio);
    SceneRenderer.renderer.setSize(
      this.renderTarget.clientWidth,
      this.renderTarget.clientHeight
    );
  }

  addAxesGizmo() {
    const xAxisLine = new THREE.Line3(
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(10, 0, 0)
    );

    const yAxisLine = new THREE.Line3(
      new THREE.Vector3(0, -10, 0),
      new THREE.Vector3(0, 10, 0)
    );

    const zAxisLine = new THREE.Line3(
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(0, 0, 10)
    );

    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      xAxisLine.start,
      xAxisLine.end,
    ]);
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      yAxisLine.start,
      yAxisLine.end,
    ]);
    const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      zAxisLine.start,
      zAxisLine.end,
    ]);

    const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
    const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
    const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);

    this.scene.add(xAxis);
    this.scene.add(yAxis);
    this.scene.add(zAxis);
  }
  addGridGizmo() {
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.position.y -= 0.001;
    this.scene.add(gridHelper);
  }

  onResize(event: UIEvent) {
    SceneRenderer.renderer.setSize(
      this.renderTarget.clientWidth,
      this.renderTarget.clientHeight
    );

    this.camera.aspect =
      this.renderTarget.clientWidth / this.renderTarget.clientHeight;

    this.camera.updateProjectionMatrix();

    this.render();
  }

  render() {
    if (!SceneRenderer.renderer) {
      return;
    }
    if (!this.scene) {
      return;
    }
    SceneRenderer.renderer.render(this.scene, this.camera);
  }

  rafID: number = 0;
  raf() {
    this.rafID = requestAnimationFrame(this.raf.bind(this));
    const now = performance.now();
    Time.update(now);

    // rotate camera around the origin
    this.camera.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Time.deltaTime * 0.2
    );
    this.camera.lookAt(0, 0, 0);

    this.render();
  }
}
