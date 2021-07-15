let hammingDistanceWord1 = document.getElementById("hammingDistanceWord1");
let hammingDistanceWord2 = document.getElementById("hammingDistanceWord2");
let hammingDistanceBtn = document.getElementById('hammingDistanceBtn');


function hammingDistance(firstWord, secondWord){
    let distance = 0;

    if(firstWord.length == secondWord.length){

        for(let i = 0; i < firstWord.length; i++){
            if(firstWord[i].toLowerCase() != secondWord[i].toLowerCase()){
                distance++;
            }
        }
        
    }
    return distance;
}

hammingDistanceBtn.addEventListener('click', () => {
    let firstWord = hammingDistanceWord1.value;
    let secondWord = hammingDistanceWord2.value;

    if(firstWord.length == 0 && secondWord.length == 0){
        alert('Introduceti cele doua cuvinte!');
    }else{
        if(firstWord.length != secondWord.length){
            alert('Cele doua cuvinte au lungimi diferite. Introduceti cuvinte care au aceeasi lungime');
        }else{
            alert('Distanta Hamming dintre cele 2 cuvinte de cod este ' + hammingDistance(firstWord,secondWord));
        }
    }
});




// genereaza primele N numere Hamming
function isHammingNumber(n){
    while(n % 5== 0)
        n /= 5;

    while(n % 3 == 0)
        n /= 3;

    while(n % 2 == 0)
        n /= 2;

    if(n == 1)
        return n;
}

let succesion = [];
function Hamming(n){
    succesion.push(1);
    let len = succesion.length;
    let canditate = 2;

    while (len < n){
        if(isHammingNumber(canditate)){
            succesion[len] = canditate;
            len++;
        }
        canditate++;
    }
    return succesion;
}


let inputGenerateHamming = document.getElementById('inputGenerateHamming');
let resultGenerateHamming = document.getElementById('resultGenerateHamming');
let hammingGenerateBtn = document.getElementById('hammingGenerateBtn');



hammingGenerateBtn.addEventListener('click', () => {
    let inputNumbers = inputGenerateHamming.value;
    if(inputNumbers.length == 0 || inputNumbers == 0){
        alert('Introduceti cate numere doriti sa generati!');
    }else{
        console.log(succesion);
        alert(`Primele ${inputNumbers} Hamming generate sunt ${Hamming(inputNumbers)}`);
  
    }
});



// distanta hamming a unui cod liniar
let hammingDistanceCode = document.getElementById('hammingDistanceCode');
let hammingDistanceCodeBtn = document.getElementById('hammingDistanceCodeBtn');
hammingDistanceCodeBtn.addEventListener('click', () => {
    if(hammingDistanceCode.length == 0 || hammingDistanceCode.value == 0 || hammingDistanceCode.value == null){
      alert('Introduceti codul liniar!');
    }else{
        let code = [];
        let codeString = hammingDistanceCode.value;
        code.push(codeString.split(","));
        let distanceCodes = [];

        for (let i = 0; i < code[0].length - 1; i++) {
          for (let j = i + 1; j < code[0].length; j++) {
            distanceCodes.push(hammingDistance(code[0][i], code[0][j]));
          }
        }

        console.log(distanceCodes);
        alert("Distanta codului este d = " + Math.min(...distanceCodes));
    }
});






const nav  = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');

window.addEventListener('scroll', () => {
    if(window.scrollY > 20){
        navList.style = "background-color: #1f1f1f"
        nav.style = "background-color: #1f1f1f";
    }else{
        nav.style = "background-color: inherit";
        navList.style = "background-color: inherit";
    }
});



const huffmanEncodeBtn = document.getElementById('huffmanEncode');
// const huffmanDecodeBtn = document.getElementById('huffmanDecode');
const huffmanInput = document.getElementById('huffmanEncodeInput');
// const huffmanOutput = document.getElementById('huffmanDecodeInput');

