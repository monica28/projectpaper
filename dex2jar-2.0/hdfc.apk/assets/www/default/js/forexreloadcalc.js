








	curre =1;
	
	/*$('.btnAdd').click(function() {
	curreid ="fldCurr"+curre
	
	if(curreid=="fldCurr1" || curreid=="fldCurr2" || curreid=="fldCurr3" || curreid=="fldCurr4" ||curreid=="fldCurr5" || curreid=="fldCurr6" ||curreid=="fldCurr7"||curreid=="fldCurr8"||curreid=="fldCurr9"){
	
	var curBoxHtml = ' \
						<div class="curBox"> \
				<div class="info_row"> \
					<div class="info_row2">Currency</div> \
					<div class="info_row3"> <select id="'+curreid+'"> <option value="">'+$('#fldCurr').html()+'</option></select> \
					</div> \
				</div> \
				<div class="info_row"> \
					<span class="info_row_left">Available Amount</span> \
					<span class="info_row_right" style="word-wrap: break-word;text-align:right;">USD 10,000.00</span> \
				</div> \
				<div class="info_row"> \
					<div class="info_row2">Forex Amount</div> \
					<div class="info_row3"> \
						<input type="text" value="$ 200"> \
					</div> \
				</div> \
				<div class="info_row"> \
					<div class="info_row2">Equivalent INR Amount</div> \
					<div class="info_row3"> \
						<span class="page_title_sub" style="word-wrap: break-word;">&#8377; 12,000 </span>	\
					</div> \
				</div> \
				<div class="info_row"> \
					<a class="btnClose" href="javascript:void(0)"></a> \
				</div> \
			</div> \
	';
	
		$('#curBoxWrap').append(curBoxHtml);
		curre++;
		
		}
		else{
		 alert("Please request only 10 currencies per request");
		}
	});*/

	

	$(document).on('click','.btnClose',function() {
		$(this).closest('.curBox').remove();
	});
	
	
	var l_clicked = false; 
	var l_backclicked = false; 
//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-START
	var l_count_rows =0;
	var rwcount =0;	
	var validRowCount = 0;
	var usd_forex_rate = 0;
	var usd_forex_amt =0 ;
	var inr_forex_amt =0 ;
//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-END
//ILENH-MOD-15012015-Snehal Bodke-CCR-0409-START
var l_curr_found=	false;	
var l_calculated_curr_found=	false;	
//ILENH-MOD-15012015-Snehal Bodke-CCR-0409-END	
function back_click () {
		document.frmTxn.fldTxnId.value			= "PFC";
		document.frmTxn.fldScrnSeqNbr.value		= "01";
		if(!l_backclicked){
			document.frmTxn.fldBack.value = 'true';
			document.frmTxn.submit();
		}
		return false;
}

