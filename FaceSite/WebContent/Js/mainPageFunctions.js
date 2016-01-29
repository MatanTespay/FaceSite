
function getDataForAllUsers() {
	$("#pUserList").empty();

    $.ajax({
        url: "getAllUsersHandler.jsp",     
		dataType: "json",
		data: 'userName='+currentUserId, 
        success: function(data) {  
        	
				$.each(data, function(j, item) {
					var str = item.name;
					$("#pUserList").append("<li><a href=MainProfile.jsp?user="+item.user+"&catagory="+item.catagory+">"+str+"</a></li>");
			});
			 
        },
        error: function(e) {
			alert("error in getting users!");
        }
    });

}

function getOnlineFriends() {
	//get online friends
	
	$("#friendsList").empty();
	//$("#pFriendList").empty();
    $.ajax({
        url: "getFriendsHandler.jsp",     
		dataType: "json",
		data: 'userName='+currentUserId, 
        success: function(data) {  
        	
				$.each(data, function(j, item) {
				// console.log(item.fname + " " + item.lname);
				if (item.isOnline) {
					var str = item.FullName;
					var res = str.split(" ");

					$("#friendsList").append(
							"<li><a href=MainProfile.jsp?user=" + item.username
									 + "&catagory=Friends>" + str
									+ "</a></li>");
					//fill online friends on profile
					//$("#pFriendList").append("<li><a href=MainProfile.jsp?user="+item.username+">"+str+"</a></li>");

				}

			});
			 
        },
        error: function(e) {
			alert("error in getOnlineFriends!");
        }
    });

}

function getOnlineFriendsForUsers(userid) {
    	//get online friends
    	$("#pFriendList").empty();
        $.ajax({
            url: "getFriendsForUsers.jsp",     
    		dataType: "json",
    		data: 'userName='+userid+'&connectedUser='+currentUserId, 
            success: function(data) {  
            	
            		//alert(data.length);
            		
            		if(data.length == 0){
            		
            			if(userid == currentUserId)
            			$("#pFriendList").append("<li>You dont have friends yet...</li>");
            			else
            			$("#pFriendList").append("<li>this user dont have friends yet...</li>");
            		}
            		else{
            			
            			$.each(data, function(j, item) {
            				// console.log(item.fname + " " + item.lname);
            				if (item.isOnline) {
            					var str = item.FullName;
            					if(item.isFriend=="Yes")
            					//fill online friends on profile
            						$("#pFriendList").append("<li><a href=MainProfile.jsp?user="+item.username+"&catagory=Friends"+">"+str+"</a></li>");
            					else
            						$("#pFriendList").append("<li><a href=MainProfile.jsp?user="+item.username+"&catagory=Others"+">"+str+"</a></li>");

            				}

            			});
            		}
            		
    				
    			 
            },
            error: function(e) {
    			alert("error in getOnlineFriends!!!!!");
            }
        });
    }

function addFriend(element){
	var friendName =$(element).data("data-user");
	
	if(friendName){
	
		$.ajax({
			url:'insertFriendHandler.jsp',
			async: false,
			type: 'POST',
			datatype: 'json',
			// currentUserId is value from the page, need to set in every page
			data: 'user=' + currentUserId + '&friend=' + friendName ,
			success: function(data){
				
				 	if(data && data.result){
				 	
				 		getOnlineFriends();
				 		getOnlineFriendsForUsers(friendName);
				 		
				 	}
				 	else{
				 		alert('Opps..!!');
				 	}
			},
			error: function(e) {
				alert("error in ajax adding friend");
			}
		});
		
	}
	
	
	
}

function addComment(e, input,postId){
	var content = $("#addCommet_"+postId).val();
	
	$.ajax({
		url:'insertCommentHandler.jsp',
		async: false,
		type: 'POST',
		datatype: 'json',
		data: 'post=' + postId + '&content=' + content + '&userName='+currentUserId ,
		success: function(data){
			
			 	if(data.result){
			 		
			 		$("#existingComments_"+postId).empty();
			 		$("#addCommet_"+postId).val('');
			 		
			 		getComments(postId);
			 	}
			 	else{
			 		alert('Opps..!!');
			 	}
		},
		error: function(e) {
			alert("error in ajax adding comment");
		}
	});
	
	
}

