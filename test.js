//#region setup
let displayEdges = true;
let displayNodes = true;
let len = 200000;
const osize = 5.0;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const cv = document.getElementById('canvas')
let pcamera = new THREE.PerspectiveCamera( 75, cv.clientWidth / window.innerHeight, 0.1, 1000 );
pcamera.position.set(0, 0, 5);
console.log(cv.clientWidth / window.innerHeight);
let ocamera = new THREE.OrthographicCamera(-osize * (cv.clientWidth / window.innerHeight), osize * (cv.clientWidth / window.innerHeight), osize, -osize, 0.1, 1000);
ocamera.position.set(0, 0, 5);
cv.appendChild(renderer.domElement);
//Done twice to prevent mismatch
renderer.setSize(cv.clientWidth, window.innerHeight);
renderer.setSize(cv.clientWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(1,1,1));

window.addEventListener('resize', () => {
    renderer.setSize(cv.clientWidth, window.innerHeight);
    pcamera.aspect = cv.clientWidth / window.innerHeight;
    pcamera.updateProjectionMatrix();
    ocamera.left = -osize * cv.clientWidth / window.innerHeight;
    ocamera.right = osize * cv.clientWidth / window.innerHeight;
    ocamera.updateProjectionMatrix();
});

const controls = new THREE.OrbitControls(pcamera, renderer.domElement);
// controls.screenSpacePanning = true;
const controls2 = new THREE.OrbitControls(ocamera, renderer.domElement);
// controls2.screenSpacePanning = true;


let t0 = new THREE.TextureLoader().load('./images/XAI_A.png');
let t1 = new THREE.TextureLoader().load('./images/XAI_B.png');
let t2 = new THREE.TextureLoader().load('./images/XAI_C.png');
let t3 = new THREE.TextureLoader().load('./images/XAI_D.png');

let l0 = new XAI.Layer(t0);
let l1 = new XAI.Layer(t1);
let l2 = new XAI.Layer(t2);
let l3 = new XAI.Layer(t3);

let layout = new XAI.Layout(2,2,1);
layout.setSpacing(2, 2, 1)
    .addLayer(l0, l1, l2, l3)
    .moveToCenter()
    .apply();

let layout2 = new XAI.Layout(1,1,4);
layout2.setSpacing(1, 1, 0.05)
    .addLayer(l0, l1, l2, l3)
    .moveToCenter();


scene.add(layout.group);
scene.add(layout2.group);

//#endregion

let currCam = pcamera;
function animate(){
    requestAnimationFrame(animate);
    
    controls.update();
    controls2.update();
    renderer.render(scene, currCam);
}
animate();


//#region UI
document.getElementById("SPLAYED").onclick = function(){
    layout.apply();
}

document.getElementById("STACKED").onclick = function(){
    layout2.apply();
}

document.getElementById("RESET").onclick = function(){
    controls.reset();
    controls2.reset();
}

document.getElementById("ORTHO").onclick = function(){
    let element = document.getElementById("ORTHO");
    let active = element.classList.contains('selected');
    if(active){
        currCam = pcamera;
        element.classList.remove('selected');
    }
    else{
        element.classList.add('selected');
        currCam = ocamera;
    }

}
//#endregion
