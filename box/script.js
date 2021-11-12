(() => {
    window.addEventListener('DOMContentLoaded', () => {
        init();

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'Escape':
                    run = event.key !== 'Escape';
                    break;
                case ' ':
                    isDown = true
                    break;
                default:
            }
        }, false);
        window.addEventListener('keyup', () => {
            isDown = false
        }, false)
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }, false)

        run = true
        render();
    }, false)

    // 汎用変数
    let run = true;     // レンダリングループフラグ
    let isDown = false; // スペースキーが押されているかどうかのフラグ

    // three.js に関連するオブジェクト用の変数
    let scene;            // シーン
    let camera;           // カメラ
    let renderer;         // レンダラ
    let geometry;         // ジオメトリ
    let material;         // マテリアル
    let torusKnotArray;       // トーラスメッシュの配列 @@@
    let controls;         // カメラコントロール
    let axesHelper;       // 軸ヘルパーメッシュ
    let directionalLight; // ディレクショナル・ライト（平行光源）
    let ambientLight;     // アンビエントライト（環境光）

    // カメラに関するパラメータ
    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 30.0,
        x: 0.0,
        y: 5.0,
        z: 10.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    };
    // レンダラに関するパラメータ
    const RENDERER_PARAM = {
        clearColor: 0x666666,
        width: window.innerWidth,
        height: window.innerHeight,
    }
    // マテリアルのパラメータ
    const MATERIAL_PARAM = {
        color: 0x3399ff,
        specular: 0xffffff,
    };
    // ライトに関するパラメータの定義
    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        x: 1.0,
        y: 1.0,
        z: 1.0
    };
    // アンビエントライトに関するパラメータの定義
    const AMBIENT_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.2,
    };

    function init() {
        // シーン
        scene = new THREE.Scene();

        // レンダラ
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
        const wrapper = document.querySelector('#webgl');
        wrapper.appendChild(renderer.domElement);

        // カメラ
        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAM.fovy,
            CAMERA_PARAM.aspect,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far,
        );
        camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
        camera.lookAt(CAMERA_PARAM.lookAt);

        // マテリアル
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        // トーラスノットジオメトリ
        geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

        // トーラスノットジオメトリをまとめて、生成
        torusKnotArray = [];
        const count = 20;
        for (let i = 0; i < count; i++) {
            const torusKnot = new THREE.Mesh(geometry, material);

            // 位置
            torusKnot.position.x = Math.random() * 10.0 - 5;
            torusKnot.position.y = Math.random() * 10.0 - 5;
            torusKnot.position.z = Math.random() * 10.0 - 5;
            // サイズ
            const scale = Math.random() * 0.5 + 0.5;
            torusKnot.scale.set(scale, scale, scale);


            torusKnotArray.push(torusKnot);
            scene.add(torusKnot);
        }

        // ディレクショナルライト
        directionalLight = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity
        );
        directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
        directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
        directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
        scene.add(directionalLight);

        // アンビエントライト
        ambientLight = new THREE.AmbientLight(
            AMBIENT_LIGHT_PARAM.color,
            AMBIENT_LIGHT_PARAM.intensity
        );
        scene.add(ambientLight)

    }

    function render() {
        if (run === true) requestAnimationFrame(render);
        if (isDown === true) {
            torusArray.rotation.y += 0.02;
            torusArray.rotation.x += 0.02;
        }

        renderer.render(scene, camera)
    }
})();