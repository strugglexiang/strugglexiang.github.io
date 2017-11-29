		     	var remenUl=document.querySelector(".remenshangping ul");
//		     	console.log(remen);
                var canshu=getQueryString("cat_id");
                myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:canshu},function(error,datajson){
                	var obj=JSON.parse(datajson).data;
//              	console.log(canshu);
                    console.log(obj);
                    if(canshu!=null){
                    	var remenbiaoti=document.querySelector(".remenshangping>h1");
                    	remenbiaoti.style.display="none";
                    }
                    if(obj==false){
                    	remenUl.innerHTML=`<h1 id="meiyoushuju">我们的杜老师没给数据</h1>`
                    	return;
                    }
                    
                	for (var i=0;i<obj.length;i++) {
//              		console.log(obj[i]);
                		remenUl.innerHTML+=
                		`
                		<li class="remenli">
	                		 <a href="商品详情.html?goods_id=${obj[i].goods_id}" >
	                		   <p class="remenlispan">${obj[i].goods_name}</p>
	                		   <img src="${obj[i].goods_thumb}"/>
	                		   <p class="remenpp">
	                		    ${obj[i].goods_desc}
	                		   </p>
	                		   <p class="remenprice">￥${obj[i].price}</p>
		                	 </a>		                	 
                		</li>
                		`
                	} 
                	function getQueryString(name) {
						  var search = location.search.substr(1);
						  //abc=123&a=&ccc=abc
						  //(^|&)   (&|$)
						  //abc=([^&]*)
						  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
						  var result = search.match(reg);
						  // if (result === null) return null;
						  // return decodeURIComponent(result[2]);
						  return result === null ? null : decodeURIComponent(result[2]);
		           }
                	/*
                	//li覆盖滑动效果,失败了
                    var remenLi=document.getElementsByClassName("remenli");
                    var remenLiSpan=document.getElementsByClassName("remenlispan");
                    for(i=0;i<remenLi.length;i++){
//                  	console.log(remenLiSpan[i])
                    	(function(i){
                    		remenLi[i].onmouseover=function(){
                    			jieliu(function(){
                    				remenLiSpan[i].style.display="block";
                                    animate(remenLiSpan[i],{"height":"50"},200);
                    			},50);
                    		}
                    		//
                    		remenLi[i].onmouseout=function(){
                                  jieliu(function(){
                                  	 animate(remenLiSpan[i],{"height":"0"},200,
	                                  	 function(){
	                                  	 	remenLiSpan[i].style.display="none";
	                                  	 }
                                  	 );
                                  },300)
                    	    }
                    	})(i)
                    }
                    */
                    
                })
