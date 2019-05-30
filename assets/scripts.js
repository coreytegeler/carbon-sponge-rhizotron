var slides = [], blocks = [];
var rhizotron = document.getElementById('rhizotron');

var THE_ID = 'be3fa69fe2c91baf1f1b5c8718db50a7e80002898e72fe2cc5e68e6b194defd9';
var THE_SECRET = 'b34306525eccc295ca449f2cedba9b2109253c4293884fed6d14bc080ffe4d26';
var RETURNED_CODE = 200;
var YOUR_CALLBACK_URL = 'localhost:8888';
var ACCESS_TOKEN = '89090c1b685a8b46ff8bde45114dbbb8c5168ff33bb0bba3db6156bdbe07817d';

function animateImages() {
	var activeIndex = 0;
	setInterval(function() {
		var activeSlide = document.querySelector('.active');
		if(activeSlide) {
			activeSlide.classList.remove('active');
		}
		slides[activeIndex].classList.add('active');
		if(activeIndex < slides.length - 1) {
			activeIndex++;
		} else {
			activeIndex = 0;
		}
	}, 100);
}

function updateImages() {
	blocks.forEach(function(block, i) {
		if(!block.image){return}
		var slideUrl = block.image.large.url;
		var slide = document.createElement('div')
		slide.classList.add('slide');
		slide.style = 'background-image:url('+slideUrl+')';
		slides.push(slide);
		rhizotron.appendChild(slide);
	});
	animateImages();
}

function getImages() {
	var url = 'https://api.are.na/v2/channels/carbon-sponge-rhizotron/contents?per=99999999';
	var request = new XMLHttpRequest();
	request.onload = function(e) {
	  if(request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		blocks = data.contents;
		updateImages();
	  } else {
		console.warn(request.status);
	  }
	};

	request.onerror = function(e) {
	  console.warn(e);
	};

	request.open( 'GET', url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
	request.send();
}

function postImage(image) {
	var content = 'Testing';
	// var source = 'https://static1.squarespace.com/static/5ad3c6b59d5abb04c19830f2/5ad558b8f950b7baba216500/5ad55f1b575d1fe54a07a4a4/1548597033996/slideg.jpg';
	var url = 'https://api.are.na/v2/channels/carbon-sponge-rhizotron/blocks?source='+source;
	// var url = 'https://api.are.na/v2/channels/carbon-sponge-rhizotron/blocks?content='+content;
	var request = new XMLHttpRequest();
	request.onload = function(e) {
	  if(request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		console.log(data);
	  } else {
		console.warn(request.status);
	  }
	};

	request.onerror = function(e) {
		console.warn(e);
	};

	request.open( 'POST', url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.setRequestHeader('Content-Transfer-Encoding', 'base64');
	request.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
	request.send();
}

// function getDataUri(url, callback) {
// 	var filereader = new window.FileReader();
//   filereader.readAsDataURL(this.response);
// 	var image = new Image();
// 	image.onload = function () {
// 		var canvas = document.createElement('canvas');
// 		canvas.width = this.naturalWidth;
// 		canvas.height = this.naturalHeight;
// 		canvas.getContext('2d').drawImage(this, 0, 0);
// 		callback(canvas.toDataURL('image/jpg').replace(/^data:image\/(png|jpg);base64,/, ''));
// 		callback(canvas.toDataURL('image/jpg'));
// 	};
// 	image.src = url;
// }

// function authenticate() {
// 	// var url = 'https://dev.are.na/oauth/token?client_id='+THE_ID+'&client_secret='+THE_SECRET+'&code='+RETURNED_CODE+'&grant_type='+authorization_code+'&redirect_uri='+YOUR_CALLBACK_URL;
// 	var url = 'https://dev.are.na/oauth/token?client_id='+THE_ID+'&client_secret='+THE_SECRET+'&grant_type=authorization_code&redirect_uri='+YOUR_CALLBACK_URL+'&code='+RETURNED_CODE;
// 	console.log(url);
// 	var request = new XMLHttpRequest();
// 	request.open('GET', url, true);
// 	request.onload = function(e) {
// 	  if(request.status >= 200 && request.status < 400) {
// 	    var data = JSON.parse(request.responseText);
// 	    console.log(data);
// 	  } else {
// 	    console.warn(request.status);
// 	  }
// 	};

// 	request.onerror = function(e) {
// 	  console.warn(e);
// 	};
// 	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 	request.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
// 	request.send();
	
// }
function uploadFile(e) {
	var reader  = new FileReader();
  reader.addEventListener('load', function () {
    postImage(reader.result);
  }, false);

  var file = e.target.files[0]
  if (file) {
    reader.readAsDataURL(file);
  }
}

window.onload = function() {
	// getImages();
	// getDataUri('./assets/icon.png', function(dataUri) {
	// 	postImage(dataUri);
	// });
	// authenticate();

	document.querySelector('input').addEventListener('change',uploadFile);
}


