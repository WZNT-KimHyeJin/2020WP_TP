var canvas = document.getElementById('backgroundCanvas');
var chance = document.getElementById('chance_div');
var score = document.getElementById('socre_div');
var playTime = document.getElementById('time_div');


var chances = ["😻","😻","😻"];
var stageTime = 20;



window.onload = function(){ 
   // 첫 화면 로드 시 로딩되어야 하는 기본조건
   // 표시되는 점수는 0점부터 시작되어야 한다.
   setChance();
   var score_text = "0";
   score.appendChild(document.createTextNode(score_text));
   timer(stageTime);
}

document.getElementById("dropdown").addEventListener(function(){
   //설정 버튼을 클릭하였을 때의 드롭다운 리스트를 구현한다.
});

function setChance(){ 
   // 키보드 입력을 틀렸을 경우 도전 기회가 줄어들음.
   // 도전 기회를 저장한 배열을 불러오는 함수.
   var chance_text="";
   for(let i=0;i<chances.length;i++){
      chance_text += (chances[i]+" ");
   }
   
   var chances_node = document.createTextNode(chance_text);
   chance.appendChild(chances_node);
}

function setScore(){
   //현재까지 누적된 점수를 합산하여 출력하는 함수
   //한 단계를 성공할 때마다 점수가 추가된다
   // 한 스테이지를 성공 할 때마다

}
function settings(){
   // 우측 상단의 설정 버튼을 클릭하였을 경우 실행되는 함수.
}
function checkInput(){
   //사용자로부터 입력받은 키를 인식하는 함수.
}
function matching(){
   //사용자의 입력과 랜덤으로 주어진 입력이 일치하는지에 대한 여부를 파악한다

}


function timer(stageTime){
   // 스테이지 별로 남은 시간을 표시하는 함수.
   // 한스테이지 당 3단계로 묶여있으며 15초씩 주어진다
   // 파라미터로 스테이지별 시간을 받아와서 html 화면에 출력한다.
   var time = stageTime;
   var sec = "";

   var x = setInterval(function(){
      min = parseInt(time/60);
      sec = time%60;
      document.getElementById("timecheck").innerHTML = sec;

      time--;

      if(time<0){
         alert("펑!");
         clearInterval(x);
      }
   },1000);
}

function stage1(){
  //1단계~3단계의 무작위의 노트를 생성하는 함수
  /*
  좌,우 키를 사용하여 7개의 노트 무작위 생성
   */
}

function stage2(){
  //4단계~6단계의 무작위의 노트를 생성하는 함수
  /*
  좌, 우, 상, 하 키를 사용하여 7개의 노트 무작위 생성
   */
}
function stage3(){
  //7단계~9단계의 무작위의 노트를 생성하는 함수
  /*
  상,하,좌,우, 스페이스 바를 사용하여 9개의 노트 무작위 생성
   */
}
function staageFinal(){
  //10단계의 무작위 노트를 생성하는 함수
  //상 하 좌 우 스페이스바를 사용하여 12개의 노트 무작위 생성
  // 7초 카운트
}

function stageBonus(){
  //보너스 단계의 무작위 노트를생성하는 함수
  // 상 하 좌 우 스페이스 바를 사용하여 20개의 노트 무작위 생성.
  //7초 카운트
}

function arrow(){
   //화살표를 랜덤으로 생성하여 html에 전송하는 함수
}


