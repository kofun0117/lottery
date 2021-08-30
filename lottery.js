'use strict';
const inputButton = document.getElementById('input');
const drawButton = document.getElementById('draw');
const showButton = document.getElementById('show');
const newItem = document.getElementById('item');
const resultDivided = document.getElementById('result-area');
const restartButton = document.getElementById('restart');
const restartDrawButton = document.getElementById('restart-draw');

var option=[]; //選択肢
var result=[]; //抽選結果

inputButton.onclick = input;
drawButton.onclick = draw;
showButton.onclick = checkItems;
restartButton.onclick = restart;
restartDrawButton.onclick = restartDraw;

//箱にアイテムを入れる
function input(){
    var item = newItem.value;
    if(item){
        option.push(item);
    }
    newItem.value = "";
    console.log(option);
}
//箱の中を見る
function checkItems(){
    if(option.length === 0){
        empty()
    }else{
        alert(option);
    }
}

//抽選
function draw(){
    if(option.length===0){
        empty();
    }else{
        var num = Math.floor(Math.random() * option.length);
        alert(`${option[num]}を引きました`);
        result.push(option[num]);
        //option = option.filter(picked => picked !== option[num]);
        option = option.filter(function(picked,i){
            return i !== num;
        })
        console.log(result);
        resultDisplay();
    }
}
//からっぽ
function empty(){
    alert('箱はからっぽです')
}

//enterキーでも実行できるようにする
newItem.onkeydown = event =>{
    if(event.key === 'Enter'){
        inputButton.onclick();
    }
}

//抽選結果の表示エリアの作成
function resultDisplay(){
        resultDivided.innerText = '';
        const header = document.createElement('h3');
        var result_list = document.createElement('ol');
        header.innerText = '抽選結果';
        resultDivided.appendChild(header);
        resultDivided.appendChild(result_list);
    
    for(var i = 0; i < result.length; i++){
        var result_item = document.createElement('li');
        result_item.innerText = result[i];
        
        result_list.appendChild(result_item);
    }
}
//一からやり直し
function restart(){
    option.splice(0);
    result.splice(0);
    if(resultDivided.childElementCount !==0){
        resultDivided.removeChild(resultDivided.firstChild);
        resultDivided.removeChild(resultDivided.firstChild);
    }
}
//引いたアイテムを箱に戻す
function restartDraw(){
    for(var i = 0; i < result.length; i++){
        option.push(result[i]);
    }
    result.splice(0);
    if(resultDivided.childElementCount !==0){
        resultDivided.removeChild(resultDivided.firstChild);
        resultDivided.removeChild(resultDivided.firstChild);
    }
}
