import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const geometry = new THREE.CircleGeometry( 2, 64 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
material.side = THREE.DoubleSide
const circle = new THREE.Mesh( geometry, material ); scene.add( circle );

const orbit = new OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();