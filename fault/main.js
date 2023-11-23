import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

var deg2rad = function (deg) {
	return (deg / 180) * Math.PI;
};

var rad2deg = function (rad) {
	return (rad / Math.PI) * 180;
};

const gui = new GUI();

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x555555 );
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
camera.position.x = 0;
camera.position.z = 200;
camera.position.y = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );

const lineXMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } ),
	lineYMaterial  = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
	lineZMaterial  = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const lineXGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3(   0, 0, 0 ),
	new THREE.Vector3( 200, 0, 0 )
]);

const lineYGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0,   0, 0 ),
	new THREE.Vector3( 0, 200, 0 )
]);

const lineZGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, 0,   0 ),
	new THREE.Vector3( 0, 0, 200 )
]);

const lineX = new THREE.Line( lineXGeometry, lineXMaterial ),
	lineY = new THREE.Line( lineYGeometry, lineYMaterial ),
	lineZ = new THREE.Line( lineZGeometry, lineZMaterial );

scene.add(lineX).add(lineY)/* .add(lineZ); */

const group = new THREE.Group();

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );

const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
const meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

group.add( new THREE.LineSegments( geometry, lineMaterial ) );
group.add( new THREE.Mesh( geometry, meshMaterial ) );

scene.add( group );

function drawCircle(mesh) {
	const data = {
		angle: 0,
		radius: 150,
		height: 150,
		// segmentAngle: 1,
		faultAzimuth: 0,
		dtilt: 45
	};

	let line = null,
		faultline = null;

	function generateGeometry() {
		if (null !== faultline)
			scene.remove(faultline);

		let tilt = data.dtilt * Math.cos(deg2rad(data.angle - data.faultAzimuth));

		const faultlineGeometry = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3( 0, data.height, 0 ),
			new THREE.Vector3(
				data.radius * Math.cos(deg2rad(tilt)),
				data.height + data.radius * Math.sin(deg2rad(tilt)),
				0
			)
		]);
	
		faultline = new THREE.Line( faultlineGeometry, lineMaterial );
		scene.add(faultline);
	}
	
	const folder = gui.addFolder( 'THREE.CircleGeometry' );
	
	folder.add( data, 'angle', 0, 360 ).onChange( generateGeometry );
	folder.add( data, 'radius', 1, 200 ).onChange( generateGeometry );
	folder.add( data, 'height', 0, 200 ).step( 1 ).onChange( generateGeometry );
	folder.add( data, 'faultAzimuth', 0, 360 ).onChange( generateGeometry );
	folder.add( data, 'dtilt', -90, 90 ).onChange( generateGeometry );

	generateGeometry();
}

drawCircle(group);

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();