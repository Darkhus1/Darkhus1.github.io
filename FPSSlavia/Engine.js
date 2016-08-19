// VARIABLES
var scene;
var camera;
var renderer;
var objects = [];
var HitO;
var speed = 4;
var speeds;
var speedd;
var map;
var mapn;
var distance;
var bobview;
var bobint = 0.005;
var gravity = true;
var climbspeed = 0.35;
var SpawnX;
var SpawnY;
var SpawnZ;
var followdistance = 200;
var gunanimation;
var firegunanimation;
var crosshair;
var botgrav = 0.01;
var hpicon;
var hudHP;
var hotbar;

var gun = "revolver";
var revolver;

var deflectrate = 1;

var HitPointCol;

var rampclipdistance = 20;

var tickrate = 128;

var ColArray = [];

var agro = false;

var hp = 100;

var botattackrange = 200;

var Acc = 6;

var HitArray = [];

var playerdamege;

var jumpheight;

var botcount = 0;

var HitO;

var minairtime = 5;

var prevppx;
var prevppy;
var prevppz;

var prevpp2x;
var prevpp2y;
var prevpp2z;

var prevpp3x;
var prevpp3y;
var prevpp3z;

var npcspeed = 0.0005;

var botattackspeed = 500;





var enemyArray = [];

var enemyspawns = [];

var array;

var playerbody;
var playerw;
var playerh;
var playerd;
var canupdate = false;
var canrender = false;
var controlsEnabled = false;


var InAir = true;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var Sprint = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var raycaster = new THREE.Raycaster();
var intersectionss = raycaster.intersectObjects( objects );
///
		
//Intitialize the renderer
document.body.style.margin = 0;

// //////////// SETUP//////////////////
function setupworld(POV, minr, maxr, color, aa, res){

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( POV, window.innerWidth/window.innerHeight, minr, maxr );


renderer = new THREE.WebGLRenderer({ antialias: aa });
renderer.setClearColor( color ); // 0xffffff default
renderer.setPixelRatio( res ); // window.devicePixelRatio default
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
	

	
	
console.log('/////SETUP GAME WORLD///////');	

}

function updateworld(yn){

if (yn == true){
	
canupdate = true;	
	
}

if (yn == false){
	
canupdate = false;	
	
}	
	
	
}

function renderworld(yn){

if (yn == true){
	
canrender = true;	

}

if (yn == false){
	
canrender = false;	
	
}	
	
	
}

function viewbobbing(yn, inte){

if (yn == true){
	
bobview = true;	
bobint = inte;

}

if (yn == false){
	
bobview = false;	
	
}	
	
	
}



function getDistance(mesh1, mesh2) {
            var dx = mesh1.position.x - mesh2.position.x;
            var dy = mesh1.position.y - mesh2.position.y;
            var dz = mesh1.position.z - mesh2.position.z;
			
            distance = Math.sqrt(dx*dx+dy*dy+dz*dz);
			//console.log(distance);
}

function getDistanceAI(mesh1, prevpp) {
	         
			var dx;
			var dy;
			var dz;
	
	        var distanceai;
	
	        if (prevpp == 'prevpp'){
            dx = mesh1.position.x - prevppx;
            dy = mesh1.position.y - prevppy;
            dz = mesh1.position.z - prevppz;
			}
			else if (prevpp == 'prevpp2'){
            dx = mesh1.position.x - prevpp2x;
            dy = mesh1.position.y - prevpp2y;
            dz = mesh1.position.z - prevpp2z;
			}
			else if (prevpp == 'prevpp3'){
            dx = mesh1.position.x - prevpp3x;
            dy = mesh1.position.y - prevpp3y;
            dz = mesh1.position.z - prevpp3z;
			}
			
            distanceai = Math.sqrt(dx*dx+dy*dy+dz*dz);
			//console.log(distance);
			return distanceai;
}






