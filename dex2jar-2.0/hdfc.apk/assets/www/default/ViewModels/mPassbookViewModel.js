/* JavaScript content from ViewModels/mPassbookViewModel.js in folder common */
var mPassbookViewModel = function () {
	var custidsb = localStorage.getItem("CstmID");
        var self = this;
		self.selAccount = ko.observable();
		self.curraccbalval = ko.observable();
		 self.fixedDepositList = ko.observableArray([]);
		  self.RDSummaryList = ko.observableArray([]);
		self.homepage = function(){
			$("#contentData").load("Views/mPassbook/mPassbook.html", null, function (response, status, xhr) {
				if (status != "error") {}				
                  
				ko.applyBindings(self, $(".content").get(0));                   
			});
		};
		
		self.PassbookRefreshCall = function(acntno){
	//	alert(acntno);
		 localStorage.setItem("refselectedacc",acntno);
		      selectedaccountRef="selectedaccountRef";
		       if(acntno==''){
				   acntno=passacntno;
				 //  refaccount=passacntno;
				 //alert("2"+acntno);
			  }
		//	 console.log(acntno);
			  
			if(window.navigator.onLine){
				hash = makeid();
				var acntNo = passbookID;
				var invocationData = {
						adapter : "mPassbookLinkedAccountDetailsInquiry",
						procedure : "LinkedAccountDetailsInquiryWrapperService_processRequest",
						parameters : ['','',booksStore(acntNo)],
						compressResponse : true
				};
				
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : sucessresponse = function(result){
						invocationResult = result.invocationResult;
						if(invocationResult.isSuccessful){
							accountListPSBK.removeAll();
							if(invocationResult.Envelope.Body.processRequestResponse['return'].transactionStatus.replyCode == "0"){
								tempcurrency = [];
								tempcurr = '';
								if(invocationResult.Envelope.Body.processRequestResponse['return'].linkedAccountDetails){ //accountStatus
									var acntobj = invocationResult.Envelope.Body.processRequestResponse['return'].linkedAccountDetails;
									$(acntobj).each(function(index, obj){
										if(obj.accountStatus == '8'){
                                                      /*if(index == 0){
												tempcurr = obj.currencyValue;
												tempcurrency.push(tempcurr);
											}
                                                       else{*/
												if(obj.currencyValue != tempcurr){
                                                      tempcurr = obj.currencyValue;
													tempcurrency.push(obj.currencyValue);
												}
                                                      //}
										}
									});
									localStorage.setItem("tempcurrency",tempcurrency.length);
									$(acntobj).each(function(index, obj){
										if(obj.accountStatus == '8'){
												if(obj.currentAccountBalance){
													var bala = obj.currencyValue+" "+formatAmt(parseFloat(obj.currentAccountBalance));
													var balance = obj.currentAccountBalance;
												}
												else{
													var bala = obj.currencyValue+" 0";
													var balance = "0";
												}
												accountListPSBK.push({codacctno:obj.accountNumber, acctType: "Savings", acctbalance: bala, displaytxt:obj.accountNumber,accountValue: obj.accountNumber,bal:balance, currency:obj.currencyValue});
										}
									});
									//selaccno = $('#fldAcctNo').val(acntno);
									
									selaccno = acntno;
								
									console.log(selaccno);
									
									accdata = accountListPSBK();
									
									$(accdata).each(function(index, accnodet) {
									   console.log(accnodet.codacctno +"-----" +selaccno);
										if(accnodet.codacctno == selaccno){
											selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.codacctno, acctbalance: accnodet.acctbalance, acctType: accnodet.acctType});
											var currAccData = selectedAccount();
											fldAcctNo = currAccData.accno;            
											curraccbalval = currAccData.acctbalance;
											acctType = currAccData.acctType;
											fldAcctNo_txt = currAccData.displaytxt;
											$("#acctType").html(acctType);
											self.curraccbalval(curraccbalval);
											$('.rs').html(curraccbalval);
										}
									});
									var temp = JSON.stringify(accountListPSBK());
									localStorage.setItem("accountListPSBK",booksStore(temp));
								}
							}
						}
					},
					onFailure : AdapterFail1 = function(){console.log("");},	    		
					timeout: timeout
				});
				$('#filterserach').hide();
				var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth()+1;
								var yyyy = today.getFullYear();
								if(dd<10) {
									dd='0'+dd
								} 
								if(mm<10) {
									mm='0'+mm
								} 
								var ToDay = yyyy+''+mm+''+dd;
								//todatepbkquery = yyyy+'-'+mm+'-'+dd;
								var temp = ToDay.substr(4,2) - parseFloat(1);
								if(temp < 10){ temp = "0"+temp;}
								var fromdates = ToDay.substr(0,4)+''+temp+''+ToDay.substr(6,2);
								var fromdates = "";
								fromdates = ToDay.substr(0,4)+''+temp+''+ToDay.substr(6,2);
								try{
									if(localStorage.getItem(acntno)){
									var fromdates1 = (localStorage.getItem(acntno)).split(" ")[0]; //20/11/2015
									var tempday = fromdates1.split('/')[0];
									var tempmonths = fromdates1.split('/')[1];
									if(tempday == '01' && tempmonths != "01"){
										tempday = 29;
										var tempyear = fromdates1.split('/')[2];
										//var tempmon = fromdates1.split('/')[1];
										var tempmon = parseFloat(fromdates1.split('/')[1]) - parseFloat(1);
										if(tempmon<10) {
											var tempmon='0'+tempmon;
										} 
									}
									else if(tempday == '02' && tempmonths != "01"){
										tempday = 29;
										var tempyear = fromdates1.split('/')[2];
										var tempmon = parseFloat(fromdates1.split('/')[1]) - parseFloat(1);
										if(tempmon<10) {
											var tempmon='0'+tempmon;
										} 
									}
									else if(tempday == '01' || tempday == '02' && tempmonths == "01"){
										tempday = 29;
										var tempyear = parseFloat(fromdates1.split('/')[2]) - parseFloat(1);
										var tempmon = "12";
									}
									else{
										var tempday = parseFloat(fromdates1.split('/')[0]) - parseFloat(3);
										if(tempday < 10){
											tempday = "0"+tempday;
										}
										var tempyear = fromdates1.split('/')[2];
										var tempmon = fromdates1.split('/')[1];
									}
									fromdates = tempyear+''+tempmon+''+tempday;
								}
									
								}catch(e){console.log(e)}
								
									if(mode != "interactive"){
										hash = makeid();
										//alert(fromdates+"  "+ToDay);
										busyInd.show()
										WL.Client.addGlobalHeader('Accepts', '1');
											var invocationData = {
												adapter : "mPassbookAccountStatementInquiry",
												procedure : "AccountStatementInquiryWrapperService_inquireAccountStatement",
												parameters : ['','',booksStore(acntno),fromdates,ToDay,localStorage.getItem("CstmID"),'TD'],
												compressResponse : true
											};
											WL.Client.invokeProcedure(invocationData, {
												onSuccess : statementSuccess1,
												onFailure : AdapterFail,	    		
												timeout: timeout
											});
									}
							}
							else{ 
								//accountListMpassbook.removeAll();
								navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK"); 
							}								
			
		};
		
		self.mPassbookacntstatement = function(acntnos){
		     	// console.log("mPassbookacntstatement"+acntnos);
				//debugger;
			if(selectedaccountRef=="selectedaccountRef"){
			   acntno=localStorage.getItem("refselectedacc");
			   console.log("new "+acntno);
			    selectedaccountRef="";
			}
			
			else if(!acntnos){
			  var acntno = accountListPSBK()[0].codacctno;
			  console.log("if"+acntno);
			}
			else{
			var acntno = acntnos;
			  console.log("else"+acntno);
			}
			curentacntNOpsbk = acntno;
			//alert("acntno "+acntno);
			var dateback = new Date();
			dateback.setMonth(dateback.getMonth() - 6);
			//var ddd = dateback.getDate()+parseFloat(5);
			var ddd = dateback.getDate();
			var mmm = dateback.getMonth()+1; //January is 0!
			var yyyyy = dateback.getFullYear();
			if(ddd<10) {
				ddd='0'+ddd;
			} 
			if(mmm<10) {
				mmm='0'+mmm;
			} 
			var FromDate = yyyyy+''+mmm+''+ddd;
			frmdatepbk = yyyyy+"-"+mmm+"-"+ddd;//date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
			frmdatepbkquery = yyyyy+"-"+mmm+"-"+ddd;
			var today = new Date();
			today.setMonth(today.getMonth() - 1);
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			var ToDate = yyyy+''+mm+''+dd;
			todatepbk = yyyy+"-"+mm+"-"+dd;
	    	busyInd.show();
			var shortName = 'DIGI_STATEMENT';
	        var version = '1.0';
	        var displayName = 'DIGI_STATEMENT';
	        var maxSize = 100000; //  bytes
	        var DEMODB = openDatabase(shortName, version, displayName, maxSize);
			//alert(frmdatepbk+"  "+todatepbk);
			todatepbkquerySTD = localStorage.getItem("FinTime").split(' ');
			todatepbkquery = todatepbkquerySTD[0].split('/');
			todatepbk = todatepbkquery = todatepbkquery[2]+'-'+todatepbkquery[1]+'-'+todatepbkquery[0];
			var acnt = booksStore(acntno); 
			var query = "SELECT * FROM DIGI_STATEMENT WHERE TXN_ACNTNO = '"+acnt+"' AND TXN_DATE>= '"+frmdatepbk+"' AND  TXN_DATE<= '"+todatepbk+"' ORDER BY TXN_DATE  DESC;";
			
				DEMODB.transaction(function(transaction){
					   transaction.executeSql(query, [], function(tx, results){
						console.log('updated query for specific search length 0');
						//alert(results.rows.length);
						if(results.rows.length == 0){
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth()+1;
								var yyyy = today.getFullYear();
								if(dd<10) {
									dd='0'+dd
								} 
								if(mm<10) {
									mm='0'+mm
								} 
								var ToDate = yyyy+''+mm+''+dd;
								//todatepbkquery = yyyy+'-'+mm+'-'+dd;
								//hitToDate = FromDate;
								var dateback = new Date();
								dateback.setMonth(dateback.getMonth() - 1);
								var ddd = dateback.getDate();
								var mmm = dateback.getMonth()+1; //January is 0!
								var yyyyy = dateback.getFullYear();
								if(ddd<10) {
									ddd='0'+ddd
								} 
								if(mmm<10) {
									mmm='0'+mmm
								} 
								var dateback = yyyyy+''+mmm+''+ddd;
								todatepbk = dateback;
								
								//hitFromDate = todatepbk.substr(0,4)+''+temp+''+todatepbk.substr(6,2);
							//alert("first "+todatepbk+"   "+ToDate);
							if(window.navigator.onLine){
								hash = makeid();
								WL.Client.addGlobalHeader('Accepts', '1');
						   	    var invocationData = {
										adapter : "mPassbookAccountStatementInquiry",
										procedure : "AccountStatementInquiryWrapperService_inquireAccountStatement",
										parameters : ['','',booksStore(acntno),todatepbk,ToDate,localStorage.getItem("CstmID"),'TD','1'],
										compressResponse : true
								};
								WL.Client.invokeProcedure(invocationData, {
									onSuccess : statementSuccess4 = function(result){
										invocationResult = result.invocationResult;
										todatepbkquerySTDA3 = invocationResult.STDA3
										todatepbkquerySTD = todatepbkquerySTDA3.split(' ');
										todatepbkquery = todatepbkquerySTD[0].split('/');
										todatepbkquery = todatepbkquery[2]+'-'+todatepbkquery[1]+'-'+todatepbkquery[0];
											//statementSuccess(invocationResult);
										//invocationResult = result;
										ch = hash;
											Servlet = invocationResult.Servlet;
											if(ch!= Servlet){
												busyInd.hide();
												alert(invocationResult.SessionExpire.SessionExpireMsg);
												window.location.hash = '#mPassbook01';
												return false;
											}
										//console.log("response  "+JSON.stringify(invocationResult));
										if(invocationResult.isSuccessful){
											if(invocationResult.SessionExpire){
												busyInd.hide();
												alert(invocationResult.SessionExpire.SessionExpireMsg);
												window.location.hash = '#mPassbook01';
												return false;
											}
											if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionDetails){
												if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].numberOfTransactions != '0'){
													statementSuccess(invocationResult);
												}
											}
											else{
												if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].numberOfTransactions == '0'){
													statementSuccess(invocationResult);
												}
												else{
													if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionStatus.replyText){
														alert(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionStatus.replyText)
														accountListMpassbook.removeAll();
														busyInd.hide();
														return false;
													}
													else{
														alert("We are unable to carry out your instruction, currently. Please try later");
														accountListMpassbook.removeAll();
														busyInd.hide();
														return false;
													}
												}
											}
										}		
											hash = makeid();
											WL.Client.addGlobalHeader('Accepts', '1');
											var dateback = new Date();
											dateback.setMonth(dateback.getMonth() - 2);
											var ddd = dateback.getDate();
											var mmm = dateback.getMonth()+1; //January is 0!
											var yyyyy = dateback.getFullYear();
											if(ddd<10) {
												ddd='0'+ddd
											} 
											if(mmm<10) {
												mmm='0'+mmm
											} 
											hitFromDate = yyyyy+''+mmm+''+ddd;
											//alert("second "+hitFromDate+"   "+todatepbk);
													var invocationData = {
														adapter : "mPassbookAccountStatementInquiry",
														procedure : "AccountStatementInquiryWrapperService_inquireAccountStatement",
														parameters : ['','',booksStore(acntno),hitFromDate,todatepbk,localStorage.getItem("CstmID"),'TD','2'],
														compressResponse : true
													};
													WL.Client.invokeProcedure(invocationData, {
														onSuccess : statementSuccess4 = function(result){
																invocationResult = result.invocationResult;
																statementSuccess(invocationResult);
																hitToDate = hitFromDate;
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
																hitFromDate = yyyyy+''+mmm+''+ddd;
																//alert("third "+hitFromDate+"   "+hitToDate);
																hash = makeid();
																WL.Client.addGlobalHeader('Accepts', '1');
																		var invocationData = {
																			adapter : "mPassbookAccountStatementInquiry",
																			procedure : "AccountStatementInquiryWrapperService_inquireAccountStatement",
																			parameters : ['','',booksStore(acntno),hitFromDate,hitToDate,localStorage.getItem("CstmID"),'TD','3'],
																			compressResponse : true
																		};
																		WL.Client.invokeProcedure(invocationData, {
																			onSuccess : statementSuccess4 = function(result){
																					invocationResult = result.invocationResult;
																					statementSuccess(invocationResult);
																					hitToDate = hitFromDate;
																					var dateback = new Date();
																					dateback.setMonth(dateback.getMonth() - 4);
																					var ddd = dateback.getDate();
																					var mmm = dateback.getMonth()+1; //January is 0!
																					var yyyyy = dateback.getFullYear();
																					if(ddd<10) {
																						ddd='0'+ddd
																					} 
																					if(mmm<10) {
																						mmm='0'+mmm
																					} 
																					hitFromDate = yyyyy+''+mmm+''+ddd;
																					hash = makeid();
																					WL.Client.addGlobalHeader('Accepts', '1');
																					//alert(hitFromDate+"   "+hitToDate);
																				var invocationData = {
																					adapter : "mPassbookAccountStatementInquiry",
																					procedure :"AccountStatementInquiryWrapperService_inquireAccountStatement",
																					parameters : ['','',booksStore(acntno),hitFromDate,hitToDate,localStorage.getItem("CstmID"),'TD','4'],
																					compressResponse : true
																				};
																				WL.Client.invokeProcedure(invocationData, {
																					onSuccess : statementSuccess4 = function(result){
																							invocationResult = result.invocationResult;
																							statementSuccess(invocationResult);
																							hitToDate = hitFromDate;
																							var dateback = new Date();
																							dateback.setMonth(dateback.getMonth() - 5);
																							var ddd = dateback.getDate();
																							var mmm = dateback.getMonth()+1; //January is 0!
																							var yyyyy = dateback.getFullYear();
																							if(ddd<10) {
																								ddd='0'+ddd
																							} 
																							if(mmm<10) {
																								mmm='0'+mmm
																							} 
																							hitFromDate = yyyyy+''+mmm+''+ddd;
																							hash = makeid();
																							WL.Client.addGlobalHeader('Accepts', '1');
																							//alert(hitFromDate+"   "+hitToDate);
																						var invocationData = {
																							adapter : "mPassbookAccountStatementInquiry",
																							procedure :"AccountStatementInquiryWrapperService_inquireAccountStatement",
																							parameters : ['','',booksStore(acntno),hitFromDate,hitToDate,localStorage.getItem("CstmID"),'TD','5'],
																							compressResponse : true
																						};
																						WL.Client.invokeProcedure(invocationData, {
																							onSuccess : statementSuccess4 = function(result){
																									invocationResult = result.invocationResult;
																									statementSuccess(invocationResult);
																									hitToDate = hitFromDate;
																									var dateback = new Date();
																									dateback.setMonth(dateback.getMonth() - 6);
																									var ddd = dateback.getDate();
																									var mmm = dateback.getMonth()+1; //January is 0!
																									var yyyyy = dateback.getFullYear();
																									if(ddd<10) {
																										ddd='0'+ddd
																									} 
																									if(mmm<10) {
																										mmm='0'+mmm
																									} 
																									hitFromDate = yyyyy+''+mmm+''+ddd;
																									WL.Client.addGlobalHeader('Accepts', '1');
																									//alert("End  "+hitFromDate+"   "+hitToDate);
																									hash = makeid();
																								var invocationData = {
																									adapter : "mPassbookAccountStatementInquiry",
																									procedure :"AccountStatementInquiryWrapperService_inquireAccountStatement",
																									parameters : ['','',booksStore(acntno),hitFromDate,hitToDate,localStorage.getItem("CstmID"),'TD','6'],
																									compressResponse : true
																								};
																								WL.Client.invokeProcedure(invocationData, {
																									onSuccess : statementSuccess4 = function(result){
																											invocationResult = result.invocationResult;
																											STDA3 = invocationResult.STDA3;
																											statementSuccess(invocationResult);
																											setTimeout(function(){	var today = new Date();
																												var dd = today.getDate();
																												var mm = today.getMonth()+1; //January is 0!
																												var yyyy = today.getFullYear();
																												
																												if(dd<10) {
																													dd='0'+dd
																												} 

																												if(mm<10) {
																													mm='0'+mm
																												} 
																											var hour    = today.getHours();
																											var minute  = today.getMinutes();
																											var seconds = today.getSeconds();  
																											var todays = dd+'/'+mm+'/'+yyyy;
																											if(hour<10) {
																												hour='0'+hour
																											} 
																											if(minute<10) {
																												minute='0'+minute
																											} 
																											if(seconds<10) {
																												seconds='0'+seconds
																											} 
																											time= hour+":"+minute+":"+seconds;
																											//$('.lastUpdt').html("Last updated at "+todays+" "+time);	},1000);
																											//localStorage.setItem(acntno,todays+" "+time);
																											$('.lastUpdt').html("Last updated at "+STDA3);	},1000);
																											localStorage.setItem(acntno,STDA3);
																											
																									},
																									onFailure : AdapterFail,	    		
																									timeout: timeout
																								});
																							},
																							onFailure : AdapterFail,	    		
																							timeout: timeout
																						});
																						
																					},
																					onFailure : AdapterFail,	    		
																					timeout: timeout
																				});
																			},
																			onFailure : AdapterFail,	    		
																			timeout: timeout
																		});
														},
														onFailure : AdapterFail,	    		
														timeout: timeout
													});
									},
									onFailure : AdapterFail,	    		
									timeout: timeout
								});
							}else{ 
								accountListMpassbook.removeAll();
								navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK");
								return false;								
							}
							
						}   
						else{
								if(window.location.hash == "#mPB_passbook"){
									SelectPassBookData(booksStore(acntno));
								}
								if(window.location.hash == '#interactive'){
									SelectPassBookDataInteractive(booksStore(acntno),typetras);
								}
								else{
									SelectPassBookData(booksStore(acntno));
								}					
							}                               
					   }, errorHandler);              
			  });
		};
		
		statementSuccess1 = function(result){
			invocationResult = result.invocationResult;
			console.log(JSON.stringify(invocationResult));
				ch = hash;
				
				Servlet = invocationResult.Servlet;
				try{
					STDA3 = invocationResult.STDA3;
				todatepbkquerySTD = STDA3.split(' ');
				todatepbkquery = todatepbkquerySTD[0].split('/');
				todatepbkquery = todatepbkquery[2]+'-'+todatepbkquery[1]+'-'+todatepbkquery[0];
					
				}catch(e){console.log(e)}
				if(ch!= Servlet){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
/* 				if(invocationResult.VersionURL){
					verUrl = invocationResult.VersionURL.faml.url;
        				if(invocationResult.VersionURL.faml.mandatory=="Y"){
        					
        					navigator.notification.confirm(
        						""+invocationResult.VersionURL.faml.message,	
              			          checkButtonSelection4,
              			          'HDFC BANK',
              			          'Upgrade Now');
        					
        				}
        				else{
							busyInd.hide();
        				navigator.notification.confirm(
            			          //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
        						""+invocationResult.VersionURL.faml.message,	
        						   checkButtonSelection3,
            			          'HDFC BANK',
            			          'Upgrade Later,Upgrade Now');
        				} 
        		}
 */				//console.log("response  "+JSON.stringify(invocationResult));
			if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					busyInd.hide();
					window.location.hash = '#mPassbook01';
					return false;
				}
				if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionDetails){
					var acntno="";
					if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].numberOfTransactions != '0'){
						acntno = curentacntNOpsbk;
						prePopulate(invocationResult,acntno);
					}
					setTimeout(function(){
									busyInd.hide();
									if(refreshCallOneDay!=1){
										alert("Refresh Successful");
									}
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
								var hour    = today.getHours();
								var minute  = today.getMinutes();
								var seconds = today.getSeconds();  
								var todays = dd+'/'+mm+'/'+yyyy;
								if(hour<10) {
									hour='0'+hour
								} 
								if(minute<10) {
									minute='0'+minute
								} 
								if(seconds<10) {
									seconds='0'+seconds
								} 
								time= hour+":"+minute+":"+seconds;
								//localStorage.setItem(acntno,todays+" "+time);
								//$('.lastUpdt').html("Last updated at "+todays+" "+time);
								$('.lastUpdt').html("Last updated at "+STDA3);	
								localStorage.setItem(acntno,STDA3);
					},3000);
				}
				else{
					busyInd.hide();
					if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].numberOfTransactions == '0'){
						if(refreshCallOneDay!=1){
							alert("Refresh Successful");
						}
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
								var hour    = today.getHours();
								var minute  = today.getMinutes();
								var seconds = today.getSeconds();  
								var todays = dd+'/'+mm+'/'+yyyy;
								if(hour<10) {
									hour='0'+hour
								} 
								if(minute<10) {
									minute='0'+minute
								} 
								if(seconds<10) {
									seconds='0'+seconds
								} 
								time= hour+":"+minute+":"+seconds;
								//localStorage.setItem(acntno,todays+" "+time);
								//$('.lastUpdt').html("Last updated at "+todays+" "+time);
								$('.lastUpdt').html("Last updated at "+STDA3);	
								localStorage.setItem(acntno,STDA3);
					}
					else{
						busyInd.hide();
						alert("We are unable to carry out your instruction, currently. Please try later");
					}
				}
			}	
		}; 
		
		statementSuccess = function(result){
			//busyInd.hide();
			invocationResult = result;
			ch = hash;
				Servlet = invocationResult.Servlet;
				if(ch!= Servlet){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
			//console.log("response  "+JSON.stringify(invocationResult));
			if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
				if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].transactionDetails){
					if(invocationResult.Envelope.Body.inquireAccountStatementResponse['return'].numberOfTransactions != '0'){
						var acntno = curentacntNOpsbk;
						prePopulate(invocationResult,acntno);
					}
					else{
						//accountListMpassbook.removeAll();
						busyInd.hide();
					}
				}
				else{
					if(accountListMpassbook().length == 0){
						accountListMpassbook.removeAll();
					}
					setTimeout(function(){	busyInd.hide();	},1000);
					//busyInd.hide();
				}
			}	
		};
		
		self.linkedacntRefresh = function(){
			fdCallStatus=1;
	    	var acntNo = passbookID;
			if(window.navigator.onLine){
				hash = makeid();
				refreshcall = "True";
				busyInd.show();
				var invocationData = {
						adapter : "mPassbookLinkedAccountDetailsInquiry",
						procedure : "LinkedAccountDetailsInquiryWrapperService_processRequest",
						parameters : ['','',booksStore(acntNo)],
						compressResponse : true
				};
				
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : linkedacntSuccess,
					onFailure : AdapterFail1,	    		
					timeout: timeout
				});
			}
			else{
				navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK"); 
			}
		};
		
		//Linked account Hit
		self.linkedacnt = function(){
			fdCallStatus=0;
			
			 
			//console.log("suhas test "+localStorage.getItem("accountListPSBK"));
			if(localStorage.getItem("accountListPSBK")){
				accountListPSBK.removeAll();
				var testing  = booksStore(localStorage.getItem("accountListPSBK"));
				var temp = JSON.parse(testing);
				$(temp).each(function(index, obj){
					accountListPSBK.push(obj);
				});
				// var finrefreshtime = localStorage.getItem("FinTime").split(" ")[0];
					// var toda = new Date();
					// var dating = toda.getDate();
					// var monthi = toda.getMonth()+1; //January is 0!
					// var yearing = toda.getFullYear();
					
					// if(dating<10) {
						// dating='0'+dating
					// } 

					// if(monthi<10) {
						// monthi='0'+monthi
					// } 
				// datetoday = dating+'/'+monthi+'/'+yearing;
				// var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
				// var firstDate = new Date(finrefreshtime.split('/')[2],finrefreshtime.split('/')[1],finrefreshtime.split('/')[0]);
				// var secondDate = new Date(yearing,monthi,dating);
				// diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
				//accountListPSBK.push(JSON.parse(testing));
			}
	    	var acntNo = passbookID;
			//localStorage.getItem("FinTime")
			if(accountListPSBK().length == 0){
				hash = makeid();
				
				busyInd.show();
				refreshcall = "False";
				var invocationData = {
						adapter : "mPassbookLinkedAccountDetailsInquiry",
						procedure : "LinkedAccountDetailsInquiryWrapperService_processRequest",
						parameters : ['','',booksStore(acntNo)],
						compressResponse : true
				};
				
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : linkedacntSuccess,
					onFailure : AdapterFail1,	    		
					timeout: timeout
				});
			}
			else{
				if(navigator.onLine){
					// debugger;
            
					 start =localStorage.getItem("FinTime");	// day interval
                //alert("local storge "+">>>"+start);
					 start=start.split(" ");
					 oldDate=start[0];
                oldTime=start[1];
                //oldDate=oldDate.split("/");
               // startNewDate=new Date(oldDate.split("/")[2],parseInt(oldDate.split("/")[1])-1,oldDate.split("/")[0],oldTime.split(':')[0],oldTime.split(':')[1],oldTime.split(':')[2]);
                startNewDate=new Date(oldDate.split("/")[2],parseInt(oldDate.split("/")[1])-1,oldDate.split("/")[0]);
               // alert("befor date"+">>>>"+startNewDate);
                end   = new Date();
                //diff  = new Date(end.getTime() - startNewDate.getTime());
               // console.log(diff);
                //var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
                //days  = diff.getDate();
               // days  = diff.getHours()-(new Date(0)).getHours();
               // alert(days+">>"+"hours");
               // console.log(days);
                Month=end.getMonth();
                if(Month > 10){
                    month="0"+Month;
                }
                else{
                     month=Month;
                }
                newupadte=new Date(end.getFullYear(),month,end.getDate());
           
                //alert("newupadte>>>>"+newupadte);
                
                
             
                var d2 = new Date(); //current date
                var d1 = startNewDate;
                var seconds=((d2-d1)/1000).toString();
                console.log("Diff. Seconds 2: "+((d2-d1)/1000).toString());
                var mins=Math.floor(seconds/ (60));
                //alert('diff in min'+">>>>"+mins);
                var hours = Math.floor(seconds/ (60 * 60));
                // alert('diff in hours'+">>>>"+hours);
                console.log(hours);
                
              
                
                if(newupadte > startNewDate){
              //  console.log("greater than refresg 1");
                    self.linkedacntRefresh();
                }
                else{
                   console.log("greater than refresg 2");
				    busyInd.show();
					shhv = 1;
				    setTimeout(function(){ busyInd.hide();shhv = 0;}, 12000);
                    self.financialSummary();
                }
            }
            else{
                console.log("greater than refresg 3");
				busyInd.show();
                self.financialSummary();
            }
        }
    };
    
    linkedacntSuccess = function(result){
        invocationResult = result.invocationResult;
        ch = hash;
        Servlet = invocationResult.Servlet;
        if(ch!= Servlet){
            if(invocationResult.SessionExpire){
                busyInd.hide();
                navigator.notification.alert(invocationResult.SessionExpire.SessionExpireMsg);
            }
            else{
                busyInd.hide();
                navigator.notification.alert("User Session has been invalidated. Please login again.");
            }
            window.location.hash = '#mPassbook01';
            return false;
        }
        accountListPSBK.removeAll();
        if(invocationResult.isSuccessful){
            if(invocationResult.SessionExpire){
                busyInd.hide();
                navigator.notification.alert(invocationResult.SessionExpire.SessionExpireMsg);
                window.location.hash = '#mPassbook01';
                return false;
            }
            if(refreshcall = "True"){
                if(invocationResult.VersionURL){
                    verUrl = invocationResult.VersionURL.faml.url;
                    if(invocationResult.VersionURL.faml.mandatory=="Y"){
                        
                        navigator.notification.confirm(
                                                       ""+invocationResult.VersionURL.faml.message,
                                                       checkButtonSelection4,
                                                       'HDFC BANK',
                                                       'Upgrade Now');
                        
                    }
                    else{
                        busyInd.hide();
                        navigator.notification.confirm(
                                                       //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
                                                       ""+invocationResult.VersionURL.faml.message,
                                                       checkButtonSelection3,
                                                       'HDFC BANK',
                                                       'Upgrade Later,Upgrade Now');
                    }
                }
            }
            if(invocationResult.Envelope.Body.processRequestResponse['return'].transactionStatus.replyCode == "0"){
				try{setTimeout(function(){ busyInd.hide(); }, 5000);}catch(e){}
                tempcurrency = [];
                tempcurr = '';
                if(invocationResult.Envelope.Body.processRequestResponse['return'].linkedAccountDetails){ //accountStatus
                    var acntobj = invocationResult.Envelope.Body.processRequestResponse['return'].linkedAccountDetails;
                    $(acntobj).each(function(index, obj){
                                    if(obj.accountStatus == '8'){
                                    /*if(index == 0){
                                     tempcurr = obj.currencyValue;
                                     tempcurrency.push(tempcurr);
                                     }
                                     else{*/
                                    if(obj.currencyValue != tempcurr){
                                    tempcurr = obj.currencyValue;
                                    tempcurrency.push(obj.currencyValue);
                                    }
                                    //}
                                    }
                                    });
                    localStorage.setItem("tempcurrency",tempcurrency.length);
                    $(acntobj).each(function(index, obj){
                                    if(obj.accountStatus == '8'){
                                    if(obj.currentAccountBalance){
                                    var bala = obj.currencyValue+" "+formatAmt(parseFloat(obj.currentAccountBalance));
                                    var balance = obj.currentAccountBalance;
                                    }
                                    else{
                                    var bala = obj.currencyValue+" 0";
                                    var balance = "0";
                                    }
                                    accountListPSBK.push({codacctno:obj.accountNumber, acctType: "Savings", acctbalance: bala, displaytxt:obj.accountNumber,accountValue: obj.accountNumber,bal:balance, currency:obj.currencyValue});
                                    }
                                    });
                    
                    var temp = JSON.stringify(accountListPSBK());
                    localStorage.setItem("accountListPSBK",booksStore(temp));
                }
                var custfulname = invocationResult.Envelope.Body.processRequestResponse['return'].customerFullName;
                localStorage.setItem("Cstnm",booksStore(custfulname));
                var tempname = booksStore(passbookID);
                localStorage.setItem("CstmID",tempname);
                $('#passbookusername').html(custfulname);
                $('#passbookcustID').html("Cust ID: "+passbookID);
                //alert(accountListFD().length+"--"+refreshcall);
                if(accountListFD().length == 0 && refreshcall == "False"){self.FDenquiry();}
                else if(refreshcall == "True"){self.FDenquiry();}
                else{self.RDenquiry();}
            }
            else{
                busyInd.hide();
                window.location.hash = "#temppage";
                navigator.notification.alert(NoResponseError);
            }
        }
    };
    
    //FD account hit
    self.FDenquiry = function(){
        var acntNo = passbookID;
        var invocationData = {
            adapter : "mPassbookFDSummaryInquiry",
            procedure : "FDSummaryInquiryWrapperService_inquireFDSummary",
            parameters : ['','',booksStore(acntNo)],
            compressResponse : true
        };
        
        WL.Client.invokeProcedure(invocationData, {
                                  onSuccess : FDenquirySuccess,
                                  onFailure : AdapterFail,
                                  timeout: timeout
                                  });
    };
    
    FDenquirySuccess = function(result){
        invocationResult = result.invocationResult;
        accountListFD.removeAll();
        if(invocationResult.isSuccessful){
            if(invocationResult.SessionExpire){
                busyInd.hide();
                navigator.notification.alert(invocationResult.SessionExpire.SessionExpireMsg);
                window.location.hash = '#mPassbook01';
                return false;
            }
            if(invocationResult.Envelope.Body.inquireFDSummaryResponse['return'].fdSummaryInquiryDTOs){
                var acntobj = invocationResult.Envelope.Body.inquireFDSummaryResponse['return'].fdSummaryInquiryDTOs;
                $(acntobj).each(function(index, obj) { //principleAmount currbalance
                                var name = obj.linkedCustomerDTOs;
                                if(Object.prototype.toString.call( name ) === '[object Array]' ) {
                                name = obj.linkedCustomerDTOs[0].customerName;
                                }
                                else{
                                name = obj.linkedCustomerDTOs.customerName;
                                }
                                var bal = formatAmt(parseFloat(obj.maturityAmount));
                                var currbalance = formatAmt(parseFloat(obj.amountLien));
                                var principleAmount = formatAmt(parseFloat(obj.principleAmount));
                                var principleAmounts = obj.currencyValue+" "+formatAmt(parseFloat(obj.principleAmount));
                                accountListFD.push({id:index, codacctno:obj.fdAccountNumber, acctType: "FD Account", acctbalance: bal, displaytxt:obj.fdAccountNumber,accountValue: obj.fdAccountNumber,bal:obj.principleAmount,tdmatamt: bal, tdmatdate: obj.maturityDate,nambranch: obj.branch, currbalance: currbalance, principleAmount:principleAmount, rateint:obj.rateOfInterest, tdacctopendate: obj.depositValueDate, custname:name,Currency:obj.currencyValue,principleAmounts:principleAmounts});
                                });
                var temp = JSON.stringify(accountListFD());
                localStorage.setItem("accountListFD",booksStore(temp));
            }
        }
        if(accountListRD().length == 0 && refreshcall == "False"){self.RDenquiry();}
        else if(refreshcall == "True"){self.RDenquiry();}
        else{self.financialSummary();}
        
    };
    
    //RD account hit
    self.RDenquiry = function(){
        var acntNo = passbookID;
        var invocationData = {
            adapter : "mPassbookRDSummaryInquiry",
            procedure : "RDSummaryInquiryWrapperService_inquireRDSummary",
            parameters : ['','',booksStore(acntNo)],
            compressResponse : true
        };
        
        WL.Client.invokeProcedure(invocationData, {
                                  onSuccess : RDenquirySuccess,
                                  onFailure : AdapterFail,
                                  timeout: timeout
                                  });
    };
    
    RDenquirySuccess = function(result){
        invocationResult = result.invocationResult;
        accountListRD.removeAll();
        if(invocationResult.isSuccessful){
			STDA3 = invocationResult.STDA3
            if(invocationResult.SessionExpire){
                busyInd.hide();
                navigator.notification.alert(invocationResult.SessionExpire.SessionExpireMsg);
                window.location.hash = '#mPassbook01';
                return false;
            }
            if(invocationResult.Envelope.Body.inquireRDSummaryResponse['return'].rdSummaryInquiryDTOs){
                var acntobj = invocationResult.Envelope.Body.inquireRDSummaryResponse['return'].rdSummaryInquiryDTOs;
                $(acntobj).each(function(index, obj){
                                var name = obj.linkedCustomerDTOs.customerName;
                                var bal = formatAmt(parseFloat(obj.maturityAmount));
                                var principleAmount = formatAmt(parseFloat(obj.principleAmount));
                                var RDinstalamnt = formatAmt(parseFloat(obj.installmentAmount));
                                var RddepositBal = formatAmt(parseFloat(obj.currentRDBalance));
                                var RddepositBals = obj.currencyValue+" "+formatAmt(parseFloat(obj.currentRDBalance));
                                accountListRD.push({id:index,codacctno:obj.rdAccountNumber, acctType: "RD Account", acctbalance: bal, displaytxt:obj.rdAccountNumber,accountValue: obj.rdAccountNumber,bal:obj.maturityAmount,rateint:obj.rateOfInterest,RDTenure:obj.noOfInstallments,MaturityDate:obj.maturityDate,rdacctopendate:obj.depositValueDate,maturityAmnt:bal,RddepositBal:RddepositBal,RDinstalamnt:RDinstalamnt,nambranch: obj.branch,Currency:obj.currencyValue,RddepositBals:RddepositBals,RdAmounts:obj.currentRDBalance});
                                });
                var temp = JSON.stringify(accountListRD());
                localStorage.setItem("accountListRD",booksStore(temp));
            }
            // if(invocationResult.Envelope.Body.inquireRDSummaryResponse.return.transactionStatus.errorCode == '5904'){
            // alert("No RD available");
            // }
        }
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
								var hour    = today.getHours();
								var minute  = today.getMinutes();
								var seconds = today.getSeconds();  
								todays = dd+'/'+mm+'/'+yyyy;
								if(hour<10) {
									hour='0'+hour
								} 
								if(minute<10) {
									minute='0'+minute
								} 
								if(seconds<10) {
									seconds='0'+seconds
								} 
								time= hour+":"+minute+":"+seconds;
			localStorage.setItem("FinTime",STDA3);
			self.financialSummary();

		};
		
		Success = function(){
			busyInd.hide();
			invocationResult = result.invocationResult;
		}; 
		
		self.mPB_register = function(){
			
			$("#contentData").load("Views/mPassbook/mPB_register.html", null, function (response, status, xhr) {
				if (status != "error") {}				
				ko.applyBindings(self, $(".content").get(0));                   
			});
		}; 		


		
	self.registration_Submit = function(){
		if($("#registration").valid()){
			var regcustid = $("#customerid1").val();
			tempcustidsms = $("#customerid1").val();
			var mobile = $('#Mobile').val();
			localStorage.setItem("Curcustmob",booksStore(mobile));
			passbookID = regcustid;
			tesmppbkID = booksStore(passbookID);
			if(localStorage.getItem("csd")){
				var temp = booksStore(localStorage.getItem("csd"));
				//alert(temp+"  "+passbookID);
				if(passbookID != temp){
					navigator.notification.confirm("You are attempting to register on mPassbook with new Customer ID. This will delete all existing records in mPassbook app. Do you wish to continue?", onConfirm3 = function(iValue){ 
							if (iValue == 2){
								busyInd.show();
								localStorage.setItem("Demo","");
								DEMODB.transaction(
									function (transaction){
										transaction.executeSql("DROP TABLE HDFC_categories_income;", [], nullDataHandler, errorHandler);
										transaction.executeSql("DROP TABLE HDFC_categories_expense;", [], nullDataHandler, errorHandler);
										transaction.executeSql('CREATE TABLE "HDFC_categories_income" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
										transaction.executeSql('CREATE TABLE "HDFC_categories_expense" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
									}
								);
								addcategory(); addcategory1();
								//localStorage.setItem("csd",tesmppbkID);
									var params= {
										"custId": booksStore(regcustid),
										"mobileNo": booksStore(mobile)
									};

								var invocationData = {
										adapter : "mPassbookDebitCardList",
										procedure : "mPassDebitCardListService_executeMPassDebitListService",
										parameters : ['','',params],
										compressResponse : true
								};
								
								WL.Client.invokeProcedure(invocationData, {
									onSuccess : registrationSuccess,
									onFailure : AdapterFail,	    		
									timeout: timeout
								});
							}
							if(iValue == 1){
								$("#customerid1").val("");
								$('#Mobile').val("");
							}
					}, "Registration",['No','Yes']);
				}
				else{
					//localStorage.setItem("csd",tesmppbkID);
						var params= {
							"custId": booksStore(regcustid),
							"mobileNo": booksStore(mobile)
						};

					busyInd.show();
					var invocationData = {
							adapter : "mPassbookDebitCardList",
							procedure : "mPassDebitCardListService_executeMPassDebitListService",
							parameters : ['','',params],
							compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : registrationSuccess,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
				}
			}
			else{
					//localStorage.setItem("csd",tesmppbkID);
						var params= {
							"custId": booksStore(regcustid),
							"mobileNo": booksStore(mobile)
						};

					busyInd.show();
					var invocationData = {
							adapter : "mPassbookDebitCardList",
							procedure : "mPassDebitCardListService_executeMPassDebitListService",
							parameters : ['','',params],
							compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : registrationSuccess,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
			}
		}
    };
	
	registrationSuccess = function(result){
		busyInd.hide();
		invocationResult = result.invocationResult;
		accountListDebit.removeAll();
		if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
			if(invocationResult.Envelope.Body.mPassDebitListResponse.errorCode == "00000"){
				clickhead = "true";
				if(invocationResult.Envelope.Body.mPassDebitListResponse.debitCardNo){
					var temp = invocationResult.Envelope.Body.mPassDebitListResponse.debitCardNo;
					if(Object.prototype.toString.call(temp) === '[object Array]' ) {
						$(temp).each(function(index, obj) {
							var debitmask = temp[index];
							var TransDate = debitmask.substring(0,4)+"xxxxxxxx"+debitmask.substring(12,16);
							accountListDebit.push({codacctno: TransDate,accountValue: temp[index]});					
						});
					}
					else{
						var debitmask = temp;
						var TransDate = debitmask.substring(0,4)+"xxxxxxxx"+debitmask.substring(12,16);
						accountListDebit.push({codacctno: TransDate,accountValue: temp});
					}
					
				}
				$('.contents').not($(this).next()).slideUp();
				$(this).next().slideToggle();
				$(".head").removeClass("active");	
				$(this).toggleClass("active");
				
				$('#step2').find('.head').addClass('active');
				$('#step2').find('.contents').slideToggle();
				$('#step1succ').show();
				$('#step1').find('.head').css('pointer-events', 'none');
				$('#step3').find('.head').css('pointer-events', 'none');
			}
			else{
				busyInd.hide();
				if(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage && invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage !=""){
					alert(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage);
				}
				else{
					alert("We apologize this facility is temporarily unavailable.Please try later.");
				}
				$("#customerid1").val("");
				$('#Mobile').val("");
			}
		}

	};
	
	self.verify_submit = function(){
		if($("#verify").valid()){
			if($('#pin1').val()=="" || $('#pin2').val()=="" || $('#pin3').val()=="" || $('#pin4').val()==""){
				alert('Enter PIN to confirm');
				return false;
			}
			var card_no = $("#fldAcctNo").val();
			var expirydate = ($("#cardExpYear").val().substring(2))+""+$("#cardExpMonth").val();
			var debitpin = $('#pin1').val()+""+$('#pin2').val()+""+$('#pin3').val()+""+$('#pin4').val();
			//alert(card_no+"  "+expirydate+"  "+debitpin);
			var currentdate = new Date(); 
            if((currentdate.getMonth()+1) < 10) {
                var mm = '0'+(currentdate.getMonth()+1);
            }
            else{var mm = currentdate.getMonth()+1;}
            
            if((currentdate.getDate()) < 10) {
                var dd = '0'+currentdate.getDate();
            }
            else{var dd = currentdate.getDate();}
            
            if((currentdate.getHours()) < 10) {
                var HH = '0'+currentdate.getHours();
            }
            else{var HH = currentdate.getHours();}
            
            if((currentdate.getMinutes()) < 10) {
                var Min = '0'+currentdate.getMinutes();
            }
            else{var Min = currentdate.getMinutes();}
            
            if((currentdate.getSeconds()) < 10) {
                var Sec = '0'+currentdate.getSeconds();
            }
            else{var Sec = currentdate.getSeconds();} 
            var TRANSMIT_DATE_TIME = mm+""+dd+""+HH+""+Min+""+Sec;
            var TRAN_TIME = HH+""+Min+""+Sec;
            var TRAN_DATE = mm+""+dd;
            var CAPTURE_DATE = mm+""+dd;
            var TRACE_NUM = Math.floor(Math.random()*900000) + 10000;
            var SEQ_NUM = Math.floor(Math.random()*900000) + 10000;
            busyInd.show();
   
            var params = {
              "sch:PinVerReq": {
                "sch:TRANSMIT_DATE_TIME": TRANSMIT_DATE_TIME,
                "sch:TRACE_NUM": SEQ_NUM,
                "sch:TRAN_TIME": TRAN_TIME,
                "sch:TRAN_DATE": TRAN_DATE,
                "sch:CAPTURE_DATE": CAPTURE_DATE,
                "sch:CARD_NUMBER": card_no,
                "sch:EXPIRY_DATE": expirydate,
                "sch:SEQ_NUM": SEQ_NUM,
                "sch:CONSUMER_NAME": "NB",
                "sch:CRNCY_CDE": "356",
                "sch:ADD_REQ_INFO": {
                  "sch:SOAUSERNAME":"",
				  "sch:SOAPASSWORD":"",
				  "sch:FILLER1":"",
				  "sch:FILLER2":"",
				  "sch:FILLER3":"",
				  "sch:FILLER4":"",
				  "sch:FILLER5":""
                }
              }
            };
            //params1, headers, cn, pn , rndValue
            var invocationData = {
                    adapter : "mPassbookPinVerification",
                    procedure : "PINVERSVC_PINVERREQ",
                    parameters : ['','',booksStore(card_no),booksStore(debitpin),booksStore(TRANSMIT_DATE_TIME),SEQ_NUM,booksStore(TRAN_TIME),booksStore(TRAN_DATE),booksStore(CAPTURE_DATE),booksStore(expirydate),"1"],
                    compressResponse : true
            };
			
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : verify_submitSuccess, //= function(res){console.log(res);},
                onFailure : AdapterFail, //= function(res){console.log(res);},                
                timeout: timeout
            });
			//$('.verifysucess').show();
			//$('#verify').hide();
		}
	};
	
	verify_submitSuccess = function(result){
		invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
			if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO){
				if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2 =="SUCCESS"){
					busyInd.hide();
					//$('#namecustlog12').hide();
					$("#namecustlog12").html("Dear Customer")
					$('.verifysucess').show();
					$('#verify').hide();
					localStorage.setItem("names",booksStore("Customer"));
				}
				else{
					busyInd.hide();
					$('#pin1').val(""); $('#pin2').val(""); $('#pin3').val(""); $('#pin4').val("");
					alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2);
				}
			}
			else{
				busyInd.hide();//ADD_RES_INFO
				if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO){
					if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO.FILLER2 == ""){
						alert("We are unable to carry out your instruction, currently. Please try later");
					}
					else{
						alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO.FILLER2);
					}
				}
				else if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO){
					if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2 == ""){
						alert("We are unable to carry out your instruction, currently. Please try later");
					}
					else{
						alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2);
					}
				}
				else{
					alert("We are unable to carry out your instruction, currently. Please try later");
				}
			}
		}
	};
	
	self.Configure_submit = function(){
		//alert("You entered " + document.getElementById("password1").value);
		//if($("#Configure").valid()){
			if($('#pin11').val()==""){
				alert('Enter 4 digit App PIN');
				$("#pin11").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()==""){
				alert('Enter 4 digit App PIN');
				$("#pin12").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()!="" && $('#pin13').val()==""){
				alert('Enter 4 digit App PIN');
				$("#pin13").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()!="" && $('#pin13').val()!="" && $('#pin14').val()==""){
				alert('Enter 4 digit App PIN');
				$("#pin14").focus();
				return false;
			}
			if($('#pin21').val()==""){
				alert('Re-Enter 4 digit App PIN');
				$("#pin21").focus();
				return false;
			}
			if($('#pin21').val()!="" && $('#pin22').val()==""){
				alert('Re-Enter 4 digit App PIN');
				$("#pin22").focus();
				return false;
			}
			if($('#pin21').val()!="" && $('#pin22').val()!="" && $('#pin23').val()==""){
				alert('Re-Enter 4 digit App PIN');
				$("#pin23").focus();
				return false;
			}
			if($('#pin21').val()!="" && $('#pin22').val()!="" && $('#pin23').val()!="" && $('#pin24').val()==""){
				alert('Re-Enter 4 digit App PIN');
				$("#pin24").focus();
				return false;
			}
			//if(mpassbookloginchk == 'custid'){
			//	logoutcall();
			//}

			var mpin = $('#pin11').val()+""+$('#pin12').val()+""+$('#pin13').val()+""+$('#pin14').val();
			var mpin1 = $('#pin21').val()+""+$('#pin22').val()+""+$('#pin23').val()+""+$('#pin24').val();
			if(mpin != mpin1){
				alert("PIN's don't match, please re-enter APP PIN");
				return false;
			}
			localStorage.setItem("csd",tesmppbkID);
			localStorage.setItem('loginerror','');
			localStorage.setItem("logerr","false");
			var tempPin = booksStore(mpin);
			localStorage.setItem("cnpn",tempPin);
			localStorage.removeItem("accountListRD");
			localStorage.removeItem("accountListFD");
			localStorage.removeItem("accountListPSBK");
			accountListPSBK.removeAll(); accountListFD.removeAll(); accountListRD.removeAll();
			localStorage.setItem("Demo","");
			//if()
			var tempname = "Dear "+booksStore(localStorage.getItem("names"))+", Congratulations! You have successfully registered for mPassbook.";
			navigator.notification.confirm(tempname, onNetworkChecking = function(){
				window.location.hash = '#mPassbook01';
				getsmsNo();
				return;
			}, "Registration Successful", ['ok']); 
			
	};
	
	self.financialSummary = function(){
		piechartarray.removeAll();
		doughnutDataarray.removeAll();
		var totalsavingbal = 0;
		var totalFDbal = 0;
		var totalRDbal= 0;
		if(localStorage.getItem("accountListRD")){
				accountListRD.removeAll();
				var testing  = booksStore(localStorage.getItem("accountListRD"));
				var temp = JSON.parse(testing);
				$(temp).each(function(index, obj){
					accountListRD.push(obj);
				});
		}
		if(localStorage.getItem("accountListFD")){
				accountListFD.removeAll();
				var testing  = booksStore(localStorage.getItem("accountListFD"));
				var temp = JSON.parse(testing);
				$(temp).each(function(index, obj){
					accountListFD.push(obj);
				});
		}
	//if(accountListPSBK().length != 0 && accountListFD().length != 0 && accountListRD().length != 0){
	if(accountListPSBK().length != 0){
		if(localStorage.getItem("tempcurrency") == 1){
			setTimeout(function(){
				var test = accountListPSBK().length;
			for(i=0;i<test;i++){
				if(accountListPSBK()[i].acctType == "Savings"){
					totalsavingbal += parseFloat(accountListPSBK()[i].bal, 10);
				}
			}
			var totalsavingbalance = accountListPSBK()[0].currency+" "+formatAmt(parseFloat(Math.round(totalsavingbal * 100) / 100));
			//console.log(totalsavingbal);
			if(accountListFD().length != 0){
				var test = accountListFD().length;
				for(i=0;i<test;i++){
					if(accountListFD()[i].acctType == "FD Account"){
						totalFDbal += parseFloat(accountListFD()[i].bal, 10);
					}
				}
				var totalFDbalance = accountListFD()[0].Currency+" "+formatAmt(parseFloat(totalFDbal));
			}
			else{
				var totalFDbalance = formatAmt(parseFloat(totalFDbal));
			}
			//var totalFDbalance = accountListFD()[0].Currency+" "+formatAmt(parseFloat(totalFDbal));
			//console.log(totalFDbal);
			if(accountListRD().length != 0){
				var test = accountListRD().length;
				for(i=0;i<test;i++){
					if(accountListRD()[i].acctType == "RD Account"){
						totalRDbal += parseFloat(accountListRD()[i].RdAmounts, 10);
					}
				}
				var totalRDbalance = accountListRD()[0].Currency+" "+formatAmt(parseFloat(totalRDbal));
			}
			else{
				var totalRDbalance = formatAmt(parseFloat(totalRDbal));
			}
			
			//console.log(totalRDbal);
			doughnutData = [
				{
					value: totalsavingbal,
					color: "#66cc33",
					label: "Accounts"
				},
				{
					value: totalFDbal,
					color: "#fb4d61",
					label: "FD Account"
				},
				{
					value: totalRDbal,
					color: "#551a8b",
					label: "RD Account"
				}
			];
				piechartarray.push({"color": "#66cc33","label": "Saving & Current Account","value": totalsavingbalance},{"color": "#fb4d61","label": "Fixed Deposit","value": totalFDbalance},{"color": "#551a8b","label": "Recurring Deposit","value": totalRDbalance});
			},3000);
			
			
		}
		setTimeout(function(){
			if(shhv != 1){
				busyInd.hide();
			}
			
			
			$("#contentData").load("Views/mPassbook/financialSummary.html", null, function (response, status, xhr) {
				if (status != "error") {}
					if(localStorage.getItem("tempcurrency") > 1){
						$('.assetChart.row').hide();
					}
					if(piechartarray.length == 0){
						
					}
					logincheck = "True";
					$('.lastUpdt1').html("Last updated at "+localStorage.getItem("FinTime"));
					$('#passbookusername').html(booksStore(localStorage.getItem("Cstnm")));
					$('#passbookcustID').html("Cust ID: "+booksStore(localStorage.getItem("CstmID")));
				ko.applyBindings(self, $(".contents").get(0)); 
				try{setTimeout(function(){ if(busyInd.__visible == true){busyInd.hide();}}, 6000);	}catch(e){}
					
			});
		},5000);
	}
	else{
		busyInd.hide();
		window.location.hash = "#tests";
		alert("No data available...");
	}
	};
	
	self.interactivepage = function(){
		busyInd.show();
		accountListMpassbook.removeAll();
		setTimeout(function(){busyInd.hide();
			//var ctx = document.getElementById("chart-area").getContext("2d");
			//window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive: true});
		},10000);
		mode = "interactive";
		typetras = 'Dr';
		//self.mPassbookacntstatement();
			var temp = CategoryList();
			var temp1 = CategoryList_expense();
			finalobj = temp.concat(temp1);
			AllCategories(finalobj);
			
		    var list=AllCategories();
			
			//console.log("final "+JSON.stringify(finalobj));
			//console.log("CategoryList "+JSON.stringify(CategoryList()));
		changevalstart = "";
		setTimeout(function(){
			$("#contentData").load("Views/mPassbook/interactive.html", null, function (response, status, xhr) {
				if (status != "error") {}
				$(list).each(function(index, obj) {
							//alert(obj.TXN_Category_name);
							 $('#categoryval').append($('<option></option>').val(obj.TXN_Category_name).html(obj.TXN_Category_name));
							
	            });
				setTimeout(function(){
					selaccno = "";
					changevalstart = "start";
				},5000);
				ko.applyBindings(self, $(".content").get(0));                   
			});
			
		},500);
	};
	
	self.pasbooklogout = function(){
		navigator.notification.confirm(
			          "Logout of mPassbook?",
			          checkButtonpassbook = function(iValue){ if (iValue == 2){
								self.pasbooklogout2();
							}
							if (iValue == 1){
								window.location.hash = '#temp';
							}
						},
			          'Logout',
			          ['Cancel','OK']);
	};
	
	self.pasbooklogout2 = function(){
		logincheck = "False";
		Authpattern = "false";
		logflgfrbk = 0;
		WL.Client.addGlobalHeader('deflate', "");
		WL.Client.addGlobalHeader('Accepts', '0');
		if(window.navigator.onLine){
			busyInd.show();
				var invocationData = {
    	    			adapter : "mPassbook_API_Adapter",
    	        		procedure : "mPass_Logout",
    	        		parameters : ["logout"],
    	        		compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : pasbooklogout2Success = function(){
						setTimeout(function(){busyInd.hide(); alert("Logged Out Successfully");
							accountListPSBK.removeAll();
							window.location.hash = '#mPassbook01';},2000);
					},
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		}
		else{ 
			//navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK");
				busyInd.show();
				setTimeout(function(){busyInd.hide(); alert("Logged Out Successfully");
										accountListPSBK.removeAll();
										window.location.hash = '#mPassbook01';},2000);			
		}
	};
	
	self.pasbooklogout24 = function(){
		logincheck = "False";
		Authpattern = "false";
		WL.Client.addGlobalHeader('deflate', "");
		WL.Client.addGlobalHeader('Accepts', '0');
		if(window.navigator.onLine){
				var invocationData = {
    	    			adapter : "mPassbook_API_Adapter",
    	        		procedure : "mPass_Logout",
    	        		parameters : ["logout"],
    	        		compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : pasbooklogout2Success = function(){console.log('');},
    	    		onFailure : AdapterFail13 = function(){console.log('');},	    		
    	    		timeout: timeout
    	    	});
		}
	};
	
    self.passbookdata = function(){
	 
	    selectedaccountno = localStorage.getItem("refselectedacc");
		if(selectedaccountno!=""||selectedaccountno!=null||selectedaccountno!=undefined){
		    passacntno = selectedaccountno;
		}
		else{
		   passacntno = accountListPSBK()[0].codacctno;
		}
		//alert(passacntno);
  
        busyInd.show();
        
        setTimeout(function(){busyInd.hide(); currentACCno = ""; selaccno = "";
		//accSelectedForPassbk = '';
		},20000);
        //self.mPassbookacntstatement();
        //getaccounts();
        mode = "";
        setTimeout(function(){
            $("#contentData").load("Views/mPassbook/mPB_passbook.html", null, function (response, status, xhr) {
				if (status != "error") {}
				changevalstart = "";
				if(accountListMpassbook().length == 0){
					$('#NotransError').show();
					$('#pullToRefr').hide();
					$('.assetHead').show();
				}
				setTimeout(function () {
					size_li = $("#myList li").size();
					x=3;
					$('#loadMore').show();
					$('#myList li:lt('+x+')').show();
					topposition=$('#myList li[style]').last().offset().top;
					
					$('#loadMore').click(function () {
						setTimeout(function () {
							$('html,body').animate({
								scrollTop: topposition														
							});
						}, 2000);
						topposition=$('#myList li[style]').last().offset().top; 
						///alert(accountListMpassbook().length);
						x= (x+5 <= size_li) ? x+5 : size_li;
						$('#myList li:lt('+x+')').show();
						if(x == size_li){
							$('#loadMore').hide();
						}
					});	
				}, 5000);				
				   setTimeout(function(){changevalstart = "start";},5000);	
				ko.applyBindings(self, $(".content").get(0));                   
			});
		},3000);	
	};
	
	function getaccounts(){
		accountListPSBK.removeAll();
		accountListPSBK.push({codacctno: "50100000000222", acctType: "Savings", acctbalance: "â‚¹ 2,34,789.12", displaytxt:"50100000000222",accountValue: "50100000000222" },{codacctno: "50100000000719", acctType: "Savings", acctbalance: "â‚¹ 1,00,789", displaytxt:"50100000000719",accountValue: "50100000000719" });
		var acntno = accountListPSBK()[0].codacctno;
		//SelectPassBookData(acntno);
	}
	
	self.showSelectedAccount = function(){
		 accountListMpassbook.removeAll();
	//	debugger;
	     if(financialaccno=="financialaccno"){
		 selaccno=localStorage.getItem("financialID");
		   //financialaccno="";
         }
         else{		 
	      selaccno = self.selAccount();
	     }
	
    	console.log("selaccno"+selaccno);
        accdata = accountListPSBK();
        $('#filterserach').hide();
        if(selaccno != '' && selaccno != null && selaccno != undefined){
        	$(accdata).each(function(index, accnodet) {
        		
        		if(accnodet.codacctno == selaccno){
        			selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.codacctno, acctbalance: accnodet.acctbalance, acctType: accnodet.acctType});
        	    	
                	var currAccData = selectedAccount();
                    fldAcctNo = currAccData.accno;            
                    curraccbalval = currAccData.acctbalance;
                    acctType = currAccData.acctType;
                	fldAcctNo_txt = currAccData.displaytxt;
                	fldjsessionid = '';
            
        	    	$("#acctType").html(acctType);
        	    	//$("#curraccbalval").html("Rs. "+curraccbalval);
        	    	self.curraccbalval(curraccbalval);
					//alert(window.location.hash);
					if(window.location.hash != "#mPB_passbookGraph"){
						$('#fldAcctNo').val(GraphID);
					}
                if(window.location.hash == "#mPB_passbook" || window.location.hash == "#financialSummaryTemp"||window.location.hash == "#financialSummaryTemp1"){
					//alert("mpass");
						mode = "";
						self.mPassbookacntstatement(selaccno);
							setTimeout(function(){
								$('#fldAcctNo').val(selaccno);
								financialaccno="";
							/* 	localStorage.setItem("financialID","");
								localStorage.setItem("financialaccno",""); */
								if(localStorage.getItem(selaccno)){
									$('.lastUpdt').html("Last updated at "+localStorage.getItem(selaccno));
									var lastUpdateDate=localStorage.getItem(selaccno);
									var selectedAccountNo=selaccno;
									setTimeout(function(){
										// debugger;	
										if(navigator.onLine){
										 start =lastUpdateDate;	// day interval
										 start=start.split(" ");
										 oldDate=start[0];
										 oldTime=start[1];
                                                  //oldDate=oldDate.split("/");
                                                  startNewDate=new Date(oldDate.split("/")[2],parseInt(oldDate.split("/")[1])-1,oldDate.split("/")[0]);
                                                //  alert("mpass start"+">>>>>>>"+startNewDate);
                                                  
                                                  end   = new Date();
                                                  Month=end.getMonth();
                                                  if(Month > 10){
                                                  month="0"+Month;
                                                  }
                                                  else{
                                                  month=Month;
                                                  }
                                                  newupadte=new Date(end.getFullYear(),month,end.getDate());
                                                 // alert("mpass newupadte"+">>>>>>>"+newupadte);
                                                 // diff  = new Date(end.getTime() - startNewDate.getTime());
                                                 // console.log(diff);
                                                  //var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
                                                  //days  = diff.getDate();
                                                  //days  = diff.getHours()-(new Date(0)).getHours();
                                                  //console.log(days);
                                                  var d2 = new Date(); //current date
                                                  var d1 = startNewDate;
                                                  var seconds=((d2-d1)/1000).toString();
                                                  console.log("Diff. Seconds 1: "+((d2-d1)/1000).toString());
                                                  var mins=Math.floor(seconds/ (60));
                                                  //alert('diff in min'+">>>>"+mins);
                                                  var hours = Math.floor(seconds/ (60 * 60));
                                                  //alert('diff in hours'+">>>>"+hours);
                                                  console.log(hours);
                                                  
                         
                                                  // diffMins=days * 1440;
                                                  if(newupadte > startNewDate){
                                                  //alert("passbook page auto refresh");
                                                  self.PassbookRefreshCall(selectedAccountNo);
                                                  refreshCallOneDay=1;
                                                  busyInd.hide();
                                                  }
                                                  }
                                                  },1000);
                                       }
                                       },3000);
                            
                            //setTimeout(function(){
                            //$("#contentData").load("Views/mPassbook/mPB_passbook.html", null, function (response, status, xhr) {
                            //ko.applyBindings(self, $(".content").get(0));                   
                            //	});
                            //},7000);
                            //SelectPassBookData(selaccno);
                            }
                            if(window.location.hash == '#interactive'){
                            mode = "interactive";
                            if(financialID1){
                            selaccno = financialID1;
                            }
                            $('.assetChart.chartDesc').hide();
                            $("#Uppertabs").hide();
                            self.mPassbookacntstatement(selaccno);
                            setTimeout(function(){
                                       $('#fldAcctNo').val(selaccno);
                                       if(localStorage.getItem(selaccno)){
                                       $('.lastUpdt').html("Last updated at "+localStorage.getItem(selaccno));
                                       }
                                       financialID1 = "";
                                       },3000);
                            //SelectPassBookDataInteractive(selaccno,typetras);
                            }
                            if(window.location.hash == '#financialSummaryTemp'){
                            if(financialID){
                            selaccno = financialID;
                            }
                            if(callvalue == 0){
                            callvalue++;
                            self.mPassbookacntstatement(financialID);
                            }
                            setTimeout(function(){window.location = '#financialSummaryTemp1'; callvalue = 0;},5000);
                            setTimeout(function(){
                                       $('#fldAcctNo').val(selaccno);
                                       if(localStorage.getItem(selaccno)){
                                       $('.lastUpdt').html("Last updated at "+localStorage.getItem(selaccno));
                                       }
                                       financialID = "";
                                       },3000);
                            }
                            if(window.location.hash == '#financialSummaryTemp1'){
                            self.mPassbookacntstatement(selaccno);
                            setTimeout(function(){
                                       $('#fldAcctNo').val(selaccno);
                                       if(localStorage.getItem(selaccno)){
                                       $('.lastUpdt').html("Last updated at "+localStorage.getItem(selaccno));
                                       }
                                       },3000);
                            //SelectPassBookDataInteractive(selaccno,typetras);
                            }
                            //busyInd.hide();
                            }
                            });
        } 
		setTimeout(function(){busyInd.hide();},5000);
    };
		
	self.graph = function(){
			AllCategories("");
			var temp = CategoryList();
			var temp1 = CategoryList_expense();
			finalobj = temp.concat(temp1);
			AllCategories(finalobj);
		// accountListPSBK.removeAll();
		// accountListPSBK.push({codacctno: "50100000000222", acctType: "Savings", acctbalance: "â‚¹ 2,34,789.12", displaytxt:"50100000000222",accountValue: "50100000000222" },{codacctno: "50100000000719", acctType: "Savings", acctbalance: "â‚¹ 1,00,789", displaytxt:"50100000000719",accountValue: "50100000000719" });
		$("#contentData").load("Views/mPassbook/mPB_passbookGraphselect.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            ko.applyBindings(self, $(".content").get(0));                   
        });
	};
	
	self.getgraph = function(){
		setTimeout(function(){busyInd.hide();},5000);
		var actno = booksStore(selaccno);
		SelectPassBookData1(actno);
	};
	
	self.RequestStatement = function(){
		$("#contentData").load("Views/mPassbook/requestStatement.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            //var model = new mPassbookViewModel(param);       
            ko.applyBindings(self, $(".content").get(0));                   
        });
	};
	
	self.requstsubmit = function(){
		if($("#request_statement").valid()){
			if($('#fldFromDate').val() == ""){ return false;}
			if($('#fldToDate').val() == ""){return false;}
		
				tmpdt1 = $('#fldFromDate').val();
				tmpdt3= $('#fldToDate').val();
			
				arrdt1 = tmpdt1.split('/');
				arrdt3 = tmpdt3.split('/');
				
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} 
				var today = dd+'/'+mm+'/'+yyyy;
				
				tmpdt2 = today;
				arrdt2 = tmpdt2.split('/');
                var date1 = new Date(arrdt1[2],arrdt1[1],arrdt1[0]);

                var date2 = new Date(arrdt2[2],arrdt2[1],arrdt2[0]);
			   
			    var date3= new Date(arrdt3[2],arrdt3[1],arrdt3[0]);
			  
			   if ( date1 > date3 ){
	                alert("From date can not be greater than To date");
                  return false;  
               }
			   
			   if( date1 > date2 ){
			      customAlert("From date can not be greater than Today");
                  return false;  
			   }
			   
			    if( date3 > date2 ){
			      customAlert("To date can not be greater than Today");
                  return false;  
			   }
			  
						if(window.navigator.onLine){
							var frmdate = tmpdt1.split('/')[2]+""+tmpdt1.split('/')[1]+""+tmpdt1.split('/')[0];
							var todate = tmpdt3.split('/')[2]+""+tmpdt3.split('/')[1]+""+tmpdt3.split('/')[0];
							var acntNO = $('#fldAcctNo').val();
							var randomScalingFactor = function(){ return Math.round(Math.random()*1000)};
							//var extrefno = "MATTR"+randomScalingFactor();
							var extrefno = "M"+booksStore(localStorage.getItem("CstmID"))+""+randomScalingFactor();
							//MREF<Last4DigitAcctNo><1+Sequence>
							//M<Cust ID><3 digit random no.>
							busyInd.show();
							hash = makeid();
							var invocationData = {
												adapter : "mPassbook_Request_Statement",
												procedure : "StatementRequestLogWrapperService_processRequest",
												parameters : ['','',booksStore(acntNO),frmdate,todate,extrefno,localStorage.getItem("CstmID")],
												compressResponse : true
											};
											WL.Client.invokeProcedure(invocationData, {
												onSuccess : requstsubmitSuccess,
												onFailure : AdapterFail,	    		
												timeout: timeout
											});
						}
						else{ navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK"); 
						}
		}   
	};
	
	requstsubmitSuccess = function(result){
		invocationResult = result.invocationResult;
		ch = hash;
				Servlet = invocationResult.Servlet;
				if(ch!= Servlet){
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
			//console.log("response  "+JSON.stringify(invocationResult));
		if(invocationResult.isSuccessful){
			if(invocationResult.Envelope.Body.processRequestResponse){
				if(invocationResult.Envelope.Body.processRequestResponse['return'].transactionStatus.replyCode == 0){
					busyInd.hide();
					var refNo = invocationResult.Envelope.Body.processRequestResponse['return'].uniqueTranNo;
					$("#contentData").load("Views/mPassbook/requestStatement2.html", null, function (response, status, xhr) {
							setTimeout(function(){busyInd.hide();},3000);	
								if (status != "error") {}
						$('#refNo').html("Your request reference number is "+refNo);
								ko.applyBindings(self, $(".content").get(0));                   
					});
				}
				else{
					busyInd.hide();
					replyTxt = invocationResult.Envelope.Body.processRequestResponse['return'].transactionStatus.replyText
					if(replyTxt.toLowerCase().indexOf('unable to connect to fc') != -1){
						alert(serverConnError);
					}else{
						alert(invocationResult.Envelope.Body.processRequestResponse['return'].transactionStatus.replyText);
					}
					
				}
			}
		}
		busyInd.hide();
	};
	//FinancialPageClick
	self.FinancialPageClick = function(id){
		financialID = id;
        window.location = '#financialSummaryTemp';
	//	busyInd.show();
		window.location = '#mPB_passbook';
		setTimeout(function(){busyInd.hide();},20000);
		setTimeout(function(){try{setTimeout(function(){$("#fldAcctNo option:contains(" + accSelectedForPassbk + ")").attr('selected', 'selected').change();},1000);}catch(e){}},5000);
		mode = "";
		setTimeout(function(){
			$("#contentData").load("Views/mPassbook/mPB_passbook.html", null, function (response, status, xhr) {
				if (status != "error") {}
				changevalstart = "";
				if(accountListMpassbook().length == 0){
					$('#NotransError').show();
					$('#pullToRefr').hide();
					$('.assetHead').show();
				}
				setTimeout(function () {
					size_li = $("#myList li").size();
					x=3;
					$('#loadMore').show();
					$('#myList li:lt('+x+')').show();
                    topposition=$('#myList li[style]').last().offset().top;
					$('#loadMore').click(function () {
						setTimeout(function () {
							$('html,body').animate({
								scrollTop: topposition
							});
						}, 2000);
						topposition=$('#myList li[style]').last().offset().top;
						//alert(accountListMpassbook().length);
						x= (x+5 <= size_li) ? x+5 : size_li;
						$('#myList li:lt('+x+')').show();
						if(x == size_li){
							$('#loadMore').hide();
						}
					});	
				}, 5000);				
				   setTimeout(function(){changevalstart = "start";},5000);	
				   
				   	
				   
				ko.applyBindings(self, $(".content").get(0));  

				
			});
		},3000);
		
	};

	
	self.mPB_settings = function(){
		$("#contentData").load("Views/mPassbook/mPB_settings.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            //var model = new mPassbookViewModel();       
            ko.applyBindings(self, $(".content").get(0));                   
        });

	}
	
	self.apppinchange_Submit = function(){
		if($("#settings").valid()){	
			if($('#pin11').val()=="" || $('#pin12').val()=="" || $('#pin13').val()=="" || $('#pin14').val()==""){
					alert('Please Enter 4 digit Login PIN');
					return false;
			}
			var mpin = $('#pin11').val()+""+$('#pin12').val()+""+$('#pin13').val()+""+$('#pin14').val();
			var tempPin = booksStore(localStorage.getItem("cnpn"));
			if(mpin != tempPin){
				alert('Current App PIN is wrong');
					return false;
			}
			if($('#pin21').val()=="" || $('#pin22').val()=="" || $('#pin33').val()=="" || $('#pin44').val()==""){
					alert('Please Enter 4 digit New PIN');
					return false;
			}
			var newmpin = $('#pin21').val()+""+$('#pin22').val()+""+$('#pin33').val()+""+$('#pin44').val();
			if($('#pin01').val()=="" || $('#pin02').val()=="" || $('#pin03').val()=="" || $('#pin04').val()==""){
					alert('Please Re-Enter 4 digit New PIN');
					return false;
			}
			var tempPin3 = booksStore(newmpin);
			localStorage.setItem("cnpn",tempPin3);
			alert("Your App PIN changed successfully");
		}
	};
	
	self.Categories = function(){
		busyInd.show();
		selectcategories();
		setTimeout(function(){
			$("#contentData").load("Views/mPassbook/mPB_categories.html", null, function (response, status, xhr) {
			if (status != "error") {}				
				busyInd.hide();
				ko.applyBindings(self, $(".content").get(0));                   
			});
		},500);
	};
	
	     self.custIdSubmitmpass = function(){
            if(window.navigator.onLine){
        	if($("#frmLogin").valid()){
				if(localStorage.getItem("csd")){
					var temp = booksStore(localStorage.getItem("csd"));
					var test = $('#fldLoginUserId').val();
					//alert(temp+"  "+test);
					if(test != temp){
						navigator.notification.confirm("You are attempting to register on mPassbook with new Customer ID. This will delete all existing records in mPassbook app. Do you wish to continue?", onConfirm3 = function(iValue){ 
								if (iValue == 2){
									localStorage.setItem("Demo","");
									busyInd.show();
										DEMODB.transaction(
											function (transaction){
												transaction.executeSql("DROP TABLE HDFC_categories_income;", [], nullDataHandler, errorHandler);
												transaction.executeSql("DROP TABLE HDFC_categories_expense;", [], nullDataHandler, errorHandler);
												transaction.executeSql('CREATE TABLE "HDFC_categories_income" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
												transaction.executeSql('CREATE TABLE "HDFC_categories_expense" ("TXN_Category_name", "TXN_Category_short","TXNID" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE);', [], nullDataHandler, errorHandler);
											}
										);
										addcategory(); addcategory1();
									    var $form = $("#frmLogin");
										rsaDataArray = $form.serializeArray();    	
										fldjsessionid = Regfldjsessionid;
										//rsajsonData.push({name: 'wordlist', value: wordlist});
												
										reqParams = {};
										for (var i in rsaDataArray) {
											reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
										}
										
										reqParams["fldDeviceId"] = fldDeviceId;
										reqParams["fldWebServerId"] = fldWebServerId;
										reqParams["fldAppId"] = fldAppId;
										reqParams["fldAppServerId"] = fldAppServerId;
										reqParams["fldLangId"] = fldLangId;
										//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
										version  = WL.Client.getAppProperty("APP_VERSION");
										reqParams["fldAppversion"] = version;
										ipadd = '';
										
										WL.Device.getNetworkInfo(function (networkInfo) {
											//console.log(networkInfo.ipAddress); 
											ipadd = networkInfo.ipAddress;
											reqParams["fldAppipAddress"] = networkInfo.ipAddress;
										});
										var invocationData = {
												adapter : "mPassbook_Login",
												procedure : "RRLGN01",
												parameters : [fldjsessionid,reqParams,ipadd],
												compressResponse : true
										};
										//WL.Logger.debug('invoke msg  '+invocationData, '');
										WL.Client.invokeProcedure(invocationData, {
											onSuccess : CustIdSuccess1,
											onFailure : AdapterFail,	    		
											timeout: timeout
										});
								}
								if(iValue == 1){
									$('#fldLoginUserId').val('')
									$("#customerid1").val("");
									$('#Mobile').val("");
								}
						}, "Registration", ['No','Yes']);
					}
					else{
						var $form = $("#frmLogin");
						rsaDataArray = $form.serializeArray();    	
						fldjsessionid = Regfldjsessionid;
						//rsajsonData.push({name: 'wordlist', value: wordlist});
								
						reqParams = {};
						for (var i in rsaDataArray) {
							reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
						}
						
						reqParams["fldDeviceId"] = fldDeviceId;
						reqParams["fldWebServerId"] = fldWebServerId;
						reqParams["fldAppId"] = fldAppId;
						reqParams["fldAppServerId"] = fldAppServerId;
						reqParams["fldLangId"] = fldLangId;
						//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
						version  = WL.Client.getAppProperty("APP_VERSION");
						reqParams["fldAppversion"] = version;
						ipadd = '';
						busyInd.show();
						WL.Device.getNetworkInfo(function (networkInfo) {
							//console.log(networkInfo.ipAddress); 
							ipadd = networkInfo.ipAddress;
							reqParams["fldAppipAddress"] = networkInfo.ipAddress;
						});
						var invocationData = {
								adapter : "mPassbook_Login",
								procedure : "RRLGN01",
								parameters : [fldjsessionid,reqParams,ipadd],
								compressResponse : true
						};
						//WL.Logger.debug('invoke msg  '+invocationData, '');
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : CustIdSuccess1,
							onFailure : AdapterFail,	    		
							timeout: timeout
						});
					}
				}
				else{
					var $form = $("#frmLogin");
					rsaDataArray = $form.serializeArray();    	
					fldjsessionid = Regfldjsessionid;
					//rsajsonData.push({name: 'wordlist', value: wordlist});
							
					reqParams = {};
					for (var i in rsaDataArray) {
						reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
					}
					
					reqParams["fldDeviceId"] = fldDeviceId;
					reqParams["fldWebServerId"] = fldWebServerId;
					reqParams["fldAppId"] = fldAppId;
					reqParams["fldAppServerId"] = fldAppServerId;
					reqParams["fldLangId"] = fldLangId;
					//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
					version  = WL.Client.getAppProperty("APP_VERSION");
					reqParams["fldAppversion"] = version;
					ipadd = '';
					busyInd.show();
					WL.Device.getNetworkInfo(function (networkInfo) {
						//console.log(networkInfo.ipAddress); 
						ipadd = networkInfo.ipAddress;
						reqParams["fldAppipAddress"] = networkInfo.ipAddress;
					});
					var invocationData = {
							adapter : "mPassbook_Login",
							procedure : "RRLGN01",
							parameters : [fldjsessionid,reqParams,ipadd],
							compressResponse : true
					};
					//WL.Logger.debug('invoke msg  '+invocationData, '');
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : CustIdSuccess1,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
				}

			}
        }
            else{
                navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK");
            }
        };
		
		CustIdSuccess1 = function(result){
        	invocationResult = result.invocationResult;        	
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
        			if(invocationResult.faml.response.message){
        				if(invocationResult.faml.response.reqresponse.faml.rc.returncode == 0 ){
        					//self.tesmprespo(invocationResult.faml.response.reqresponse);
        					accStmtData(invocationResult.faml.response.reqresponse.faml);
        				
        				versionUrl = invocationResult.faml.response.url;
        				if(versionUrl){
        				if(invocationResult.faml.response.mandatory=="Y"){
        					
        					navigator.notification.confirm(
        						""+invocationResult.faml.response.message,	
              			          checkButtonSelection1,
              			          'HDFC BANK',
              			          'Upgrade Now');
        					
        				}
        				else{
							busyInd.hide();
        				navigator.notification.confirm(
            			          //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
        						""+invocationResult.faml.response.message,	
        						   checkButtonSelection,
            			          'HDFC BANK',
            			          'Upgrade Later,Upgrade Now');
        				} 
        				}
        				else{
        					
        					alert(invocationResult.faml.response.message);
        				}
        				}
        				else{
        	    			handleError3(invocationResult.faml.response.reqresponse.faml);
        	    		}
         			}else if(invocationResult.faml.response.message==undefined){
        				if(invocationResult.faml.response.rc.returncode == 0 ){
							busyInd.hide();
        					versionUrl = '';
        	    			rsaenrollReq = invocationResult.faml.response.fldRsaEnrollRequired;
        	    			secImg = invocationResult.faml.response.fldRsaImagePath;
        	    			secText = invocationResult.faml.response.fldRsaUserPhrase;
        	    			loginuid = invocationResult.faml.response.loginUser;    	
        	    			svt = invocationResult.faml.Servlet;
        	    			if(rsaenrollReq == 'N'){
        	    				rsacheck(true);
        	    			}else{
        	    				rsacheck(false);
        	    			}
        	    			userID(loginuid);
        	    			rsaEnrollReq(rsaenrollReq);
        	    			userSecureImg(secImg);
        	    			secureText(secText);
        	    			responseData(invocationResult);
							
							$('.contents').not($(this).next()).slideUp();
							$(this).next().slideToggle();
							$(".head").removeClass("active");	
							$(this).toggleClass("active");
							
							$('#step5').find('.head').addClass('active');
							$('#step5').find('.contents').slideToggle();
							$('#step1succ').show();
							$('#step1').find('.head').css('pointer-events', 'none');
							$('#step3').find('.head').css('pointer-events', 'none');
							
							$('#customerid2').val(loginuid);
							$('#customerid2').attr('readonly','true')
        	    		}else{
							busyInd.hide();
							handleError3(invocationResult.faml.response);
						}
        			} 
    	    		else{
    	    			busyInd.hide();
    	    			handleError3(invocationResult.faml.response);
    	    		}
        		}else{
        			alert("We apologize this facility is temporarily unavailable.Please try later. ");
        			//window.location = "#login";
        		}
        	}
        	busyInd.hide();
        };
		
		self.custIdPassSubmit1 = function(){
        	if($("#frmLoginPass").valid()){
    	    	busyInd.show();
    	    	upass = document.getElementById('upass').value;
    	    	var $form = $("#frmLoginPass");
    	    	rsaDataArray = $form.serializeArray();    	
    	    	fldjsessionid = Regfldjsessionid;
    	    	    	
    	    	reqParams = {};
    	    	for (var i in rsaDataArray) {
    	    		if(rsaDataArray[i].name == 'upass'){
    	    		}else{
    	    			reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	    		}
    	    	}
    	    	fldp = booksStore1($("#upass").val(),svt);
    	    	uid=$("#fldCustId").val();
				tempcustidsms = $("#fldCustId").val();
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
				reqParams["fldencp"] = fldLangId;
				
    	    	ipadd = '';
    	   		 WL.Device.getNetworkInfo(function (networkInfo) {
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
    	    	var invocationData = {
    	    			adapter : "mPassbook_API_Adapter",
    	        		procedure : "GetAPICallPass1",
    	        		parameters : [fldjsessionid,reqParams,fldp,uid,ipadd],
    	        		compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : CustIdPassSuccess01,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };

	CustIdPassSuccess01 = function(result){
        invocationResult = result.invocationResult;
        if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){
				if(invocationResult.faml.response.rc){
					returncode = invocationResult.faml.response.rc.returncode;
					if(invocationResult.faml.response.rc.length > 0){
						for(var ei=0;ei<invocationResult.faml.response.rc.length;ei++ ){
						
							returncode = invocationResult.faml.response.rc[ei].returncode;
    						errmsg = invocationResult.faml.response.rc[ei].errormessage;
    						
							if(invocationResult.faml.response.rc[ei].returncode == 0)
								break;
						
						}
						
						
					}else{
						returncode = invocationResult.faml.response.rc.returncode;
						errmsg = invocationResult.faml.response.rc.errormessage;
					}	
					if(returncode == 0 ){
						//busyInd.hide();
						sessionid = invocationResult.faml.response.mci.sessionid;
						//alert("CustIdPassSuccess sessionid  "+sessionid);
        			Rsessionid= invocationResult.faml.response.mci.sessionid;
        			RegfldRequestId = invocationResult.faml.response.mci.requestid;
        			Regloginuid=invocationResult.faml.request.fldLoginUserId;
        			Regfldjsessionid=invocationResult.faml.response.mci.sessionid;
        			fldRequestId = invocationResult.faml.response.mci.requestid;
        			txnid = invocationResult.faml.response.mci.txnid;
        			loginuid=invocationResult.faml.request.fldLoginUserId;
        			fldjsessionid = sessionid;//invocationResult.faml.request.fldjsessionid;
        			fldSessionId = sessionid;//invocationResult.faml.response.sessioninfo.idsession;
        			fldRemoteAddress=invocationResult.faml.response.mci.remoteaddress;
        			//alert(invocationResult.faml.request.fldjsessionid);
        			//alert(invocationResult.faml.response.sessioninfo.idsession);
        			RegfldFCDBSessionId=sessionid;
        			RegloginFlag="yes";
        		
        			itemdata = invocationResult.faml.response.menuitem;
						//alert(invocationResult.faml.response.customername);
							//self.ViewMobileNo();
							$('.contents').not($(this).next()).slideUp();
							$(this).next().slideToggle();
							$(".head").removeClass("active");	
							$(this).toggleClass("active");
							$('.verifysucess1').show();
							if(invocationResult.faml.response.customername){
								$('#namecustlog').html("Dear "+invocationResult.faml.response.customername+",");
								localStorage.setItem("names",booksStore(invocationResult.faml.response.customername));
							}
							else{
								$('#namecustlog').html("Dear Customer,");
								localStorage.setItem("names",booksStore("Customer"));
							}
							$('#passbookusername').html(invocationResult.faml.response.customername);
							$('#passbookcustID').html("Cust ID: "+invocationResult.faml.request.fldLoginUserId);
							passbookID = invocationResult.faml.request.fldLoginUserId;
							tesmppbkID = booksStore(passbookID); 
							setTimeout(function(){
								busyInd.hide();
								logoutcall();
							},3000);
							//localStorage.setItem("csd",temppbkID);
					}else{
						busyInd.hide();
						errmsg = invocationResult.faml.response.rc.errormessage;
						$('#upass').val('');
						if(errmsg == undefined){
							alert(NoDataError);
						}else{
							alert(errmsg);
						}
					}
				}else{
					busyInd.hide();
        			handleErrorNoResponse();
        		}
        	}
        	
        }
	};
	
	function logoutcall(){
        	reqParams = {};
        	reqParams["fldDeviceId"] = fldDeviceId;
        	reqParams["fldWebServerId"] = fldWebServerId;
        	reqParams["fldModule"] = fldModule;
        	reqParams["fldTxnId"] = "LGF";
        	reqParams["fldAppId"] = fldAppId;
        	reqParams["fldAppServerId"] = fldAppServerId;
        	reqParams["fldLangId"] = fldLangId;
        	reqParams["fldScrnSeqNbr"] = "01";
        	reqParams["fldRequestId"] = RegfldRequestId;
        
        	reqParams["fldLoginUserToken"] = "777";
        	reqParams["fldLoginUserType"] = "O";
        	reqParams["fldLoginUserCss"] = "preferred";
        
        	reqParams["fldLoginUserGroupType"] = "N";
        	reqParams["fldLoginUserGroupBaseType"] = "E";
        	reqParams["fldProxyUserFlag"] = "N";
        	reqParams["fldTxnLimitFlag"] = "N";
        	reqParams["fldAccountMapFlag"] = "N";
        	reqParams["fldIdChannel"] = "1";
        	reqParams["fldRemoteAddress"] = "";
        	reqParams["fldExtSessionId"] = "";
        	
        	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldLoginCustId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
        	var invocationData = {
	    			adapter : "mPassbook_API_Adapter",
	        		procedure : "GetAPICall",
	        		parameters : [fldjsessionid,reqParams,ipadd],
	        		compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : logoutSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});

	}
	
	    logoutSuccess = function(result){
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
					sessionid='';
					Rsessionid="";
        			Regfldjsessionid="";
        			Regloginuid="";
        			RegfldRequestId="";
        			RegfldFCDBSessionId="";
        			RegloginFlag="no";
        		}else{
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			//alert(errmsg);
					//$(".h_title").html("Login");
        			//window.location = "#login";
        		}
				}else{
					// handleErrorNoResponse();
					// window.location = "#login";
				}
        	}
			//busyInd.hide();
        };

	self.fdsummarypage = function(id){
		self.fixedDepositList.removeAll();
		var acntobj = accountListFD();
					$(acntobj).each(function(index, obj) {
						if(index == id){
							self.fixedDepositList.push(obj);
						}
					});
					window.location.hash = "#mPB_FD_Summary";
		$("#contentData").load("Views/mPassbook/mPB_FD_Summary.html", null, function (response, status, xhr) {
            if (status != "error") {}
			$('.lastUpdt1').html("Last updated at "+localStorage.getItem("FinTime"));			
            //var model = new mPassbookViewModel(param);       
            ko.applyBindings(self, $(".content").get(0));                   
        });
	};
	
	self.Rdsummarypage = function(id){
		self.RDSummaryList.removeAll();
		var acntobj = accountListRD();
					$(acntobj).each(function(index, obj) {
						if(index == id){
							self.RDSummaryList.push(obj);
						}
					});
		window.location.hash = "#mPB_RD_Summary";
		$("#contentData").load("Views/mPassbook/mPB_RD_Summary.html", null, function (response, status, xhr) {
            if (status != "error") {}
			$('.lastUpdt1').html("Last updated at "+localStorage.getItem("FinTime"));			
            //var model = new mPassbookViewModel(param);       
            ko.applyBindings(self, $(".content").get(0));                   
        });
	};
	
	self.RDstatement = function(rdNo){
		//window.location.hash = "#RDstatement";
		var shortName = 'DIGI_STATEMENT';
	        var version = '1.0';
	        var displayName = 'DIGI_STATEMENT';
	        var maxSize = 100000; //  bytes
	        var DEMODB = openDatabase(shortName, version, displayName, maxSize);
			var acnt = booksStore(rdNo); 
			var query = "SELECT * FROM RD_STATEMENT WHERE TXN_ACNTNO = '"+acnt+"' ORDER BY TXN_DATE DESC;";
			
				DEMODB.transaction(function(transaction){
					transaction.executeSql(query, [], function(tx, results){
						//console.log('updated query for specific search length 0');
						//alert(results.rows.length);
						if(results.rows.length == 0){
							if(window.navigator.onLine){
								hash = makeid();
									busyInd.show();
										setTimeout(function(){
											var invocationData = {
												adapter : "mPassbookRDStatement",
												procedure : "RDStatementInquiryWrapperService_inquireRDStatement",
												parameters : [rdNo,'',localStorage.getItem("CstmID")],
												compressResponse : true
											};
											WL.Client.invokeProcedure(invocationData, {
												onSuccess : RDstatementSuccess,
												onFailure : AdapterFail,	    		
												timeout: timeout
											});
										},500);
							}
							else{ 
								RDListMpassbook.removeAll();
								navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK"); 
							}							
						}
						else{
							busyInd.show();
							SelectRDData(acnt);
							if(window.location.hash != "#RDstatement"){
								window.location.hash = "#RDstatement";
								setTimeout(function(){
									setTimeout(function(){busyInd.hide();  $('#fldAcctNo').val(currentRDno); currentRDno="";},3000);
									$("#contentData").load("Views/mPassbook/RD_Statement.html", null, function (response, status, xhr) {
										if (status != "error") {}
										$('#fldAcctNo').val(rdNo);
										$('.lastUpdt').html("Last updated at "+localStorage.getItem(rdNo));
										
										ko.applyBindings(self, $(".content").get(0));                   
									});
								},5000);
							}
							else{
								setTimeout(function(){
									busyInd.hide();
									$('.lastUpdt').html("Last updated at "+localStorage.getItem(rdNo));
								},3000);
							}
                        }                               
					}, errorHandler);              
				});
	};
	
	self.RDStatementRefresh = function(rdNo){
							if(window.navigator.onLine){
								hash = makeid();
									busyInd.show();
										setTimeout(function(){
											var invocationData = {
												adapter : "mPassbookRDStatement",
												procedure : "RDStatementInquiryWrapperService_inquireRDStatement",
												parameters : [rdNo,'',localStorage.getItem("CstmID")],
												compressResponse : true
											};
											WL.Client.invokeProcedure(invocationData, {
												onSuccess : RDstatementSuccess,
												onFailure : AdapterFail,	    		
												timeout: timeout
											});
										},500);
							}
							else{ 
								//RDListMpassbook.removeAll();
								navigator.notification.confirm("Please ensure that you have network connectivity and try again!", onNetworkCheck, "Connection Error", "OK"); 
							}							

	};

	
	RDstatementSuccess = function(result){
			invocationResult = result.invocationResult;
			ch = hash;
				Servlet = invocationResult.Servlet;
				if(ch!= Servlet){
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
/* 				if(invocationResult.VersionURL){
					verUrl = invocationResult.VersionURL.faml.url;
        				if(invocationResult.VersionURL.faml.mandatory=="Y"){
        					
        					navigator.notification.confirm(
        						""+invocationResult.VersionURL.faml.message,	
              			          checkButtonSelection4,
              			          'HDFC BANK',
              			          'Upgrade Now');
        					
        				}
        				else{
							busyInd.hide();
        				navigator.notification.confirm(
            			          //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
        						""+invocationResult.VersionURL.faml.message,	
        						   checkButtonSelection3,
            			          'HDFC BANK',
            			          'Upgrade Later,Upgrade Now');
        				} 
        		}
 */			//console.log("response  "+JSON.stringify(invocationResult));
			if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					window.location.hash = '#mPassbook01';
					return false;
				}
				if(invocationResult.Envelope.Body.inquireRDStatementResponse['return'].transactionStatus.replyCode == "0"){
					if(invocationResult.Envelope.Body.inquireRDStatementResponse['return'].installmentDetails){	
						var rdAccountNumber = invocationResult.Envelope.Body.inquireRDStatementResponse['return'].rdAccountNumber;
						prePopulateRD(invocationResult,rdAccountNumber);
						if(window.location.hash != "#RDstatement"){
							window.location.hash = "#RDstatement";
							setTimeout(function(){
								setTimeout(function(){busyInd.hide(); $('#fldAcctNo').val(currentRDno); currentRDno="";},3000);
								$("#contentData").load("Views/mPassbook/RD_Statement.html", null, function (response, status, xhr) {
									if (status != "error") {}
									$('#fldAcctNo').val(rdAccountNumber);
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
									var hour    = today.getHours();
									var minute  = today.getMinutes();
									var seconds = today.getSeconds();  
									todays = dd+'/'+mm+'/'+yyyy;
									if(hour<10) {
										hour='0'+hour
									} 
									if(minute<10) {
										minute='0'+minute
									} 
									if(seconds<10) {
										seconds='0'+seconds
									} 
									time= hour+":"+minute+":"+seconds;
								//	$('.lastUpdt').html("Last updated at "+todays+" "+time);	
								    $('.lastUpdt').html("Last updated at "+localStorage.getItem("FinTime"));
									//localStorage.setItem(rdAccountNumber,todays+" "+time);
									
									localStorage.setItem(rdAccountNumber,localStorage.getItem("FinTime"));
									ko.applyBindings(self, $(".content").get(0));                   
								});
							},5000);
						}
						else{
								setTimeout(function(){
									busyInd.hide();
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
									var hour    = today.getHours();
									var minute  = today.getMinutes();
									var seconds = today.getSeconds();  
									todays = dd+'/'+mm+'/'+yyyy;
									if(hour<10) {
										hour='0'+hour
									} 
									if(minute<10) {
										minute='0'+minute
									} 
									if(seconds<10) {
										seconds='0'+seconds
									} 
									time= hour+":"+minute+":"+seconds;
									//$('.lastUpdt').html("Last updated at "+todays+" "+time);
									$('.lastUpdt').html("Last updated at "+localStorage.getItem("FinTime"));									
									//localStorage.setItem(rdAccountNumber,todays+" "+time);
									localStorage.setItem(rdAccountNumber,localStorage.getItem("FinTime"));
								},3000);
						}
					}
				}
				else{
					RDListMpassbook.removeAll();
					alert("We apologize this facility is temporarily unavailable.Please try later.");
					busyInd.hide();
				}
			}
			else{busyInd.hide();}
				
	};
	
	self.showSelectedRDAccount = function(){
        selaccno = self.selAccount();
		if(currentRDno){
			selaccno = currentRDno;
		}
        accdata = accountListRD();
        if(selaccno != '' && selaccno != null && selaccno != undefined){
			$(accdata).each(function(index, accnodet) {
				if(accnodet.codacctno == selaccno){
        			selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.codacctno, acctbalance: accnodet.RddepositBal, acctType: accnodet.acctType, currency : accnodet.Currency});
                	var currAccData = selectedAccount();
                    curraccbalval = currAccData.currency+" "+currAccData.acctbalance;
        	    	self.curraccbalval(curraccbalval);
					self.RDstatement(selaccno);
					if(currentRDno){
						$('#fldAcctNo').val(currentRDno);
					}
        		}
			});
        } 
		
		setTimeout(function(){busyInd.hide();},5000);
    };
	
	
	
}; 
function onNetworkCheck(){
	return ;
}
function onNetworkCheck2(){
	window.location.hash = '#mPassbook01';
	getsmsNo();
	return;
}
	smssend = function(){
		var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000000000)};
		today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			
			if(dd<10) {
				dd='0'+dd
			} 

			if(mm<10) {
				mm='0'+mm
			} 
		var hour    = today.getHours();
		var minute  = today.getMinutes();
		var seconds = today.getSeconds();  
		var datetoday = yyyy+"-"+mm+"-"+dd;
		if(hour<10) {
			hour='0'+hour
		} 
		if(minute<10) {
			minute='0'+minute
		} 
		if(seconds<10) {
			seconds='0'+seconds
		} 
		var time= hour+":"+minute+":"+seconds;
			reqParams = {};
			reqParams["pno"] = "91"+tempsmsmobno;
			reqParams["msgtxt"] = tempsmsname;
			reqParams["sdate"] = datetoday+" "+time;
			reqParams["msgid"] = randomScalingFactor();
			reqParams["msgtype"] = "S"; 
			var invocationData = {
                    adapter : "mPassbook_SMS_Send",
                    procedure : "getSMS1",
                    parameters : [reqParams],
                    compressResponse : true
            };
           
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : smssendSuccess = function(res){console.log(res);},
                onFailure : smssendfail = function(res){console.log(res);},               
                timeout: 300000
            });
	};

	getsmsNo = function(){
		var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000)};
		var invocationData = {
                    adapter : "mPassbook_Get_Cust_Mob",
                    procedure : "FLEX_CDI_ConnectMQ",
                    parameters : ['','',booksStore(tempcustidsms),randomScalingFactor()],
                    compressResponse : true
            };
           
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : getsmsNoSuccess = function(result){
					console.log(result);
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful){
						if(invocationResult.Envelope.Body.customerdetails.custdetails){
							tempsmsname = invocationResult.Envelope.Body.customerdetails.custdetails.namfullcust;
							tempsmsmobno = invocationResult.Envelope.Body.customerdetails.custdetails.mobno;
							smssend();
						}
					}
				},
                onFailure : getsmsNofail = function(res){console.log(res);},               
                timeout: 300000
            });
	};
	
	    function checkButtonSelection3(iValue){
      	  if (iValue == 2){
      		  //console.log('inside upgrade');
      		window.open(verUrl, '_system');  
      	      }
      	  else if(iValue == 1){
      		navigator.notification.confirm(
			          "Dear Customer, Remember to upgrade your App to get the New Transactions.",
			          checkButtonSelection2,
			          'Message',
			          'OK');
      	  }
      	  }
        
        function checkButtonSelection4(iValue){
        	 if (iValue == 1){
        		window.open(verUrl, '_system');  
        	 } 
        }
