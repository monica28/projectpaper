/* JavaScript content from js/dbconnection.js in folder common */
var colorsCode = new Array( "5D8AA8", "E32636", "FFBF00", "8DB600", "FBCEB1", "7FFFD4", "4B5320", "B2BEB5", "FF9966", "6D351A", "007FFF", "F4C2C2", "98777B", "000000", "0000FF", "B5A642", "66FF00", "FF007F", "004225", "C0C0C0", "FF6700", "002366", "826644", "E5E4E2", "E6E200", "836953", "CCCCFF", "E4D00A", "F7E7CE", "CC5500", "8F00FF", "00755E", "F28500", "87CEEB", "FFB347", "FF00FF", "BFFF00", "C3B091", "B2EC5D", "014421" );

var clr = '';
var flag=false;
var	fromMonth = '';
var	fromyear = '';
var	tomonth = '';
var	toyear = '';
var DEMODB;
function initDatabase() {
	console.log('Database Initialization.....');
	try {
	    if (!window.openDatabase) {
	        alert('Databases are not supported in this browser.');
	    } else {
	        var shortName = 'DIGI_STATEMENT';
	        var version = '1.0';
	        var displayName = 'DIGI_STATEMENT';
	        var maxSize = 100000; //  bytes
	        DEMODB = openDatabase(shortName, version, displayName, maxSize);
			createTables();
			rdsDBS = localStorage.getItem('RD');
			if(rdsDBS == null || rdsDBS == 'null' || rdsDBS == 'undefined' || rdsDBS == undefined){
				transaction.executeSql('DROP TABLE IF EXISTS "RD_STATEMENT"');
			    transaction.executeSql('CREATE TABLE "RD_STATEMENT" ("TXN_DATE", "TXN_NARRATION", "TXN_Type","TXNID" VARCHAR PRIMARY KEY   NOT NULL  UNIQUE, "TXN_ACNTNO","TXN_AMOUNT" NUMERIC);', [], nullDataHandler1, errorHandler);
				localStorage.setItem('RD','1');
			}
			selectAll();
			
	    }
	} catch(e) {
 
	    if (e == 2) {
	        // Version number mismatch.
	        console.log("Invalid database version.");
	    } else {
	        console.log("Unknown error "+e+".");
	    }
	    return;
	}
}
function createTables(){
	console.log('Create Table Initialization.....');
	DEMODB.transaction(
        function (transaction) {
		//transaction.executeSql('DROP TABLE IF EXISTS "DIGI_STATEMENT"');
		//transaction.executeSql('DROP TABLE IF EXISTS "HDFC_categories_income"');
		//transaction.executeSql('DROP TABLE IF EXISTS "HDFC_categories_expense"');
			transaction.executeSql('CREATE TABLE "DIGI_STATEMENT" ("TXN_DATE" DATE DEFAULT (null), "TXN_NARRATION" , "TXN_CHEQUE_REFNO" , "TXN_VALUE_DATE" DATE DEFAULT (null), "TXN_WITHDRAWAL" NUMERIC, "TXN_DEPOSIT" NUMERIC, "TXN_CLOSING_BAL" NUMERIC, "TXN_CATAGORY" , "TXNID1" PRIMARY KEY NOT NULL UNIQUE,"TXNID", "TXN_ADDREMARKS", "TXN_ACNTNO","TXN_TYPE","TXN_AMOUNT" NUMERIC);', [], nullDataHandler1, errorHandler);
			transaction.executeSql('CREATE TABLE "HDFC_categories_income" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
			transaction.executeSql('CREATE TABLE "HDFC_categories_expense" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
			
			rdsDBS = localStorage.getItem('RD');
			if(rdsDBS == null || rdsDBS == 'null' || rdsDBS == 'undefined' || rdsDBS == undefined){
				transaction.executeSql('DROP TABLE IF EXISTS "RD_STATEMENT"');
			    transaction.executeSql('CREATE TABLE "RD_STATEMENT" ("TXN_DATE", "TXN_NARRATION", "TXN_Type","TXNID" VARCHAR PRIMARY KEY NOT NULL  UNIQUE, "TXN_ACNTNO","TXN_AMOUNT" NUMERIC);', [], nullDataHandler1, errorHandler);
				localStorage.setItem('RD','1');
			}
			
        }
    );
	//prePopulate();
	selectcategories();
}
function nullDataHandler1(){
		console.log('null handler started ....');
}
function nullDataHandler(){
	addcategory(); 
	addcategory1();
	console.log('null handler started category....');
}
function errorHandler(e){
	console.log('errorHandler handler started ....'+e);
}
function sucess(){
	console.log('sucess handler started ....');
}
function selectAll(){
	//console.log('Inside select all statement.....');
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT count(*) as count FROM DIGI_STATEMENT;", [],
                dataSelectHandler, errorHandler);
	    }
	);
}
function requestData(frmDate,ToDate,acntno){
	var acnt = booksStore(acntno); 
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+frmDate+"' AND TXN_DATE<= '"+ToDate+"' AND TXN_ACNTNO = '"+acnt+"' ORDER BY TXN_DATE DESC;", [], dataSelectPassbookHandler, errorHandler);
	    }
	);
}
function selectcategories(){
	//console.log('Inside select all statement.....');
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM HDFC_categories_income;", [],
                dataCategoryHandler, errorHandler);
			transaction.executeSql("SELECT * FROM HDFC_categories_expense;", [],
                dataCategoryHandler1, errorHandler);
	    }
	);
	setTimeout(function(){
        $('.head').click(function (e) {
            e.preventDefault();

            $('.right_arrow').not($(this).find('.right_arrow')).find('.ico:first-child').show();
            $('.right_arrow').not($(this).find('.right_arrow')).find('.ico:last-child').hide();
            $(this).find('.right_arrow .ico').toggle();

            $('.toggle_content').not($(this).next()).slideUp();
            $(this).next().slideToggle();

        });
	},700);
}
function Addnewcategory(categoryname,temp1){
	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
	var temp = randomScalingFactor();
	if(temp1 == "Income"){
		DEMODB.transaction(
		    function (transaction) {
		    	transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('"+categoryname+"','"+categoryname+"','"+temp+"')", [],
                sucess, errorHandler);
			}
		);
	}
	if(temp1 == "Expense"){
		DEMODB.transaction(
		    function (transaction) {
		    	transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('"+categoryname+"','"+categoryname+"','"+temp+"')", [],
                sucess, errorHandler);
			}
		);
	}
	selectcategories();
}

function addcategory(){	
	//console.log('Inside select all category.....');
	//DEMODB = openDatabase(shortName, version, displayName, maxSize);
	
	DEMODB.transaction(
		    function (transaction) {
		    	transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Salary','Salary','1')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Interest','Interest','2')", [],
                sucess, errorHandler);

				transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Dividend','Dividend','3')", [],
                sucess, errorHandler);

				transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Gifts','Gifts','4')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Rental Income','Rental Income','5')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_income' VALUES('Miscellaneous income','Miscellaneous income','6')", [],
                sucess, errorHandler);
				
			}
		);
	selectcategories();
}

function addcategory1(){	
	//console.log('Inside select all category.....');
	//DEMODB = openDatabase(shortName, version, displayName, maxSize);
	DEMODB.transaction(
		    function (transaction) {
		    	transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Bills','Bills','1')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Shopping','Shopping','2')", [],
                sucess, errorHandler);

				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Food and Drinks','Food and Drinks','3')", [],
                sucess, errorHandler);

				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Travel','Travel','4')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Loan EMI','Loan EMI','5')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Entertainment','Entertainment','6')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Cash withdrawl','Cash withdrawl','7')", [],
                sucess, errorHandler);
				
				transaction.executeSql("INSERT INTO 'HDFC_categories_expense' VALUES('Miscellaneous expense','Miscellaneous expense','8')", [],
                sucess, errorHandler);
			}
		);
	selectcategories();
}
function SelectPassBookData(acntno){ 
	//alert("SelectPassBookData");
	//console.log('Inside select passbook statement.....');
	//console.log("database  "+frmdatepbkquery+"....."+todatepbkquery);
	todatepbkquerySTD = localStorage.getItem("FinTime").split(' ');
	todatepbkquery = todatepbkquerySTD[0].split('/');
	todatepbkquery = todatepbkquery[2]+'-'+todatepbkquery[1]+'-'+todatepbkquery[0];
	if(!todatepbkquery){
		var today = new Date();
								var dd = today.getDate()+1;
								var mm = today.getMonth()+1;
								var yyyy = today.getFullYear();
								if(dd<10) {
									dd='0'+dd
								} 
								if(mm<10) {
									mm='0'+mm
								} 
								todatepbkquery = yyyy+'-'+mm+'-'+dd;
		var temp = parseFloat(yyyy)-parseFloat(1);
		frmdatepbkquery = temp+'-'+mm+'-'+dd;
	}
	else{
		var todd = parseFloat(todatepbkquery.split('-')[2])+parseFloat(1);
		if(todd<10) {
						todd='0'+todd;
					}
		todatepbkquery = todatepbkquery.split('-')[0]+'-'+todatepbkquery.split('-')[1]+'-'+todd;
		var temp = parseFloat(todatepbkquery.split('-')[0])-parseFloat(1);
		frmdatepbkquery = temp+'-'+todatepbkquery.split('-')[1]+'-'+todd;
	}
	//console.log("database  "+frmdatepbkquery+"....."+todatepbkquery);
	// todatepbkquery
	
	//todatepbkquery = localStorage.setItem("FinTime");
	
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+acntno+"' AND TXN_DATE>= '"+frmdatepbkquery+"' AND  TXN_DATE<= '"+todatepbkquery+"' ORDER BY TXN_DATE DESC;", [],
                dataSelectPassbookHandler, errorHandler);
	    }
	);
}
function SelectRDData(acntno){ 
	//console.log('Inside select RD statement.....');
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM RD_STATEMENT WHERE TXN_ACNTNO = '"+acntno+"' ORDER BY TXN_DATE DESC;", [],
                dataSelectRDHandler, errorHandler);
	    }
	);
} 
function SelectPassBookDataInteractive(acntno,type){
	//alert("SelectPassBookDataInteractive "+type);
	//console.log('Inside select passbook statement interactive.....');
	//busyInd.hide();
	todatepbkquerySTD = localStorage.getItem("FinTime").split(' ');
	todatepbkquery = todatepbkquerySTD[0].split('/');
	todatepbkquery = todatepbkquery[2]+'-'+todatepbkquery[1]+'-'+todatepbkquery[0];
	if(!todatepbkquery){
		var today = new Date();
								var dd = today.getDate()+1;
								var mm = today.getMonth()+1;
								var yyyy = today.getFullYear();
								if(dd<10) {
									dd='0'+dd
								} 
								if(mm<10) {
									mm='0'+mm
								} 
								todatepbkquery = yyyy+'-'+mm+'-'+dd;
		var temp = parseFloat(yyyy)-parseFloat(1);
		frmdatepbkquery = temp+'-'+mm+'-'+dd;					//alert(todatepbkquery);
	}
	else{
		var todd = parseFloat(todatepbkquery.split('-')[2])+parseFloat(1);
		if(todd<10) {
						todd='0'+todd;
					}
		todatepbkquery = todatepbkquery.split('-')[0]+'-'+todatepbkquery.split('-')[1]+'-'+todd;
		var temp = parseFloat(todatepbkquery.split('-')[0])-parseFloat(1);
		frmdatepbkquery = temp+'-'+todatepbkquery.split('-')[1]+'-'+todd;
	}
	//console.log("database  "+frmdatepbkquery+"....."+todatepbkquery);
	
	DEMODB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+acntno+"' AND TXN_DATE>= '"+frmdatepbkquery+"' AND  TXN_DATE<= '"+todatepbkquery+"' ORDER BY TXN_DATE  DESC;", [],
                dataSelectPassbookHandler, errorHandler);
	    }
	);
}

