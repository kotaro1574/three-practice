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
        })

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
    let torusArray;       // トーラスメッシュの配列 @@@
    let controls;         // カメラコントロール
    let axesHelper;       // 軸ヘルパーメッシュ
    let directionalLight; // ディレクショナル・ライト（平行光源）
    let ambientLight;     // アンビエントライト（環境光）

    const RENDERER_PARAM = {
        clearColor: 0x666666,
        width: window.innerWidth,
        height: window.innerHeight,
    }

    function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height)
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