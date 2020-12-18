var canvas = document.getElementById('backgroundCanvas');
var chance = document.getElementById('chance_div');
var score = document.getElementById('socre_div');
var playTime = document.getElementById('time_div');
var tableRow = document.getElementById('tableRow');
var imgDiv = document.getElementById("imgDiv");
var stageClearBackDiv = document.getElementById("stageClearBackDiv");
var stageClear_scoreDiv = document.getElementById("stageClear_scoreDiv");
var stageClear_quit = document.getElementById("stageClear_quit");
var stageClear_keepGoing = document.getElementById("stageClear_keepGoing");
var stageFailBackDiv = document.getElementById("stageFailBackDiv");
var stageFail_scoreDiv = document.getElementById("stageFail_scoreDiv");
var stageFail_quit = document.getElementById("stageFail_quit");
var stageFail_restart = document.getElementById("stageFail_restart");

var tablekeys = document.getElementsByClassName("tablekeys");
var nextStageNum=1;
var arrowArr = new Array(); // 변경되는 값을 저장
var chanceCount =3;
var stage1PlayNum =3;
var stage2PlayNum =3;
var stage3PlayNum =3;
var totalScore = 0;

var timecheck;

var chances;
var stageTime = 15;



window.onload = function(){ 
   // 첫 화면 로드 시 로딩되어야 하는 기본조건
   // 표시되는 점수는 0점부터 시작되어야 한다.
   mainControll();
  
}
document.getElementById("dropdown").addEventListener("click",function(){
   //설정 버튼을 클릭하였을 때의 드롭다운 리스트를 구현한다.
});
stageClear_keepGoing.addEventListener("click",function(){
   stageClearBackDiv.style.display="none";
   switch(nextStageNum){
   case 2:
      getPlay(2,15,stage2PlayNum);
   break;
   case 3:
      getPlay(3,15,stage3PlayNum);
   break;
   };

});
stageFail_restart.addEventListener("click",function(){
   stageFailBackDiv.style.display="none";
   mainControll();
});
function setChance(num){ 
   // 키보드 입력을 틀렸을 경우 도전 기회가 줄어들음.
   // 도전 기회를 저장한 배열을 불러오는 함수.
   var chance_text="";
   for(let i=0;i<num;i++){
      chance_text += (chances[i]+" ");
   }
   
   var chances_node = document.createTextNode(chance_text);
   chance.removeChild(chance.firstChild);
   chance.appendChild(chances_node);
}
function setScore(){
   //현재까지 누적된 점수를 합산하여 출력하는 함수
   //한 단계를 성공할 때마다 점수가 추가된다
   // 한 스테이지를 성공 할 때마다
   if(score.firstChild){
      score.removeChild(score.firstChild);
      totalScore+=200;
   }
   var turnToString = totalScore.toString();
   score.appendChild(document.createTextNode(turnToString));
   // stageClear_scoreDiv

}
function settings(){
   // 우측 상단의 설정 버튼을 클릭하였을 경우 실행되는 함수.
}
function timer(stageTime){
   // 스테이지 별로 남은 시간을 표시하는 함수.
   // 한스테이지 당 3단계로 묶여있으며 15초씩 주어진다
   // 파라미터로 스테이지별 시간을 받아와서 html 화면에 출력한다.
   var time = stageTime;
   var sec = "";
   var setTimer = setInterval(function(){
      min = parseInt(time/60);
      sec = time%60;
      document.getElementById("timecheck").innerHTML = sec;

      time--;
      if(timecheck==false){
         clearInterval(setTimer);
      }
      if(time<0){
         clearInterval(setTimer);
      }
      
   },1000);
}
//사용자의 입력과 랜덤으로 주어진 입력이 일치하는지에 대한 여부를 파악한다
function matching(arrowArray,stageNum,stagePlayNum){
   // 키보드 입력 받는  함수
   var count = 0;
   window.onkeydown=function(event){
      event.preventDefault();
   if(arrowArray[count] == event.keyCode){
      showImgs(event.keyCode);
      setScore();
      tablekeys[count].style.backgroundColor ="lightcoral";
      ++count;
      if(count == arrowArray.length){
         stagePlayNum--;
         if(stagePlayNum==0){
            timecheck=false;
            nextStageNum=stageNum+1;
            stageClear();
            // alert("끝났다.");
         }else{
            if(stageNum==1){
               playStage1(stagePlayNum);
            }else if(stageNum ==2){
               playStage2(stagePlayNum);
            }else if(stageNum ==3){
               playStage3(stagePlayNum);
            }
         }
      }
   }else{
      setChance(--chanceCount);
      if(chanceCount==0){
         stageTime=0;
         timecheck=false;
         stageFail();
         // alert("기회 끝!!")
      }
   }
   
   };
}
function showImgs(keyNum){
   imgDiv.removeChild(imgDiv.firstChild);
   var keyImage = document.createElement("img");
   var ad = "/Users/LG/Desktop/웹프텀프/term/images/"+keyNum+".jpg";
   keyImage.src = ad;
   keyImage.width = "150";
   imgDiv.appendChild(keyImage);
}
function stageClear(){
   stageClear_scoreDiv.innerHTML= totalScore;
   stageClearBackDiv.style.display="flex";
   return true;
}
function stageFail(){
   stageFail_scoreDiv.innerHTML= totalScore;
   stageFailBackDiv.style.display="flex";
}
//1단계~3단계의 무작위의 노트를 생성하는 함수 /배열 반환
function stage1(){
  /*
  좌,우 키를 사용하여 7개의 노트 무작위 생성
   */
  var stage_1_notes = new Array();
  stage_1_notes= randomKeyNum_low(38, 37, 7);
  console.log(stage_1_notes);
  return stage_1_notes;
}
function playStage1(stagePlayNum){
   arrowArr = stage1();
   arrow(arrowArr);
   matching(arrowArr,1,stagePlayNum);
}
//4단계~6단계의 무작위의 노트를 생성하는 함수
function stage2(){
  /*
  좌, 우, 상, 하 키를 사용하여 7개의 노트 무작위 생성
   */
  var stage_2_notes = new Array(); 
  stage_2_notes= randomKeyNum_low(40, 37, 7);
  arrowArr=stage_2_notes;
  return stage_2_notes;
}
function playStage2(stagePlayNum){
   arrowArr = stage2();
   arrow(arrowArr);
   matching(arrowArr,2,stagePlayNum);
}
//7단계~9단계의 무작위의 노트를 생성하는 함수
function stage3(){
  /*
  상,하,좌,우, 스페이스 바를 사용하여 9개의 노트 무작위 생성
   */
  var stage_3_notes = new Array();
   stage_3_notes = randomKeyNum_high(9);
   // arrowArr=new Array();
   arrowArr = stage_3_notes;
  return stage_3_notes;
}
function playStage3(stagePlayNum){
   arrowArr = stage3();
   arrow(arrowArr);
   matching(arrowArr,3,stagePlayNum);
}
//10단계의 무작위 노트를 생성하는 함수
function stageFinal(){
  //상 하 좌 우 스페이스바를 사용하여 12개의 노트 무작위 생성
  // 7초 카운트
   stageTime=7;
   var stage_f_notes = new Array();
   stage_f_notes = randomKeyNum_high(12);
   arrowArr=stage_f_notes;
   return stage_f_notes;
}
function stageBonus(){
  //보너스 단계의 무작위 노트를생성하는 함수
  // 상 하 좌 우 스페이스 바를 사용하여 20개의 노트 무작위 생성.
  //7초 카운트
  stageTime=7;
  var stage_b_notes = new Array();
  stage_b_notes = randomKeyNum_high(20);
   return stage_b_notes;

}
//화살표를 생성하여 html에 전송하는 함수
function arrow(array){
   while(tableRow.firstChild){
      tableRow.removeChild(tableRow.firstChild);
   }
   var stringArrow;
   for(var i=0; i<array.length;i++){
      switch(array[i]){
         case 37 : 
         stringArrow="⬅";
         break;
         case 38 : 
         stringArrow="⬆";
         break;
         case 39 : 
         stringArrow="➡";
         break;
         case 40 : 
         stringArrow="⬇";
         break;
         case 32 : 
         stringArrow="◾";
         break;
      }
      var data = tableRow.insertCell(i);
      var arrowElement = document.createTextNode(stringArrow);
      data.className +="tablekeys";
      data.appendChild(arrowElement);
      

   }
  

}
//키값을 설정해줌. 낮은 레벨의 단계에서 쓰일 키값들(스페이스바 미포함)
function randomKeyNum_low(start, finish, noteNum){
   var stageArr = new Array();
   for(var i =0; i<noteNum; i++){
      var arrowNum = Math.floor(Math.random()*(start+1 - finish))+finish;
      stageArr.push(arrowNum);
   }
   return stageArr;
}
//키값을 설정해줌. 높은 단계에서 쓰일 키값들. 스페이스 바 포함
function randomKeyNum_high(noteNum){
   var stageArr = new Array();
   for(var i =0; i<noteNum; i++){
      var check =Math.floor(Math.random()*5);
      var arrowNum;
      if(check==0){
          arrowNum =32;
       }else{
          arrowNum = Math.floor(Math.random()*(41 - 37))+37;
       }
    stageArr.push(arrowNum);
   }
   return stageArr;
}
function realRandomKeyForBonus(){

}

function getPlay(stageNum, stage_time,stagePlayNum){ //실질적인 플레이를 하는 함수
   setChance(3); // 목숨 개수 세팅
   setScore();
   timer(stage_time);
   switch(stageNum){
      case 1:
         arrowArr=stage1();
         arrow(arrowArr);
         matching(arrowArr,1,stagePlayNum);
      break;
      case 2:
         arrowArr=stage2();
         arrow(arrowArr);
         matching(arrowArr,2,stagePlayNum);
      break;
      case 3:
         arrowArr=stage3();
         arrow(arrowArr);
         matching(arrowArr,3,stagePlayNum);
      break;
      case f:
         arrowArr=stageFinal();
         arrow(arrowArr);
         matching(arrowArr,f,stagePlayNum);
      break;
   }
}
function mainControll(){
   chances = ["😻","😻","😻"]
   getPlay(1,15,stage1PlayNum);
}