function SelectPassBookData1(acntno){
	var category = $('#categoryselect').val();
	fromMonth = $('#FromMonth').val();
	fromyear = $('#FromYear').val();
	tomonth = $('#ToMonth').val();
	toyear = $('#ToYear').val();
	var startdate = fromyear+"-"+fromMonth+"-"+"01";
	var enddate = toyear+"-"+tomonth+"-"+"31";
	//2015-01-01
	//console.log('Inside select passbook statement.....');
	if(category == ""){
		categorychart = "False";
		DEMODB.transaction(
			function (transaction) {
				transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+acntno+"' AND TXN_DATE>= '"+startdate+"' AND  TXN_DATE<= '"+enddate+"' ORDER BY TXN_DATE DESC;", [],
					dataSelectPassbookHandlerchart, errorHandler);
			}
		);
	}
	else{
		categorychart = category;
		DEMODB.transaction(
			function (transaction) {
				transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+acntno+"' AND TXN_DATE>= '"+startdate+"' AND  TXN_DATE<= '"+enddate+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_DATE DESC;", [],
					dataSelectPassbookHandlerchart, errorHandler);
			}
		);
	}
}
function GraphData(){
	busyInd.show();
	//console.log('Inside Graph passbook statement.....');
	DEMODB.transaction(
	    function (transaction) {
			transaction.executeSql("SELECT TXN_CATAGORY, SUM(TXN_WITHDRAWAL) as Total_TXN_WITHDRAWAL, SUM(TXN_DEPOSIT) as Total_TXN_DEPOSIT  FROM DIGI_STATEMENT GROUP BY TXN_CATAGORY;", [],
               GraphHandler, errorHandler);
	    }
	);

}
function GraphData3(){
	//console.log('Inside Graph passbook statement.....');
	DEMODB.transaction(
	    function (transaction) {
			 transaction.executeSql("SELECT *  FROM DIGI_STATEMENT;", [],
               GraphHandler3, errorHandler);
	    }
	);

}
function OnclickSetGraphData3(myVar,slice,catagory){
clr = myVar;
	//console.log('Inside Graph passbook statement.....');
	//console.log("SELECT *  FROM DIGI_STATEMENT WHERE TXN_CATAGORY =  '"+catagory+"';");
	DEMODB.transaction(
	    function (transaction) {
			 transaction.executeSql("SELECT *  FROM DIGI_STATEMENT WHERE TXN_CATAGORY = '"+catagory+"';", [],
               GraphHandler4, errorHandler);
	    }
	);

}
function GraphHandler4(transaction, results){
 busyInd.show();
	// Handle the results
	//console.log('In database graph4 for onclcik event result ....');
	
        var setGrph3 = '';
	   var myChart321 = new FusionCharts( "Column2D.swf","myChartId2", "100%", "100%",  "0", "0");
    for (var i=0; i<results.rows.length; i++) {
 
    	var row = results.rows.item(i);
        var newFeature = new Object();
								TXN_DATE = row['TXN_DATE'],
                                TXN_NARRATION =  row['TXN_NARRATION'],
								TXN_CHEQUE_REFNO =  row['TXN_CHEQUE_REFNO'],
                                TXN_VALUE_DATE =  row['TXN_VALUE_DATE'],
								TXN_WITHDRAWAL =  row['TXN_WITHDRAWAL'],
                                TXN_DEPOSIT =  row['TXN_DEPOSIT'],
                                TXN_CLOSING_BAL =  row['TXN_CLOSING_BAL'],
                                TXN_CATAGORY =  row['TXN_CATAGORY'],
							    TXNID =  row['TXNID']
								//console.log(row['TXNID']+"   txn idsss ");
                                 TXN_DATE = dateConvert(TXN_DATE);
                 if(TXN_WITHDRAWAL!=null && TXN_WITHDRAWAL!=''){
                    setGrph3 +=    '<set label="'+TXN_DATE+'" value="'+TXN_WITHDRAWAL+'" color="'+clr+'" link="JavaScript:myJS1('+TXNID+')"/>';
                 }else{
                    setGrph3 +=    '<set label="'+TXN_DATE+'" value="'+TXN_DEPOSIT+'" color="'+clr+'" link="JavaScript:myJS1('+TXNID+')"/>';
                 }

    
    }
	var dataString3 ='<chart palette="0" captionPadding="0" chartTopMargin="0" chartBottomMargin="0" caption="" xAxisName="Days" yAxisName="" labelDisplay="Rotate" showValues="0" decimals="0" formatNumberScale="0" bgcolor="FFFFFF" useRoundEdges="0" bgColor="FFFFFF" showBorder="0" canvasBorderAlpha="0" showPlotBorder="0" plotGradientColor="000000" divLineColor="add1f1" divLineThickness="1" showAlternateHGridColor="1" alternateHGridColor="ffffff" baseFont="Helvetica Neue" baseFontColor="999999" >'+setGrph3+'<styles><definition><style name="myAnim" type="animation" param="_yScale" start="0" duration="0"/></definition><application><apply toObject="VLINES" styles="myAnim" /></application></styles></chart>';
	//console.log('Grph data from4 rd chabrt '+dataString3);
	
      
        myChart321.setXMLData( dataString3 );
        
        myChart321.render("chartContainer2");
		if(flag == false){//alert(190)
			$('.graphImg').css('opacity','0');
			$('.graphArwTop').removeClass('graphArwBtm');
			 $('#chartContainer2').animate({height:250},0);
			 $('#chartContainer2 > *').css('opacity',1);
			 flag=true;
		}
        $('#chartContainer2 > *').css('opacity',1);
		refresh();
	//myChart2.setXMLData( dataString3 );
	//myChart2.render("chartContainer2");
	busyInd.hide();
}
function dateConvert(TXN_DATE){
        TXN_DATE = TXN_DATE.split('-');
       // var Y =
        //var NTXN_DATE = new Date(TXN_DATE[2], TXN_DATE[1], TXN_DATE[0]);

        var weekday = new Array(12);
    weekday['01'] = "Jan";
    weekday['02'] = "Feb";
    weekday['03'] = "Mar";
    weekday['04'] = "Apr";
    weekday['05'] = "May";
    weekday['06'] = "Jun";
    weekday['07'] = "Jul";
    weekday['08'] = "Aug";
    weekday['09'] = "Sep";
    weekday['10'] = "Oct";
    weekday['11'] = "Nov";
    weekday['12'] = "Dec";
   // alert(TXN_DATE[0]);
var Y = TXN_DATE[0].substr(2,TXN_DATE[0].length-2);
     // str.substring(0,str.length-1);

//alert("Year "+Y);
//alert(TXN_DATE[1]);
    var n = weekday[TXN_DATE[1]];
    //alert("n "+n);
    //alert("n.... "+TXN_DATE[2]+" "+n+" "+Y)
        return TXN_DATE[2]+" "+n+" "+Y ;

}
function GraphHandler3(transaction, results){
 
	// Handle the results
	//console.log('In database passbook result ....');
	
        var setGrph3 = '';
	   var myChart321 = new FusionCharts( "Column2D.swf","myChartId2", "100%", "100%",  "0", "0");
    for (var i=0; i<results.rows.length; i++) {
 
    	var row = results.rows.item(i);
        var newFeature = new Object();
								TXN_DATE = row['TXN_DATE'],
                                TXN_NARRATION =  row['TXN_NARRATION'],
								TXN_CHEQUE_REFNO =  row['TXN_CHEQUE_REFNO'],
                                TXN_VALUE_DATE =  row['TXN_VALUE_DATE'],
								TXN_WITHDRAWAL =  row['TXN_WITHDRAWAL'],
                                TXN_DEPOSIT =  row['TXN_DEPOSIT'],
                                TXN_CLOSING_BAL =  row['TXN_CLOSING_BAL'],
                                TXN_CATAGORY =  row['TXN_CATAGORY'],
							    TXNID =  row['TXNID']
                                           // if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
                                TXN_DATE = dateConvert(TXN_DATE);
                                
                setGrph3 +=    '<set label="'+TXN_DATE+'" value="'+TXN_CLOSING_BAL+'" color="'+colorsCode[i]+'" link="JavaScript:myJS1('+TXNID+')"/>';
               // }else if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null)

    
    }
	var dataString3 ='<chart palette="0" captionPadding="0" chartTopMargin="0" chartBottomMargin="0" caption="" xAxisName="Days" yAxisName="" labelDisplay="Rotate" showValues="0" decimals="0" formatNumberScale="0" bgcolor="FFFFFF" useRoundEdges="0" bgColor="FFFFFF" showBorder="0" canvasBorderAlpha="0"  showPlotBorder="0" plotGradientColor="000000" divLineColor="add1f1" divLineThickness="1" showAlternateHGridColor="1" alternateHGridColor="ffffff" baseFont="Helvetica Neue" baseFontColor="999999" >'+setGrph3+'<styles><definition><style name="myAnim" type="animation" param="_yScale" start="0" duration="0"/></definition><application><apply toObject="VLINES" styles="myAnim" /></application></styles></chart>';
	//console.log('Grph data from3 rd chabrt '+dataString3);
	
      
        myChart321.setXMLData( dataString3 );
        
        myChart321.render("chartContainer2");
	//myChart2.setXMLData( dataString3 );
	//myChart2.render("chartContainer2");
	busyInd.hide();
}
function ConvertFrmt(x){
       x=x.toString();
var lastThree = x.substring(x.length-3);
var otherNumbers = x.substring(0,x.length-3);
if(otherNumbers != '')
    lastThree = ',' + lastThree;
var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
return res;
}
function GraphHandler(transaction, results){
 var setOfG = '';
 var setOfG1 = '';
	// Handle the results
	//console.log('In Graph Handler result ....');
	var j= 500;
	var k =5000;
	
	for (var i=0; i<results.rows.length; i++) {
 
    	var row = results.rows.item(i);
        var newFeature = new Object();
		GraphValue = parseInt(row['Total_TXN_WITHDRAWAL']);
		GraphCatagory = row['TXN_CATAGORY'];
		GraphValue1 = parseInt(row['Total_TXN_DEPOSIT']);
		//GraphValueLable = GraphValue.toLocaleString();//formatAmt(parseFloat(GraphValue),2);



//alert(res);
        GraphValueLable =   ConvertFrmt(GraphValue);
		GraphValueLable1 =   ConvertFrmt(GraphValue1);
		if(GraphValue!='' && GraphValue!=null && GraphValue!='NaN'){
				if(j==500){
					setOfG += '<set value="'+GraphValue+'" color="'+colorsCode[i]+'"  label="'+GraphCatagory+' \r\ '+GraphValueLable+'"  isSliced="1" link="j-slicePie-'+j+','+colorsCode[i]+','+GraphCatagory+'"/>';
				}else{
					setOfG += '<set value="'+GraphValue+'" color="'+colorsCode[i]+'"  label="'+GraphCatagory+' \r\ '+GraphValueLable+'"  link="j-slicePie-'+j+','+colorsCode[i]+','+GraphCatagory+'"/>';
				}
				
				j++;
		}
		if(GraphValue1!='' && GraphValue1!=null && GraphValue1!='NaN'){
				if(k==5000){
					setOfG1 += '<set value="'+GraphValue1+'" color="'+colorsCode[i]+'"  label="'+GraphCatagory+' \r\ '+GraphValueLable1+'"  isSliced="0" link="j-slicePie-'+k+','+colorsCode[i]+','+GraphCatagory+'"/>';
				}else{
					setOfG1 += '<set value="'+GraphValue1+'" color="'+colorsCode[i]+'"  label="'+GraphCatagory+' \r\ '+GraphValueLable1+'"   link="j-slicePie-'+k+','+colorsCode[i]+','+GraphCatagory+'"/>';
				}
				
				k++;
		}
	}	
	//var dataString ='<chart  caption="" captionPadding="0" showpercentvalues="1" chartrightmargin="10" showLabels="0" showValues="0" bgcolor="f1f8fe" chartleftmargin="0" charttopmargin="0" chartbottommargin="0" showLegend="1" legendPosition="RIGHT" legendShadow="0" legendBorderThickness="0" legendNumColumns="3" legendIconScale="0" legendNumColumns="2" legendBorderAlpha="0" showplotborder="0" showshadow="0" showborder="0" bordercolor="0080FF" borderalpha="50" bgalpha="50" use3DLighting="1" radius3D="60" slicingDistance="10" baseFont="Helvetica Neue" baseFontSize="12" baseFontColor="888888" >'+setOfG+'<styles><definition><style name="myLegendFont" type="animation" param="_alpha" start="0" duration="1" /><style name="MyXScaleAnim" type="ANIMATION" duration="1" start="0" param="_rotation" /><style name="MyYScaleAnim" type="ANIMATION" duration="1" start="0" param="_yscale" /></definition><application><apply toObject="Legend" styles="myLegendFont" /><apply toObject="Canvas" styles="MyXScaleAnim,MyYScaleAnim" /></application></styles></chart>';

    var dataString ='<chart  caption="" captionPadding="0" showpercentvalues="1" chartrightmargin="10" showLabels="0" showValues="0" bgcolor="f1f8fe" chartleftmargin="0" charttopmargin="0" chartbottommargin="0" showLegend="1" legendBgColor="f1f8fe" legendPosition="RIGHT" legendShadow="0" legendBorderThickness="0" legendBorderAlpha="0"  showplotborder="0" showshadow="0" showborder="0" bordercolor="0080FF" borderalpha="50" bgalpha="50" use3DLighting="1" radius3D="60" slicingDistance="10" baseFont="Helvetica Neue" baseFontSize="12" baseFontColor="888888" >'+setOfG+'<styles><definition><style name="myLegendFont" type="animation" param="_alpha" start="0" duration="1" /></definition><application><apply toObject="Legend" styles="myLegendFont" /></application></styles></chart>';
	//console.log('Inside graph database result '+ dataString);
	var dataString1 ='<chart  caption="" captionPadding="0" showpercentvalues="1" chartrightmargin="10" showLabels="0" showValues="0" bgcolor="f1f8fe" chartleftmargin="0" charttopmargin="0" chartbottommargin="0" showLegend="1" legendPosition="RIGHT" legendBgColor="f1f8fe" legendShadow="0" legendBorderThickness="0" legendBorderAlpha="0"  showplotborder="0" showshadow="0" showborder="0" bordercolor="0080FF" borderalpha="50" bgalpha="50" use3DLighting="1" radius3D="60" slicingDistance="10" baseFont="Helvetica Neue" baseFontSize="12" baseFontColor="888888" >'+setOfG1+'<styles><definition><style name="myLegendFont" type="animation" param="_alpha" start="0" duration="1" /></definition><application><apply toObject="Legend" styles="myLegendFont" /></application></styles></chart>';
	console.log('Inside graph database result 2'+ dataString);
	
	//console.log('Inside graph database result 2'+ dataString1);
	myChart.setXMLData( dataString );
	myChart1.setXMLData( dataString1 );
	myChart.render("chartContainer");
	myChart1.render("chartContainer1");
//	return dataString;
		
}

