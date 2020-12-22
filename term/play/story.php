<?php
 if($_SERVER["REQUEST_METHOD"] == "POST"){
    $fst = json_encode($_POST);
    $inputData = json_decode($fst,true);
    $fileNum = $inputData['num'];
    $fileName = "../stories/".$fileNum.".txt";
    $textArr=array();
    $count=0;
    if(file_exists($fileName)){
        $myFile = fopen($fileName,"r") or die("unable to open file");
        while(!feof($myFile)){
            $file_data = fgets($myFile);
            $textArr[$count]=$file_data;
            $count++;
        }
        fclose($myFile);
        $returnVal = json_encode($textArr);
        echo $returnVal;
    }

 }

?>