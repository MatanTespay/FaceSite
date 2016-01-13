var _users;
var _users;
var _friends;
var currentUser = 1;
var pageX, pageY;

	
function getData() {
	//get online friends
    $.ajax({
        url: "Js/friends.js",     
		dataType: "json"	,	
        success: function(data) {  
         $.each(data.friends, function(i,item) {
						 
				if(item.userId == currentUser){
					 $.each(item.userfriends, function(k,friend) {
						 //console.log(friend.userId);
						 $.ajax({
						url: "Js/users.js",     
						dataType: "json"	,	
						success: function(data) {  
						 $.each(data.users, function(j,item) {
							//console.log(item.fname + " " + item.lname);
							if(item.userId == currentUser){
								return;
							}else{
								var name = item.fname + " " + item.lname;
								if(item.userId == friend.userId && item.isOn=="1"){ //show only online friends for index
								$("#friendsList").append("<li><a href=MainProfile.jsp?fname="+item.fname+"&lname="+item.lname+ ">"+name+"</a></li>");
								
								//getPostDeatails(item);
								}
						        if(item.userId == friend.userId) //all friends for profile + all post of friends for index
							   	  {
									$("#pFriendList").append("<li><a href=MainProfile.jsp?fname="+item.fname+"&lname="+item.lname+ ">"+name+"</a></li>");//profile
									getPostDeatails(item);
								  }
							}
							});
						},
						error: function(e) {
							alert("error in users!!!!!");
						}
					});
					});
					
				}
            });
        },
        error: function(e) {
			alert("error in friends!!!!!");
        }
    });
}


function getOnlineFriends() {
	//get online friends
	$("#friendsList").empty();
    $.ajax({
        url: "Js/friends.js",     
		dataType: "json"	,	
        success: function(data) {  
         $.each(data.friends, function(i,item) {
						 
				if(item.userId == currentUser){
					 $.each(item.userfriends, function(k,friend) {
						 //console.log(friend.userId);
						 $.ajax({
						url: "Js/users.js",     
						dataType: "json"	,	
						success: function(data) {  
						 $.each(data.users, function(j,item) {
							//console.log(item.fname + " " + item.lname);
							if(item.userId == currentUser){
								return;
							}else{
								var name = item.fname + " " + item.lname;
								if(item.userId == friend.userId && item.isOn=="1"){ //show only online friends for index
									$("#friendsList").append("<li><a href=MainProfile.jsp?fname="+item.fname+"&lname="+item.lname+ ">"+name+"</a></li>");

								}

							}
							});
						},
					});
					});
					
				}
            });
        },
        error: function(e) {
			alert("error in friends!!!!!");
        }
    });
}
//function to get all friends when we use the search input
function searchFriends () {	

	$("#autocomplete").autocomplete(
			{
				// source function of autocomplete to get custom data
				source : function(request, response) {
					
					// get all friends for data
					$.ajax({
				        url: "Js/friends.js",     
						dataType: "json"	,	
				        success: function(data) {  //main success //
				        	
				        	// set regEX to check if user name starts with the request.term -> input text
				        	var re = $.ui.autocomplete.escapeRegex(request.term);
							var matcher = new RegExp( "^" + re, "i" );
							//the array that holds the result of all users we need
							var result = [];
							
							// for each friends 
				            $.each(data.friends, function(i,item) {
								 
				            	//check the if friend is the current user 
								if(item.userId == currentUser){
									
									 //(get his friends)
									 $.each(item.userfriends, function(k,friend) {
										 
										 $.ajax({
										url: "Js/users.js",     
										dataType: "json"	,	
										async: false,
										success: function(data) { 
										 
										// when we get all his friends we check each on of the to see
										// if the name starts with the input text
										 $.each(data.users, function(j,item) {
											
											 //don't need to check the current user
											if(item.userId == currentUser){
												return;
											}else{ 
												//if the user is the friend we want to check 
												if(item.userId == friend.userId){ 
													// if the name is ok add it to the result arry
													if(matcher.test(item.fname) ){
														result.push({ label: item.fname + " " + item.lname,  value : item.userId  });
													}													
												
												}

											}
											});
										},
									});
									});
									
								}
				            });
				            
				           
				            //send the result array to the callback function of the source function to handle the data				            
				            response(result);
				        },
				        error: function(e) {
							alert("error in friends!!!!!");
				        }
				    });
					

				},
				//min number of chars to fire the autocomplete function
				minLength : 1,
				// select function handle select event of item in the list
				select : function(event, ui) {
						//set label (name of user) in the input field
				      $('#autocomplete').val(ui.item.label); 
				      
				      //open page profile of friend
				      var str = ui.item.label;
				      var res = str.split(" ");
				      window.open("MainProfile.jsp?fname="+res[0]+"&lname="+res[1] , "_self");
				     
				      //disable default action of select function (set input field to the value and not the label)
				      return false;
				},
				// focus function handle focus event of item in the list
				focus : function(event, ui) {
					//set label (name of user) in the input field
				      $('#autocomplete').val(ui.item.label); 
				    //disable default action of select function (set input field to the value and not the label)
				      return false;
				}
				
				
			});
}