function dataSelectRDHandler(transaction, results){
	//console.log('In dataSelectRDHandler result ....'+results.rows.length);
    RDListMpassbook.removeAll();
	
    for (var i=0; i<results.rows.length; i++) {
		var row = results.rows.item(i);
        var newFeature = new Object();
		TXN_NARRATION = row['TXN_NARRATION'];
		TXN_DATE = row['TXN_DATE'];
		dateformatting(TXN_DATE);
		if(row['TXN_Type'] == 'CR'){
			InstallAmnt = formatAmt(parseFloat(row['TXN_AMOUNT']))+" Cr";
		}
		else{
			InstallAmnt = formatAmt(parseFloat(row['TXN_AMOUNT']))+" Dr";
		}
					RDListMpassbook.push({
                        TXN_DATE: dateformat,
                        TXN_NARRATION: TXN_NARRATION,
                        InstallAmnt: InstallAmnt,
                        TXN_Type: row['TXN_Type']
                    });					
							
    }
}


function dataSelectPassbookHandler(transaction, results){
 doughnutData = [];
 currenttrasdate = '';
 piechartarray.removeAll();
 var Salaryaddition = 0;
 var Interestaddition = 0;
 var Mutualaddition = 0;
 var Stocksaddition = 0;
 var Freelanceaddition = 0;
 var Businessaddition = 0;
	// Handle the results
	//console.log('In dataSelectPassbookHandler passbook result ....'+results.rows.length);
    accountListMpassbook.removeAll();
	m = 0;
    for (var i=0; i<results.rows.length; i++) {
		//for(j= 0; j< colorsCode.length; j++){
		TXN_NARRATION1	= '';			
		var row = results.rows.item(i);
        var newFeature = new Object();
		TXN_WITHDRAWAL = row['TXN_WITHDRAWAL'];
		TXN_DEPOSIT = row['TXN_DEPOSIT'];
		TXN_NARRATION = row['TXN_NARRATION'];
		TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		TXN_CATAGORY = row['TXN_CATAGORY'];
		NTXN_NARRATION = TXN_NARRATION.split('@@@');
		if(NTXN_NARRATION[1]){
			TXN_NARRATION1 = NTXN_NARRATION[1];
		}else{
			TXN_NARRATION1 = '';
		}
		if(row['TXN_ADDREMARKS']){
				TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		}else{
			TXN_ADDREMARKS = '';
		}
		TXN_DATE = row['TXN_DATE'];
		dateformatting(TXN_DATE);
		if(currenttrasdate == dateformat){
			//console.log("if condition "+currenttrasdate);
			dateformat = "";
		}
		else{
			//console.log("else condition "+currenttrasdate);
			currenttrasdate = dateformat;
			//dateformat = "";
		}
		
		//currenttrasdate1 = 
		if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				accType = 'W';
				TXN_WITHDRAWAL = formatAmt(parseFloat(TXN_WITHDRAWAL)) +" Dr";
		}else {
				accType = 'D';
		}
		if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				
				TXN_DEPOSIT = formatAmt(parseFloat(TXN_DEPOSIT))+" Cr";
		}
		if(i == 0){
			//console.log('In database passbook result ....'+TXN_CATAGORY);
		}
		if(i != 0){
			
		}
		if(mode == "interactive"){
			if(TXN_CATAGORY){
				m++;
				//console.log("categories "+m);
			}
		}
					accountListMpassbook.push({
                                TXN_DATE: dateformat,
                                TXN_NARRATION: TXN_NARRATION,
								TXN_NARRATION1:  NTXN_NARRATION[0]+TXN_NARRATION1,
								TXN_CHEQUE_REFNO: row['TXN_CHEQUE_REFNO'],
                                TXN_VALUE_DATE: row['TXN_VALUE_DATE'],
								TXN_WITHDRAWAL: TXN_WITHDRAWAL,
								TXN_ADDREMARKS: TXN_ADDREMARKS,
                                TXN_DEPOSIT: TXN_DEPOSIT,
                                TXN_CLOSING_BAL: row['TXN_CLOSING_BAL'],
                                TXN_CATAGORY: TXN_CATAGORY,
							    TXNID: row['TXNID'],
								ACCTYPES: accType,
								TXN_WITHDRAWAL1: row['TXN_WITHDRAWAL'],
								TXN_DEPOSIT1: row['TXN_DEPOSIT']
                            });					
							
		//}
		if(i== 500){
			break;
		}
    }
	
	for (var i=0; i<results.rows.length; i++) {		
		var row = results.rows.item(i);
		strid = "#"+row['TXNID'];
		$(strid).val(row['TXN_CATAGORY']);		
	}
    if(m < 10){
        localStorage.setItem("viewchartflg","");
    }
    showchartflg= localStorage.getItem("viewchartflg");
	console.log("length of M showchartflg "+showchartflg);
	if(m >= 10 &&  showchartflg!="showchart"){
		$("#Uppertabs").hide();
		$('.assetChart.chartDesc').hide();
		$('#category_btn').show();
		$('#category_txt').hide()
		$('#continueText').html("Press Continue to view your Income and Expense break up chart.");
		//console.log("show1");
		//$('.assetChart').show();
	}
	if(m >= 10 && showchartflg=="showchart"){
		chartcreate();
		//busyInd.hide();
		//console.log("show2");
		$("#Uppertabs").show();
		$('.appearError').hide();
		$('.assetChart').show();
	}
	if(m < 10 && showchartflg!="showchart"){
		$('.appearError').show();
		//busyInd.hide();
		$('.assetChart.chartDesc').hide();
		$("#Uppertabs").hide();
		//console.log("show3");
		var temp = 10 - m;
		$('#category_txt').html(temp+" Remaining");
	}

	setTimeout(function() {
		size_li = $("#myList li").size();               
		x=4;
		$('#loadMore').show();
		$('#myList li:lt('+x+')').show();               
		$('#loadMore').click(function () {		   
			try{
				setTimeout(function () {
					$('html,body').animate({
					   scrollTop: topposition							   
					});
				}, 2000);
				topposition=$('#myList li[style]').last().offset().top; 
				if(busyAuthChk == 0){
					busyAuthChk = 1;
					busyAuth2 = new WL.BusyIndicator('content', {
						text: 'Loading more transactions..',
						duration: 60.00
					}).show();
				}				
				//setTimeout(function (){
				//	busyAuth2 = new WL.BusyIndicator('content', {
					//	text: 'Loading more transactions..',
				//		duration: 60.00
					//}).hide();
				//	busyInd = new WL.BusyIndicator('content', {text : 'Loading...',duration:60.00});
				//}, 1000);
				setTimeout(function (){
					busyAuth2 = new WL.BusyIndicator('content', {
						text: 'Loading more transactions..',
						duration: 60.00
					}).hide();
					busyAuthChk = 0;
					busyInd = new WL.BusyIndicator('content', {text : 'Loading...',duration:60.00});
				}, 2000);
				//alert(accountListMpassbook().length);
				x= (x+5 <= size_li) ? x+5 : size_li;
				$('#myList li:lt('+x+')').show();
				if(x == size_li){
					$('#loadMore').hide();
				}
			}catch(e){
				busyAuth2 = new WL.BusyIndicator('content', {
					text: 'Loading more transactions..',
					duration: 60.00
				}).hide();				
			}			
		});	
	}, 2000);
}

