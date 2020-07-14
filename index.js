/*Vanilla Fireworks | MIT License | https://github.com/Shadow-Scientist/vanilla-fireworks*/

/*
 This concept relies on a simple theory.
 If we assume a firework as a circle so
 the sparkles would be like floating div
 elements around it. We can easily plot
 them around the circle with a little use
 of trigonometry.
*/

// base function
function fireworks(){
	var interval = random(500, 700, true);
	// range of 20-100, 500-1000 is good
	
	var parent = document.querySelector('#container');
	
	// fireworks
	var box = document.createElement('div');
	box.className = 'box';
	
	// rocket!
	var rocket = document.createElement('div');
	rocket.className = 'rocket';
	
	// random size
	var size = random(100, 200, true);
	box.style.width = size + 'px';
	box.style.height = size + 'px';
	
	/*
	 Improving rocket syntax
	*/
	var newtop = 200 + (size * .5);
	rocket.style.setProperty('--top', newtop + 'px');
	rocket.style.backgroundColor = which_color();
	
	// shifting
	var shift = random(25,75);
	box.style.left = shift + '%';
	rocket.style.left = shift + '%';
	
	// radius
	var radius = size * .3; // less than half
	
	// number of divs
	var count1 = random(5,22,true);
	var count2 = random(5,22,true);
	var count3 = random(5,22,true);
	
	// silent KILL
	// FIREFOX Only
	box.onanimationend = function(){
		this.outerHTML = '';
	}
	rocket.onanimationend = function(){
		this.outerHTML = '';
	}
	
	// silent KILL
	// webKit based browsers (like chrome)
	box.addEventListener('webkitAnimationEnd', function(){
		try{this.outerHTML = ''}
		catch(error){}
	});
	rocket.addEventListener('webkitAnimationEnd', function(){
		try{this.outerHTML = ''}
		catch(error){}
	});
	
	// charm
	var charm = random(1,3.1);
	
	// create multiple layers with given data
	setTimeout(function(){
	layer(count1, radius, size, box);
	if(charm > 2) layer(count2, radius*2, size, box);
	if(charm > 3) layer(count3, radius/12, size, box);
	}, 250);
	
	parent.appendChild(rocket);
	parent.appendChild(box);
	
	setTimeout(function(){
		fireworks();
	}, interval);
}

// helper functions
function random(min, max, round){
	var p = min + Math.random()*(max - min);
	return round ? Math.round(p) : p;
}

function which_color(){
	return 'rgb(' + random(20,255,true) +
			',' + random(20,255,true) +
			',' + random(20,255,true) + ')';
}

function layer(plots, r, s, prnt){
	var theta = Math.PI*2 / plots;
	var width = random(7,firewidth.value,true);
	var delay = random(500,1000)/1000 + 's';
	var degree = 180/Math.PI;
	var center = s/2;
	var color = which_color();
	
	for(var i=0; i<plots; i++){
		var cx = r * Math.sin(theta*i) + center; // sin = climb
		var cy = r * Math.cos(theta*i) + center; // cos = walk
		var angle = Math.atan2(cy - center, cx - center) * degree - 90;
		
		spike(width, cx, cy, angle, color, delay, prnt);
	}
}

function spike(w, x, y, a, c, d, p){
	var b = document.createElement('div');
	var st = b.style;
	st.position = 'absolute';
	st.left = x + 'px';
	st.top = y + 'px';
	st.width = w + 'px';
	st.height = '300px';
	st.setProperty('--layer-delay', d);
	st.transform = 'translate(-50%,-50%) rotate('+a+'deg)';
	b.innerHTML = '<div class="spike" style="background:'+c+'" onanimationend="this.outerHTML = \'\'"><\/div>'
	
	p.appendChild(b);
}
