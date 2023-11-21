import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var deg2rad = function (deg) {
	return (deg / 180) * Math.PI;
};

var rad2deg = function (rad) {
	return (rad / Math.PI) * 180;
};

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x555555 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
camera.position.x = 15;
camera.position.z = 15;
camera.position.y = 15;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );

const lineXMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } ),
	lineYMaterial  = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
	lineZMaterial  = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const lineXGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( -20, 0, 0 ),
	new THREE.Vector3( 20, 0, 0 )
]);

const lineYGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, -20, 0 ),
	new THREE.Vector3( 0, 20, 0 )
]);

const lineZGeometry = new THREE.BufferGeometry().setFromPoints([
	new THREE.Vector3( 0, 0, -20 ),
	new THREE.Vector3( 0, 0, 20 )
]);

const lineX = new THREE.Line( lineXGeometry, lineXMaterial ),
	lineY = new THREE.Line( lineYGeometry, lineYMaterial ),
	lineZ = new THREE.Line( lineZGeometry, lineZMaterial );

scene.add(lineX).add(lineY).add(lineZ);

function drawCircle(scene) {
	const radius = 10;
	const height = 10;
	const segmentAngle = 1;
	const faultAzimuth = 180;
	const faultAngle = 45;
	let segments = 360 / segmentAngle;
	let verticesCount = 3 * 3 * segments;
	const vertices = new Float32Array(verticesCount);

	const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );

	let geometryPoints = [];

	for (let segment = 0; segment < segments; segment++) {
		let angle = segment * segmentAngle;

		console.log(
			'angle:' + angle +
			' cos(angle):' + Math.cos(deg2rad(angle)) +
			' sin(angle):' + Math.sin(deg2rad(angle)) +
			' sin(faultAngle):' + Math.sin(deg2rad(faultAngle)) +
			' cos(faultAngle):' + Math.cos(deg2rad(faultAngle))
		);

		geometryPoints.push(
			new THREE.Vector3(
				Math.cos(deg2rad(angle)) * radius * Math.cos(deg2rad(faultAngle)),
				height + radius * Math.cos(deg2rad(angle - faultAzimuth)) * -1 * Math.sin(deg2rad(faultAngle)),
				Math.sin(deg2rad(angle)) * radius * Math.cos(deg2rad(faultAngle))
			)
		);
	}

	geometryPoints.push(geometryPoints[0]);

	console.log(geometryPoints);

	const lineGeometry = new THREE.BufferGeometry().setFromPoints(geometryPoints);

	const line = new THREE.Line( lineGeometry, lineMaterial );

	scene.add(line);

	const faultlineGeometry = new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(
			0,
			height,
			0
		),
		new THREE.Vector3(
			Math.cos(deg2rad(faultAzimuth)) * radius * Math.cos(deg2rad(faultAngle)),
			height + radius * -1 * Math.sin(deg2rad(faultAngle)),
			Math.sin(deg2rad(faultAzimuth)) * radius * Math.cos(deg2rad(faultAngle))
		)
	]);

	const faultline = new THREE.Line( faultlineGeometry, lineMaterial );
	scene.add(faultline);

	// const squaregeometry = new THREE.BufferGeometry();
	// // itemSize = 3 because there are 3 values (components) per vertex
	// squaregeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	// const squarematerial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 100 } );
	// squarematerial.side = THREE.DoubleSide;
	// const mesh = new THREE.Mesh( squaregeometry, squarematerial );
	
	// scene.add(mesh);
}

drawCircle(scene);

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();