function lockpointer(){
	

			

			// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

			var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

			if ( havePointerLock ) {

				var element = document.body;

				var pointerlockchange = function ( event ) {

					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

						
						controlsEnabled = true;
						

						blocker.style.display = 'none';
						

					} else {

						controlsEnabled = false;

						blocker.style.display = '-webkit-box';
						blocker.style.display = '-moz-box';
						blocker.style.display = 'box';

						instructions.style.display = '';

					}

				};

				var pointerlockerror = function ( event ) {

					instructions.style.display = '';

				};

				// Hook pointer lock state change events
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

				document.addEventListener( 'click', function ( event ) {

					instructions.style.display = 'none';

					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

					if ( /Firefox/i.test( navigator.userAgent ) ) {

						var fullscreenchange = function ( event ) {

							if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

								document.removeEventListener( 'fullscreenchange', fullscreenchange );
								document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

								element.requestPointerLock();
							}

						};

						document.addEventListener( 'fullscreenchange', fullscreenchange, false );
						document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

						element.requestFullscreen();

					} else {

						element.requestPointerLock();

					}

				}, false );

			} else {

				instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

			}	
	
	
	
	
}



function loadspawnpoint(){
	
	
		
		playerbody.position.x = SpawnX;
		playerbody.position.y = SpawnY;
		playerbody.position.x = SpawnZ;
	
	
}


















function createplayer(x,y,z, sensitivity, speedn, speedr){
	
playerw = x;
playerh = y;
playerd = z;


var geometry = new THREE.BoxGeometry( x, y, z, 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( { color: 0x3300FF } );
playerbody = new THREE.Mesh( geometry, material );
playerbody.visible = false;
scene.add( playerbody );
playerbody.position.y = playerh / 2;
camera.position.y = playerh / 2;
playerbody.add(camera);



speedd = speedn;
speeds = speedr;

var onMouseMove = function ( event ) {

       if(controlsEnabled){
		   
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		playerbody.rotation.y -= movementX * sensitivity;
		camera.rotation.x -= movementY * sensitivity;

	   }
	   
	   if (camera.rotation.x > 1.50 && camera.rotation.x > 1.45 ){
					
		camera.rotation.x = 1.50;
	   }
	    if (camera.rotation.x < -1.50 && camera.rotation.x < -1.45 ){
					
	     camera.rotation.x = -1.50;
	    }

	};
document.addEventListener( 'mousemove', onMouseMove, false );
	
	
}




function createplayercontrols(W,A,S,D,E,Space,Shift, jumph){
	
jumpheight = jumph;

				var onKeyDown = function ( event ) {

					switch ( event.keyCode ) {

						case W:
                        case 90:						
						    if (controlsEnabled == true){
							moveForward = true;
							}
							break;
						case A:
                        case 81:						
						    if (controlsEnabled == true){
							moveLeft = true; break;
                            }
						case S:
                         if (controlsEnabled == true){						
						 moveBackward = true;
						 }
						break;

						case D:
                            if (controlsEnabled == true){						
							moveRight = true;
							}
							break;
							
						case E: // E
						    
							Ekey = true;
							
							break;
							
						
						case Shift: // SHIFT
							Sprint = true;
							break;

						case Space: // SPACE
							if ( canJump === true || InAir == false){
							
                           	
                            InAir = true;							
							velocity.y += jumph;
							setTimeout(function(){ canJump = false; }, minairtime);
							
							}
							
							
							break;

					}

				};

				var onKeyUp = function ( event ) {

					switch( event.keyCode ) {

						
						case W: //W
						case 90:
							moveForward = false;
							break;

						case A: //A
						case 81:
							moveLeft = false;
							break;

						case S: // S
							moveBackward = false;
							break;

						case D: // D
							moveRight = false;
							break;
						
						case E: // E
							Ekey = false;
							break;
							
							case Shift: // shift
							Sprint = false;
							break;

					}

				}; 
				
				
				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );
	
	
	
	
	
	
	
	
}
var loader = new THREE.ObjectLoader();

function loadcolmap(url){
	

loader.load(url,function ( obj ) {
				 
console.log(url + ' LOADED');				
map = obj;
			     
array = map.children;			  
scene.add( map );
				 
});

				
                
				
}


var loader2 = new THREE.ObjectLoader();

function loadnormalmap(url){
	

loader2.load(url,function ( obj ) {
				 
console.log(url + ' LOADED');				
mapn = obj;
			     
		  
scene.add( mapn );
				 
});

				
                
				
}
/////////////////  AI ///////////////////

var enemy;

function spawnenemies(obj, follow, grav){

enemy = obj;
looptroughenemyspawns();
followdistance = follow;
botgrav = grav;	
	
}

