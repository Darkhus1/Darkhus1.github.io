
hudHP = document.createElement('span');
hudHP.innerHTML = hp + '%';
hudHP.style.position = 'absolute';
hudHP.style.fontSize = 300 + '%';
hudHP.style.width = '120px';
hudHP.style.height = '80px';
hudHP.style.color = 'green';

hudHP.style.left = Number(hpicon.style.left.replace('px','')) + 180;
hudHP.style.top = window.innerHeight - 115;

document.getElementById('HUD').appendChild(hudHP);










function sethud(){
			
			document.getElementById('HUD').style.left ='0';
			document.getElementById('HUD').style.top ='0';
			hudHP.innerHTML = hp + '%';
			hudHP.style.left = Number(hpicon.style.left.replace('px','')) + 180;
            hudHP.style.top = window.innerHeight - 115;
			
			}
			
			sethud();
			

			var HUD = setInterval(function(){
				
		     if(hp < 25){
				 
			  hudHP.style.color = 'red';
				 
			 } else if (hp < 50){
				 
				 hudHP.style.color = 'orange';
				 
			 } else if (hp < 70){
				 
				 hudHP.style.color = 'yellow';
				 
			 } else if (hp < 101){
				 
				 hudHP.style.color = 'green';
				 
			 }
			 
			sethud();
					
			}, 1);
			
			
		