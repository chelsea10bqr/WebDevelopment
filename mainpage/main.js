/*set the counter for each picture post cycle, and set a array variable timer to setInterval for pictures*/
var counter = [0,0,0];
var timer = [setInterval(function(){cycle(0)},1000*randgenerator()),setInterval(function(){cycle(1)},1000*randgenerator()),setInterval(function(){cycle(2)},1000*randgenerator())]

function randgenerator(){
	var rand = Math.floor(Math.random() * 5 + 1);				/*set the random number for interval*/
  return rand;
}
function cycle(order){
	var temp = order+1;
  document.getElementById("image"+temp).src=imagearray[order][counter[order]++ % 3];   /*recycle the pictures array*/
}

function Switch(btnid){
	var temp=btnid.charAt(btnid.length-1);                 /*get the number of the button to decide which post need to be stopped cycling*/
	console.log(btnid);
  if(document.getElementById(btnid).innerHTML=="STOP"){
			document.getElementById(btnid).innerHTML="START";          /*change the value of button*/
  		clearInterval(timer[temp-1]);
  }else {
			document.getElementById(btnid).innerHTML="STOP";
      timer[temp-1] = setInterval(function(){cycle(temp-1)},1000*randgenerator());    /*restart the cycle*/
  }
}

/*store the image address*/
var imagearray=[["https://pbs.twimg.com/media/E8it6utXsAUVcB4.jpg","https://editorial.uefa.com/resources/0269-126618579cd5-e31c88a84f60-1000/manchester_city_v_chelsea_fc_-_uefa_champions_league_final.jpeg","https://editorial.uefa.com/resources/025a-0e9f81caa5d0-49ca1322926a-1000/frank_lampard_with_the_trophy_after_chelsea_s_2012_final_win_against_bayern.jpeg"],["https://imgsa.baidu.com/forum/w%3D580%3B/sign=a366a3dff1faaf5184e381b7bc6f95ee/4034970a304e251ff8b7ef01ab86c9177e3e5382.jpg","https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/10/16/41e9b47c-07af-11eb-afc8-92e0da0ef1c3_image_hires_155550.jpg?itok=ihKswLDq&v=1602834958","https://imgsa.baidu.com/forum/w%3D580%3B/sign=916e1c73bb4543a9f51bfac42e2c8b82/03087bf40ad162d9d0a4a09b1ddfa9ec8b13cdeb.jpg"],["http://n.sinaimg.cn/sinacn20190531s/295/w641h454/20190531/0f91-hxvzhte8543053.jpg","https://live.staticflickr.com/4462/38027768732_c70e6e2e1d_b.jpg","https://y.qichejiashi.com/tupian/upload/230300918.jpg"]];
