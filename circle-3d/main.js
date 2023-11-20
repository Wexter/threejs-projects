import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x444444 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 20;

const geometry = new THREE.CircleGeometry( 10, 64 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, opacity: 100 } );
material.side = THREE.DoubleSide
geometry.rotateX(1.5708)

const circle = new THREE.Mesh( geometry, material );
scene.add( circle );

const orbit = new OrbitControls( camera, renderer.domElement );
// orbit.enableZoom = false;

const lineXMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } ),
	lineYMaterial  = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
	lineZMaterial  = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const lineXGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 10, 0, 0 )
]);

const lineYGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 0, 10, 0 )
]);

const lineZGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 0, 0, 10 )
]);

const lineX = new THREE.Line( lineXGeometry, lineXMaterial ),
	lineY = new THREE.Line( lineYGeometry, lineYMaterial ),
	lineZ = new THREE.Line( lineZGeometry, lineZMaterial );

scene.add(lineX).add(lineY).add(lineZ);

const squaregeometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
//	 X	   Y     Z
	-5.0,  5.0, -5.0, // v0
	 5.0,  5.0, -5.0, // v1
	 5.0,  5.0,  5.0, // v2

	 5.0,  5.0,  5.0, // v3
	-5.0,  5.0,  5.0, // v4
	-5.0,  5.0, -5.0  // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex
squaregeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const squarematerial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
squarematerial.side = THREE.DoubleSide;
const mesh = new THREE.Mesh( squaregeometry, squarematerial );

scene.add(mesh);

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();