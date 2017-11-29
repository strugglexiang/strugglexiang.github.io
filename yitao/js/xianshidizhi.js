			 	 	
			 	 		function showAddress(){
			 	 			myajax.get(
			 	 				"http://h6.duchengjiu.top/shop/api_useraddress.php",
			 	 				{
			 	 					token: localStorage.token
			 	 				},
			 	 				function(error,datajson){
			 	 					var obj=JSON.parse(datajson).data;
			 	 					var ul=document.querySelector(".dizhiul");
//			 	 					console.log(obj)
                                     if(obj.length===0){
                                     	ul.innerHTML="您还没有收获地址，请添加收货地址"
                                     }else{
                                     	//正常获取收货地址后显示出来
                                       for(var i=0;i<obj.length;i++){
                                       	    (function(i){
                                       	    	 var dizhixinxi=obj[i];
                                       	    	 ul.innerHTML+=
                                       	    	 `
                                       	    	 <li id="dizhixiangshi" data-id="${dizhixinxi.address_id}">
                                       	    	    <span>收货人：${dizhixinxi.consignee}</span>
                                       	    	    <span class="shanchudizhi" id="shanchudizhi" data-id="${dizhixinxi.address_id}">删除地址</span>
                                                    <span>手机：${dizhixinxi.mobile}</span>
                                                    <span>地址：${dizhixinxi.address}</span>
                                       	    	 </li>
                                       	    	 `
                                       	    })(i)
                                       }
                                     	
                                     	//给li添加事件代理
                                     	 selected_address_id =0;
                                     	 //代表选择的LI
                                  
//                                   	console.log(dizhixianshi)
                                        ul.onclick=function(event){
                                        	event = event || window.event;
                                     
                                            var target = event.target || event.srcElement;
                                           
                                            if(target.className==="shanchudizhi"){
	                                            if(!confirm("确定要删除地址吗")){
	                                            	return;
	                                            }
                                                myajax.get(
                                                	"http://h6.duchengjiu.top/shop/api_useraddress.php",
                                                	{
                                                		status: 'delete', 
                                                		address_id:target.dataset.id,
                                                		token: localStorage.token
                                                	},
                                                	function(error,datajson){
                                                		var obj=JSON.parse(datajson);
//                                                		console.log(obj);
                                                         //如果删除成功
                                                         if(obj.code===0){
//                                                       	console.log(target.parentNode);
                                                           	target.parentNode.parentNode.removeChild(target.parentNode);
                                                         }
                                                         
                                                	}
                                                );
                                            }else{
                                            	//点击的不是删除按钮,代表的点的是LI,选择LI,
                                            	var dizhixianshi=document.querySelectorAll(".dizhiul li");//li
//                                               console.log(dizhixianshi)
                                                 for(var i=0;i<dizhixianshi.length;i++){
                                                 	dizhixianshi[i].classList.remove("selected")
                                                 }
                                                 if(target.nodeName=="LI"){
                                                 	 //
//                                               	 console.log(1)
                                                 	 selected_address_id =parseInt(target.dataset.id);
//                                               	 console.log(selected_address_id);
                                                 	 target.classList.add("selected");
                                                 }else if(target.nodeName=="SPAN"){
//                                               	console.log(0)
                                                 	selected_address_id = parseInt(target.parentNode.dataset.id);
                                                     target.parentNode.classList.add('selected');
                                                 }
                                                    

                                                    
                                            	
                                            }

												
                                            
                                        }
//                                      console.log(1)
                                        var xdd=document.querySelector("#xdd");
//                                      console.log(xdd)
                                        xdd.onclick=function(){
                                        	if(!confirm("确定要下订单吗?")){
                                        		return;
                                        	}
                                        	var address_id = selected_address_id;
									        if (address_id === 0) {
									          alert('请选择一个收货地址');
									          return;
									        }
									       
									        var total_prices = localStorage.sum;
									        myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=add', {address_id, total_prices}, function(err, responseText){
									            var json = JSON.parse(responseText);
									            console.log(json);
									            if (json.code === 0) {
									              alert('下订单成功');
									              location.href = '订单界面.html';
									            }else{
									            	alert("购物车已清空,请重新选择商品");
									            }
									        });
                                        }
                                     }
                                     
			 	 				}
			 	 			)
			 	 		}
			 	 		
			 	 		showAddress();
	