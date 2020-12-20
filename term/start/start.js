var infoBackDiv = document.getElementById("infoBackDiv");
var close_info = document.getElementById("close_info");
document.getElementById("btn_info").addEventListener("click",
    function(){
        //div 창을 이용해서 게임진행 방법을 안내하는 img를 보여준다.
        infoBackDiv.style.display="block";
});
close_info.addEventListener("click",function(){
    infoBackDiv.style.display="none";

});
document.getElementById("btn_settings").addEventListener("click",
    function(){ // 설정 창을 띄우는 버튼
        /*
        dive창을 사용하여 음소거 등의 기능을 하는 작은 창을 구현한다.
         */

});
document.getElementById("btn_start").addEventListener("click",
    function(){
        location.href="../play/Play.html";

        /*
        게임시작 버튼 클릭 시 게임 진행 화면으로 이동
        틀만 구현 해두었기 때문에 html로 화면전환을 할지, 
        게임 진행 창에서 div를 사용하여 화면위에 잠시 띄울 지 고민중이다.
         */ 


});

