////시작 화면에 배치되어있는 두 버튼////

var btn_info=document.getElementById("btn_info"); // 안내 버튼
var btn_start = document.getElementById("btn_start"); // 게임 시작버튼


////안내 버튼 클릭 시 나타나는 창에 관련된 변수////

var infoBackDiv = document.getElementById("infoBackDiv");
//start 화면에서 안내 버튼을 클릭하였을 경우 나타나는 div의 가장 상위 div
var close_info = document.getElementById("close_info");
// 안내 버튼 창을 띄웠을 때 창을 종료하기 위한 버튼
var howToPlay = document.getElementById("howToPlay");
//안내 버튼 창의 게임 방법 버튼
var info_for_game =document.getElementById("info_for_game");
//안내 버큰 창의 게임 정보 버튼

////안내버튼 창의 게임 방법을 클릭 하였을 때 나오는 div창////
var HTP = document.getElementById("HTP"); 
//게임 방법에 대한 정보를 가지고 있는 div의 최상위 div
var close_howToPlay = document.getElementById("close_howToPlay");
//게임 방법 창을 끄고자 할 때 사용하는 버튼


////안내 버튼 창의 게임 정보를 클릭하였을 때 나오는 div 창////
var info_game = document.getElementById("info_game");
//게임 정보에 대한 데이터를 가지고 있는 div의 최상위 div
var close_game_info =document.getElementById("close_game_info");
// 게임 정보 창을 끄고자 할 때 사용하는 버튼

btn_start.addEventListener("click",
    function(){
        location.href="../play/Play.html";
        //게임시작 버튼 클릭 시 게임 진행 화면으로 이동
});

btn_info.addEventListener("click",
    function(){
        //div 창을 이용해서 안내 버튼창을 띄운다
        infoBackDiv.style.display="block";
});
close_info.addEventListener("click",function(){
    // 클릭 시 안내 버튼 창을 닫는다.
    infoBackDiv.style.display="none";
});

howToPlay.addEventListener("click",function(){
    //안내 버튼 창의 게임 방법을 클릭하였을 경우 게임 방법에 관한 정보
    //가지고 있는 div창을 출력한다.
    infoBackDiv.style.display="none";
    HTP.style.display="block";
});
info_for_game.addEventListener("click",function(){
    //안내 버튼 창의 게임 정보를 클릭하였을 경우 게임 정보에 관한
    //데이터를 가지고 있는 div창을 출력한다.
    infoBackDiv.style.display="none";
    info_game.style.display="block";
});
close_howToPlay.addEventListener("click",function(){
    //게임 방법 관련 정보를 나타내고 있는 창을 닫는다
    HTP.style.display="none";
});
close_game_info.addEventListener("click",function(){
    //게임 정보 관련 데이터를 나타내고 있는 창을 닫는다.
    info_game.style.display="none";
});