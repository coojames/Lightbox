var galClicked = 0;
var galCount = 0;
var images = new Array();
var titles = new Array();
var galSource = new Array();

function setupGal(){
	galCount = $("a.gallery").length;
		
	var i=0;

	var titleSource=new Array();
	
	for (i=0;i<galCount;i++){
		galSource[i]=$("a.gallery:eq(" + i + ")").attr("href");
		titleSource[i]=$("a.gallery:eq(" + i + ")").attr("title");
		/*images[i] = new Image();
		images[i].src = galSource[i];*/
		titles[i] = titleSource[i];
	}
	
	$("a.gallery").click(function(){
			
		for (i=0;i<galCount;i++){
			if ($(this).attr("href") == galSource[i]){
				galClicked = i;
				break;
			}
		}

		overlayLink = $(this).attr("href");
		overlayTitle = $(this).attr("title");
		window.startOverlay();
		
		return false;
		
	});
	
}

function startOverlay(){

	for (i=0;i<galCount;i++){
		images[i] = new Image();
		images[i].src = galSource[i];
	}

	$("body").append('<div class="galOverlay"></div><div class="galContainer"></div><div class="galLoading"><img src="img/loading.gif" /></div><div class="galBottom"></div>').css({"overflow-y":"hidden"});
	
	var nav = '<div id="galNav"><img src="img/arrow-left.png" id="galLeft" /> <img src="img/arrow-right.png" id="galRight" /></div>';

	$(".galBottom").html(nav);
	
	$(".galOverlay, .galLoading").animate({"opacity":"1"}, 500, "linear");	
	
	$(".galLoading").css({
		"top": "50%",
		"left": "50%",
		"margin-top": "-25px",
		"margin-left": "-25px"
		});
	
	$(".galContainer").html('<img src="'+ images[galClicked].src +'" class="galImg" onLoad="sizeImg()" alt="" /><div id="galTitle">'+ titles[galClicked] +'</div><div id="galClose"><img src="img/x.png" id="galX" /></div>');
		
	$(window).resize(function() {
		window.sizeImg();
		});

	window.navButtons();		
	window.removeOverlay();
}

function nextImg(){

	$("body").append('<div class="galLoading"><img src="img/loading.gif" /></div>');
	
	$(".galLoading").css({
	"top": "50%",
	"left": "50%",
	"margin-top": "-25px",
	"margin-left": "-25px"
	});
	
	$(".galContainer").animate({"opacity":"0"}, 250, "linear", function () {
			$(".galContainer").html('<img src="'+ images[galClicked].src +'" onLoad="loadImg()" alt="" />');
	});
	$(".galLoading").animate({"opacity":"1"}, 50, "linear");
	

	
}

function loadImg(){

	$(".galContainer").html('<img src="'+ images[galClicked].src +'" class="galImg" onLoad="sizeImg()" alt="" /><div id="galTitle">'+ titles[galClicked] +'</div><div id="galClose"><img src="img/x.png" id="galX" /></div>');
	
}

function sizeImg(){
		
	$(".galLoading").animate({"opacity":"0"}, 100, "linear", function(){$(".galLoading").remove()});

	$(".galContainer img").css({
		"width": '',
		"height": ''
		});
	
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	
	var maxHeight = winHeight - 200;
		
	var imgWidth = $(".galImg").width();
	var imgHeight = $(".galImg").height();
	
	var newWidth, newHeight, ratio;
	if (imgHeight > maxHeight){
		newHeight = maxHeight;
		ratio = maxHeight/imgHeight;
		newWidth = imgWidth * ratio;
		$(".galImg").css({
			"width": newWidth,
			"height": newHeight
			});
		}

	imgWidth = $(".galImg").width();
	imgHeight = $(".galImg").height();
		
	$(".galContainer").css({
		"width": imgWidth,
		"height": imgHeight,
		"top": "50%",
		"left": "50%",
		"margin-top": -(imgHeight/2)-35,
		"margin-left": -(imgWidth/2) 
		}).animate({"opacity":"1"}, 1000, "linear");		
		
	$(".galBottom").animate({"opacity":"1"}, 1000, "linear");
	
	$(".galImg").click(function(){
		galClicked+=1;	
		if (galClicked > galCount - 1){
			galClicked = 0;
			}	
		nextImg();
	});
	
	$("#galX").click(function() {
		window.clear();
	});
	
}

function navButtons(){
	$("#galLeft").mousedown(function(){
		galClicked-=1;
		if (galClicked < 0) {
			galClicked = galCount - 1;
			}
		nextImg();
	});
	
	$("#galRight").mousedown(function(){
		galClicked+=1;	
		if (galClicked > galCount - 1){
			galClicked = 0;
			}	
		nextImg();
	});
	
}

function removeOverlay(){
	$(".galOverlay").click(function(){
		window.clear();
	});
}

function clear(){
	$(".galContainer, .galOverlay, .galBottom, .galLoading")
	.animate({"opacity":"0"}, 500, "linear", function(){
		$(".galContainer, .galOverlay, .galBottom, .galLoading").remove();
	})	
}