function confirm_click () {
		l_clicked = false;
		if(!validateForm ()) {
			l_clicked = true;
		}
		document.frmTxn.fldTxnId.value				= "PFC";
		document.frmTxn.fldScrnSeqNbr.value			= "03";
		if(!l_clicked){		
			l_clicked = true;
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-START
			/*document.frmTxn.fldPurposeIndx.value	= document.frmTxn.fldPurpose.selectedIndex;*/
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END

            document.frmTxn.fldRowCount.value		= validRowCount ;
			document.frmTxn.fldEqvUsdAmt.value		= usd_forex_amt;
			document.frmTxn.fldEqvInrAmt.value		= inr_forex_amt;
			
             var vOptionSelect = "#fldCurr";
			 var vOptionSelect2 = "#fldVariant";
			 
			 fldcurrindex=$(vOptionSelect).find(":selected").index();
			 fldVariantIndx = $(vOptionSelect2).find(":selected").index();
		
			 
		
			document.frmTxn.fldCurrIndx.value		= fldcurrindex;
			if( document.frmTxn.fldVariant.selectedIndex!=undefined){
			document.frmTxn.fldVariantIndx.value	= document.frmTxn.fldVariant.selectedIndex;
			}
			//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-END
          
			//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-END
			
			
			document.frmTxn.fldBack.value			= 'false';
			document.frmTxn.submit();
		}
		return false;
}
//------------------------------------------------------------------------------
//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-END
var l_ctr   = 0;
var l_currencyCode = new Array();
 
 l_currencyCode[l_ctr] = "Swiss Franc (CHF)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Saudi Arabian Riyal (SAR)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "South African Rand (ZAR)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "THAI BHAT(THB)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Australian Dollar (AUD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Japanese Yen (JPY)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "British Pound (GBP)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "UAE Dirham (AED)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Hong Kong Dollars (HKD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Euro (EUR)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Danish Kroners (DKK)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "United States Dollar (USD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Canadian Dollar (CAD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Norwegian Kroners (NOK)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Singapore Dollar (SGD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Omani Riyals (OMR)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Test to add new currency (TST)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "New Zealand Dollars (NZD)";
 l_ctr++;
  
 l_currencyCode[l_ctr] = "Swedish Krona (SEK)";
 l_ctr++;
 
 
     
 
function addRow(btn) { 
if(document.all("fldCurr").value == '' || document.all("fldForex").value == '')	{
    alert("Please select currency and Forex Amount.");
	return false;
}
	
for(var i=1;i <= rwcount; i++ )
if(document.all("fldForex"+i).value == '' || document.all("fldCurr"+i).value == ''){
	alert("Please select currency and Forex Amount.");
	return false;
}
rwcount++;

if(rwcount <10){
 document.getElementById("Currency"+rwcount).style.display = '';
 document.getElementById("ForexAmount"+rwcount).style.display = '';
// document.getElementById("INRAmount"+rwcount).style.display = '';
 //document.getElementById("USDAmount"+rwcount).style.display = '';
 }else{
 alert('Please request only 10 currencies per request.');
 }
   }
//ILENH-ADD-15012015-Snehal Bodke-CCR-0409-END   
//------------------------------------------------------------------------------
function validateForm() {
	var iChars = "!@#$%^&*()+=-[]\\;,./{}|\":<>?";
	var l_str_val = '';
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-START
	/*if(document.frmTxn.fldPurpose.selectedIndex == 0){
		alert('Please select the purpose of Travel');
		document.frmTxn.fldPurpose.focus();
		return false;
	}*/
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END
    //-----
	if(document.frmTxn.fldCurr.selectedIndex == 0){
		alert('Please select the currency, you wish to buy');
		document.frmTxn.fldCurr.focus();
		return false;
	}
	//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-START
	/*if(document.frmTxn.fldVariant.selectedIndex == 0){
		alert('Please select the ForexCard Variant');
		document.frmTxn.fldVariant.focus();
		return false;
	}
	else{
		document.frmTxn.fldVariantDesc.value = document.frmTxn.fldVariant.options[document.frmTxn.fldVariant.selectedIndex].text;
	}*/
	//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END
	//-----
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-START
	/*
	if(document.frmTxn.fldDepDate.value==""){
	  alert('Please select the date of Travel');
	  document.frmTxn.fldDepDate.focus();
	  return false;
	}
	if(document.frmTxn.fldReturnDate.value==""){
	  alert('Please select the date of Return');
	  document.frmTxn.fldReturnDate.focus();
	  return false;
	}
	if(document.frmTxn.fldPassportExp.value==""){
	  alert('Please select the expiry date of your passport');
	  document.frmTxn.fldPassportExp.focus();
	  return false;
	}
	if(document.frmTxn.fldDepDate.value=="" || !validatedate(document.frmTxn.fldDepDate.value)){
	  alert("Please input the Date of Travel in DD/MM/YYYY format.");
	  return false;
	}
	if(document.frmTxn.fldReturnDate.value=="" || !validatedate(document.frmTxn.fldReturnDate.value)){
	  alert("Please input the Estimated date of return in DD/MM/YYYY format.");
	  return false;
	}
	if(document.frmTxn.fldPassportExp.value=="" || !validatedate(document.frmTxn.fldPassportExp.value)){
	  alert("Please input the Passport Expiry Date in DD/MM/YYYY format.");
	  return false;
	}*/
	//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END
	
	//-----
//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END
	/*if( chkCurrentDate(document.frmTxn.fldDepDate.value) && chkFutureDate(document.frmTxn.fldDepDate.value)){
		alert('Please select the Valid date of Travel');
		return false;
	}
	if(!compare_date(document.frmTxn.fldDepDate.value, document.frmTxn.fldReturnDate.value)){
		alert('Please select the Valid date of Return');
		return false;
	}
	if(!compare_date(document.frmTxn.fldReturnDate.value, document.frmTxn.fldPassportExp.value)){
		alert('Please select the Valid expiry date of your passport');
		return false;
	}*/
	//ILENH-DEL-15012015-Snehal Bodke-CCR-0409-END
	
	//-----
	if(document.frmTxn.fldForex.value==""){
	  alert('Forex Amount  cannot be left blank.');
	  document.frmTxn.fldForex.focus();
	  return false;
	}
	if(isNaN(document.frmTxn.fldForex.value)){
	  alert('Forex Amount must be Numeric.');
	  document.frmTxn.fldForex.focus();
	  return false;
	}
    if(document.frmTxn.fldForex.value == "0.00"){
	  alert('Amount can not be Zero.');
      document.all("fldForex").focus();
	  return false;
	}
         validRowCount=0;
	for(var i =1;i <= rwcount;i++){
	
	if(document.all("fldCurr"+i).selectedIndex != 0 && document.all("fldForex"+i).value!="" 
	&& !isNaN(document.all("fldForex"+i).value) && document.all("fldForex"+i).value!="0.00" ){
			validRowCount++;
			document.all("fldCurr"+i+"Indx").value  = document.all("fldCurr"+i).selectedIndex;
			/*if(document.all("fldForex"+i).value==""){
			  alert('Amount  cannot be left blank.');
			  document.all("fldForex"+i).focus();
			  return false;
			}
			
			if(isNaN(document.all("fldForex"+i).value)){
			  alert('Amount must be Numeric.');
			  document.all("fldForex"+i).focus();
			  return false;
			}
			if(document.all("fldForex"+i).value == "0.00"){
				  alert('Amount can not be Zero.');
				  document.all("fldForex"+i).focus();
				  return false;
			}
			if(document.all("fldINR"+i).value == ""){
				 alert('We are unable to process the request as forex rate is not available at this moment for the currency selected by you. Inconvenience caused is regretted.');
				  document.all("fldINR"+i).focus();
				  return false;
			}*/
			
        }
        
     }//end of for
		
	
	if(document.frmTxn.fldINR.value==""){
	  alert('We are unable to process the request as forex rate is not available at this moment for the currency selected by you. Inconvenience caused is regretted.');
	  
	//ILENH-MOD-15012015-Snehal Bodke-CCR-0409-END
              document.frmTxn.fldForex.focus();
                 document.frmTxn.fldINR.focus();
//ILENH-MOD-15012015-Snehal Bodke-CCR-0409-END
	  return false;
	}
	//-----


  	return true;
}
//------------------------------------------------------------------------------
var fx_rates_arr	=new Array();
var fx_curr_arr		=new Array();
function init(){
		var fx_pair_arr = Reloadforexrate;
	
		
		//alert(fx_pair_arr);
		var temp_arr 	= fx_pair_arr.split("~~");
		for(var i = 0;i<temp_arr.length;i++){
				fx_curr_arr[i] 	= temp_arr[i].split(",")[0];
  				fx_rates_arr[i] = temp_arr[i].split(",")[1];
  			//ENH-CCR409-ADD-22/01/2015-Snehal S Bodke-START	
  				if(fx_curr_arr[i]=="USD"){
  					usd_forex_rate = fx_rates_arr[i];
  					
  				}
                        //ENH-CCR409-ADD-22/01/2015-Snehal S Bodke-END
		}

		
		if(document.frmTxn.fldBack.value == 'true'){
//ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-START
			/*document.frmTxn.fldPurpose.selectedIndex			= document.frmTxn.fldPurposeIndx.value ;
                                       document.frmTxn.fldVariant.selectedIndex			= document.frmTxn.fldVariantIndx.value ;*/
      //ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-END
			document.frmTxn.fldCurr.selectedIndex				= document.frmTxn.fldCurrIndx.value ;
			
			
			rwcount = document.all("fldRowCount").value;			
			
			if(rwcount > 0){
			
			for(var i =1;i <= 9;i++){
		if(document.all("fldCurr"+i+"Indx").value > 0  && document.all("fldForex"+i).value!="" 
					&& !isNaN(document.all("fldForex"+i).value) 
					&& document.all("fldForex"+i).value!="0.00" ){					
					
					document.getElementById("Currency"+i).style.display = '';			
					document.getElementById("ForexAmount"+i).style.display = '';			
					//document.getElementById("INRAmount"+i).style.display = '';			
					//document.getElementById("USDAmount"+i).style.display = '';			
					
					document.all("fldCurr"+i).selectedIndex = document.all("fldCurr"+i+"Indx").value ;					
					showINRC(i);
			}else{
				dcument.all("fldForex"+i).value = '';
				} 
			}
			}else{
				showINRC(0);
				for(var i =1;i <= 9;i++){
				document.all("fldForex"+i).value = '';
				}
				}
			
		}

	return false;
}
//------------------------------------------------------------------------------
// calc FOREX to INR fxrate and show it in fldINR field.
function showINR()
{

	//var selcurr 	= 	document.frmTxn.fldCurr.value; ENH-CCR409-MOD-22/01/2015-Snehal S Bodke
          var selcurr_val 	= document.frmTxn.fldCurr.value;
   
	
	if(selcurr_val!=""){
	 init();
	 selcurr = selcurr_val.substring(selcurr_val.indexOf("(")+1,selcurr_val.indexOf(")"));
	
	 // alert("selcurr_val " +selcurr_val);
	 // alert("selcurr "+selcurr);
//ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-START
	//var x			=	document.frmTxn.fldCurr; 
        //var l_curr_found=	false;
//ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-END
	var selfxval 	=   document.frmTxn.fldForex.value;
	
	//if(document.frmTxn.fldCurr.selectedIndex == 0){
		//alert('Please select the currency, you wish to buy');
		//document.frmTxn.fldCurr.focus();
		//return false;
	//} 

	 
	for(var i = 0;i<fx_curr_arr.length;i++){
	  console.log("selcurr" + selcurr); 
	  console.log("fx_curr_arr" + fx_curr_arr[i]);
		if((selcurr == fx_curr_arr[i]) && !isNaN(selfxval) && selfxval != '')
				{
				    //alert("in");
					l_curr_found = true;
					selfxval = parseFloat(selfxval).toFixed(2);
					//alert(selfxval);
					document.frmTxn.fldForex.value		= selfxval;
					var val = fx_rates_arr[i] * selfxval;
                   //alert(val);
//ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-START
					/*document.frmTxn.fldINR.value 		= (Math.round(val*100)/100).toFixed(2);
					document.frmTxn.fldCurrDesc.value 	= x.options[x.selectedIndex].text;*/
//ENH-CCR409-DEL-22/01/2015-Snehal S Bodke-END
var inrAmt = (Math.round(val*100)/100).toFixed(2);
					//alert(inrAmt);
					document.frmTxn.fldINR.value 		= inrAmt;
					if(selcurr != 'USD'){
					document.frmTxn.fldUSD.value		= parseFloat((Math.round(inrAmt)/usd_forex_rate).toFixed(2));
					usd_forex_amt 		= parseFloat(usd_forex_amt) + parseFloat((Math.round(inrAmt)/usd_forex_rate).toFixed(2));
					}else{
					document.frmTxn.fldUSD.value		= selfxval;
					usd_forex_amt 		=  parseFloat(usd_forex_amt) +parseFloat(selfxval);
					}
					
					inr_forex_amt       = parseFloat(inr_forex_amt) + parseFloat(inrAmt);
				
					        // console.log("usd_forex_amt wR11   "+usd_forex_amt);
				    fldEqvusdshow = (Math.round(usd_forex_amt*100)/100).toFixed(2);
		          //  console.log("usd_forex_amt round11   "+fldEqvusdshow);
						
						document.frmTxn.fldEqvUsdAmt.value		= fldEqvusdshow;
		           	    document.frmTxn.fldEqvInrAmt.value		= inr_forex_amt;
					//document.frmTxn.fldCurrDesc.value 	= x.options[x.selectedIndex].text;
					
				
//store currency description like : United States Dollar (USD)
					break;
				}
	}

		if
		(
			document.frmTxn.fldCurr.value == 'EUR' 
			|| 
			document.frmTxn.fldCurr.value == 'GBP' 
			|| 
			document.frmTxn.fldCurr.value == 'USD'
		)
		{	
			var l_sel = false;
			var l_sel_indx = document.frmTxn.fldVariant.selectedIndex;
			if(l_sel_indx != 0)
			{
				l_sel = true;
			}
			
			/*ENH-CCR409-DEL-20/01/2015-Snehal S Bodke-START
			
			document.frmTxn.fldVariant.options.length = 0;
			
			var newOpt;
			var l_indx = 0;
	
			document.frmTxn.fldVariant.options.length = 0;
			newOpt = new Option ("-Select-", "", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;
	
			newOpt = new Option ("ForexPlus Card", "NCFC", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;
	
			newOpt = new Option ("Chip based ForexPlus Card", "CBFC", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;

			newOpt = new Option ("ForexPlus Platinum Card", "CBPFC", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;

			

			if(l_sel)
			{
				document.frmTxn.fldVariant.selectedIndex = l_sel_indx;		
			} */
		}
		/*else{
			document.frmTxn.fldVariant.options.length = 0;
			
			var newOpt;
			var l_indx = 0;
	
			document.frmTxn.fldVariant.options.length = 0;
			newOpt = new Option ("-Select-", "", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;

			newOpt = new Option ("ForexPlus Card", "NCFC", false, false);
			document.frmTxn.fldVariant.options[l_indx++] = newOpt;
			
			document.frmTxn.fldVariant.selectedIndex = 1;

	}*/
//ENH-CCR409-DEL-20/01/2015-Snehal S Bodke-END

	if(!l_curr_found){
		//document.frmTxn.fldINR.value = "";
//document.frmTxn.fldUSD.value = "";
        document.frmTxn.fldEqvUsdAmt.value = "";
	    document.frmTxn.fldEqvInrAmt.value = "";
		document.frmTxn.fldCurrDesc.value = "";
	}
	
	
	}
}
//ENH-CCR409-DEL-20/01/2015-Snehal S Bodke-START
/*function validateCurrVariant()
{
	if(document.frmTxn.fldVariant.value == 'CBPFC')
	{
		if(
		document.frmTxn.fldCurr.value == 'EUR' 
		|| 
		document.frmTxn.fldCurr.value == 'GBP' 
		|| document.frmTxn.fldCurr.value == 'USD')
		{
			
		}
	}
	
}*/
//ENH-CCR409-DEL-20/01/2015-Snehal S Bodke-END
//------------------------------------------------------------------------------
//ENH-CCR409-ADD-20/01/2015-Snehal S Bodke-START

//------------------------------------------------
function showINRC(btncount)
{
inr_forex_amt =0;
usd_forex_amt=0;
showINR();

	if(btncount > 0){	
console.log('count '+btncount);
	for(var i = 1;i <10;i++){
	l_curr_found=	false;
	calculateINR(i);
	
	/*if(!l_curr_found){
		document.all("fldINR"+i).value = 0;
		document.all("fldUSD"+i).value = 0;
		//document.frmTxn.fldCurrDesc.value = "";
}*/
	}	
}

}
//------------------------------------------------
function calculateINR (btncount){

	if($("#fldCurr"+btncount).val() != ""){
	  //console.log("btntext   " + btncount);
	  strbcnt = "#fldCurr"+btncount;
//console.log("hash    " + strbcnt);
	  
	var selcurr_val = $(strbcnt).val();
	//.log("selcurr_valcc   " + selcurr_val);
	if(selcurr_val != '' && selcurr_val != null ){
	//alert("err");
	selcurr_val = selcurr_val.substring(selcurr_val.indexOf("(")+1,selcurr_val.indexOf(")"));	
	var selfxval 	=   document.all("fldForex"+btncount).value;
	

	for(var i = 0;i <fx_curr_arr.length;i++){
			fx_curr_arr_val=fx_curr_arr[i];
			
		if((selcurr_val == fx_curr_arr[i]) && !isNaN(selfxval) && selfxval != '')
		{
						
					l_curr_found = true;
					selfxval = parseFloat(selfxval).toFixed(2);
						//alert(selfxval);
					document.all("fldForex"+btncount).value= selfxval;
			
					var val = fx_rates_arr[i] * selfxval;
					var inrAmt = (Math.round(val*100)/100).toFixed(2);
					
					document.all("fldINR"+btncount).value= inrAmt;
					
					if(selcurr_val != 'USD'){
					document.all("fldUSD"+btncount).value=parseFloat((Math.round(inrAmt)/usd_forex_rate).toFixed(2));
					usd_forex_amt  = parseFloat(usd_forex_amt)+parseFloat((Math.round(inrAmt)/usd_forex_rate).toFixed(2));
					}else{
					document.all("fldUSD"+btncount).value = selfxval;
					usd_forex_amt 		= parseFloat(usd_forex_amt) +parseFloat(selfxval);
					}
					
					
					inr_forex_amt       = parseFloat(parseFloat(inr_forex_amt) + parseFloat(inrAmt)).toFixed(2);
					
				       // console.log("usd_forex_amt wR11   "+usd_forex_amt);
				    fldEqvusdshow = (Math.round(usd_forex_amt*100)/100).toFixed(2);
		          //  console.log("usd_forex_amt round11   "+fldEqvusdshow);
						
					document.frmTxn.fldEqvUsdAmt.value		= fldEqvusdshow;
		           	document.frmTxn.fldEqvInrAmt.value		= inr_forex_amt;
					
					break;
		}
	}
	
	}
}else{
				document.all("fldINR"+btncount).value = '';
				document.all("fldUSD"+btncount).value = '';
				}
}
//ENH-CCR409-ADD-20/01/2015-Snehal S Bodke-START
//--------------------------------------------------------------------------------------
	