function getAllUsers(userName){
	
	
	$("#autocomplete").catcomplete(
			{
				// source function of autocomplete to get custom data
				source : function(request, response) {
					
					var p = $.ui.autocomplete.escapeRegex(request.term);
					//the array that holds the result of all users we need
					var result = [];
					
					$.ajax({
						url:'searchHandler.jsp',
						async: false,
						type: 'POST',
						datatype: 'json',
						data: 'prefix=' + p + '&userName=' + userName ,
						success: function(data){
							
							 $.each(data, function(j,item) {
								 result.push({ label: item.FullName, value: item.username,  Category : item.Category  });
								
								});
							 	
						},
						error: function(e) {
							alert("error in ajax getAllUsers");
						}
					});
					
		            //send the result array to the callback function of the source function to handle the data				            
		            response(result);

				},
				//min number of chars to fire the autocomplete function
				minLength : 1,
				// select function handle select event of item in the list
				select : function(event, ui) {
						//set label (name of user) in the input field
				      $('#autocomplete').val(ui.item.label); 
				      
				      //open page profile of friend
				      window.open("MainProfile.jsp?user="+ui.item.value+ "&catagory="+ui.item.Category, "_self");
				      
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


function setAddBtn(isFriend,theuser){
	
	if(isFriend === "Friends"){
	
		$("#imgAddFriend").css("display","none");
	}
	else{
		
		if(theuser == currentUserId){
			
			$("#imgAddFriend").css("display","none");
			
		}
		else{
			
			$("#imgAddFriend").css("display","inline");
			
		}
		
	}
	
}

function checkForNewComments(array){
	var postId = array[0];
	if(postId){
		//$("#existingComments_"+postId).empty();
		//console.log('post id -> ' + postId );
		//getComments(postId);	
		
	

	var comments = $("#existingComments_"+postId).children();
	var commentsIds = [];
	
	if(comments){
		//get the ids of all post in the div
		for (var i = 0; i < comments.length; i++) {
			var idx = comments[i].id;
			commentsIds.push( idx );
		}
		
		getComments(postId,commentsIds.toString());
		
	}
	
	}
}

function onCommentEnter(e, input,postId){
	
	var code = (e.keyCode ? e.keyCode : e.which);
	   if(code == 13) { //Enter keycode
		   addComment(e, input,postId);
	 }
	
}


function getPostDeatails(params){
	
	var postData = 'userName=' + currentUserId;
	if(params == undefined)
		$('#postList').empty();
	else{
		postData += '&postIds='+params;		
	}

	
	var htmlString = "";
    $.ajax({
		url: 'getFriendsPostsHandler.jsp',     
		dataType: "json",	
		async: false,
		type: 'POST',
		data: postData,
		success: function(data) {  
		 $.each(data, function(i, value) {
			
			var btnID = "#toggle_comment_"+value.postId;
			var divID = "post_" + value.postId;
			var inputId = "addCommet_"+value.postId;
			var existingCommecntDiv = "#existingComments_"+value.postId;
			
			
			htmlString =  "<div id='post_" + value.postId+ "' class='post_class'>" +
								"<div class='post_title>" +
									"<a href='#'><img src="+value.profilePic +" class='pic_post' border='1px'></a>" + 				
									"<span class='userName'>" + value.FullName + "</span><span>says:</span>"+ 
									"<div class='dateTitle'>" + value.date + "</div>" +
								"</div>" +
								"<div id='post_Content_1' class='post_Content'>"+ value.content + "</div>"+
								"<div id='postAction'><a href='javascript:void(0);'><img  id='likeBtn_"+value.postId +"' onmouseover='this.src=\"Pics/thumb.png\";' onmouseout='this.src=\"Pics/thumb-hover.png\";'  src='Pics/thumb-hover.png' class='likePic'  ></a><a id='toggle_comment_"+value.postId+"' onclick='setCommentsDiv(\""+btnID+"\",\" "+ existingCommecntDiv +"\",\""+value.postId+"\");' href='javascript:void(0);' >show comments</a></div>" 
								+"<div class='' id='comments_div_"+value.postId+"' >" +
									"<div id='existingComments_" + value.postId +"' style='display:none'>" +
								"</div>" +
								"<div id='newCommentDiv_"+value.postId+"' style='display:none'><input type='text' id="+inputId + " size='50' style='margin-right:5px;' onkeypress='onCommentEnter(event,this,"+value.postId +");'><a href='javascript:void(0);' class='cmtBtn' onclick='addComment(event,this,"+value.postId +")'>comment</a></div>" +
						  "</div>";	
			
					var id = "#"+ divID;
					if(params == undefined){
		
						$('#postList').append(htmlString);
						//$(id).effect( "highlight", {color:"#ffff99"}, 3000 );
					
					}
					else{
						$('#postList').prepend(htmlString);
						$(id).effect( "highlight", {color:"#ffff99"}, 2000 );
						
					}
					
					
					});
		},
		error: function(e) {
			alert("error in getPostDeatails!!!!!");
		}
	});
    
   
}


function checkForNewPost(array){
	
	//post_   string.substr(start,length);  str.lastIndexOf("_");

	var posts = $("#postList").children();
	var potstIds = [];
	
	if(posts){
		//get the ids of all post in the div
		for (var i = 0; i < posts.length; i++) {
			var idx = posts[i].id.substr(posts[i].id.lastIndexOf("_") + 1);
			potstIds.push( idx );
		}
		
		getPostDeatails(potstIds.toString());
		//existingpost
	}
	
}

function getComments(postId,comments){
	var data = 'post=' + postId;
	if(comments != undefined){
		data += '&CommentIds='+ comments;		
	}
	
	var result = false;
	var htmlString = "";
        $.ajax({
			url: "getCommentHandler.jsp",     
			dataType: "json",
			data: data,
			async: false,
			success: function(data) {
			 var divID = '#existingComments_'+postId;			
					
					for (var i = 0; i < data.length; i++) { 
						
						//var divID = '#comments_div_'+value.postId;	
						//console.log((users[j].fname + " " + users[j].lname));
						htmlString =  "<div id='"+data[i].commentId+"' class='comment_class'><div class='comment_title'><a href='#'><img class='images_size' src="+
						data[i].pic +" class='pic_post' border='1px'></a><span class='userName'>" 
						+ (data[i].FirstName + " " + data[i].LastName) + "</span><span>: " +data[i].content +"</span></div></div>"; 
						//$('#post_'+postId).append(htmlString);
						
						if(comments != undefined){
							$(divID).prepend(htmlString);
							$('#'+data[i].commentId).effect( "highlight", {color:"#ffff99"}, 3000 );
						}
						else{
							$(divID).append(htmlString); 
						}
					
					}
					/*var inputId = "addCommet_"+postId;
					$(divID).append("<div id='newCommentDiv'><input type='text' id="+inputId + " size='60' style='margin-right:5px;' >" + "<a href='javascript:void(0);' class='cmtBtn' onclick='addComment("+postId +")'>comment</a></div>");
					*/
					//set inteval to refresh the commects
					if(data && data.length > 0){
						result = true;
						
					}
					
			},
			error: function(e) {
				alert("error in getComments!");
			}
		});
        
        return result;
}

function showComments(value){
//console.log(value);
getComments(value);
}

function getFullName(userId)
{
	$('#fullName').empty();
			$.ajax({
			url: "ProfileHandler.jsp",     
			dataType: "json",
			data: 'userName='+userId,
			success: function(data) {  
				var span = $('<span />').attr("id","userName").data( "data-user", data.username ).html(data.FirstName+" "+data.LastName);
				
				$('#fullName').append(span);
				//$('#fullName').append(data.FirstName+" "+data.LastName+ "<span id='imgAddFriend'><img onclick='addFriend("+ data.username +")' src='Pics/addUserBig.png'></span>");

			},
			error: function(e) {
				alert("error in getFullName!");
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

function getPictures(userId){
	var htmlString = "";
	 $('.profilePics').empty();

			$.ajax({
			url: "ProfileHandler.jsp",     
			dataType: "json",
			data: 'userName='+userId,
			success: function(data) {  
					htmlString =  "<img class=cover src="+data.cover+">"+
					 "<img class=profile src="+data.profile+">";
					 $('.profilePics').append(htmlString);
			},
			error: function(e) {
				alert("error in getPictures!");
			}
		});
	
}

function getMsgData(){
	
	$.ajax({
			url: "MessageHandler.jsp",     
			dataType: "json",
			data: 'userName='+currentUserId,
			success: function(data) {  
					$.each(data, function(i, msg) {
						$("#msgDropDown table").append('<tr><td class="td_text"><span><b>' + msg.FirstName + " " + msg.LastName + ': </b></span></td><td class="td_text">' 
								+ msg.content + '</td></tr>');
						
					});
			},
			error: function(e) {
				alert("error in msg data!" + e);
			}
		});
		
}

function getNotifData(){
	$.ajax({
			url: "NotifHandler.jsp",     
			dataType: "json",
			data: 'userName='+currentUserId,
			success: function(data) {  
					$.each(data, function(i, notif) {
						$("#NotifDropDown table").append('<tr class="border_bottom"><td class="td_text"><span>' + notif.content + '</span></td></tr>');
							//$("#NotifDropDown ul").append("<li>"+ notif.content +"</li>");
						});

			},
			error: function(e) {
				alert("error in getNotifData!" + e);
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
  $(list).next().css('dispaly','inline');
  $(list).next().show(); //show the next element - the new comment div
  $(btn).addClass("active");
  $(btn).text('hide comments');
}
function hideComments(btn,list) {
  $(list).fadeOut("slow");
  $(list).next().css('dispaly','none');
  $(list).next().hide(); //hide the next element - the new comment div
  $(btn).removeClass("active");
  $(btn).text('show comments');
}

function setCommentsDiv(btn, list,postId){
	
	
	  if ( $(btn).hasClass("active") ){
		  //clear the dialog
		
		//hide the dialog
		hideComments(btn,list);
		
		
		  
		interval.clear(postId);
		//unbind the event listener which closes the diaolg when nedded to the document.
		//event is not nedded since the dioalg is closed.
		//unbindClickOutsideComments();
	  }
	  else {
		//get data to show in dialog.
		$(list).empty();	
		
		//get a boolean result indicating if post has comments
		var hasComments = getComments(postId);
		//show the dialog
		expandComments(btn,list);

		//if post has commennts set interval to check foe new comments
		  
		 interval.make(checkForNewComments, 10000, [postId]);
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


function customAutoComplete(){
	
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
	    _create: function() {
	      this._super();
	      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	    },
	    _renderMenu: function( ul, items ) {
	      var that = this,
	        currentCategory = "";
	      $.each( items, function( index, item ) {
	        var li;
	        if ( item.Category != currentCategory ) {
	          ul.append( "<li class='ui-autocomplete-category'>" + item.Category + "</li>" );
	          currentCategory = item.Category;
	        }
	        li = that._renderItemData( ul, item );
	        //<img  id='likeBtn_"+value.postId +"'  src='Pics/thumb-hover.png' >
	        if ( item.Category ) {
	          li.attr( "aria-label", item.Category + " : " + item.label );
	        }
	      });
	    },
	    
	    _renderItem: function( ul, item ) {
	    	var li = $( "<li>" );
	    	
	    	if ( item.Category != 'Friends') {
		           li.attr( "aria-label", item.Category + " : " + item.label );
		           li.attr( "data-value", item.value ).append( item.label ).append(
		        		  "<img  src='Pics/adduser.png' style='float: right; display:inline '>"
		        		   ).appendTo( ul );
		    }
	    	else{
	    		li.attr( "aria-label", item.Category + " : " + item.label );
	    		li.attr( "data-value", item.value ).append( item.label ).append(
		        		  "<img  src='Pics/forward.png' style='float: right;  display:inline'>"
		        		   ).appendTo( ul );
	    	}
	    	 
	    	return li;
	    	}
	    
	    
	    
	  });
}

$(document).ready(function(){
	$( document ).on( "mousemove", function( event ) {
	pageX= event.pageX ; pageY= event.pageY;
	});
	
	
	getPostDeatails();
	
	
	getOnlineFriends();
	
	setInterval(getOnlineFriends,8000);
	
	setDialog('#msg', '#msgDropDown');
	setDialog('#notif', '#NotifDropDown');
	
	
	customAutoComplete();
	
	interval.make(checkForNewPost, 10000, []);
	
});


	
