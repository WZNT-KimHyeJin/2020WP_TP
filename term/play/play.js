var canvas = document.getElementById('backgroundCanvas');
var chance = document.getElementById('chance_div');
var chance_inner = document.getElementById('chance_inner');
var score = document.getElementById('socre_div');
var playTime = document.getElementById('time_div');
var keyTable = document.getElementById("keyTable");
var tableRow_1 = document.getElementById('tableRow_1');
var tableRow_2 = document.getElementById('tableRow_2');
var imgDiv = document.getElementById("imgDiv");

var setting_buttons_div = document.getElementById("setting_buttons_div");
var setting_mute =document.getElementById("mute");
var setting_stop =document.getElementById("stop");
var setting_move_to_Bonus =document.getElementById("move_to_Bonus");

var stageClearBackDiv = document.getElementById("stageClearBackDiv");
var stageClear_scoreDiv = document.getElementById("stageClear_scoreDiv");
var stageClear_quit = document.getElementById("stageClear_quit");
var stageClear_keepGoing = document.getElementById("stageClear_keepGoing");
var stageFailBackDiv = document.getElementById("stageFailBackDiv");
var stageFail_scoreDiv = document.getElementById("stageFail_scoreDiv");
var stageFail_quit = document.getElementById("stageFail_quit");
var stageFail_restart = document.getElementById("stageFail_restart");
var stageFail_restart_thisStage = document.getElementById("stageFail_restart_thisStage");
var restart_this = document.getElementById("restart_this");


var audio_37 = new Audio("../sound/37.wav");
var audio_38 = new Audio("../sound/38.wav");
var audio_39 = new Audio("../sound/39.wav");
var audio_40 = new Audio("../sound/40.wav");


var tablekeys = document.getElementsByClassName("tablekeys");
var nextStageNum=1;
var arrowArr = new Array(); // 변경되는 값을 저장
var chanceCount=3;
var stage1PlayNum =3;
var stage2PlayNum =3;
var stage3PlayNum =3;
var stageFinalNum=1;
var stageBonusNum=1;
var totalScore = 0;
var setting_clicked=0;
var mutecheck = 0;
var muteButton_inner = setting_mute.innerHTML;
var this_stage =0;

var timecheck;

var chances;
var stageTime = 15;


window.onload = function(){ 
   // 첫 화면 로드 시 로딩되어야 하는 기본조건
   // 표시되는 점수는 0점부터 시작되어야 한다.
   mainControll();
   $('#stageFail_restart_thisStage').hover(function(){
      $('#restart_this').css('display','flex');
   }, function(){
      $('#restart_this').css('display','none');
   });
  
}
document.getElementById("setting_btn").addEventListener("click",function(){
   if(setting_clicked==0){
      setting_buttons_div.style.display="block";
      setting_clicked++;
   }else{
      setting_buttons_div.style.display="none";
      setting_clicked--;
   }
   //설정 버튼을 클릭하였을 때의 드롭다운 리스트를 구현한다.
});
setting_mute.addEventListener("click",function(){
   if(mutecheck==0){
      setting_mute.innerHTML ="음소거 상태 🤐";
      mutecheck=1;
   }else if(mutecheck==1){
      setting_mute.innerHTML=muteButton_inner;
      mutecheck=0;
   }

});
var setting_stop =document.getElementById("stop");
var setting_move_to_Bonus =document.getElementById("move_to_Bonus");

