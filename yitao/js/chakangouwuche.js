var gouwutable=document.querySelector("#gouwutable");
//console.log(gouwutable);
myajax.get(
	"http://h6.duchengjiu.top/shop/api_cart.php",
	{
		token:localStorage.token
	},
	function(error,datajson){
		var obj=JSON.parse(datajson).data;
//		console.log(obj);
        for(var i=0;i<obj.length;i++){
            var shuliang=obj[i].goods_number;
            var danjia=obj[i].goods_price;
            var sum=shuliang*danjia;
//          console.log(sum)
        	gouwutable.innerHTML+=
        	`
        	 <tr id="zengjiatr">
				        <td id="shangpingid" data-goodid="${obj[i].goods_id}">${obj[i].goods_id}</td>
				        <td>
				            <img src="${obj[i].goods_thumb}"/>
				        </td>
				        <td><span>${obj[i].goods_name}</span></td>
				        <td id="shuliang">
				        	${obj[i].goods_number}
				        </td>
				        <td id="danjia">${obj[i].goods_price}</td>
				        <td>
				            <button id="genggai1">+</button>
				             <button id="genggai2">-</button>
				        </td>
				        <td id="xzonghe">${sum}</td>
				        <td><input type="button"  id="delete" value="删除"/></td>
				        
			</tr>
        	`
        
        }
        var genggai1=document.querySelectorAll("#genggai1");
        var genggai2=document.querySelectorAll("#genggai2");
        //获取商品数量
        var sl=document.querySelectorAll("#shuliang");
        var dj=document.querySelectorAll("#danjia");
        var xzh=document.querySelectorAll("#xzonghe");
        //获取总计元素,总计和zongjisum
        var zongji=document.querySelector("#zongji span");
        var zongjisum=0;
        //购物车
        var delete1=document.querySelectorAll("#delete");
        //获取商品ID
        var shangpingid=document.querySelectorAll("#shangpingid");
//      console.log(sl[0].innerHTML)
//      console.log(shangpingid[0].innerHTML)
        for(var z=0;z<genggai1.length;z++){
        	(function(z){
        		
        		genggai1[z].onclick=function(event){
        	 	   sl[z].innerHTML=""+(parseInt(sl[z].innerHTML)+1);
        	 	    //更新购 物车数量,其实就是更新购物车
                      myajax.post(
                                	"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                                	{
                                		goods_id:shangpingid[z].innerHTML,
                                		number:sl[z].innerHTML
                                	},
                                	function(error,datajson){
                                	   var obj=JSON.parse(datajson);
//                              	   console.log(obj);
                                	}
                      )
                     
//      	 	    console.log(xzh[z]);
                    xzh[z].innerHTML=""+parseInt(sl[z].innerHTML)*parseFloat(dj[z].innerHTML); 
                    zongji.innerHTML=parseFloat(zongji.innerHTML)+parseFloat(dj[z].innerHTML);             
        	    }
        		
        		    genggai2[z].onclick=function(){
        	 	    sl[z].innerHTML=""+(parseInt(sl[z].innerHTML)-1);
        	 	    //更新购物车
        	 	       myajax.post(
                                	"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                                	{
                                		goods_id:shangpingid[z].innerHTML,
                                		number:sl[z].innerHTML
                                	},
                                	function(error,datajson){
                                	   var obj=JSON.parse(datajson);
//                              	   console.log(obj);
                                	}
                      )
        	 	    var xxx=parseInt(sl[z].innerHTML);
        	 	    if(parseInt(sl[z].innerHTML)<1){ 	    	
        	 	    	sl[z].innerHTML="1";    
        	 	    	xzh[z].innerHTML=""+parseInt(sl[z].innerHTML)*parseFloat(dj[z].innerHTML);
        	            
        	 	    	return;
        	 	    }
//      	 	    console.log(xzh[z]);
//                  console.log(1)
                    xzh[z].innerHTML=""+parseInt(sl[z].innerHTML)*parseFloat(dj[z].innerHTML); 
                    
                    zongji.innerHTML=parseFloat(zongji.innerHTML)-parseFloat(dj[z].innerHTML);
                            
        	    }
        		    
        		      //删除购物车
            //		 console.log(delete1[z]);
                   delete1[z].onclick=function(){
                   	  if(!confirm("是否要删除购物车?")){
                   	  	 return;
                   	  }
                   	  //商品行                   	  
                   	 var tr=this.parentNode.parentNode;
                   	 //商品IDshangpingid[z].dataset.goodid
                   	 console.log("商品ID"+shangpingid[z].dataset.goodid)
                        myajax.post(
                     	"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                     	{
                     		goods_id:shangpingid[z].dataset.goodid,
                     		number:0
                     	},
                     	function(error,datajson){
                     		console.log("已经删除购物车");
                     		var obj=JSON.parse(datajson);
                     		console.log(obj);
                     		if(obj.code==0){
                     			tr.parentNode.removeChild(tr);
                     		}
                            //删除后重新计算总计
                             zongji.innerHTML=parseFloat(zongji.innerHTML)-parseFloat(xzh[z].innerHTML);
                     	}
                     );
                                         
                   } 
        	})(z) ;      	 
        }
           
          
          //第一次加载购物车,求一下总计
           	  for(var h=0;h<xzh.length;h++){
             	(function(h){
           		 zongjisum+=parseFloat(xzh[h].innerHTML);
                 zongji.innerHTML=""+zongjisum;
             	})(h)           	
              }
            
          
          //清空购物车
          var clearcat=document.querySelector("#clear-cat");
          //获取表格
          var otr=document.querySelectorAll("#zengjiatr");
//        console.log(otr.length)
//        console.log(otable)
//        console.log(clearcat);
          clearcat.onclick=function(){
               
          	     if(!confirm("要清除整个购物车吗")){
          	     	return;
          	     }
          	           //获得所有商品ID
		          for(var a=0;a<shangpingid.length;a++){
		//        	  console.log(shangpingid[a].innerText);  字符串  
		               (function(){
				            myajax.post(
				          	'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
				          	{
				          		goods_id:shangpingid[a].innerText,
				          		number:0			          		
				          	},
				          	function(error,datajson){
				          		console.log("已经清楚购物车")
				          		var obj=JSON.parse(datajson);
//				          		console.log(obj);
                                
				          	}
				          )
		               })(a)
		          }
		          
		          for(var b=0;b<otr.length;b++){
		          	(function(b){
		          		otr[b].parentNode.removeChild(otr[b]);
		          	})(b)
		          	
		          }
		          
		          //清除总价
		          zongji.innerHTML="0";
          }
          
         
           
        
	}
	        
)

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