function getPostDeatails(user){
	var htmlString = "";
        $.ajax({
			url: "Js/posts.js",     
			dataType: "json"	,	
			success: function(data) {  
			 $.each(data.posts, function(i, value) {
				if(value.userId != user.userId)
					return;
				var btnID = "#toggle_comment_"+value.postId;
				var divID = "#comments_div_"+value.postId;
				htmlString =  "<div id='post_" + value.postId+ "' class='post_class'><div class='post_title><a href='#'><img src="+
					user.pic +" class='pic_post' border='1px'></a>" + 
					"<span class='userName'>" + user.fname + " " + user.lname + "</span><span>says:</span>"
					+ "<div class='dateTitle'>" + value.date + "</div></div>" +
					"<div id='post_Content_1' class='post_Content'>"+ value.content + "</div>"+
					"<div id='postAction'><a href='javascript:void(0);'><img  id='likeBtn_"+value.postId +"' onmouseover='this.src=\"Pics/thumb.png\";' onmouseout='this.src=\"Pics/thumb-hover.png\";'  src='Pics/thumb-hover.png' class='likePic'  ></a><a href='javascript:void(0);'>comment</a><a id='toggle_comment_"+value.postId+"' onclick='setCommentsDiv(\""+btnID+"\",\" "+ divID +"\",\""+value.postId+"\");' href='javascript:void(0);' >show comments</a></div><div class='' id='comments_div_"+value.postId+"' style=' display:none'></div></div>";
					/* onmouseover='this.src=\"Pics/thumb.png\";' onmouseout='this.src=\"Pics/thumb-hover.png\";' src='Pics/thumb-hover.png' */
				
										
					$('#postList').append(htmlString);
				});
			},
			error: function(e) {
				alert("error in users!!!!!");
			}
		});
	
}


function getComments(postId){
var htmlString = "";
        $.ajax({
			url: "Js/comments.js",     
			dataType: "json"	,	
			success: function(data) {
			 var divID = '#comments_div_'+postId;			
			 $.each(data.comments, function(i, value) {
				if(value.postId != postId)
					return;
				 
				getUsers(postId,value.postComments, function(result) {
					var users = result.users;
					
					for (i = 0; i < value.postComments.length; i++) { 
						for (j = 0; j < users.length; j++) { 
						
							if(value.postComments[i].userId == users[j].userId){
							//var divID = '#comments_div_'+value.postId;	
							console.log((users[j].fname + " " + users[j].lname));
							htmlString =  "<div class='comment_class'><div class='comment_title><a href='#'><img class='images_size' src="+
							users[j].pic +" class='pic_post' border='1px'></a><span class='userName'>" 
							+ (users[j].fname + " " + users[j].lname) + "</span><span>: " +value.postComments[i].content +"</span></div></div>"; 
							//$('#post_'+postId).append(htmlString);
							$(divID).append(htmlString);
							
							}
						}
					}
					
				});
				 
				});
			
		  
			  
			},
			error: function(e) {
				alert("error in users!!!!!");
			}
		});
}

function showComments(value){
//console.log(value);
getComments(value);
}
function getFullName(userId)
{
			$.ajax({
			url: "Js/users.js",     
			dataType: "json"	,	
			success: function(data) {  
			 $.each(data.users, function(i, value) {
				 if(value.userId == currentUser)
					$('#fullName').append(value.fname+" "+value.lname);
				});
			},
			error: function(e) {
				alert("error in users!!!!!");
			}
		});
}


function getUsers(id,data,callback) {
    $.ajax({
        url: "Js/users.js",     
	    dataType: "json"	,
        success: callback
    });
}

function getPictures(){
	var htmlString = "";
 

			$.ajax({
			url: "Js/users.js",     
			dataType: "json"	,	
			success: function(data) {  
			 $.each(data.users, function(i, value) {
				 if(value.userId == currentUser)
				 {
					htmlString =  "<img class=cover src="+value.cover+">"+
					 "<img class=profile src="+value.pic+">";
					 $('.profilePics').append(htmlString);
				 }
				});
			},
			error: function(e) {
				alert("error in users!!!!!");
			}
		});
	
}

function getMsgData(){
	
	$.ajax({
			url: "Js/messages.js",     
			dataType: "json"	,	
			success: function(data) {  
					$.each(data.messages, function(i, data) {
						if(currentUser != data.userId){
						return;	
						}
						$.each(data.userMesseges, function(k, message) {
							$.ajax({
									url: "Js/users.js",     
									dataType: "json"	,	
									success: function(data) {  
									 $.each(data.users, function(j,user) {		
										if(user.userId == currentUser){
											return;
										}else{ 
											
											if(user.userId == message.fromUser) 
											{
												
												$("#msgDropDown table").append('<tr><td class="td_text"><span><b>' + user.fname + " " + user.lname + ': </b></span></td><td class="td_text">' + message.content + '</td></tr>');
												
											}
										}
										});
									},
									error: function(e) {
										alert("error in msg users!!!!!");
									}
							});
						});
					});
			},
			error: function(e) {
				alert("error in msg!!!!!");
			}
		});
		
}