function looptroughenemyspawns(){
			
			if (enemyspawns){
			enemyspawns.forEach(EnemySpawnOutput);
			}
			
}

function EnemySpawnOutput(item){
	
	var Newenemy = enemy.clone();
	scene.add(Newenemy);

	Newenemy.position.x = item.position.x;
	Newenemy.position.y = item.position.y;
	Newenemy.position.z = item.position.z;

    Newenemy.name = '' + botcount;
	
	Newenemy.hp = 100;
	Newenemy.alive = true;
    
	botcount = botcount + 1;
	
	enemyArray.push(Newenemy);	
    HitArray.push(Newenemy);	
	   
		   
			
}



var ArtificialInteligence = setInterval(function(){ 
if (controlsEnabled){
            
     if (enemyArray){
			enemyArray.forEach(AI);
	}

}
}, 1000 / 30);

var LogPlayerPosition = setInterval(function(){ 
    
	prevpp3x = prevpp2x;
	prevpp3y = prevpp2y;
	prevpp3z = prevpp2z;
	
	prevpp2x = prevppx;
	prevpp2y = prevppy;
	prevpp2z = prevppz;
	
	prevppx = playerbody.position.x;
    prevppy = playerbody.position.y;      
    prevppz = playerbody.position.z;
	

}, 250);


var nodedistance = 50;

function AI(item){
	
// FOLLOW PLAYER
if (item.alive == true){
	


if (getDistanceAI(item, 'prevpp3') < nodedistance){

}else if (getDistanceAI(item, 'prevpp3') < followdistance ){
	
	var ppos = new THREE.Vector3(0,200,0);
	ppos.x = prevpp3x;
	//ppos.y = prevpp3y;
	ppos.z = prevpp3z;
	
	item.translateOnAxis( item.worldToLocal(ppos) ,npcspeed);
	item.rotation.y = playerbody.rotation.y + 3.14;
	
}

if (getDistanceAI(item, 'prevpp2') < nodedistance){

}else if (getDistanceAI(item, 'prevpp2') < followdistance ){
	
	var ppos = new THREE.Vector3(0,200,0);
	ppos.x = prevpp2x;
	//ppos.y = prevpp2y;
	ppos.z = prevpp2z;
	
	item.translateOnAxis( item.worldToLocal(ppos) ,npcspeed);
	item.rotation.y = playerbody.rotation.y + 3.14;
	
}

if (getDistanceAI(item, 'prevpp') < nodedistance){

}else if (getDistanceAI(item, 'prevpp') < followdistance ){
	
	var ppos = new THREE.Vector3(0,200,0);
	ppos.x = prevppx;
	//ppos.y = prevpp1y;
	ppos.z = prevppz;
	
	item.translateOnAxis( item.worldToLocal(ppos) ,npcspeed);
	item.rotation.y = playerbody.rotation.y + 3.14;
	
}

//COllision
	 if (array){
			array.forEach(function(item2){
				
			 if(item2.name.indexOf('[BoxCol]') != -1){	
			TestandPrevColAI(item, item2, item2.geometry.parameters.width, item2.geometry.parameters.height, item2.geometry.parameters.depth );		
				
			 }	
				
			});
	}
	
	//gravity
	
	item.position.y -= botgrav;
	
}else if (item.alive == false){
	
	
	scene.remove(item);
}
	
	
	
}		
/////////////////COMBAT + PARTS OF HUD///////////////////////

var firesrc;
var fireduration;

var iy;
var ix;

var idlesrc;

var canfire = true;

var firedgun = false;


var crossx;
var crossy;



function createcrosshair(src, sizex, sizey){
	
crossx = sizex;
crossy = sizey;	

crosshair = new Image(); 
crosshair.src = src;
crosshair.style.position = "absolute";
crosshair.style.top = window.innerHeight / 2 - crossx / 2;
crosshair.style.left = window.innerWidth / 2 - crossy / 2;
document.getElementById('HUD').appendChild(crosshair);

	
	
	
}

var hpx;
var hpy;

function createhpicon(src, sizex, sizey){
	
hpx = sizex;
hpy = sizey;

hpicon = new Image();
hpicon.src = src;
hpicon.style.position = "absolute";
hpicon.style.top = window.innerHeight - sizey;
hpicon.style.left = 0;
document.getElementById('HUD').appendChild(hpicon);


}

