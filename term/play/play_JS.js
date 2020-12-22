var chance = document.getElementById('chance_div');
var chance_inner = document.getElementById('chance_inner');
var score = document.getElementById('socre_div');
var playTime = document.getElementById('time_div');
var stage_num = document.getElementById("stage_num");
var keyTable = document.getElementById("keyTable");
var tableRow_1 = document.getElementById('tableRow_1');
var tableRow_2 = document.getElementById('tableRow_2');
var imgDiv = document.getElementById("imgDiv");
var mainDiv = document.getElementById("mainDiv");

var setting_buttons_div = document.getElementById("setting_buttons_div");
var setting_mute =document.getElementById("mute");
var setting_stop =document.getElementById("stop");
var setting_move_to_Bonus =document.getElementById("move_to_Bonus");

var stageClearBackDiv = document.getElementById("stageClearBackDiv");
var stageClear_scoreDiv = document.getElementById("stageClear_scoreDiv");
var stageClear_quit = document.getElementById("stageClear_quit");
var stageClear_keepGoing = document.getElementById("stageClear_keepGoing");

var stageFailBackDiv = document.getElementById("stageFailBackDiv");
var stageFailDiv = document.getElementById("stageFailDiv");
var stageFail_scoreDiv = document.getElementById("stageFail_scoreDiv");
var stageFail_quit = document.getElementById("stageFail_quit");
var stageFail_restart = document.getElementById("stageFail_restart");
var stageFail_restart_thisStage = document.getElementById("stageFail_restart_thisStage");
var restart_this = document.getElementById("restart_this");
var restart = document.getElementById("restart");

//// 스토리 라인 관련 변수////

var storyBackDiv = document.getElementById("storyBackDiv");
//스토리라인 관련 div중 최상위 div
var story_btn_next = document.getElementById("story_btn_next");
// 파일로부터 다음 이야기를 불러오기위한 next 버튼
var story_btn_play = document.getElementById("story_btn_play");
// 스토리를 모두 로딩 한 후 다은 스테이지를 진행하기 위한 play 버튼

var AllStageClearBackDiv = document.getElementById("AllStageClearBackDiv");
var AllStageClear_quit = document.getElementById("AllStageClear_quit");
var AllStageClear_bonus = document.getElementById("AllStageClear_bonus");
var AllStageClear_scoreDiv = document.getElementById("AllStageClear_scoreDiv");

var BonusBackDiv = document.getElementById("BonusBackDiv");
var BonusBackDiv_BTN =document.getElementById("BonusBackDiv_BTN");

var storyBackDiv = document.getElementById("storyBackDiv");
var story_next_btn = document.getElementById("story_btn_next");
var story_btn_play = document.getElementById("story_btn_play");
var story_texts = document.getElementById("story_texts");
var story_count =0;
var story_stage_num=0;
var story_readCount=0;
var story_decodedArr = new Array();


var audio_37 = new Audio("../sound/37.wav");
var audio_38 = new Audio("../sound/38.wav");
var audio_39 = new Audio("../sound/39.wav");
var audio_40 = new Audio("../sound/40.wav");
var audio_32 = new Audio("../sound/32.wav");
var audio_fail = new Audio("../sound/fail.wav");
var bgm_1 = new Audio("../sound/bgm_1.wav");
var bgm_2 = new Audio("../sound/bgm_2.wav");
var bgm_f = new Audio("../sound/bgm_f.wav");


var tablekeys = document.getElementsByClassName("tablekeys");
var nextStageNum=1;
var arrowArr = new Array(); // 변경되는 값을 저장
var chanceCount=3;
var stage1PlayNum =3;
var stage2PlayNum =3;
var stage3PlayNum =3;
var stageFinalNum=2;
var stageBonusNum=1;
var totalScore = 0;
var totalscore_pre =0;
var setting_clicked=0;
var mutecheck = 0;
var muteButton_inner = setting_mute.innerHTML;
var this_stage =0;
var tempArr = new Array();


var timecheck;

var chances;
chances = ["😻","😻","😻"];
var stageTime = 15;


