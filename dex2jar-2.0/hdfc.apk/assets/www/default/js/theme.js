
/* JavaScript content from js/theme.js in folder common */
$("#wrapper").ready(function(){
	var Customer_type = localStorage.getItem("Customer_Type");
	if(Customer_type == "classic"){
		$('#wrapper .dark_header').removeClass('dark_header').addClass('classic_dark_header');
		$('.item').removeClass('item').addClass('classic_autoslidebg');
		$('.panel_new').addClass('classic_panel_new');
		$('.next').addClass('classic_next');
		$('.prev').addClass('classic_prev');

	}
	if(Customer_type == "imperia"){
		$('#wrapper .dark_header').removeClass('dark_header').addClass('Imp_dark_header');
		$('.item').removeClass('item').addClass('Imp_autoslidebg');
		$('.panel_new').addClass('Imp_panel_new');
		$('.next').addClass('Imp_next');
		$('.prev').addClass('Imp_prev');
		
	}
	if(Customer_type == "preferred"){
		$('#wrapper .dark_header').removeClass('dark_header').addClass('Pref_dark_header');
		$('.item').removeClass('item').addClass('Pref_autoslidebg');
		$('.panel_new').addClass('Pref_panel_new');
		$('.next').addClass('Pref_next');
		$('.prev').addClass('Pref_prev');
	}
	else{
		//remove_theme();
	}
});