stageClear_keepGoing.addEventListener("click",function(){
   timecheck=true;
   stageClearBackDiv.style.display="none";
   if(nextStageNum==5){
      nextStageNum=10;
   }
   switch(nextStageNum){
   case 2:
      getPlay(2,12,stage2PlayNum);
   break;
   case 3:
      getPlay(3,10,stage3PlayNum);
   break;
   case 4:
      getPlay(4,7,stageFinalNum);
   break;
   case 10:
      getPlay(10,5,stageBonusNum);
   break;
   };

});
stageClear_quit.addEventListener("click",function(){
   location.href="../start/start.html";
});
stageFail_restart.addEventListener("click",function(){
   timecheck=true;
   stageFailBackDiv.style.display="none";
   getPlay(1,15,stage1PlayNum);

});
stageFail_quit.addEventListener("click",function(){
   location.href="../start/start.html";
});
stageFail_restart_thisStage.addEventListener("click",function(){
   stageFailBackDiv.style.display="none";
   this_stage=1;
   timecheck=true;
   switch(nextStageNum){
      case 1:
         getPlay(1,12,stage1PlayNum);
      break;
      case 2:
         getPlay(2,12,stage2PlayNum);
      break;
      case 3:
         getPlay(3,10,stage3PlayNum);
      break;
      case 4:
         getPlay(4,7,stageFinalNum);
      break;
      case 10:
         getPlay(10,5,stageBonusNum);
      break;
      };
});
function setChance(num){ 
   // 키보드 입력을 틀렸을 경우 도전 기회가 줄어들음.
   // 도전 기회를 저장한 배열을 불러오는 함수.
   var chance_text="";
   for(let i=0;i<num;i++){
      chance_text += (chances[i]+" ");
   }
   chance_inner.innerHTML=chance_text;
   // var chances_node = document.createTextNode(chance_inner);
   // chance.removeChild(chance_inner.firstChild);
   // chance.appendChild(chances_node);
}
function setScore(bool){
   //현재까지 누적된 점수를 합산하여 출력하는 함수
   //한 단계를 성공할 때마다 점수가 추가된다
   // 한 스테이지를 성공 할 때마다
   if(score.firstChild){
      score.removeChild(score.firstChild);
   }
   if(bool){
      switch(nextStageNum){
         case 1:
            totalScore+=50;
         break;
         case 2:
            totalScore+=100;
         break;
         case 3:
            totalScore+=200;
         break;
         case 4:
            totalScore+=250;
         break;
         case 10:
            totalScore+=400;
         break;
      }
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
   var time = parseInt(stageTime);
   var sec = "";
   var setTimer = setInterval(function(){
      min = parseInt(time/60);
      sec = "00:"+time%60;
      document.getElementById("timecheck").innerHTML = sec;

      time--;
      if(timecheck==false){
         clearInterval(setTimer);
      }
      if(time<0){
         clearInterval(setTimer);
         stageFail();
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
      switch(event.keyCode){
         case 37 :
            audio_37.play();
         break;
         case 38 :
            audio_38.play();
         break;
         case 39 :
            audio_39.play();
         break;
         case 40 :
            audio_40.play();
         break;
      }
      showImgs(event.keyCode);
      setScore(true);
      tablekeys[count].style.backgroundColor ="lightcoral";
      ++count;
      if(count == arrowArray.length){
         stagePlayNum--;
         if(stagePlayNum==0){
            timecheck=false;
            nextStageNum=stageNum+1;
            stageClear();
         }else{
            if(stageNum==1){
               playStage1(stagePlayNum);
            }else if(stageNum ==2){
               playStage2(stagePlayNum);
            }else if(stageNum ==3){
               playStage3(stagePlayNum);
            }else if(stageNum ==4){
               playStageFinal(stagePlayNum);
            }else if(stageNum ==10){
               playStageBonus(stagePlayNum);
            }
         }
      }
   }else{
      setChance(--chanceCount);
      showImgs(100);
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
   var ad = "../images/"+keyNum+".jpg";
   keyImage.src = ad;
   imgDiv.appendChild(keyImage);
   setTimeout(function() {
   imgDiv.removeChild(imgDiv.firstChild);
   var ad = "../images/0.jpg";
   keyImage.src = ad;
   imgDiv.appendChild(keyImage);

    }, 200)
}
function stageClear(){
   chanceCount=3;
   stageClear_scoreDiv.innerHTML= totalScore;
   stageClearBackDiv.style.display="flex";
   return true;
}
function stageFail(){
   chanceCount=3;
   stageFail_scoreDiv.innerHTML= totalScore;
   stageFailBackDiv.style.display="flex";
}
//1단계~3단계의 무작위의 노트를 생성하는 함수 /배열 반환
function stage1(){
  /*
  좌,우 키를 사용하여 7개의 노트 무작위 생성
   */
  var stage_1_notes = new Array();
  stage_1_notes= randomKeyNum_low(38, 37, 9);
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
  stage_2_notes= randomKeyNum_low(40, 37, 10);
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
   stage_3_notes = randomKeyNum_high(13);
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
   var stage_f_notes = new Array();
   stage_f_notes = randomKeyNum_high(20);
   arrowArr=stage_f_notes;
   return stage_f_notes;
}
function playStageFinal(stagePlayNum){
   arrowArr = stageFinal();
   arrow(arrowArr);
   matching(arrowArr,4,stagePlayNum);
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
function playStageBonus(stagePlayNum){
   arrowArr = stageBonus();
   arrow(arrowArr);
   matching(arrowArr,10,stagePlayNum);
}
//화살표를 생성하여 html에 전송하는 함수
function arrow(array){
   while(tableRow_1.firstChild){
      tableRow_1.removeChild(tableRow_1.firstChild);
   }
   while(tableRow_2.firstChild){
      tableRow_2.removeChild(tableRow_2.firstChild);
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
      if(array.length<12){
         var data = tableRow_1.insertCell(i);
         var arrowElement = document.createTextNode(stringArrow);
         data.className +="tablekeys";
         data.appendChild(arrowElement);
      }else{
         if(i<array.length/2){
            var data = tableRow_1.insertCell(i);
            var arrowElement = document.createTextNode(stringArrow);
            data.className +="tablekeys";
            data.appendChild(arrowElement);
         }else{
            var data = tableRow_2.insertCell(i-array.length/2);
            var arrowElement = document.createTextNode(stringArrow);
            data.className +="tablekeys";
            data.appendChild(arrowElement);
         }
      }

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
// function realRandomKeyForBonus(){

// }

function getPlay(stageNum, stage_time,stagePlayNum){ //실질적인 플레이를 하는 함수
   if(this_stage==1){
      chanceCount=1;
      setChance(chanceCount);
      this_stage=0;
   }else{
      setChance(3); // 목숨 개수 세팅
   }
   setScore(false);
   timer(stage_time);
   switch(stageNum){
      case 1:
         playStage1(stagePlayNum);
      break;
      case 2:
         playStage2(stagePlayNum);
      break;
      case 3:
         playStage3(stagePlayNum);
      break;
      case 4:
         playStageFinal(stagePlayNum);
      break;
      case 10:
         playStageBonus(stagePlayNum);
      break;
   }
}
function mainControll(){
   chances = ["😻","😻","😻"]
   getPlay(1,300,stage1PlayNum);
}



