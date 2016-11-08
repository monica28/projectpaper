$( document ).ready( function() {
	$(".hamburger").click(function(e){
		e.stopPropagation();
		if(!$(this).hasClass("close")) {
			$(".asideBar").addClass("show");
			$(".asideBar").removeClass("close");
			$(".mPB").addClass("show");
			$(this).addClass("close");
		}
		else {
			$(".asideBar").removeClass("show");
			$(".asideBar").addClass("close");
			$(".mPB").removeClass("show");
			$(this).removeClass("close");
		}
	});	
	$('.mPB').on('click',function(){
		$(".asideBar").removeClass("show");		
		$(".mPB").removeClass("show");
		$('.toggle_filter').removeClass("close");
		$(".hamburger").removeClass("close");
	});
	
	$('#searchIcon').on('click', function(e) {
		$('.searchWrap').removeClass('clicked');
		$(this).closest('.searchWrap').addClass('clicked');
		$(this).prev().focus();
	});

	$('.searchWrap input').on('blur', function(e) {
		$('.searchWrap').removeClass('clicked');		
		$(this).blur();
	});		
	$('.lowDevice #contentData').css('overflow','visible');
	$(document).on('click','.lowDevice .hamburger',function(){
		if(!$(this).hasClass("close")) {			
			$('#contentData').css('overflow','visible');
		}
		else {			
			$('#contentData').css('overflow','hidden');
		}
	});
	$(document).on('click','.lowDevice .mPB',function(){	
		$('#contentData').css('overflow','visible');
	});
});

function getAndroidVersion(ua) {
	ua = (ua || navigator.userAgent).toLowerCase(); 
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
};

var myScroll_1, myScroll_2, myScroll_3, myScroll_4, myScroll_5;
		
if(parseFloat(getAndroidVersion()) >= 4.4 || (navigator.userAgent.match(/GT-I9082/i) && parseFloat(getAndroidVersion())>= 4.2))
{
	var options = {
		scrollX: false,
		scrollY: true,
		mouseWheel: true,
		disableMouse: true,
		disablePointer: true,
		interactiveScrollbars: true,
		bounce: true, bounceEasing: 'ease-in', bounceTime: 700,
		click: true 
	}
}else{
	
	var options = {
		scrollX: false,
		scrollY: true,
		mouseWheel: true,
		disableMouse: false,
		disablePointer: false,
		interactiveScrollbars: true,
		bounce: true, bounceEasing: 'ease-in', bounceTime: 700,
		tap: false
	}
}

function scrollLoaded(){
	try {		
		myScroll_1 = new IScroll('#scrollWrap1', options);			
		myScroll_2 = new IScroll('#scrollWrap2', options);			
		myScroll_3 = new IScroll('#scrollWrap3', options);			
		myScroll_4 = new IScroll('#scrollWrap4', options);			
		myScroll_5 = new IScroll('#scrollWrap5', options);	
	} catch (e) {}
}

function refresh() {
	setTimeout(function() {
		try{
			myScroll_1.refresh();
			myScroll_2.refresh();
			myScroll_3.refresh();
			myScroll_4.refresh();
			myScroll_5.refresh();
		}catch(e){}
	}, 100);
} 
		
function scrollTo(x, y, z) {
	setTimeout(function () { 
		try {
			myScroll_1.scrollTo(x, y, z);
			myScroll_2.scrollTo(x, y, z);
			myScroll_3.scrollTo(x, y, z);
			myScroll_4.scrollTo(x, y, z);
			myScroll_5.scrollTo(x, y, z);
		   
			}catch(e){} 
	}, 100);
} 
		
function scrollToElement(elm, tm) {
	setTimeout(function () { 
		try {
			myScroll_1.scrollToElement(elm, tm);
			myScroll_2.scrollToElement(elm, tm);
			myScroll_3.scrollToElement(elm, tm);
			myScroll_4.scrollToElement(elm, tm);
			myScroll_5.scrollToElement(elm, tm);           
				}catch(e){}
	}, 200);
} 
		
function destroy() {
	setTimeout(function () { 
		try {
			myScroll_1.destroy();
			myScroll_2.destroy();
			myScroll_3.destroy();
			myScroll_4.destroy();
			myScroll_5.destroy();            
			}catch(e){}
	}, 0);
} 
		
function refreshFast() {
	setTimeout(function() {
		try{
			myScroll_1.refresh();
			myScroll_2.refresh();
			myScroll_3.refresh();
			myScroll_4.refresh();
			myScroll_5.refresh();           
		}catch(e){}
	}, 0);
}
	

/************* keyboard popup *****************/
$(document).ready(function(){
	
	var inputId;
	var is_keyboard = false;
	var is_landscape = false;
	var initial_screen_size = window.innerHeight;
	
	// Android
	window.addEventListener("resize", function() {
		is_keyboard = (window.innerHeight < initial_screen_size);
		is_landscape = (screen.height < screen.width);
		updateViews();
	}, false);
	
	// iOS 
	$(document).on("focus",'textarea,input[type="text"],input[type="number"],input[type="email"],input[type="password"],input[type="tel"],input[type="search"]',function() {
		
		$elm = $(this).attr('id');
		$elm = "#"+$elm;
		inputId = $elm;
		
	});
	
	function updateViews() {
		if (is_keyboard) {					
			
			try{
				if($(inputId).offset().top < $(window).height()/1.6){}
				else {
					scrollToElement(inputId,200);
				}
			}catch(e){}
		}
		else {			
			
			$("input").trigger("blur");
			refresh();
		}
	}
});


	
			


