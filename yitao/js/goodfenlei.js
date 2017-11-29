				
				myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(error,datajson){
					var obj=JSON.parse(datajson).data;
	//				console.log(obj)
	                var fenleiul=document.querySelector(".section ul");
	                for (var i=0;i<obj.length;i++) {
	                	fenleiul.innerHTML+=
	                	`<li class="fenlei"><a href="index.html?cat_id=${obj[i].cat_id}">${obj[i].cat_name}</a></li>`
	                }
				})
