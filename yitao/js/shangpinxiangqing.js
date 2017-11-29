			    	var xiangqingdiv=document.querySelector(".goodsxiangqing");
//		     	     console.log(remen);
                    var xiangqingcanshu=getQueryString("goods_id");
                    console.log(xiangqingcanshu);
                    myajax.get("http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+xiangqingcanshu,{},
                    function(error,responseText){
                    	var obj=JSON.parse(responseText).data[0];
                    	console.log(obj);
                    	//
                    	var  goodsxiangqing=document.querySelector(".goodsxiangqing");
                    	goodsxiangqing.innerHTML+=                    	`
                    	<img src="${obj.goods_thumb}"/>
                    	<span class="span11">立即购买</span>
                    	<span class="span22">加入购物车</span>
                    	`
                    	var jiarugouwuche=document.querySelector(".span22");
//                  	console.log(jiarugouwuche);
                       //加入购物车功能
                        jiarugouwuche.onclick=function(){
                        	 if(!localStorage.username){
                        	 	alert("请先登录再加入购物车");
                        	 }
                        	 else{
                                var num=parseInt(change.innerHTML);
//                              console.log(xiangqingcanshu);
                                myajax.post(
                                	"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                                	{
                                		goods_id:xiangqingcanshu,
                                		number:num
                                	},
                                	function(error,datajson){
                                		var obj=JSON.parse(datajson);
//                              		console.log(obj.message);
                                        if(obj.message="添加到购物车成功"){
                                        	alert("添加到购物车成功");
                                            if(!confirm("是否返回首页")){
                                            	return;
                                            }
                                            location.href="index.html"
                                        }else{
                                        	alert("添加到购物车失败,请重新选择数量");
                                        }
                    
                                	}
                                )
                        	 }
                        }
                        
                        
                    	var youbianjieshao=document.querySelector(".youbianjieshao");
                    	youbianjieshao.innerHTML+=
                    	`<p>${obj.goods_name}</p>
                    	<p>${obj.price}</p>
                    	<p>${obj.goods_desc}</p>
                    	`
                       	var add=document.querySelector("#add");
				        var cut=document.querySelector("#cut");
				        var change=document.querySelector("#change");
				        add.onclick=function(){
				            var num=parseInt(change.innerHTML);
				            num++;
				            change.innerHTML=""+num;
				        }
				        cut.onclick=function(){
				        	var num=parseInt(change.innerHTML);
				        	num--;
				        	if(num<1){
				        		num=1;
				        	}
				        	change.innerHTML=""+num;
				        }
                    })
                    
          
                    
                    
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
                    
//点击按钮,数量增加


//这里写和购物车相关的功能
//加入购物车