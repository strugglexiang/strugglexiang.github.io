

var ssousuo=getQueryString("search_text");
//console.log(ssousuo);
var sousuobox=document.querySelector(".sousuosection div>ul");
//console.log(sousuobox);
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{search_text:ssousuo},

function(error,datajson){
	var obj=JSON.parse(datajson).data;
//	console.log(obj);
    for(var i=0;i<obj.length;i++){
    	sousuobox.innerHTML+=
    	`
         <li class="sousuoremenli">
	                		 <a href="商品详情.html?goods_id=${obj[i].goods_id}" >
	                		   <p id="sousuoremenlispan">${obj[i].goods_name}</p>
	                		   <img src="${obj[i].goods_thumb}"/>
	                		   <p id="sousuopp">
	                		    ${obj[i].goods_desc}
	                		   </p>
	                		   <p id="sousuoprice">￥${obj[i].price}</p>
		                	 </a>		                	 
         </li>
        
        
    	`
    }
})