function chartcreate(){
	var temparray = [];
	 doughnutData = [];
	 var itemcheck = [];
	  piechartarray.removeAll();
	//console.log('In dataSelectPassbookHandler passbook result ....'+results.rows.length);
	var sumAmnt1 = 0;
	for (var i=0; i< accountListMpassbook().length; i++) {
		//var row = results.rows.item(i);
		TXN_CATAGORY = accountListMpassbook()[i].TXN_CATAGORY;
		TXN_WITHDRAWAL = accountListMpassbook()[i].TXN_WITHDRAWAL1;
		TXN_DEPOSIT = accountListMpassbook()[i].TXN_DEPOSIT1;
		//alert(TXN_CATAGORY);
		if(TXN_CATAGORY){
			temparray.push(TXN_CATAGORY);
		}
		else{
			if(typetras == "Dr"){
				if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
					sumAmnt1 += parseFloat(TXN_WITHDRAWAL, 10);
				}
			}
			if(typetras == "Cr"){
				if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
					sumAmnt1 += parseFloat(TXN_DEPOSIT, 10);
				}
			}
		}
	}
	
	var uniques = temparray.unique();
	for(j=0; j < uniques.length; j++){
		var sumAmnt = 0;
		for (var i=0; i< accountListMpassbook().length; i++) {
			TXN_CATAGORY = accountListMpassbook()[i].TXN_CATAGORY;
			TXN_WITHDRAWAL = accountListMpassbook()[i].TXN_WITHDRAWAL1;
			TXN_DEPOSIT = accountListMpassbook()[i].TXN_DEPOSIT1;
			if(TXN_CATAGORY == uniques[j]){
				if(typetras == "Dr"){
					if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
						//TXN_WITHDRAWAL = row['TXN_WITHDRAWAL'];
									// if(TXN_CATAGORY == "Salary"){
										// Salaryaddition += parseFloat(TXN_WITHDRAWAL, 10);
									// }
						sumAmnt += parseFloat(TXN_WITHDRAWAL, 10);
					}
				}
				if(typetras == "Cr"){
					if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
						//TXN_DEPOSIT = row['TXN_DEPOSIT'];
							sumAmnt += parseFloat(TXN_DEPOSIT, 10);
									// if(TXN_CATAGORY == "Business"){
										// Businessaddition += parseFloat(TXN_DEPOSIT, 10);
									// }
									//doughnutData.push({"color": "#f3132d","label": TXN_CATAGORY,"value": TXN_DEPOSIT});
					}
				}
			}
		}
		
		var item = "#"+colorsCode [Math.floor(Math.random()*colorsCode.length)];
		itemcheck.push(item);
		
		for(s=0; s<itemcheck.length; s++){
			if(itemcheck[s] == item){
				var item = "#"+colorsCode [Math.floor(Math.random()*colorsCode.length)];
			}
		}
		if(sumAmnt != 0){
			sumAmnt = (Math.round(sumAmnt*100)/100).toFixed(2);
			var sumAmnt12 = "INR "+formatAmt(parseFloat(sumAmnt));
			
			if(uniques[j] == "Salary"){
				doughnutData.push({"color": "#8f007f","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#8f007f","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Interest"){
				doughnutData.push({"color": "#388f00","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#388f00","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Dividend"){
				doughnutData.push({"color": "#e5ff10","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#e5ff10","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Gifts"){
				doughnutData.push({"color": "#c39f1d","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#c39f1d","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Rental Income"){
				doughnutData.push({"color": "#bfd0ff","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#bfd0ff","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Bills"){
				doughnutData.push({"color": "#7a0c00","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#7a0c00","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Shopping"){
				doughnutData.push({"color": "#ff8f48","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#ff8f48","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Food and Drinks"){
				doughnutData.push({"color": "#9bffff","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#9bffff","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Travel"){
				doughnutData.push({"color": "#902a21","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#902a21","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Loan EMI"){
				doughnutData.push({"color": "#ead3a8","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#ead3a8","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Entertainment"){
				doughnutData.push({"color": "#5d355a","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#5d355a","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Cash withdrawl"){
				doughnutData.push({"color": "#d23641","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#d23641","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Miscellaneous expense"){
				doughnutData.push({"color": "#848484","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#848484","label": uniques[j],"value": sumAmnt12});
			}
			else if(uniques[j] == "Miscellaneous income"){
				doughnutData.push({"color": "#388E8E","label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": "#388E8E","label": uniques[j],"value": sumAmnt12});
			}
			else{
				doughnutData.push({"color": item,"label": uniques[j],"value": sumAmnt});
				piechartarray.push({"color": item,"label": uniques[j],"value": sumAmnt12});
			}
		}
	}
	if(sumAmnt1 != 0){
		 sumAmnt1 = (Math.round(sumAmnt1*100)/100).toFixed(2);
		 var sumAmnt12 = "INR "+formatAmt(parseFloat(sumAmnt1));
		if(typetras == "Cr"){
				doughnutData.push({"color": "#aa8cc5","label": "Other Income","value": sumAmnt1});
				piechartarray.push({"color": "#aa8cc5","label": "Other Income","value": sumAmnt12});
		}
		if(typetras == "Dr"){
				doughnutData.push({"color": "#c1c1c1","label": "Other Expenditure","value": sumAmnt1});
				piechartarray.push({"color": "#c1c1c1","label": "Other Expenditure","value": sumAmnt12});
		}
	}
		setTimeout(function () {
			if(doughnutData.length != 0){
				$('.assetChart.chartDesc').show();
				$('#noCatg').hide();
				$('.chartDesc .link').show();
				$('.chartDesc .contets').css('padding-top','20px');
				var ctx = document.getElementById("chart-area").getContext("2d");
				window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive: true,segmentShowStroke:false,showTooltips: false});
			}
			else{
				$('#noCatg').show();				
				$('.chartDesc .link').hide();
				$('.chartDesc .contets').css('padding-top','0');
			}			
		}, 3000);

}

function dataSelectPassbookHandlerchart(transaction, results){
 doughnutData = [];
 var tempval = "";
 income = [];
 expense = [];
 currenttrasdate = '';
 var currentmonth ='';
 piechartarray.removeAll();
 var creditaddition = 0;
 var fundaddition = 0;
 var currentexpenseJan = 0;
 var currentexpenseFeb = 0;
 var currentexpenseMar = 0;
 var currentexpenseApr = 0;
 var currentexpenseMay = 0;
 var currentexpenseJun = 0;
 var currentexpenseJul = 0;
 var currentexpenseAug = 0;
 var currentexpenseSep = 0;
 var currentexpenseOct = 0;
 var currentexpenseNov = 0;
 var currentexpenseDec = 0;

 var currentincomeJan = 0;
 var currentincomeFeb = 0;
 var currentincomeMar = 0;
 var currentincomeApr = 0;
 var currentincomeMay = 0;
 var currentincomeJun = 0;
 var currentincomeJul = 0;
 var currentincomeAug = 0;
 var currentincomeSep = 0;
 var currentincomeOct = 0;
 var currentincomeNov = 0;
 var currentincomeDec = 0;

 // Handle the results
	//console.log('In dataSelectPassbookHandlerchart passbook result ....');
	
    accountListMpassbook.removeAll();
	
    for (var i=0; i<results.rows.length; i++) {
		//for(j= 0; j< colorsCode.length; j++){
		TXN_NARRATION1	= '';			
		var row = results.rows.item(i);
        var newFeature = new Object();
		TXN_WITHDRAWAL = row['TXN_WITHDRAWAL'];
		TXN_DEPOSIT = row['TXN_DEPOSIT'];
		TXN_NARRATION = row['TXN_NARRATION'];
		TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		TXN_CATAGORY = row['TXN_CATAGORY'];
		NTXN_NARRATION = TXN_NARRATION.split('@@@');
		if(NTXN_NARRATION[1]){
			TXN_NARRATION1 = NTXN_NARRATION[1];
		}else{
			TXN_NARRATION1 = '';
		}
		if(row['TXN_ADDREMARKS']){
				TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		}else{
			TXN_ADDREMARKS = '';
		}
		TXN_DATE = row['TXN_DATE'];
		dateformatting(TXN_DATE);
		//console.log("dateformat "+dateformat);
		//console.log("dateformat "+dateformat.split(" ")[1]);
		// if(currenttrasdate == dateformat){
			// dateformat = "";
		// }
		// else{
			// currenttrasdate = dateformat;
		// }
		
		if(dateformat.split(" ")[1] == "Jan"){
			//console.log('Jan');
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				//console.log("TXN_WITHDRAWAL "+TXN_WITHDRAWAL);
				currentexpenseJan += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				//console.log("TXN_DEPOSIT "+TXN_DEPOSIT);
				currentincomeJan += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Feb"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseFeb += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeFeb += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Mar"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseMar += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeMar += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Apr"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseApr += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeApr += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "May"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseMay += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeMay += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Jun"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseJun += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeJun += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Jul"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseJul += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeJul += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Aug"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseAug += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeAug += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Sep"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseSep += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeSep += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Oct"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseOct += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeOct += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Nov"){
			//console.log('Nov121 '+TXN_DEPOSIT);
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseNov += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				//console.log('Nov '+TXN_DEPOSIT);
				currentincomeNov += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		if(dateformat.split(" ")[1] == "Dec"){
			if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				currentexpenseDec += parseFloat(TXN_WITHDRAWAL, 10);
			}
			if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				currentincomeDec += parseFloat(TXN_DEPOSIT, 10);
			}
		}
		
		//NTXN_DATE = TXN_DATE[2]+"-"+TXN_DATE[1]+"-"+TXN_DATE[0];
		if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				accType = 'W';
				TXN_WITHDRAWAL = TXN_WITHDRAWAL;
		}else {
				accType = 'D';
		}
		if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				
				TXN_DEPOSIT = TXN_DEPOSIT;
		}
		//if(i == 0){
			//currenttrasdate1 = currenttrasdate;
			//console.log('In database passbook result ....'+TXN_NARRATION);
			//console.log('In database passbook result ....'+TXN_CATAGORY);
		//}
		//if(i != 0){
			//currenttrasdate1 = currenttrasdate;
			// if(currenttrasdate1 == dateformat){
				// dateformat = "";
			// }
			//console.log('In database passbook result ....'+TXN_NARRATION);
			//console.log('In database passbook result ....'+TXN_CATAGORY);
		//}
    }
	//alert("currentexpenseOct "+currentexpenseOct);
	expense.push("",currentexpenseJan,currentexpenseFeb,currentexpenseMar,currentexpenseApr,currentexpenseMay,currentexpenseJun,currentexpenseJul,currentexpenseAug,currentexpenseSep,currentexpenseOct,currentexpenseNov,currentexpenseDec);
	income.push("",currentincomeJan,currentincomeFeb,currentincomeMar,currentincomeApr,currentincomeMay,currentincomeJun,currentincomeJul,currentincomeAug,currentincomeSep,currentincomeOct,currentincomeNov,currentincomeDec);
	
	var test = [];
	var expense1 = [];
	var income1 = [];
	if(fromMonth != '10'){
		var from = fromMonth.indexOf('0');
		if(from != -1){
			from = fromMonth.substr(1);
		}
		else{
			from = fromMonth;
		}
	}
	else{
			from = fromMonth;
		}
	
	if(tomonth != '10'){

		var to = tomonth.indexOf('0');
		if(to != -1){
			to = tomonth.substr(1);
		}
		else{
			to = tomonth;
		}
	}
	else{
			to = tomonth;
		}
		//alert(fromyear);
	var temptyear = fromyear.slice(2,4);
	//console.log("from "+from+" to "+to);
	var temp = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	from = parseInt(from);
	to = parseInt(to);
	var toyear = $('#ToYear').val();
		toyear = toyear.slice(2,4);
	if(temptyear == toyear){
			for (var i=from; i <= to; i++){
				test.push(temp[i]+"<br>"+temptyear);
			}
			for(var j=from; j <= to; j++){
				expense1.push(expense[j]);
			}
			for(var k=from; k <= to; k++){
				income1.push(income[k]);
			}
	}
	else{
		var toyear = $('#ToYear').val();
		toyear = toyear.slice(2,4);
		if(temptyear < toyear){
			for (var i=from; i <= 12; i++){
				test.push(temp[i]+"<br>"+temptyear);
			}
			for(var j=from; j <= 12; j++){
				expense1.push(expense[j]);
			}
			for(var k=from; k <= 12; k++){
				income1.push(income[k]);
			}
		}
			for (var i=1; i <= to; i++){
				test.push(temp[i]+"<br>"+toyear);
			}
			for(var j=1; j <= to; j++){
				expense1.push(expense[j]);
			}
			for(var k=1; k <= to; k++){
				income1.push(income[k]);
			}
	}
		
		setTimeout(function(){
			$("#contentData").load("Views/mPassbook/mPB_passbookGraph.html", null, function (response, status, xhr) {
				if (status != "error") {}
				
				if(categorychart == "False"){
					new Chartist.Line('#graph1', {
					  labels: test,
					 series: [		 
								income1,
								expense1
							]
					}, {
						low: 0,
						showArea: true,		  
						fullWidth: true,
						lineSmooth: false,
						plugins: [
									Chartist.plugins.tooltip(),
									Chartist.plugins.ctAxisTitle({
									  axisX: {
										axisTitle: 'Months',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 50
										},
										textAnchor: 'middle'
									  },
									  axisY: {
										axisTitle: 'Rs.',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 15
										},
										textAnchor: 'middle',
										flipTitle: false
									  }
									})
								],
								axisY: {
									offset: 50
								},
								chartPadding: {
									top: 20,
									right: 20,
									bottom: 20,
									left: 20
								}
					});
				}
				if(categorychart != "False"){
					for(i=0; i< CategoryList().length; i++){
						if(CategoryList()[i].TXN_Category_name == categorychart){
							tempval = "income";
						}
					}
					for(i=0; i< CategoryList_expense().length; i++){
						if(CategoryList_expense()[i].TXN_Category_name == categorychart){
							tempval = "expense";
						}
					}
					if(tempval == "income"){
						new Chartist.Line('#graph1', {
							  labels: test,
							 series: [		 
										income1
										
									]
						}, {
								low: 0,
								showArea: true,		  
								fullWidth: true,
								lineSmooth: false,
								plugins: [
									Chartist.plugins.tooltip(),
									Chartist.plugins.ctAxisTitle({
									  axisX: {
										axisTitle: 'Months',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 50
										},
										textAnchor: 'middle'
									  },
									  axisY: {
										axisTitle: 'Rs.',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 15
										},
										textAnchor: 'middle',
										flipTitle: false
									  }
									})
								],
								axisY: {
									offset: 45
								},
								chartPadding: {
									top: 20,
									right: 20,
									bottom: 20,
									left: 20
								}
						});
					}
					if(tempval == "expense"){
						new Chartist.Line('#graph1', {
							  labels: test,
							 series: [	income1,	 
										expense1
									]
						}, {
								low: 0,
								showArea: true,		  
								fullWidth: true,
								lineSmooth: false,
								plugins: [
									Chartist.plugins.tooltip(),
									Chartist.plugins.ctAxisTitle({
									  axisX: {
										axisTitle: 'Months',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 50
										},
										textAnchor: 'middle'
									  },
									  axisY: {
										axisTitle: 'Rs.',
										axisClass: 'ct-axis-title',
										offset: {
										  x: 0,
										  y: 15
										},
										textAnchor: 'middle',
										flipTitle: false
									  }
									})
								],
								axisY: {
									offset: 45
								},
								chartPadding: {
									top: 20,
									right: 20,
									bottom: 20,
									left: 20
								}
						});						
					}
				}
				if(catgraph == "true"){
					$('#reportname').html("Category Report");
					$('.graphLegend').hide();
					if(tempval == "income"){
						$('#catgraphshow').show();
						$('#catgraphshow2').hide();
						$('#categoryname').html(catgraphname);
					}
					if(tempval == "expense"){
						setTimeout(function(){
							$('.ct-series.ct-series-a').hide();
						},700);
						$('#catgraphshow').hide();
						$('#catgraphshow2').show();
						$('#categoryname1').html(catgraphname);
					}
					//$('#catgraphshow').show();
					//catgraphshow2
					//$('#categoryname').html(catgraphname);
				}
				else{
					$('#reportname').html("Income Vs Expenditure");
					$('.graphLegend').show();
					$('#catgraphshow').hide();
					$('#catgraphshow2').hide();
					
				}
				$('#acntno').html(selaccno);
				accdata = accountListPSBK();
				$(accdata).each(function(index, accnodet){
										if(accnodet.codacctno == selaccno){
											selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.codacctno, acctbalance: accnodet.acctbalance, acctType: accnodet.acctType});
											var currAccData = selectedAccount();
											fldAcctNo = currAccData.accno;            
											curraccbalval = currAccData.acctbalance;
										}
						});
				$('#acntval').html(curraccbalval);
				ko.applyBindings(self, $(".content").get(0));                   
			});
		},700);

	
}
function UpdateRemarks(data){
//console.log('TXNID  ..........'+data);
NewData = data.split('###');

narrationUpdate = NewData[0];
exitingNarration = NewData[1];
$('#NewNarration').val(exitingNarration);
		$('.popup_back').fadeIn(300);
}
function UpdateCatagory(id,category,acntno,type){
		var actno = booksStore(acntno);
		//if(category!='' && category!=null){
			//console.log("category1");
			//alert(changevalstart);
			DEMODB.transaction(
				function (transaction) {
					//console.log("UPDATE DIGI_STATEMENT SET TXN_CATAGORY = '"+category+"' WHERE TXNID = '"+id+"' ");
					transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_CATAGORY = '"+category+"' WHERE  TXNID = '"+id+"' ", [],catadded, catadderror);
				}
			);
			SelectPassBookDataInteractive(actno,type);
		/*}
		else{
				busyInd.hide();
		}*/
		//busyInd.hide();
}
function UpdateCatagory1(id,category,acntno,type){
		var actno = booksStore(acntno);
			DEMODB.transaction(
				function (transaction) {
					console.log("UPDATE11 DIGI_STATEMENT SET TXN_CATAGORY = '"+category+"' WHERE TXNID = '"+id+"' ");
					transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_CATAGORY = '"+category+"' WHERE  TXNID = '"+id+"' ", [],catadded, catadderror);
					transaction.executeSql(querytemp,[],dataSelectPassbookHandler, errorHandler);
				}
			);
			//SelectPassBookDataInteractive(actno,type);
}

function catadded(){console.log('sucess');}
function catadderror(){console.log('error');}

function filterSearch(text){
	var actno = booksStore($('#fldAcctNo').val());
	//WHERE MYREMARKS LIKE '%"+remarks+"%' TXN_NARRATION TXN_ADDREMARKS "TXN_WITHDRAWAL" NUMERIC, "TXN_DEPOSIT"
	DEMODB.transaction(
	    function (transaction) {
			transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE (TXN_NARRATION LIKE '%"+text+"%' OR TXN_ADDREMARKS LIKE '%"+text+"%' OR TXN_WITHDRAWAL LIKE '%"+text+"%' OR TXN_DEPOSIT LIKE '%"+text+"%') AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],dataSelectPassbookHandler, errorHandler);
			querytemp = "SELECT * FROM DIGI_STATEMENT WHERE (TXN_NARRATION LIKE '%"+text+"%' OR TXN_ADDREMARKS LIKE '%"+text+"%' OR TXN_WITHDRAWAL LIKE '%"+text+"%' OR TXN_DEPOSIT LIKE '%"+text+"%') AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
		}
	);
}

function FilterStatement1(){
	busyInd.show();
	var type = $('#type').val();
		if(type == "Both"){
			type = "";
		}
		else{
			type = $('#type').val();
		}
	fromAmt = $('#minamnt').val();
	ToAmt = $('#maxamnt').val();
	htFromDate = $('#fldFromDate').val();
	htToDate = $('#fldToDate').val();
	sort = $('#sort').val();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = dd+'/'+mm+'/'+yyyy;
	var d = new Date();
	var n = d.getDay();
	
	if(htFromDate != '' && htToDate != ''){
		htFromDate = htFromDate.split('/');
		NewFrmDate = htFromDate[2]+"-"+htFromDate[1]+"-"+htFromDate[0];
	}
	if(htToDate != ''){
		htToDate = htToDate.split('/');
		NewToDate = htToDate[2]+"-"+htToDate[1]+"-"+htToDate[0]+" 23:59:59";
	}
   
	var actno = booksStore($('#fldAcctNo').val());
	//alert(NewFrmDate+"  "+NewToDate+"  "+selaccno);
	DEMODB.transaction(
	    function (transaction) {
			if(fromAmt == "" && ToAmt == "" && htFromDate == "" && htToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt != "" && ToAmt == "" && htFromDate == "" && htToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt == "" && ToAmt != "" && htFromDate == "" && htToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt != "" && ToAmt != "" && htFromDate == "" && htToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt == "" && ToAmt != "" && htFromDate != "" && htToDate != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt != "" && ToAmt == "" && htFromDate != "" && htToDate != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt != "" && ToAmt != "" && htFromDate != "" && htToDate != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else if(fromAmt == "" && ToAmt == "" && htFromDate != "" && htToDate != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
				}
			}
			else{
				transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
                dataSelectPassbookHandler, errorHandler);
			}
	        
	    }
	);
	//console.log("SELECT * FROM DIGI_STATEMENT WHERE  TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"';");
	//SELECT *   FROM DIGI_STATEMENT WHERE TXN_NARRATION LIKE '%equi%'
	//console.log(fromAmt+" --- "+ToAmt+" -- "+htFromDate+" -- "+htToDate+" -- "+txnfilter);
	busyInd.hide();
}

function FilterStatement(){
busyInd.show();

	var type = $('#type').val();
		if(type == "Both"){
			type = "";
		}
		else{
			type = $('#type').val();
		}
	fromAmt = $('#minamnt').val();
	ToAmt = $('#maxamnt').val();
	category = $('.categoryval:visible').val();
	if(category == undefined){category = "";}
	duration  = $('#duration').val();
	htFromDate = $('#fldFromDate').val();
	htToDate = $('#fldToDate').val();
	//alert(htFromDate+"   "+htToDate);
	sort = $('#sort').val();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = dd+'/'+mm+'/'+yyyy;
	var d = new Date();
	var n = d.getDay();
	
	if(htFromDate == '' && htToDate == ''){
	if(duration != ''){
		if(duration == "week"){
			if(n == 1){
				htFromDate = today;
				htToDate = today;
			}
			else{
				var days = n;
				var date = new Date();
				var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
				var day =last.getDate();
				var month=last.getMonth()+1;
				var year=last.getFullYear();
					if(day<10) {
						day='0'+day;
					} 
					if(month<10) {
						month='0'+month;
					} 
				htFromDate = day+'/'+month+'/'+year;
				htToDate = today;
			}
		}
		if(duration == "month"){
			htFromDate = '01'+'/'+mm+'/'+yyyy;
			htToDate = today;
		}
		if(duration == "lastmonth"){
			var temp = mm - 1;
				if(temp<10) {
					temp='0'+temp
				} 
				
			htFromDate = '01'+'/'+temp+'/'+yyyy;
			htToDate = '31'+'/'+temp+'/'+yyyy;
		}
		if(duration == "last3month"){
			var dateback = new Date();
			dateback.setMonth(dateback.getMonth() - 3);
			var ddd = dateback.getDate();
			var mmm = dateback.getMonth()+1; //January is 0!
			var yyyyy = dateback.getFullYear();
			if(ddd<10) {
				ddd='0'+ddd
			} 
			if(mmm<10) {
				mmm='0'+mmm
			} 
			dateback = ddd+'/'+mmm+'/'+yyyyy;
			htFromDate = dateback;
			htToDate = today;
		}
		if(duration == "last12"){
			var dateback = new Date();
			dateback.setMonth(dateback.getMonth() - 12);
			var ddd = dateback.getDate();
			var mmm = dateback.getMonth()+1; //January is 0!
			var yyyyy = dateback.getFullYear();
			if(ddd<10) {
				ddd='0'+ddd
			} 
			if(mmm<10) {
				mmm='0'+mmm
			} 
			dateback = ddd+'/'+mmm+'/'+yyyyy;
			htFromDate = dateback;
			htToDate = today;
		}
		if(duration == "year"){
				htFromDate = '01'+'/'+'01'+'/'+yyyy;
				htToDate = today;
		}
	}
	}
	if(htFromDate!= "" && htToDate!=""){
		htFromDate = htFromDate.split('/');
		htToDate = htToDate.split('/');
		NewFrmDate = htFromDate[2]+"-"+htFromDate[1]+"-"+htFromDate[0];
		NewToDate = htToDate[2]+"-"+htToDate[1]+"-"+htToDate[0]+" 23:59:59";
	}
	else{
		NewFrmDate = "";
		NewToDate = "";
	}
	var actno = booksStore($('#fldAcctNo').val());
	//alert(NewFrmDate+"  "+NewToDate+"  "+selaccno+"  "+sort);
	DEMODB.transaction(
	    function (transaction) {
			if(sort != "" && category == "" && NewFrmDate== "" && NewToDate == "" && fromAmt == "" && ToAmt == ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT ASC";
					}if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				else{
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_AMOUNT DESC";
					}
				}

			}
			else if(sort != "" && category == "" && NewFrmDate== "" && NewToDate == "" && fromAmt != "" && ToAmt != ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Cr"){					
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Dr"){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
			}

			else if(sort != "" && category == "" && NewFrmDate== "" && NewToDate == "" && fromAmt == "" && ToAmt != ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Cr"){					
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Dr"){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"'  AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
			}
			
			else if(sort != "" && category == "" && NewFrmDate== "" && NewToDate == "" && fromAmt != "" && ToAmt == ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Cr"){					
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DEPOSIT>= '"+fromAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				if(type == "Dr"){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
			}

			
			else if(sort != "" && category == "" && NewFrmDate != "" && NewToDate != "" && fromAmt == "" && ToAmt == ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				else{
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC";
					}
				}

			}

			else if(sort != "" && category != "" && NewFrmDate == "" && NewToDate == "" && fromAmt == "" && ToAmt == ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_AMOUNT ASC";
					}if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				else{
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
			}
			else if(sort != "" && category != "" && NewFrmDate != "" && NewToDate != "" && fromAmt == "" && ToAmt == ""){
				if(type == ""){
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT ASC";
					}if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
				else{
					if(sort == "DateDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE DESC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE DESC";
					}
					if(sort == "DateAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE ASC", [],
						dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_DATE ASC";
					}
					if(sort == "AmntAsc"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT ASC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT ASC";
					}
					if(sort == "AmntDes"){
						transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT DESC", [],
					dataSelectPassbookHandler, errorHandler);
						querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' AND TXN_CATAGORY = '"+category+"' AND TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' ORDER BY TXN_AMOUNT DESC";
					}
				}
			}

			else if(fromAmt == "" && ToAmt == "" && category == "" && NewFrmDate== "" && NewToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt != "" && ToAmt == "" && category == "" && NewFrmDate== "" && NewToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt == "" && ToAmt != "" && category == "" && NewFrmDate== "" && NewToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt != "" && ToAmt != "" && category == "" && NewFrmDate== "" && NewToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt == "" && ToAmt == "" && category == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp ="SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt != "" && ToAmt == "" && category == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt == "" && ToAmt != "" && category == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt != "" && ToAmt != "" && category == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			
			else if(fromAmt != "" && ToAmt != "" && category != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND ((TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"') OR (TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"')) AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Cr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_DEPOSIT>= '"+fromAmt+"' AND TXN_DEPOSIT<= '"+ToAmt+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				if(type == "Dr"){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_WITHDRAWAL>= '"+fromAmt+"' AND TXN_WITHDRAWAL<= '"+ToAmt+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt == "" && ToAmt == "" && category != "" && NewFrmDate == "" && NewToDate == ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_TYPE = '"+type+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else if(fromAmt == "" && ToAmt == "" && category != "" && NewFrmDate != "" && NewToDate != ""){
				if(type == ""){
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
				else{
					transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
					dataSelectPassbookHandler, errorHandler);
					querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"' AND TXN_TYPE = '"+type+"' AND TXN_CATAGORY = '"+category+"' AND TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
				}
			}
			else{
				transaction.executeSql("SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC", [],
                dataSelectPassbookHandler, errorHandler);
				querytemp = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+actno+"' ORDER BY TXN_DATE DESC";
			}
	        
	    }
	);
	//console.log("SELECT * FROM DIGI_STATEMENT WHERE  TXN_DATE>= '"+NewFrmDate+"' AND  TXN_DATE<= '"+NewToDate+"';");
	//SELECT *   FROM DIGI_STATEMENT WHERE TXN_NARRATION LIKE '%equi%'
	//console.log(fromAmt+" --- "+ToAmt+" -- "+htFromDate+" -- "+htToDate+" -- "+txnfilter);
	busyInd.hide();
}
function dataSelectfilterHandler(transaction, results){
//console.log('In database filter result ....');
	
 doughnutData = [];
 currenttrasdate = '';
 piechartarray.removeAll();
 var Salaryaddition = 0;
 var Interestaddition = 0;
 var Mutualaddition = 0;
 var Stocksaddition = 0;
 var Freelanceaddition = 0;
 var Businessaddition = 0;
	// Handle the results
	//console.log('In database passbook result ....');
	
        accountListMpassbook.removeAll();
	m = 0;
	//alert("dataSelectPassbookHandler "+results.rows.length);
    for (var i=0; i<results.rows.length; i++) {
		//for(j= 0; j< colorsCode.length; j++){
		TXN_NARRATION1	= '';			
		var row = results.rows.item(i);
        var newFeature = new Object();
		TXN_WITHDRAWAL = row['TXN_WITHDRAWAL'];
		TXN_DEPOSIT = row['TXN_DEPOSIT'];
		TXN_NARRATION = row['TXN_NARRATION'];
		TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		TXN_CATAGORY = row['TXN_CATAGORY'];
		NTXN_NARRATION = TXN_NARRATION.split('@@@');
		if(NTXN_NARRATION[1]){
			TXN_NARRATION1 = NTXN_NARRATION[1];
		}else{
			TXN_NARRATION1 = '';
		}
		if(row['TXN_ADDREMARKS']){
				TXN_ADDREMARKS = row['TXN_ADDREMARKS'];
		}else{
			TXN_ADDREMARKS = '';
		}
		TXN_DATE = row['TXN_DATE'];
		dateformatting(TXN_DATE);
		if(currenttrasdate == dateformat){
			//console.log("if condition "+currenttrasdate);
			dateformat = "";
		}
		else{
			//console.log("else condition "+currenttrasdate);
			currenttrasdate = dateformat;
			//dateformat = "";
		}
		
		if(TXN_WITHDRAWAL!='' && TXN_WITHDRAWAL!=null){
				accType = 'W';
				TXN_WITHDRAWAL = formatAmt(parseFloat(TXN_WITHDRAWAL)) +" Dr";
		}else {
				accType = 'D';
		}
		if(TXN_DEPOSIT!='' && TXN_DEPOSIT!=null){
				
				TXN_DEPOSIT = formatAmt(parseFloat(TXN_DEPOSIT))+" Cr";
		}
		if(i == 0){
			//console.log('In database passbook result ....'+TXN_CATAGORY);
		}
		if(i != 0){
			
		}
		if(mode == "interactive"){
			if(TXN_CATAGORY){
				m++;
			}
		}

				accountListMpassbook.push({
                                TXN_DATE: dateformat,
                                TXN_NARRATION: TXN_NARRATION,
								TXN_NARRATION1:  NTXN_NARRATION[0]+TXN_NARRATION1,
								TXN_CHEQUE_REFNO: row['TXN_CHEQUE_REFNO'],
                                TXN_VALUE_DATE: row['TXN_VALUE_DATE'],
								TXN_WITHDRAWAL: TXN_WITHDRAWAL,
								TXN_ADDREMARKS: TXN_ADDREMARKS,
                                TXN_DEPOSIT: TXN_DEPOSIT,
                                TXN_CLOSING_BAL: row['TXN_CLOSING_BAL'],
                                TXN_CATAGORY: TXN_CATAGORY,
							    TXNID: row['TXNID'],
								ACCTYPES: accType
                            });					
							
		//}
    }
	
	for (var i=0; i<results.rows.length; i++) {		
		var row = results.rows.item(i);
		strid = "#"+row['TXNID'];
		$(strid).val(row['TXN_CATAGORY']);		
	}
    if(m < 10){
      localStorage.setItem("viewchartflg","");
    }
    showchartflg= localStorage.getItem("viewchartflg");
    console.log("length of M showchartflg "+showchartflg);
	if(m >= 10 &&  showchartflg!="showchart"){
		$("#Uppertabs").hide();
		$('.assetChart.chartDesc').hide();
		$('#category_btn').show();
		$('#category_txt').hide()
		$('#continueText').html("Press Continue to view your Income and Expense break up chart.");
		//console.log("show1");
		//$('.assetChart').show();
	}
	if(m >= 10 && showchartflg=="showchart"){
		chartcreate();
		//busyInd.hide();
		//console.log("show2");
		$("#Uppertabs").show();
		$('.appearError').hide();
		$('.assetChart').show();
		setTimeout(function () {
			var ctx = document.getElementById("chart-area").getContext("2d");
			window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive: true,segmentShowStroke:false,showTooltips: false});
		}, 2000);

	}
	if(m < 10 &&showchartflg!="showchart"){
		$('.appearError').show();
		//busyInd.hide();
		$('.assetChart.chartDesc').hide();
		$("#Uppertabs").hide();
		//console.log("show3");
		var temp = 10 - m;
		$('#category_txt').html(temp+" Remaining");
	}
	setTimeout(function (){
					size_li = $("#myList li").size();
					x=4;
					$('#loadMore').show();
					$('#myList li:lt('+x+')').show();
					$('#loadMore').click(function () {
						try{
							if(busyAuthChk == 0){
								busyAuthChk = 1;
							busyAuth2 = new WL.BusyIndicator('content', {
								text: 'Loading more transactions..',
								duration: 60.00
							}).show();
							}
							//setTimeout(function (){
								//busyAuth2 = new WL.BusyIndicator('content', {
								//	text: 'Loading more transactions..',
								//	duration: 60.00
								//}).hide();
							//	busyInd = new WL.BusyIndicator('content', {text : 'Loading...',duration:60.00});
							//}, 1000);
							setTimeout(function (){
								busyAuth2 = new WL.BusyIndicator('content', {
									text: 'Loading more transactions..',
									duration: 60.00
								}).hide();
								busyAuthChk = 0;
								busyInd = new WL.BusyIndicator('content', {text : 'Loading...',duration:60.00});
							}, 2000);
							///alert(accountListMpassbook().length);
							x= (x+5 <= size_li) ? x+5 : size_li;
							$('#myList li:lt('+x+')').show();
							if(x == size_li){
								$('#loadMore').hide();
							}
						}catch(e){
							busyAuth2 = new WL.BusyIndicator('content', {
								text: 'Loading more transactions..',
								duration: 60.00
							}).hide();
						}
						
					});	
	}, 2000);
	busyInd.hide();
	
}
function UpdateNarration(currentid,remarkval,acntno){
		NewNarration = remarkval;
		busyInd.show();
		
		if(NewNarration!='' && NewNarration!=null){
				DEMODB.transaction(
				function (transaction) {
				//console.log('Existing narration  '+exitingNarration);
				//exitingNarration1 = exitingNarration.split('@@@');
				
				//NewNarration = exitingNarration1[0]+"@@@"+NewNarration;
				//	console.log("UPDATE DIGI_STATEMENT SET TXN_NARRATION='"+NewNarration+"' WHERE TXNID ='"+narrationUpdate+"'");
				//console.log("UPDATE DIGI_STATEMENT SET TXN_ADDREMARKS = '"+NewNarration+"' WHERE  TXNID = "+narrationUpdate);
					//transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_NARRATION='"+NewNarration+"' WHERE TXNID ='"+narrationUpdate+"'");
					transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_ADDREMARKS = '"+NewNarration+"' WHERE  TXNID = '"+currentid+"' ");
				//console.log(NewNarration+"     ---------      "+ narrationUpdate)
					//transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_NARRATION=? WHERE TXNID = ?", [NewNarration, narrationUpdate]);
					//transaction.executeSql("COMMIT;");
				}
			);
			//$('.popup_back').fadeOut(300);
			//window.location="#interactiveStmt";
		}else {
				customAlert("Filed can't be blank..");
				busyInd.hide();
		}
		
				
		busyInd.hide();
}
function dataCategoryHandler(transaction, results){
	//console.log('In database result ....'+results.rows.length);

	CategoryList.removeAll();
    for (var i=0; i<results.rows.length; i++) {
    	var row = results.rows.item(i);
        var newFeature = new Object();
		var TXN_Category_name = row['TXN_Category_name'];
		var TXN_Category_short = row['TXN_Category_short'];
		CategoryList.push({
                                TXN_Category_name: TXN_Category_name,
                                TXN_Category_short: TXN_Category_short,
								
                            });
    }
 
}
function dataCategoryHandler1(transaction, results){
	//console.log('In database result ....'+results.rows.length);

	CategoryList_expense.removeAll();
    for (var i=0; i<results.rows.length; i++) {
    	var row = results.rows.item(i);
        var newFeature = new Object();
		var TXN_Category_name = row['TXN_Category_name'];
		var TXN_Category_short = row['TXN_Category_short'];
		CategoryList_expense.push({
                                TXN_Category_name: TXN_Category_name,
                                TXN_Category_short: TXN_Category_short,
								
                            });
    }
 
}
function deletecategories(id,temp1){
	if(temp1 == "Income"){
		DEMODB.transaction(
		function (transaction){
			//transaction.executeSql("DELETE FROM HDFC_categories WHERE TXN_Category_name == "+id, [],
				   // sucess, errorHandler);
			transaction.executeSql("DELETE FROM HDFC_categories_income WHERE TXN_Category_name = '"+id+"' ");
			
			transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_CATAGORY = '' WHERE TXN_CATAGORY = '"+id+"' ");
						
		}
		);
	}
	if(temp1 == "Expense"){
		DEMODB.transaction(
		function (transaction){
			//transaction.executeSql("DELETE FROM HDFC_categories WHERE TXN_Category_name == "+id, [],
				   // sucess, errorHandler);
			transaction.executeSql("DELETE FROM HDFC_categories_expense WHERE TXN_Category_name = '"+id+"' ");
			
			transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_CATAGORY = '' WHERE TXN_CATAGORY = '"+id+"' ");
						
		}
		);
	}
	selectcategories();
}
function dataSelectHandler(transaction, results){
 
	// Handle the results
	//console.log('In dataSelectHandler result ....'+results.rows.length);
    for (var i=0; i<results.rows.length; i++) {
 
    	var row = results.rows.item(i);
        var newFeature = new Object();
 
    	//newFeature.TXN_NARRATION   = row['TXN_NARRATION'];
      //  newFeature.TXN_CHEQUE_REFNO = row['TXN_CHEQUE_REFNO'];
       // newFeature.TXN_WITHDRAWAL    = row['TXN_WITHDRAWAL'];
        //newFeature.TXN_DEPOSIT  = row['TXN_DEPOSIT'];
		//console.log('In database result ....'+row['count']);
    }
 
}
function updateSetting(){
	DEMODB.transaction(
	    function (transaction) {
	    	
	    	transaction.executeSql("UPDATE DIGI_STATEMENT SET TXN_NARRATION=?, TXN_CHEQUE_REFNO=? WHERE TXNID = 1", ['Heloo boss', '32131321']);
	    }
	);
		selectAll();
}
function dropTables(){
	DEMODB.transaction(
	    function (transaction) {
	    	transaction.executeSql("DROP TABLE DIGI_STATEMENT;", [], nullDataHandler, errorHandler);
	    }
	);
	location.reload();
}
function prePopulate(result,accontnumber){
	result = invocationResult;
	//alert(result);
	var CLOSINBAL = invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].closingBalance;
	var accontnumb = booksStore(accontnumber);
	console.log('populating Data in database started......');
	//console.log("response database  "+JSON.stringify(invocationResult));
	acctransaction = invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionDetails;
	if(Object.prototype.toString.call( acctransaction ) === '[object Array]' ) {
		acctransaction = acctransaction.reverse();
		//console.log('populating Data in database started......'+acctransaction.length);
	}
	var currenttranbal = '';
	var trasnTypess = '';
	DEMODB.transaction(
	    function (transaction) {
			$(acctransaction).each(function (index, obj) {
			var date = obj.dateOfTransaction;	
			var TransDateTemp = date.substring(0,8); //HH:MM:SS
			var TransTimeTemp = date.substring(8,14);
			var TransTimeTemp1 = date.substring(8,14)+""+index;
			var TransDate = date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8)+" "+TransTimeTemp.substring(0,2)+":"+TransTimeTemp.substring(2,4)+":"+TransTimeTemp.substring(4,6);
			if(TransTimeTemp.substring(0,2) >= 12){
				if(TransTimeTemp.substring(0,2) == 12){
					var TransTime = TransTimeTemp.substring(0,2)+":"+TransTimeTemp.substring(2,4)+" PM";
				}
				else{
					if(TransTimeTemp.substring(0,2) == 24){
						var TransTime = "12:"+TransTimeTemp.substring(2,4)+" AM";
					}
					else{
						var temptimes = parseFloat(TransTimeTemp.substring(0,2)) - parseFloat(12);
						if(temptimes < 10){temptimes = "0"+temptimes}
						var TransTime = temptimes+":"+TransTimeTemp.substring(2,4)+" PM";
					}
				}
			}
			else{
				var TransTime = TransTimeTemp.substring(0,2)+":"+TransTimeTemp.substring(2,4)+" AM";
			}
			
			var uniqueKey = obj.narration+""+obj.amount+""+TransTimeTemp;
			var trasnType; var TXN_DEPOSIT; var TXN_WITHDRAWAL;
			if(index == 0){
				if(obj.debitCreditCode == '67'){
					trasnType = "Cr";
					trasnTypess = "Cr";
					TXN_DEPOSIT = obj.amount;
					var txn_amount = obj.amount;
				}
				if(obj.debitCreditCode == '68'){
					trasnType = "Dr";
					trasnTypess = "Dr";
					TXN_WITHDRAWAL = obj.amount;
					var txn_amount = obj.amount;
				}
				currenttranbal = obj.amount;
				var closebalance = CLOSINBAL;
			}
			else{
				if(trasnTypess == "Cr"){
					CLOSINBAL = parseFloat(CLOSINBAL) - parseFloat(currenttranbal);
					var closebalance = CLOSINBAL;
				}
				else{
					CLOSINBAL = parseFloat(CLOSINBAL) + parseFloat(currenttranbal);
					var closebalance = CLOSINBAL;
				}

				if(obj.debitCreditCode == '67'){
					trasnType = "Cr";
					trasnTypess = "Cr";
					TXN_DEPOSIT = obj.amount;
					//CLOSINBAL = parseFloat(CLOSINBAL) - parseFloat(currenttranbal);
					//var closebalance = CLOSINBAL;
					var txn_amount = obj.amount;
					currenttranbal = obj.amount;
				}
				if(obj.debitCreditCode == '68'){
					//alert(obj.debitCreditCode);
					trasnType = "Dr";
					trasnTypess = "Dr";
					TXN_WITHDRAWAL = obj.amount;
					//TXN_DEPOSIT = obj.amount;
					var txn_amount = obj.amount;
					currenttranbal = obj.amount;
				}
			}
			var closebalance = formatAmt(parseFloat(closebalance));
			if(trasnType == "Cr"){
				transaction.executeSql("INSERT INTO 'DIGI_STATEMENT' VALUES('"+TransDate+"','"+obj.narration+"','"+obj.chequeReferenceNumber+"','"+TransTime+"',NULL,'"+TXN_DEPOSIT+"','"+closebalance+"','','"+uniqueKey+"','"+TransTimeTemp1+"','','"+accontnumb+"','"+trasnType+"','"+txn_amount+"');", [],sucessentry, errorentry);
			}
			else{
				transaction.executeSql("INSERT INTO 'DIGI_STATEMENT' VALUES('"+TransDate+"','"+obj.narration+"','"+obj.chequeReferenceNumber+"','"+TransTime+"','"+TXN_WITHDRAWAL+"',NULL,'"+closebalance+"','','"+uniqueKey+"','"+TransTimeTemp1+"','','"+accontnumb+"','"+trasnType+"','"+txn_amount+"');", [],sucessentry, errorentry);
			}
				//transaction.executeSql("INSERT INTO 'DIGI_STATEMENT' VALUES('2015-07-16','IB FUNDS TRANSFER DR-01592020002734','000000000000000','16/07/15','140000',NULL,'25368.69','',115,'','50100000000719','DR')");
			});	
			if(window.location.hash == "#mPB_passbook"){
				SelectPassBookData(accontnumb);
			}
			if(window.location.hash == '#interactive'){
				SelectPassBookDataInteractive(accontnumb,typetras);
			}
			
	    }
	);
	// if(mode == "interactive"){
		//SelectPassBookDataInteractive(accontnumber,"Dr");
	// }
	// else{
			// SelectPassBookData(accontnumber);
	// }
}

function prePopulateRD(result,accontnumber){
	result = invocationResult;
	//alert(result);
	var accontnumb = booksStore(accontnumber);
	//console.log('populating Data in database started......');
	//console.log("response database  "+JSON.stringify(invocationResult));
	acctransaction = invocationResult.Envelope.Body.inquireRDStatementResponse['return'].installmentDetails;
	if(Object.prototype.toString.call( acctransaction ) === '[object Array]' ) {
		acctransaction = acctransaction.reverse();
		//console.log('populating Data in database started......'+acctransaction.length);
	}
	
	DEMODB.transaction(
	    function (transaction) {
			$(acctransaction).each(function (index, obj) {
				var date = dateformattingRD(obj.installmentDate);	//26-NOV-2015
				var TransDate = dateformat;
				var unique = dateformat.split("-")[2]+""+dateformat.split("-")[1]+""+dateformat.split("-")[0];
				//var TransTime = date.substring(0,2)+":"+date.substring(2,4)+" PM";
				var trasnType = obj.debitCreditCode;
				var txn_amount = obj.installmentAmount;
				//console.log("INSERT INTO 'RD_STATEMENT' VALUES('"+TransDate+"','"+obj.narration+"','"+trasnType+"','"+unique+"','"+accontnumb+"','"+txn_amount+"' ");
				unique = unique+''+accontnumb+''+TransDate+''+obj.narration+''+trasnType;
				transaction.executeSql("INSERT INTO 'RD_STATEMENT' VALUES('"+TransDate+"','"+obj.narration+"','"+trasnType+"','"+unique+"','"+accontnumb+"','"+txn_amount+"');", [],sucessentry, errorentry);
				
				// transaction.executeSql('CREATE TABLE "RD_STATEMENT" ("TXN_DATE", "TXN_NARRATION", "TXN_Type" DATE DEFAULT (null),"TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE, "TXN_ACNTNO","TXN_AMOUNT" NUMERIC);', [], nullDataHandler1, errorHandler);
				
				// transaction.executeSql('CREATE TABLE "DIGI_STATEMENT" ("TXN_DATE", "TXN_NARRATION" , "TXN_CHEQUE_REFNO" , "TXN_VALUE_DATE" DATE DEFAULT (null), "TXN_WITHDRAWAL" NUMERIC, "TXN_DEPOSIT" NUMERIC, "TXN_CLOSING_BAL" NUMERIC, "TXN_CATAGORY" , "TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE, "TXN_ADDREMARKS", "TXN_ACNTNO","TXN_TYPE","TXN_AMOUNT" NUMERIC);', [], nullDataHandler1, errorHandler);

			});
			SelectRDData(accontnumb);			
			// if(window.location.hash == "#mPB_passbook"){
				// SelectPassBookData(accontnumb);
			// }
			// if(window.location.hash == '#interactive'){
				// SelectPassBookDataInteractive(accontnumb,typetras);
			// }
			// else{
				// SelectPassBookData(accontnumb);
			// }
	    }
	);
}


function sucessentry(){
	//console.log('sucessentry');
	}
function errorentry(){
	//console.log('errorentry');
	}


function dateformatting(month){
	if(month != '' || month != undefined){
		month = month.split(" ")[0];
		day = month.split('-')[2];
		monthnameval = month.split('-')[1];
		year = month.split('-')[0];
		//year = year.slice(-2);
				if(monthnameval == '01') monthnameval = 'Jan';
				if(monthnameval == '02') monthnameval = 'Feb';
				if(monthnameval == '03') monthnameval = 'Mar';
				if(monthnameval == '04') monthnameval = 'Apr';
				if(monthnameval == '05') monthnameval = 'May';
				if(monthnameval == '06') monthnameval = 'Jun';
				if(monthnameval == '07') monthnameval = 'Jul';
				if(monthnameval == '08') monthnameval = 'Aug';
				if(monthnameval == '09') monthnameval = 'Sep';
				if(monthnameval == '10') monthnameval = 'Oct';
				if(monthnameval == '11') monthnameval = 'Nov';
				if(monthnameval == '12') monthnameval = 'Dec';
		dateformat = day+" "+monthnameval+" "+year;
	}
}

function dateformattingRD(month){ //26-NOV-2015
	if(month != '' || month != undefined){
		//month = month.split(" ")[0];
		var day = month.split('-')[0];
		var monthnameval = month.split('-')[1];
		var year = month.split('-')[2];
		//year = year.slice(-2);
				if(monthnameval == 'JAN') monthnameval = '01';
				if(monthnameval == 'FEB') monthnameval = '02';
				if(monthnameval == 'MAR') monthnameval = '03';
				if(monthnameval == 'APR') monthnameval = '04';
				if(monthnameval == 'MAY') monthnameval = '05';
				if(monthnameval == 'JUN') monthnameval = '06';
				if(monthnameval == 'JUL') monthnameval = '07';
				if(monthnameval == 'AUG') monthnameval = '08';
				if(monthnameval == 'SEP') monthnameval = '09';
				if(monthnameval == 'OCT') monthnameval = '10';
				if(monthnameval == 'NOV') monthnameval = '11';
				if(monthnameval == 'DEC') monthnameval = '12';
		dateformat = year+"-"+monthnameval+"-"+day;
	}
} 		
 		