function getNotifData(){
	$.ajax({
			url: "Js/notifications.js",     
			dataType: "json"	,	
			success: function(data) {  
					$.each(data.notifications, function(i, item) {
						if(currentUser != item.userId){
						return;	
						}
						$.each(item.userNotifications, function(k, notif) {
							$("#NotifDropDown table").append('<tr class="border_bottom"><td class="td_text"><span>' + notif.content + '</span></td></tr>');
							
							
							//$("#NotifDropDown ul").append("<li>"+ notif.content +"</li>");
						});
					});
			},
			error: function(e) {
				alert("error in msg!!!!!");
			}
		});
		
}

function expandAllOptions(btn,list) {
  $(list).toggle("fast");
  $(btn).addClass("active");
  
}

function hideAllOptions(btn,list) {
  $(list).toggle("fast");
  $(btn).removeClass("active");
}

function unbindClickOutsideTrigger() {
  $(document).off("mouseup.alloptions");
}
function bindClickOutsideTrigger(btn,list) {
  $(document).on('mouseup.alloptions',function (e){
    var container = $(list);
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
	  if(e.target.parentNode.id == $(btn)[0].id)
		return;		  
      console.log("fold up all-options");
      $(list+" table").empty();
	  hideAllOptions(btn,list);
      unbindClickOutsideTrigger();
    }
  });
}

function setDialog(btn, list){
	
	$(btn).click(function() {
	  if ( $(btn).hasClass("active") ){
		  //clear the dialog
		//$(list + ' ul').empty();
		$(list + ' table').empty();
		//hide the dialog
		hideAllOptions(btn,list);
		//unbind the event listener which closes the diaolg when nedded to the document.
		//event is not nedded since the dioalg is closed.
		unbindClickOutsideTrigger();
	  }
	  else {
		//get data to show in dialog.   
		(btn == '#msg') ? getMsgData() : getNotifData();
		//position the dialog where we want.
		var position = $(btn).position();
	    $(list).css({'top':position.top+45,'left':position.left, 'border':'1px solid black'});
		//show the dialog
		expandAllOptions(btn,list);
		//bind the event listener which closes the diaolg when nedded to the document .
		bindClickOutsideTrigger(btn,list);
	  }
	});
	
}

function expandComments(btn,list) {
  $(list).fadeIn("slow");
  $(btn).addClass("active");
  $(btn).text('hide comments');
}
function hideComments(btn,list) {
  $(list).fadeOut("slow");
  $(btn).removeClass("active");
  $(btn).text('show comments');
}

function setCommentsDiv(btn, list,postId){
	
	
	  if ( $(btn).hasClass("active") ){
		  //clear the dialog
		
		//hide the dialog
		hideComments(btn,list);
		
		
		//unbind the event listener which closes the diaolg when nedded to the document.
		//event is not nedded since the dioalg is closed.
		//unbindClickOutsideComments();
	  }
	  else {
		//get data to show in dialog.
		$(list).empty();		
		getComments(postId);
		//show the dialog
		expandComments(btn,list);

	  }
	
	
}

function unbindClickOutsideComments() {
  $(document).off("mouseup.Comments");
}
function bindClickOutsideComments(btn,div) {
  $(document).on('mouseup.Comments',function (e){
    var container = $(div);
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
	  if(e.target.parentNode.id == $(btn)[0].id)
		return;		  
      console.log("fold up all-options");
      $(div).empty();
	  hideAllOptions(btn,div);
      unbindClickOutsideTrigger();
    }
  });
}

//change picture on hover
 /*var sourceSwap = function () {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    }*/


//set nav height
function setHeight()
{
	var bodyHeight = parseInt($("body").height());
	var mainPadding =  parseInt($("#main").css("padding-bottom").replace("px", ""));
	var sectionPadding =  parseInt($("#section").css("padding").replace("px", ""));
	$("#nav").css("height", bodyHeight+65);
	//alert(bodyHeight+50);
}

function showWellcomDialog(){
	alert("ddd");
	
		var id = '#dialog';
			
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
			
		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect
		$('#mask').fadeIn(500);	
		$('#mask').fadeTo("slow",0.9);	
			
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
		              
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
			
		//transition effect
		$(id).fadeIn(2000); 	
			
		//if close button is clicked
		$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();

		$('#mask').hide();
		$('.window').hide();
		});

		//if mask is clicked
		$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
		});

}

$(document).ready(function(){
	$( document ).on( "mousemove", function( event ) {
	pageX= event.pageX ; pageY= event.pageY;
	});
	getData();
	setInterval(getOnlineFriends,5000);
	getFullName(currentUser); //for profile page
	getPictures();
	
	setDialog('#msg', '#msgDropDown');
	setDialog('#notif', '#NotifDropDown');

});


	