/// <reference path="../../node_modules/@types/three/index.d.ts" />
/// <reference path="../../node_modules/@types/requirejs/index.d.ts" />
import THREE = require('three');
THREE.OrbitControls = require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/controls\/OrbitControls');

class ThreeJSSample {

    /**
     * @var 画面の横のサイズ
     */
    private width = window.innerWidth;

    /**
     * @var 画面の縦のサイズ
     */
    private height = window.innerHeight;

    /**
     * @var スクリーン
     */
    private scene: THREE.Scene;

    /**
     * @var カメラ
     */
    private camera: THREE.Camera;

    /**
     * @var WebGLレンダラー
     */
    private renderer: THREE.WebGLRenderer;

    /**
     * @var ジオメトリー
     */
    private geometry: THREE.Geometry;

    /**
     * @var マテリアル
     */
    private material: THREE.Material;

    /**
     * @var メッシュ
     */
    private mesh: THREE.Mesh;

    /**
     * @var コントロール
     */
    private controls: THREE.OrbitControls;

    /**
     * コンストラクタ
     */
    constructor() {
        // レンダラーを作成
        this.createRenderer();
        // シーンを作成
        this.createScene();
    }

    /**
     * WebGL レンダラーを作成
     */
    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        // サイズの設定
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * シーンを作成する
     */
    private createScene(){

        // シーン (空間) を作成
        this.scene = new THREE.Scene();

        // ジオメトリーを作成
        this.geometry = new THREE.SphereGeometry(5, 60, 40);
        this.geometry.scale(-1, 1, 1);
        // 画像を読み込む
        var textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "anonymous";
        var texture = textureLoader.load('/src/img/test.jpg');
        this.material = new THREE.MeshBasicMaterial({map: texture });
        // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // メッシュをシーンに追加
        this.scene.add(this.mesh);

        // カメラを作成
        this.createCamera();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    /**
     * カメラを作成する
     */
    private createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
        this.camera.position.set(0, 0, 0.1);
        this.camera.lookAt(this.mesh.position);
    }

    /**
     * レンダリング
     */
    public render(){
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

}

// ウィンドウがロードされた時
window.addEventListener("load",function(){
    // アプリケーションの起動
    var threeJSSample = new ThreeJSSample();
    threeJSSample.render();
},false);