huffmanEncodeBtn.addEventListener('click', () => {
    console.log(huffmanCode.encode(huffmanInput.value));
    alert("Mesajul codat folosind codul Huffman este " + huffmanCode.encode(huffmanInput.value)); 
})

// huffmanDecodeBtn.addEventListener('click', () => {
//   console.log(huffmanCode.decode(huffmanInput.value));
//   alert(huffmanCode.decode(huffmanOutput.value)); 
// })




function HuffmanTreeNode (weight, char) {
    this.l = null
    this.r = null
    this.weight = weight || 0
    this.char = char || ''
}

var heapMin = function () {
    this.set = [];
}

heapMin.prototype.adjust = function (index) {
    let len = this.set.length
    let l = index * 2 + 1
    let r = index * 2 + 2
    let min = index
    let node = null
   
    if (l <= len -1 && this.set[min].weight > this.set[l].weight) {
      min = l
    }
   
    if (r <= len -1 && this.set[min].weight > this.set[r].weight) {
      min = r
    }
   
    if (min != index) {
      node = this.set[index];
      this.set[index] = this.set[min]
      this.set[min] = node
      this.adjust(min)
    }
  }
   
  heapMin.prototype.push = function (node) {
    this.set.push(node)
   
    for (let i = Math.floor(this.set.length / 2); i >= 0; i--) {
      this.adjust(i)
    }
   
  }
   
  heapMin.prototype.pop = function () {
    let node
   
    node = this.set.shift()
    this.adjust(0)
   
    return node
  }
   
  heapMin.prototype.size = function () {
    return this.set.length
  }
   
 
  heapMin.prototype.empty = function () {
    return this.set.length === 0 ? true : false
  }

function HuffmanCode () {
    this.codeTable = []
    this.huffmanTree = null
}

  HuffmanCode.calcHeap = function(str) {
    let heap = new heapMin()
    let set = []
   
    for (let i = str.length - 1; i >= 0; i--) {
      if (set[str[i]]) {
        set[str[i]].num++
      } else {
        set[str[i]] = {num:1,char:str[i]}
      }
    }
   
    Object.values(set).forEach((value) => {
      heap.push(new HuffmanTreeNode(value.num, value.char))
    })
   
    return heap
  }

  
HuffmanCode.prototype.createHuffmanTree = function(str) {
    let heap = HuffmanCode.calcHeap(str)
   
    while(heap.size() > 1) {
      let min1 = heap.pop()
      let min2 = heap.pop()
      let parent = new HuffmanTreeNode(min1.weight + min2.weight, '')
   
      if (min1.weight < min2.weight) {
        parent.l = min1
        parent.r = min2
      } else {
        parent.l = min2
        parent.r = min1
      }
   
      heap.push(parent)
    }
   
    this.huffmanTree = heap.pop()
}

HuffmanCode.traverseTree = function (node, arr, code) {
    if (node.l !== null && node.r != null) {
      HuffmanCode.traverseTree(node.l, arr, code+'0')
      HuffmanCode.traverseTree(node.r, arr, code+'1')
    }
   
    arr[node.char] = code
}


HuffmanCode.prototype.encode = function (str) {
    this.createHuffmanTree(str)
    let res = []
   
    HuffmanCode.traverseTree(this.huffmanTree, this.codeTable, '')
   
    for (let i = str.length - 1; i >=0; i--) {
      res.push(this.codeTable[str[i]])
    }
   
    console.log(res);
    return res.join('')
}


HuffmanCode.prototype.decode = function (str) {
    if (this.huffmanTree === null) {
      console.error('Arborele Huffman este gol!');
    }
   
    let node = this.huffmanTree
    let res = []
   
    for (let len = str.length, i=0; i < len; i++) {
      if (str[i] === '0') {
        node = node.l
      } else {
        node = node.r
      }
   
      if (node.l === null && node.r === null) {
        res.push(node.char)
        node = this.huffmanTree
      }
    }
   
    return res.join('')

}

let huffmanCode = new HuffmanCode()



//