var hotbarx;
var hotbary;

function createhotbar(src, sizex, sizey){
	
	hotbarx = sizex;
	hotbary = sizey;
	
	hotbar = new Image();
	hotbar.src = src;
	hotbar.style.position = "absolute";
	hotbar.style.top = window.innerHeight - sizey - 20;
	hotbar.style.left = window.innerWidth / 2 - sizex / 2;
	document.getElementById('HUD').appendChild(hotbar);
	
}



function initializecombat(idle, xi, yi, fire, firedur, playerd){

gunanimation = new Image();
gunanimation.src = idle;
gunanimation.style.position = "absolute";
gunanimation.style.top = window.innerHeight - 397;
gunanimation.style.left = window.innerWidth / 1.5;
document.getElementById('HUD').appendChild(gunanimation);

playerdamege = playerd;

iy = yi;
ix = xi;	
	
firesrc = fire;
fireduration = firedur;
idlesrc = idle;	
	
}

document.body.onclick = function (e) {

    e = e || window.event;
    if (controlsEnabled == true){
	if (e.button == 0){ // left click
		
		if (canfire == true){
	    canfire = false;
		firedgun = true;
		gunanimation.src = firesrc;
		setTimeout(function(){ firedgun = false; gunanimation.src = idlesrc; canfire = true; }, fireduration);
		
		if (gun == "revolver"){
			
		  createjs.Sound.play("revolverSound");
		 
		 }
		
		
		
		}
		
	}
	
	if (e.button == 2){ // right click
		
		
		
		
		
		
	}
	
	}
} 



var combatloop = setInterval(function(){ 
if (controlsEnabled){
 
  
    if (firedgun == true){
	 if (HitO != false){
		 
	
		 
	firedgun = false;	 
		 
	HitO.hp = HitO.hp - playerdamege;
    	
		
	console.log('Hit: ' + HitO.name + ' HP: ' + HitO.hp);
	
	
	
		
		
	 }	
	}        
      
   
	
	if (gun == "revolver")	{
		
		
	 idlesrc = "/FPSSlavia/Textures/revolver.png";
	 firesrc = "/FPSSlavia/Textures/revolverShooting.png";
	 
	 
		
	}
	    
			
			
			
			
			
			

 }
}, 1);			
			

var attack = setInterval(function(){
	
	
	
	
	
	
	
	
	   if (controlsEnabled){
		if (agro == true){
			
		
            
     if (enemyArray){
			enemyArray.forEach(BotAttack);
	}
	
	
	
		}
}

}, botattackspeed);	



function BotAttack(enemy){
	       if (enemy.alive == true){
           getDistance(playerbody, enemy);
		   
           if (distance < botattackrange){
 
		    rn = Math.floor(Math.random() * Acc) + 1;
			//createjs.Sound.play("Shot" , {volume: fxvolume / 2 });
            if (rn == 1){			
			HitPlayer(10, enemy); 
			} 
            else{
			MisPlayer(enemy);
			}			
		   } 
		 
		 			
	
	
		   }
}


function HitPlayer(x, bot){
			if (controlsEnabled == true){	
			hp = hp - x;	
			
		    scene.remove ( arrow );
            var arrow = new THREE.ArrowHelper( bot.getWorldDirection(), playerbody.getWorldPosition(), 100000000000000000000000000000000000000000000000, Math.random() * 0xffffff);
            scene.add( arrow );
			setTimeout(function(){ scene.remove ( arrow ); }, 200);
            //createjs.Sound.play("HitP" , {volume: fxvolume * 10 });
            camera.rotation.x = camera.rotation.x + 0.1;
			setTimeout(function(){ camera.rotation.x = camera.rotation.x - 0.1; }, 200);
			
				
			}	
			}
			
			var mispos;
			
			function MisPlayer(bot){
				
			mispos = playerbody.getWorldPosition();
			mispos.y = mispos.y + Math.floor(Math.random() * 20) + 1;
			mispos.x = mispos.y + Math.floor(Math.random() * 20) + 1;
			
            scene.remove ( arrow );
            var arrow = new THREE.ArrowHelper( bot.getWorldDirection(), mispos, 10000000000000000000000000000000000000000000000000000, Math.random() * 0xffffff);
            scene.add( arrow );
			setTimeout(function(){ scene.remove ( arrow ); }, 200);			
				
				
			}








