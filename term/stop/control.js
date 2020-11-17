var stopBtn = document.getElementById("btn_stop");
//clear.html의 정지 버튼
var FstopBtn = document.getElementById("btn_stop_fail");
//fail.html의 정지버튼
var keepBtn = document.getElementById("btn_keep");
//clear.html의 계속진행 버튼
var replayBtn = document.getElementById("btn_replay");
//fail.html의 다시하기 버튼


stopBtn.addEventListener("click",function(){
    /*
    성공 시 종료하기 버튼을 누르면 더 이상 게임을 진행하지 않는다. 
    */
});

FstopBtn.addEventListener("click",function(){
    /*
    성공 시 종료하기 버튼을 누르면 더 이상 게임을 진행하지 않는다. 
    */
});

keepBtn.addEventListener("click",function(){
    /*
    실패시 종료하기 버튼을 누르면 더 이상 게임을 진행하지 않는다. 
    */
});

replayBtn.addEventListener("click",function(){
    /*
    실패 시 다시하기 버튼을 누르면 1단계부터 게임을 다시 진행한다.  
    */
});

function clearAll(){
    /*
     종료하기 버튼을 누르거나 다시하기 버튼을 눌렀을 경우 저장했던 모든 정보들을 초기화 한다. 
     */
}