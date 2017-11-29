//验证登录显示的span
var yanzhengdenglu=document.querySelector("#yazhengdenglu");
//console.log(yanzhengdenglu)；
if(localStorage.username){
	yanzhengdenglu.innerHTML=
	`
	 <span style="color:red">用户名:&nbsp;&nbsp;&nbsp;&nbsp;${localStorage.username}</span>
	 &nbsp;&nbsp;&nbsp;&nbsp;
	 <a href="javascript:localStorage.clear(); location.reload();">退出</a>`
}else{
	localStorage.backurl=location.href;
	yanzhengdenglu.innerHTML=
	`
	<a href="登陆界面.html" name="login" >亲,请登录</a>
						&nbsp;&nbsp;
	<a  href="注册页面.html" name="register">免费注册</a>
						&nbsp;&nbsp;
	`
}