//////////////COLLISIONS//////////////////////

						
			var collisions = setInterval(function(){ 
            if (controlsEnabled){
            
            looptroughobjects();

            }
			}, 1);			
			
			function looptroughobjects(){
			
			if (array){
			array.forEach(myFunction);
			}
			
			}
			
			function myFunction(item){
	       // console.log(item.name);
		    if ( controlsEnabled == true){
			
            if(item.name.indexOf('[Col]') != -1){
			
			if(ColArray.indexOf(item) != -1){
		
			}
			else{
				
			ColArray.push(item);	
				
			}
			
			
				
				
		
			}		
				
            if(item.name.indexOf('[BoxCol]') != -1){
				
			TestandPrevCol(playerbody, item, item.geometry.parameters.width + playerw, item.geometry.parameters.height, item.geometry.parameters.depth + playerd );	
				
			
			}
            if(item.name.indexOf('[SpawnPoint]') != -1){
				
			SpawnX = item.position.x;
			SpawnY = item.position.y;
			SpawnZ = item.position.z;
			
			}
			
			if(item.name.indexOf('[EnemySpawn]') != -1){
			
			if(enemyspawns.indexOf(item) != -1){
		
			}
			else{
				
			enemyspawns.push(item);	
				
			}
			
			
				
				
		
			}
            	
				
				
			
            if(	HitArray.indexOf(item) != -1){
		
			}
			else{
			
            item.hp = 10;			
				
			HitArray.push(item);	
				
			}


			
				


			
			} 
			
			
			
			
			}
	
   /////////////////////////////////////////////////////////////////////////////////////////////////////////








   

	


function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				
				if (gunanimation){
				gunanimation.style.top = window.innerHeight / 2;
                gunanimation.style.left = window.innerWidth / 2 - ix/2;
				}
				
				if(crosshair){
				crosshair.style.top = window.innerHeight / 2 - crossx / 2;
                crosshair.style.left = window.innerWidth / 2 - crossy/2;
				}

}
window.addEventListener( 'resize', onWindowResize, false );

var raycaster = new THREE.Raycaster();

var raycasterD = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, playerh / 2 );