window.onload = function(){ 
   // 첫 화면 로드 시 로딩되어야 하는 기본조건
   // 표시되는 점수는 0점부터 시작되어야 한다.
   start_stories();
   // stage_final_clear();
   $('#stageFail_restart_thisStage').hover(function(){
      $('#restart_this').css('display','flex');
   }, function(){
      $('#restart_this').css('display','none');
   });

   $('#stageFail_restart').hover(function(){
      $('#restart').css('display','flex');
   }, function(){
      $('#restart').css('display','none');
   });  
}
function BGMpause(){
   bgm_1.pause();
   bgm_2.pause();
   bgm_f.pause();
}
AllStageClear_quit.addEventListener("click",function(){
   location.href="../start/start.html";
});
AllStageClear_bonus.addEventListener("click",function(){

   AllStageClearBackDiv.style.display="none";
   BonusBackDiv.style.display="flex";
   this_stage=1; 
   BGMpause();
   bgm_f.currentTime=0;
   bgm_f.play();

});
BonusBackDiv_BTN.addEventListener("click",function(){
   $("#mainDiv").css({"background":"url(../images/base100.png"}); 	
   BonusBackDiv.style.display="none";
   setting_buttons_div.style.display="none";
   timecheck=true;

   getPlay(10,8,1);
});
story_next_btn.addEventListener("click",function(){
   readStories();
   // 스토리들을 text 파일에서 가지고 와서 읽어낸다.
});
story_btn_play.addEventListener("click",function(){
   // bgm_1.stop();
   bgm_1.currentTime=0;
   bgm_1.play();
   console.log(nextStageNum);
   story_count =0;
   story_readCount=0;
   story_decodedArr=new Array();
   storyBackDiv.style.display="none";
   story_btn_play.style.display = "none";
   story_next_btn.style.display = "block";
   if(nextStageNum==5){
      AllStageClear_scoreDiv.innerHTML=totalScore;
      // console.log(totalScore);
      AllStageClearBackDiv.style.display="flex";
      return;
   }
   

   switch(nextStageNum){
      case 1:
         BGMpause();
         bgm_1.currentTime=0;
         bgm_1.play();
         mainControll();
         break;
      case 2:
         BGMpause();
         bgm_1.currentTime=0;
         bgm_1.play();
         getPlay(2,12,stage2PlayNum);
      break;
      case 3:
         BGMpause();
         bgm_2.currentTime=0;
         bgm_2.play();
         getPlay(3,10,stage3PlayNum);
      break;
      case 4:
         BGMpause();
         bgm_2.currentTime=0;
         bgm_2.play();
         $("#story_chr>img").css({"background":"url(../images/pro_2.png"},{"width":"98%"},{"height":"98%"}); 	
         getPlay(4,10,stageFinalNum);
      break;
      case 10:
         //보너스 단계 갈건지 여부 파악 하는 그거  있어야 함
         storyBackDiv.style.display="flex";
      break;
      };
});
function story_readData(story_num){

   $.post("story.php",
   {   
       num : story_num
   },function(data){
       var decoded = JSON.parse(data);
       for(var i in decoded){
           story_decodedArr[story_count]=decoded[i];
           story_count++;
       }
       storyBackDiv.style.display="flex";
       readStories();
   });
}
function readStories(){
       if(story_readCount==story_count-1){
           story_btn_play.style.display = "block";
           story_next_btn.style.display = "none";
       }
       story_texts.innerHTML = story_decodedArr[story_readCount];
       story_readCount++;
   
}
function start_stories(){
   //처음 시작할 때 text 파일을 읽어와 스토리를 진행한다.
   bgm_1.currentTime=0;
   bgm_1.play();
   story_count=0;
   story_readData(0);
}
function stage_1_clear(){
   //1,2,3단계 즉 stage1을 클리어 했을 시 진행되는 스토리
   
   story_stage_num=1;
   story_count=0;
   story_readData(story_stage_num);
   $("#mainDiv").css({"background":"url(../images/base2.png"}); 	
   // 텍스트 파일에서 읽어와 스토리를 진행한다.
}
function stage_2_clear(){
   //4,5,6단계 즉 stage2를 클리어 했을 시 진행되는 스토리
   // 텍스트 파일에서 읽어와 스토리를 진행한다.
   $("#mainDiv").css({"background":"url(../images/base3.png"}); 	
   story_stage_num=2;
   story_count=0;
   story_readData(story_stage_num);
}
function stage_3_clear(){
   //7,8,9단계 즉 stage3을 클리어 했을 시 진행되는 스토리
   // 텍스트 파일에서 읽어와 스토리를 진행한다.
   $("#mainDiv").css({"background":"url(../images/base4.png"}); 	

   story_stage_num=3;
   story_count=0;
   story_readData(story_stage_num);
}
function stage_final_clear(){
   //마지막 단계인 10단계를 클리어 했을 시 진행되는 스토리
   // 텍스트 파일에서 읽어와 스토리를 진행한다.
   story_stage_num=4;
   story_count=0;
   story_readData(story_stage_num);
}
function stage_bonus_clear(){
   //보너스 단계를 클리어 했을 경우 진행되는 스토리
   // 텍스트 파일에서 읽어와 스토리를 진행한다.
   story_stage_num=10;
   story_count=0;
   story_readData(story_stage_num);
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
   setting_buttons_div.style.display="none";
   setting_clicked=0;
   if(mutecheck==0){
      audio_37.muted=true;
      audio_38.muted=true;
      audio_39.muted=true;
      audio_40.muted=true;
      audio_32.muted=true;
      audio_fail.muted=true;
      bgm_1.muted=true;
      bgm_2.muted=true;
      bgm_f.muted=true;
      setting_mute.innerHTML ="음소거 상태 🤐";
      mutecheck=1;
   }else if(mutecheck==1){
      audio_37.muted=false;
      audio_38.muted=false;
      audio_39.muted=false;
      audio_40.muted=false;
      audio_32.muted=false;
      audio_fail.muted=false;
      bgm_1.muted=false;
      bgm_2.muted=false;
      bgm_f.muted=false;
      setting_mute.innerHTML=muteButton_inner;
      mutecheck=0;
   }

});
setting_stop.addEventListener("click",function(){
   timecheck=false;
   location.href="../start/start.html";
});
setting_move_to_Bonus.addEventListener("click",function(){
   timecheck=false;
   this_stage=1;
   BonusBackDiv.style.display="flex";

});
stageClear_keepGoing.addEventListener("click",function(){
   timecheck=true;
   stageClearBackDiv.style.display="none";
   if(nextStageNum==5){
      nextStageNum=10;
   }
   switch(nextStageNum){
   case 2:
      stage_1_clear();
      // getPlay(2,12,stage2PlayNum);
   break;
   case 3:
      stage_2_clear();
   break;
   case 4:
      stage_3_clear();
   break;
   case 10:
         // storyBackDiv.style.display="flex";
         //보너스 단계 갈건지 여부 파악 하는 그거  있어야 함
      getPlay(10,10,stageBonusNum);
   break;
   };

});
stageClear_quit.addEventListener("click",function(){
   location.href="../start/start.html";
});
stageFail_restart.addEventListener("click",function(){
   timecheck=true;
   stageFailBackDiv.style.display="none";
   nextStageNum=1;
   totalScore=0;
   totalscore_pre=0;
   this_stage=0;
   stageFail_restart_thisStage.disabled  =false;
   stageFail_restart_thisStage.style.backgroundColor="rgb(255,199,154)";
   stageFail_restart_thisStage.style.color="rgb(180,117,0)";
   stageFail_restart_thisStage.style.border="orange solid 3px";
   getPlay(1,15,stage1PlayNum);

});
stageFail_quit.addEventListener("click",function(){
   location.href="../start/start.html";
});
stageFail_restart_thisStage.addEventListener("click",function(){
   totalScore=totalscore_pre;
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
            totalScore+=300;
         break;
         case 10:
            totalScore+=500;
         break;
      }
   }
   var turnToString = totalScore.toString();
   score.appendChild(document.createTextNode(turnToString));
   // stageClear_scoreDiv

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
      soundPlay(event.keyCode);
      showImgs(event.keyCode);
      setScore(true);
      tablekeys[count].style.backgroundColor ="lightcoral";
      ++count;
      if(count == arrowArray.length){
         stagePlayNum--;
         if(stagePlayNum==0){
            timecheck=false;
            nextStageNum=stageNum+1;
            console.log(nextStageNum);
            if(nextStageNum==5){
               stage_final_clear();
            }else{
               stageClear();
            }
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
      audio_fail.play();
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
function B_matching(arrowArray){
   var count = 0;
   var arrIndex=0;
   window.onkeydown=function(event){
      for(var i=0;i<tempArr.length;i++){
         if(event.keyCode==tempArr[i]){
            arrIndex=i;
            break;
         }
      }
      event.preventDefault();
      if(arrowArray[count] == event.keyCode){
         soundPlay(arrIndex);
         showImgs(arrIndex);
         setScore(true);
         tablekeys[count].style.backgroundColor ="lightcoral";
         ++count;
         if(count == arrowArray.length){
            timecheck=false;
            stageClear();
         }
      }else{
         audio_fail.play();
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
function soundPlay(keyNum){
   if(keyNum<5){
      switch(keyNum){
         case 0 :audio_37.play(); break;
         case 1 :audio_38.play();break;
         case 2 :audio_39.play();break;
         case 3 :audio_40.play(); break;
         case 4 :audio_32.play(); break;
      }
   }else{
      switch(keyNum){
         case 32 :audio_32.play(); break;
         case 37 :audio_37.play(); break;
         case 38 :audio_38.play();break;
         case 39 :audio_39.play();break;
         case 40 :audio_40.play(); break;
      }
   }
   
}
function showImgs(keyNum){
   if(keyNum<5){
      console.log("show Image key Num: "+keyNum);
      var imgNum=0;
      switch(keyNum){
         case 0: imgNum=37; break;
         case 1: imgNum=38; break;
         case 2: imgNum=39; break;
         case 3: imgNum=40; break;
         case 4: imgNum=32; break;
         default : break;
      }
      imgDiv.removeChild(imgDiv.firstChild);
      var keyImage = document.createElement("img");
      var ad = "../images/"+imgNum+".png";
      keyImage.src = ad;
      keyImage.style.width="260px";
      keyImage.style.height="260px";

      imgDiv.appendChild(keyImage);
      setTimeout(function() {
         imgDiv.removeChild(imgDiv.firstChild);
         var ad = "../images/0.png";
         keyImage.src = ad;
         keyImage.style.width="260px";
         keyImage.style.height="260px";
         imgDiv.appendChild(keyImage);

      }, 200)
   }else{

      imgDiv.removeChild(imgDiv.firstChild);
      var keyImage = document.createElement("img");
      var ad = "../images/"+keyNum+".png";
      keyImage.src = ad;
      keyImage.style.width="260px";
      keyImage.style.height="260px";
      imgDiv.appendChild(keyImage);
      setTimeout(function() {
         imgDiv.removeChild(imgDiv.firstChild);
         var ad = "../images/0.png";
         keyImage.src = ad;
         keyImage.style.width="260px";
         keyImage.style.height="260px";
         imgDiv.appendChild(keyImage);
         
      }, 200)
   }
}
function stageClear(){
   $("#stageClearBackDiv>div").css({"background":"url(../images/발바닥.jpg","background-size":"70px"}); 	

   totalscore_pre=totalScore;
   chanceCount=3;
   stageClear_scoreDiv.innerHTML= totalScore;
   stageClearBackDiv.style.display="flex";
   this_stage=0; 
   return true;
}
function stageFail(){
   // stageFailBackDiv.style.backgroundImage;
   $("#stageFailBackDiv>div").css({"background":"url(../images/발바닥.jpg","background-size":"70px"}); 	
   chanceCount=3;
   if(this_stage==1){
      stageFail_restart_thisStage.disabled  =true;
      stageFail_restart_thisStage.style.backgroundColor="gray";
      stageFail_restart_thisStage.style.color="gray";
      stageFail_restart_thisStage.style.border="gray";
   }
   stageFail_scoreDiv.innerHTML= totalScore;
   stageFailBackDiv.style.display="flex";
}
//1단계~3단계의 무작위의 노트를 생성하는 함수 /배열 반환
function stage1(){
  /*
  좌,우 키를 사용하여 7개의 노트 무작위 생성
   */
  var stage_1_notes = new Array();
  stage_1_notes= randomKeyNum_low(38, 37, 8);
  return stage_1_notes;
}
function playStage1(stagePlayNum){
   stage_num.innerHTML="STAGE 1";
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
   stage_num.innerHTML="STAGE 2";
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
   stage_3_notes = randomKeyNum_high(12);
   // arrowArr=new Array();
   arrowArr = stage_3_notes;
  return stage_3_notes;
}
function playStage3(stagePlayNum){
   stage_num.innerHTML="STAGE 3";
   arrowArr = stage3();
   arrow(arrowArr);
   matching(arrowArr,3,stagePlayNum);
}
//10단계의 무작위 노트를 생성하는 함수
function stageFinal(){
  //상 하 좌 우 스페이스바를 사용하여 20개의 노트 무작위 생성
  // 7초 카운트
   var stage_f_notes = new Array();
   stage_f_notes = randomKeyNum_high(20);
   arrowArr=stage_f_notes;
   return stage_f_notes;
}
function playStageFinal(stagePlayNum){
   stage_num.innerHTML="FINAL";
   arrowArr = stageFinal();
   arrow(arrowArr);
   matching(arrowArr,4,stagePlayNum);
}
function stageBonus(){
  //보너스 단계의 무작위 노트를생성하는 함수
  // 상 하 좌 우 스페이스 바를 사용하여 20개의 노트 무작위 생성.
  //7초 카운트
  stageTime=10;
  var stage_b_notes = new Array();
  stage_b_notes = realRandomKeyForBonus();
   return stage_b_notes;
}
function playStageBonus(stagePlayNum){
   stage_num.innerHTML="BONUS";
   stage_num.style.color="hotPink";
   nextStageNum=10;
   arrowArr = stageBonus();
   B_arrow(arrowArr);
   B_matching(arrowArr,10,stagePlayNum);
}
function tableClear(){
   while(tableRow_1.firstChild){
      tableRow_1.removeChild(tableRow_1.firstChild);
   }
   while(tableRow_2.firstChild){
      tableRow_2.removeChild(tableRow_2.firstChild);
   }
}
//화살표를 생성하여 html에 전송하는 함수
function arrow(array){
   tableClear()
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
function B_arrow(array){
   tableClear()
   var stringArrow;
   for(var i=0; i<array.length;i++){
      console.log(i+"번째 : "+array[i]);
      switch(array[i]){
         case 8 : stringArrow="back"; break;
         case 9 : stringArrow="Tap"; break;
         case 32 : stringArrow="◾";break;
         case 37 : stringArrow="⬅"; break;
         case 38 : stringArrow="⬆";break;
         case 39 : stringArrow="➡";break;
         case 40 : stringArrow="⬇";break;
         case 186 : stringArrow=";";break;
         case 187 : stringArrow="=";break;
         case 188 : stringArrow="<";break;
         case 189 : stringArrow="-";break;
         case 190 : stringArrow=">";break;
         case 191 : stringArrow="?";break;
         case 192 : stringArrow="~";break;
         case 220 : stringArrow="\\";break;
         case 221 : stringArrow="}";break;
         case 222: stringArrow="\"";break;
         default:break;
      }
      if(array[i]>=48 && array[i]<=57){
         stringArrow=array[i]-48;
      }
      else if(array[i]>=65 && array[i]<=90){
         stringArrow=String.fromCharCode(array[i]);
         console.log(stringArrow);
      }
      else if(array[i]>=112 && array[i]<=123){
         stringArrow="F"+(array[i]-111).toString();
      }

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
   var stageArr = new Array();
   for(var i =0; i<5; i++){
      var check =Math.floor(Math.random()*8);
      var arrowNum;
      switch(check){
         case 0:
            arrowNum=Math.floor(Math.random()*(10-8))+8;
         break;
         case 1:
            arrowNum=32;
         break;
         case 2:
            arrowNum = Math.floor(Math.random()*(41 - 37))+37;
         break;
         case 3:
            arrowNum=Math.floor(Math.random()*(58-48))+48;
         break;
         case 4:
            arrowNum=Math.floor(Math.random()*(91-65))+65;
         break;
         case 5:
            arrowNum=Math.floor(Math.random()*(124-112))+112;
         break;
         case 6:
            arrowNum=Math.floor(Math.random()*(193-186))+186;
         break;
         case 7:
            arrowNum=Math.floor(Math.random()*(223-220))+220;
         break;
      }
      tempArr.push(arrowNum);
   }
   for(var i=0;i<18;i++){
      var check =Math.floor(Math.random()*5);
      stageArr.push(tempArr[check]);
   }
   return stageArr;
}
function getPlay(stageNum, stage_time,stagePlayNum){ //실질적인 플레이를 하는 함수
   if(this_stage==1){
      chanceCount=1;
      setChance(chanceCount);
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
   chances = ["😻","😻","😻"];
   getPlay(1,15,3);
}
