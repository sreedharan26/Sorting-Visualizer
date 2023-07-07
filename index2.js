// let newArray=document.querySelector('.arr')
let sort_btn=document.querySelector('.quick');
// let barCtnr=document.querySelector('.bar-container')
let slider2=document.querySelector('.size-slider')
// let speed=document.querySelector('.speed-slider')
// let n=slider.value
// let arr=new Array(n)

slider2.addEventListener("input",()=>{
    n=slider.value;
    barCtnr.innerHTML=''
    arr=randomArray();
    arrangeBars(arr);
})

function randomArray(){
    let a=new Array(n);
    for(let i=0;i<n;i++){
        a[i]=Math.round(98*(Math.random()))+1;
    }
    return a;
}

function arrangeBars(arr){
    for(let i=0;i<arr.length;i++){
        let bar=document.createElement("div");
        bar.classList.add('bar');
        bar.style.backgroundColor="lightgreen";
        bar.style.height= arr[i]*7+"px";
        bar.style.width="2px";
        barCtnr.appendChild(bar);
    }
}

document.addEventListener("DOMContentLoaded",function(){
    arr=randomArray();
    barCtnr.innerHTML="";
    arrangeBars(arr);
})

newArray.addEventListener("click",()=>{
    arr=randomArray();
    barCtnr.innerHTML="";
    arrangeBars(arr);

})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mergeSort(arr,s,e){
    if(s<e){
        let mid=s+parseInt((e-s)/2);
        await mergeSort(arr,s,mid);
        await mergeSort(arr,mid+1,e);
        await merge(arr,s,mid,e);
    }
}
async function merge(arr,s,mid,e){
    let bars=document.querySelectorAll('.bar');
    let i=0,j=0,k=s;
    let left=arr.slice(s,mid+1);
    let right=arr.slice(mid+1,e+1);
    while(i<left.length && j<right.length){
        if(left[i]<right[j]){
            arr[k]=left[i];
            i++;
        }else{
            arr[k]=right[j];
            j++;
        }
        bars[k].style.height=arr[k]*7+"px";
        bars[k].style.backgroundColor="lightpink"
        // if(k+parseInt(e-s)<arr.length){
        //     bars[k+parseInt(e-s)].sttyle.backgroundColor="lightyellow";
        //     bars[k+parseInt(e-s)].sttyle.height=arr[k]+"px";
        // }
        await sleep(100);
        k++;
    }
    while(i<left.length){
        arr[k]=left[i];
        bars[k].style.height=arr[k]+"px";
        bars[k].style.backgroundColor="lightblue";
        await sleep(100);
        i++;
        k++;
    }

    while(j<right.length){
        arr[k]=right[i];
        bars[k].style.height=arr[k]+"px";
        bars[k].style.backgroundColor="lightblue";
        await sleep(100);
        j++;
        k++;
    }

    for(let k=s;k<=e;k++){
        bars[k].style.backgroundColor="lightgreen"
    }
}

async function mergesort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergesort(left);
    await mergesort(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        i++;
       
      } else {
        arr[k] = right[j];
        j++;
        
      }
     
      bars[k].style.height = arr[k] * 7 + "px";
      bars[k].style.backgroundColor = "lightpink";
      if (k + arr.length < bars.length) {
        bars[k + arr.length].style.height = arr[k] * 7 + "px";
        console.log(arr[k] * 7);
        bars[k + arr.length].style.backgroundColor = "lightred";
      }
      await sleep(100);

  
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = arr[k] * 7 + "px";
      bars[k].style.backgroundColor = "lightblue";
      await sleep(100);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = arr[k] * 7 + "px";
      bars[k].style.backgroundColor = "lightblue";
      await sleep(100);
      j++;
      k++;
    }
  
    
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "lightgreen";
    }
  
    return arr;
  }
  

sort_btn.addEventListener("click",()=>{
    quickSort(arr,0,n-1);
})


async function partition(arr,s,e){
    
    let bars=document.querySelectorAll('.bar');
    let pi=Math.floor((s+e)/2);
    let pivot=arr[pi];
    bars[pi].style.backgroundColor="lightpink";
    for(let i=0;i<bars.length;i++){
        if(i!=pi)
        bars[i].style.backgroundColor='lightgreen';
    }
    let i=s,j=e;
    while(i<=j){
        while(arr[i]<pivot){
            i++;
        }
        while(arr[j]>pivot){
            j--;
        }
        if(i<=j){
            await swap(arr,i,j,bars);
            i++;
            j--;
        }
    }
    // await swap(arr,s,j,bars);
    return i;
}

async function quickSort(arr,s,e){
    let bars=document.querySelectorAll('.bar');
    let index=await partition(arr,s,e);
    if(arr.length>1){
        if(index-1>s)
        await quickSort(arr,s,index-1);
        if(index<e)
        await quickSort(arr,index,e);
    }
    for(let i=0;i<bars.length;i++){
        bars[i].style.backgroundColor='lightgreen';
    }
    return arr;
}

async function swap(items, leftIndex, rightIndex, bars) {
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * 6.5 + "px";
    bars[leftIndex].style.backgroundColor = "lightgreen";
    //bars[leftIndex].innerText = items[leftIndex];
    bars[rightIndex].style.height = items[rightIndex] * 6.5 + "px";
    bars[rightIndex].style.backgroundColor = "lightgreen";
    //bars[rightIndex].innerText = items[rightIndex];
    await sleep(100);
  }