var UpdateTheWorld = setInterval(function(){
	
	
	
	if (controlsEnabled == false){
						
		
		velocity.x = 0;
		velocity.z = 0;
		InAir = false;

		
	}
	
	

if(canupdate == true && controlsEnabled == true){		


					raycaster.set( camera.getWorldPosition(), camera.getWorldDirection() );
					
					var intersections = raycaster.intersectObjects( HitArray );
		       

					var isOnObject = intersections.length > 0;
					
					
					for ( var i = 0; i < intersections.length; i++ ) {

	             	//getDistance(intersections[ i ].object, controls.getObject());
					HitO = intersections[ 0 ].object;
					
					
	                }
					
					if ( intersections.length > 0 ){
					
					}else {
					HitO = false;
					}
					
					
				    if (HitO.name > -1 && HitO.hp < 1){
						
						HitO.alive = false;
						
						console.log('Removed Enemy');
						
					}
					
					raycasterD.ray.origin.copy( playerbody.position );
					//raycasterD.ray.origin.y -= playerh / 2;
					raycasterD.far = playerh / 2
					
					var intersectionsD = raycasterD.intersectObjects( ColArray );
					
					
		       

					var isOnObjectD = intersectionsD.length > 0;
					
					if (isOnObjectD == true){
						
				  
						
				    if (velocity.y < 0){velocity.y = 0; InAir = false;  canJump = true; }
					
		            
						
					
					}
					else {
						
						InAir = true;
						
					}
					
					if ( raycasterD.intersectObjects( ColArray )[0] ){
						
					if ( raycasterD.intersectObjects( ColArray )[0].distance < playerh / 2 - 1 && raycasterD.intersectObjects( ColArray )[0].distance > playerh / 2 - rampclipdistance ){
						
						playerbody.position.y = playerbody.position.y + playerh / 2 - raycasterD.intersectObjects( ColArray )[0].distance;
						
						
					}
					
					}
					
					var originPoint = playerbody.position.clone();
					
					for (var vertexIndex = 0; vertexIndex < playerbody.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = playerbody.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( playerbody.matrix );
		var directionVector = globalVertex.sub( playerbody.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( ColArray );
		if ( collisionResults.length > 0 && collisionResults[0].distance < playerw ){
			
			
		 
		//collisionResults[0].point
			
		if (collisionResults.length > 1 && InAir == false){
			
		console.log(collisionResults[1].point);	
		
		
		
	    if (playerbody.position.x > collisionResults[1].point.x ){
			
			playerbody.position.x += deflectrate;
		}
		if (playerbody.position.x < collisionResults[1].point.x ){
			
			playerbody.position.x -= deflectrate;
		}
		
	    if (playerbody.position.z > collisionResults[1].point.z ){
			
			playerbody.position.z += deflectrate;
		}
		if (playerbody.position.z < collisionResults[1].point.z ){
			
			playerbody.position.z -= deflectrate;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		}else if (collisionResults.length > 0 && InAir == true){
		
		if (playerbody.position.x > collisionResults[0].point.x ){
			
			playerbody.position.x += deflectrate;
		}
		if (playerbody.position.x < collisionResults[0].point.x ){
			
			playerbody.position.x -= deflectrate;
		}
		
	    if (playerbody.position.z > collisionResults[0].point.z ){
			
			playerbody.position.z += deflectrate;
		}
		if (playerbody.position.z < collisionResults[0].point.z ){
			
			playerbody.position.z -= deflectrate;
		}
		
		
        		
			
		}

		
			
		}
	}	
					
					
					
					
					

					time = performance.now();
					delta = ( time - prevTime ) / 1000;
					
					
					if ( Sprint == true ){ 
					//SPEED
					speed = speeds;
					}
					else{
					
					speed = speedd;
					}

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					
					if ( gravity == true ){
					if ( InAir == true ) {
					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
                    pup = false;
					}
					else{
					
					}
					}
  
					if ( moveForward ) velocity.z -= 400.0 * delta * speed;  
					if ( moveBackward ) velocity.z += 400.0 * delta * speed;

					if ( moveLeft ) velocity.x -= 400.0 * delta * speed;
					if ( moveRight ) velocity.x += 400.0 * delta * speed;
					
                    
					
					
					if (InAir == false){
						
						canJump = true;
					}
					
					
					
					
					playerbody.translateX( velocity.x * delta );
					playerbody.translateY( velocity.y * delta );
					playerbody.translateZ( velocity.z * delta );

					if ( playerbody.position.y < playerh / 2 || playerbody.position.y == playerh /2 ) {

						velocity.y = 0;
						playerbody.position.y = playerh / 2;

						canJump = true;
						InAir = false;

					}
					
					
				

					prevTime = time;
					
					

		
			
		

}		
			
}, 1000 / tickrate);




function TestandPrevCol(player, mesh, x,y,z ){
			
			
			
			if (player.position.z < mesh.position.z + z / 2 + 1 && player.position.z > mesh.position.z - z/2 - 1  
			 && player.position.x < mesh.position.x + x / 2 + 1 && player.position.x > mesh.position.x - x/2 - 1
			 && player.position.y < mesh.position.y + playerh * 2 + y / 2  && player.position.y + playerh / 2 > mesh.position.y - y/2 - 1){
			
			if( player.position.z > mesh.position.z + z/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.z = mesh.position.z + z/2; player.position.z = player.position.z + 2;  }
			else if( player.position.z < mesh.position.z - z/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.z = mesh.position.z - z/2; player.position.z = player.position.z - 2;  }
			
			if( player.position.x > mesh.position.x + x/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.x = mesh.position.x + x/2; player.position.x = player.position.x + 2;  }
		    else if( player.position.x < mesh.position.x - x/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.x = mesh.position.x - x/2; player.position.x = player.position.x - 2;  }
			
			if(player.position.y > mesh.position.y + y/2 && player.position.y < mesh.position.y + y/2 + playerh / 2){ 
			
			player.position.y = mesh.position.y + y/2 + playerh /2; 
			if (velocity.y < 0){velocity.y = 0; InAir = false;  canJump = true; }
		    else if (velocity.y > jumpheight * 50/100 && player.position.y < mesh.position.y + y/2 + playerh / 3){
					velocity.y -= 980;
					canJump = false;
			}
			
			
			
			}
			else if(player.position.y + playerh / 2 > mesh.position.y - y/2 && player.position.y < mesh.position.y ){ velocity.y = -10; player.position.y = player.position.y - 1; velocity.y = 0;}
			
			
			}
			else{
			InAir = true;	
			}	
			
			
			
			}
			
function TestandPrevColAI(player, mesh, x,y,z ){
	
	        var bbox = new THREE.Box3().setFromObject(player);
			
			
			var aih = bbox.size().y;
			
			
			if (player.position.z < mesh.position.z + z / 2 + 1 && player.position.z > mesh.position.z - z/2 - 1  
			 && player.position.x < mesh.position.x + x / 2 + 1 && player.position.x > mesh.position.x - x/2 - 1
			 && player.position.y < mesh.position.y + aih * 2 + y / 2  && player.position.y + aih / 2 > mesh.position.y - y/2 - 1){
			
			if( player.position.z > mesh.position.z + z/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.z = mesh.position.z + z/2; player.position.z = player.position.z + 2;  }
			else if( player.position.z < mesh.position.z - z/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.z = mesh.position.z - z/2; player.position.z = player.position.z - 2;  }
			
			if( player.position.x > mesh.position.x + x/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.x = mesh.position.x + x/2; player.position.x = player.position.x + 2;  }
		    else if( player.position.x < mesh.position.x - x/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){ player.position.x = mesh.position.x - x/2; player.position.x = player.position.x - 2;  }
			
			if(player.position.y > mesh.position.y + y/2 && player.position.y < mesh.position.y + y/2 + aih / 2){ player.position.y = mesh.position.y + y/2 + aih /2;}
			else if(player.position.y + aih / 2 > mesh.position.y - y/2 && player.position.y < mesh.position.y ){ velocity.y = -10; player.position.y = player.position.y - 1;}
			
			
			}
				
			
			
			
			}
			
			
function TestandPrevColClimb(player, mesh, x,y,z ){
			
			
			
			if (player.position.z < mesh.position.z + z / 2 + 1 && player.position.z > mesh.position.z - z/2 - 1  
			 && player.position.x < mesh.position.x + x / 2 + 1 && player.position.x > mesh.position.x - x/2 - 1
			 && player.position.y < mesh.position.y + playerh * 2 + y / 2  && player.position.y + playerh / 2 > mesh.position.y - y/2 - 1){
			
			if( player.position.z > mesh.position.z + z/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){
            
			if (player.position.y + playerh / 2 < mesh.position.y + y /2 - 1/3 * playerh){
			player.position.z = mesh.position.z + z/2; 
			player.position.z = player.position.z + 2; 
             }
            else {
				
				climb(player, mesh, x,y,z);
				climbdir = 'z-';
				
			 }			
			
			}
			else if( player.position.z < mesh.position.z - z/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){
				
			if (player.position.y + playerh / 2 < mesh.position.y + y /2 - 1/3 * playerh){
			    player.position.z = mesh.position.z - z/2;
				player.position.z = player.position.z - 2;  
             }
            else {
				
				climb(player, mesh, x,y,z);
				climbdir = 'z+';
				
			 }	
				
				
				
			}
			
			if( player.position.x > mesh.position.x + x/2 - 5 && player.position.y < mesh.position.y + y/2 + 1 ){
            
			if (player.position.y + playerh / 2 < mesh.position.y + y /2 - 1/3 * playerh){
			player.position.x = mesh.position.x + x/2; 
			player.position.x = player.position.x + 2; 
             }
            else {
				
				climb(player, mesh, x,y,x);
				climbdir = 'x-';
				
			 }			
			
			}
			else if( player.position.x < mesh.position.x - x/2 + 5 && player.position.y < mesh.position.y + y/2 + 1 ){
				
			if (player.position.y + playerh / 2 < mesh.position.y + y /2 - 1/3 * playerh){
			    player.position.x = mesh.position.x - x/2;
				player.position.x = player.position.x - 2;  
             }
            else {
				
				climb(player, mesh, x,y,x);
				climbdir = 'x+';
				
			 }	
				
				
				
			}
			
			
			
			
			if(player.position.y > mesh.position.y + y/2 && player.position.y < mesh.position.y + y/2 + playerh / 2){ player.position.y = mesh.position.y + y/2 + playerh /2; velocity.y = 0; InAir = false;  canJump = true }
			else if(player.position.y + playerh / 2 > mesh.position.y - y/2 && player.position.y < mesh.position.y ){ velocity.y = -10; player.position.y = player.position.y - 1; velocity.y = 0;}
			
			
			}
			else{
			InAir = true;	
			}	
			
			
			
			}
			
var firedclimb = false;
var stage = 0;
var playerclimb;
var meshclimb;
var xclimb;
var yclimb;
var zclimb;
var oldspeeds;
var oldspeedd;
var climbdir;
			
function climb(player, mesh, x,y,z){
	
	if (firedclimb == false){
    
	firedclimb = true;
	oldspeeds = speeds;
	oldspeedd = speedd;
	
	
	meshclimb = mesh;
	xclimb = x;
	yclimb = y;
	zclimb = z;

	speeds = 0;
	speedd = 0;
	
	gravity = false;
	velocity.x = 0;
	velocity.z = 0;
	velocity.y = 0;
	
	stage = 1;
	

	
	}
}

var ClimbAnimation = setInterval(function(){
	
	

	if (stage == 1 && playerbody.position.y + playerh / 2 < meshclimb.position.y + yclimb / 2 + playerh / 3){
		playerbody.position.y += climbspeed;
		
		
	}
	else if (stage == 1){
		stage = 2;
	}
	
	
	if (stage == 2 && climbdir == 'z-' ){
		
		if(playerbody.position.z > meshclimb.position.z + zclimb / 2 - playerd){
			
			playerbody.position.z -= climbspeed;
			
			
		}
		else{
			
			stage = 3;
			
		}
		
		
		
	}
	
	
    if (stage == 2 && climbdir == 'z+' ){
		
		if(playerbody.position.z < meshclimb.position.z - zclimb / 2 + playerd){
			
			playerbody.position.z += climbspeed;
			
			
		}
		else{
			
			stage = 3;
			
		}
		
		
		
	}
	
	if (stage == 2 && climbdir == 'x-' ){
		
		if(playerbody.position.x > meshclimb.position.x + xclimb / 2 - playerd){
			
			playerbody.position.x -= climbspeed;
			
			
		}
		else{
			
			stage = 3;
			
		}
		
		
		
	}
	
	
    if (stage == 2 && climbdir == 'x+' ){
		
		if(playerbody.position.x < meshclimb.position.x - xclimb / 2 + playerd){
			
			playerbody.position.x += climbspeed;
			
			
		}
		else{
			
			stage = 3;
			
		}
		
		
		
	}
	
	
	
	if(stage == 3 && playerbody.position.y < meshclimb.position.y + yclimb / 2 + playerh * 60/100){
		
	playerbody.position.y += climbspeed;	
		
	}
	else if (stage == 3 && playerbody.position.y > meshclimb.position.y + yclimb / 2 + playerh * 60/100 - 1){
		
    	
	
	gravity = true;
	speeds = oldspeeds;
	speedd = oldspeedd;
	stage = 0;
    firedclimb = false;	
	}
	
	
	
	
			
}, 1);	
		
			
			
var ViewBovbbingloop = setInterval(function(){

if(bobview == true ){		

if ( moveForward == true || moveBackward== true || velocity.z > 10 || velocity.z < -10 ){
if (canJump == true){

camerashake();
camerawobble();

}
}


}		
			
}, 651);	


			
function camerashake(){
	

window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 0.5);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 1);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 25);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 50);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 75);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 100);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 125);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 150);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 175);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 200);

window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 250);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 275);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 300);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 325);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 350);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 375);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 400);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 425);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 450);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 475);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 500);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 425);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x - bobint; }, 550);

window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 600);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 616);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 634);
window.setTimeout(function(){ camera.rotation.x = camera.rotation.x + bobint; }, 650);



}

function camerawobble(){

window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 0.5);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 25);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 50);


window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 75);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 100);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 125);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 150);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 175);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z - bobint; }, 200);


window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 225);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 250);
window.setTimeout(function(){ camera.rotation.z = camera.rotation.z + bobint; }, 275);
	
}







var RenderTheWorld = function () {
requestAnimationFrame( RenderTheWorld );

if (canrender){



renderer.render(scene, camera);
}
};

RenderTheWorld();
