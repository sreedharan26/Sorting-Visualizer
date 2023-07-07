let newArray=document.querySelector('.arr')
let bubblesort_btn=document.querySelector('.bub');
let selectionsort_btn=document.querySelector('.sel');
let insertionsort_btn=document.querySelector('.ins');
let mergesort_btn=document.querySelector('.merge');
let quciksort_btn=document.querySelector('.quick');
let heapsort_btn=document.querySelector('.heap');
let barCtnr=document.querySelector('.bar-container');
let slider=document.querySelector('.size-slider');
let speedslider=document.querySelector('.speed-slider');
let n=slider.value;
let speed=speedslider.value;
let arr=new Array(n);
let quick_swaps=[];
let merge_swaps=[];
document.addEventListener("DOMContentLoaded",()=>{
    initialize();
    showBars(arr);
})

newArray.addEventListener("click",()=>{
    initialize();
    showBars(arr);
})

slider.addEventListener("input",()=>{
    n=slider.value;
    arr=[];
    barCtnr.innerHTML=''
    initialize();
    showBars(arr);
})

speedslider.addEventListener("input",()=>{
    let x=speedslider.value;
    speed=Math.round(1000/x);
})

bubblesort_btn.addEventListener("click",()=>{
    let v=[...arr];
    let swaps=bubblesort(v);
    animate(swaps, arr);
})

selectionsort_btn.addEventListener("click",()=>{
    let v=[...arr];
    let selSwaps=selectionSort(v);
    animate(selSwaps,arr);
})

insertionsort_btn.addEventListener("click",()=>{
    let v=[...arr];
    let insSwaps=insertionSort(v);
    animate(insSwaps,arr);
})

mergesort_btn.addEventListener("click",()=>{
    // arr=[3,2,4,1,7,8];
    // let v=[...arr];
    // merge_swaps=[];
    // mergeSort(v,0,v.length-1);
    // console.log(merge_swaps);
    // mergeanimate(arr,merge_swaps,0);
    // showBars(v);
    mergesort(arr);
})

quciksort_btn.addEventListener("click",()=>{
    let v=[...arr];
    quick_swaps=[];
    quick(v,0,v.length-1);
    animate(quick_swaps,arr);
})

heapsort_btn.addEventListener('click',()=>{
    let v=[...arr];
    let heapSwaps=[];
    heapSort(v,heapSwaps);
    console.log(v)
    animate(heapSwaps,arr);
})

// function Bubble(){
//     let v=[...arr];
//     let swaps=bubblesort(v);
//     animate(swaps, arr);
// }
function bubblesort(arr){
    let swaps=[];
    for(let i=0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                swaps.push([j,j+1,'s']);
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
            }else{
                swaps.push([j,j+1],'n');
            }
        }
    }
    return swaps;
}


// function selection(){
//     let v=[...arr];
//     let selSwaps=selectionSort(v);
//     // animate(selSwaps,arr);
//     showBars(v)
// }
function selectionSort(arr){
    let swaps=[];
    for(let i=0;i<arr.length-1;i++){
        for(let j=i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                swaps.push([i,j,'s']);
                [arr[i],arr[j]]=[arr[j],arr[i]];
            }else{
                swaps.push([i,j,'n']);
            }
        }
    }
    return swaps;
}

// function insert(){
//     let v=[...arr];
//     let insSwaps=insertionSort(v);
//     animate(insSwaps,arr);
// }
function insertionSort(arr){
    let swaps=[];
    for(let i=1;i<arr.length;i++){
        let comp=arr[i];
        for(let j=i-1;j>=0;j--){
            if(arr[j]>comp){
                swaps.push([j,j+1,'s']);
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
            }else{
                swaps.push([j,j+1,'n']);
                break;
            }
        }
    }
    return swaps;
}


function quick(arr,s,e){
    if(e-s>0){
        let ind=partition(arr,s,e);
        if(ind-1>s)
        quick(arr,s,ind-1);
        if(ind<e)
        quick(arr,ind+1,e);
    }
}
function partition(arr,s,e){
    // let p=s+1;
    // let q=e;
    // while(p<q && p<e){
        //     while(arr[p]<arr[s]){
            //         quick_swaps.push([p,s,'n']);
            //         p++;
            //     }
            //     while(arr[q]>arr[s]){
                //         quick_swaps.push([q,s,'n']);
                //         q--;
                //     }
                //     if(p<q){
                    //         quick_swaps.push([p,q,'s']);
                    //         [arr[p],arr[q]]=[arr[q],arr[p]];
                    //     }
                    // }
                    // quick_swaps.push([q,s,'s']);
                    // [arr[s],arr[q]]=[arr[q],arr[s]];
                    // return q;
    let pindex=s;
    quick_swaps.push([s,s,'y']);
    let pivot=arr[e];
    for(let i=s;i<e;i++){
        quick_swaps.push([i,e,'n']);
        if(arr[i]<=pivot){
            quick_swaps.push([i,pindex,'s']);
            [arr[i],arr[pindex]]=[arr[pindex],arr[i]];
            pindex++;
        }
    }
    quick_swaps.push([pindex,e,'s']);
    [arr[pindex],arr[e]]=[arr[e],arr[pindex]];
    return pindex;
}


function heapSort(arr,swaps){
    let n=arr.length;
    for(let i=Math.floor(n/2)-1;i>=0;i--){
        heapify(arr,swaps,n,i);
    }

   for(let i=n-1;i>=0;i--){
        [arr[0],arr[i]]=[arr[i],arr[0]];
        swaps.push([0,i,'s']);
        heapify(arr,swaps,i,0);
   }
}

function heapify(arr, swaps,n,i){
    let x=i;
    let lc=2*i+1;
    let rc=2*i+2;
    if(lc<n){
        swaps.push([x,lc,'n']);
    }
    if(lc<n && arr[x]<arr[lc]){
        x=lc;
    }
    if(rc<n){
        swaps.push([x,rc,'n']);
    }
    if(rc<n && arr[x]<arr[rc]){
        x=rc;
    }
    if(x!=i){
        [arr[x],arr[i]]=[arr[i],arr[x]];
        swaps.push([x,i,'s']);
        heapify(arr,swaps,n,x);
    }

}


function showBars(arr,swaps=null){
    let x='';
    let con=document.querySelector('.bar-container');
    for(let i=0;i<arr.length;i++){
        let col='lightgreen';
        
        if(swaps!==null && (swaps[0]===i || swaps[1]===i)){
            if(swaps[2]==='s'){
                col='lightpink';
            }else if(swaps[2]==='y'){
                col='lightyellow';
            }else{
                col='lightblue';
            }
        }else{
            col='lightgreen';
        }
        // if(swaps!==null && (swaps[0]===i || swaps[1]===i)){
        //     t='height 0.5s ease-in 0.5s';
        // }
        let z=`<div class="bar" style="
        height :${((parseInt(arr[i]*99)))}%;
        width: 20px;
        text-align: center;
        background-color: ${col};
        border: 1px solid black;
        ">
        </div>`
        x+=z;
    }
    con.innerHTML=x;
}
// ${Math.round(100/n)}
function animate(swaps, arr){
    if(swaps.length==0){
        showBars(arr);
        document.querySelector('.res').innerHTML=`<p style="
        text-align: center;
        font-size: 1.5rem;
        font-family: sans-serif;
        ">✌️Finished!✌️</p>`;
        setTimeout(()=>{
            document.querySelector('.res').innerHTML='';
        }, 1000);
        return;
    }
    let [i,j,move]=swaps.shift();
    if(move==='s')
    [arr[i],arr[j]]=[arr[j],arr[i]];
    showBars(arr,[i,j,move]);
    setTimeout(()=>{
        animate(swaps,arr);
    },speed);
}

function initialize(){
    for(let i=0;i<n;i++){
        arr[i]=Math.random();
    }
    showBars(arr);
}


//index2
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
     
      bars[k].style.height = Math.round(arr[k] * 98)+1 + "%";
      bars[k].style.backgroundColor = "lightpink";
      bars[k].style.width="15px";
      if (k + arr.length < bars.length) {
        bars[k + arr.length].style.height = Math.round(arr[k] * 98)+1 + "%";
        // console.log(arr[k] * 7);
        bars[k + arr.length].style.backgroundColor = "lightred";
      }
      await sleep(100);
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = Math.round(arr[k] * 98)+1 + "%";
      bars[k].style.backgroundColor = "lightblue";
      await sleep(100);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = Math.round(arr[k] * 98)+1 + "%";
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
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// function mergeButton(){
//     let v=[...arr];
//     mergeSort(v,0,v.length-1);
//     mergeanimate(arr,merge_swaps);
// }

// function mergeSort(arr){
//     if(arr.length===1){
//         return arr;
//     }
//     let mid=Math.floor(arr.length/2);
//     let la=arr.slice(0,mid+1);
//     let ra=arr.slice(mid+1);
//     la=mergeSort(la);
//     ra=mergeSort(ra);
//     return merge(la,ra);

// }
// function merge(arr1,arr2){
//     let arr=new Array(arr1.length+arr2.length);
//     let k=i=j=0;
//     while(i<arr1.length && j<arr2.length){
//         if(arr1[  ])
//     }
// }

// function mergeanimate(arr,swaps,i){
//     if(swaps.length===0){
//         showBars(arr);
//         return;
//     }
//     let [x,y,move]=swaps.shift();
//     if(move==='s')
//     arr[x]=y
//     // [arr[x],arr[y]]=[arr[y],arr[x]];
//     // mergeshow(arr,[x,move]);
//     showBars(arr,[x,y,move]);
//     setTimeout(()=>{
//         mergeanimate(arr,swaps,i++);
//     },100); 
    
// }

// // function mergeshow(arr,final=null){
// //     let x='';
// //     let con=document.querySelector('.bar-container');
// //     for(let i=0;i<arr.length;i++){
// //         let col='lightgreen';
// //         if(final!==null && i===final[0]){
// //             if(final[1]==='s'){
// //                 col='lightpink';
// //             }else if(final[1]==='n'){
// //                 col='lightblue'
// //             }
// //         }else{
// //             col='lightgreen';
// //         }
        
// //         let z=`<div class="bar" style="
// //         height :${Math.round(99*arr[i])}%;
// //         width: ${Math.round(100/n)}px;
// //         text-align: center;
// //         background-color: ${col};
// //         border: 1px solid black;
// //         ">
// //         </div>`
// //         x+=z;
// //     }
// //     con.innerHTML=x;
// // }

// // let btn=document.querySelector('.quick');
// // btn.addEventListener("click",()=>{
// //     let v=[...arr];
// //     quick_swaps=[];
// //     quick(v,0,arr.length-1);
// //     // showBars(arr);
// //     animate(quick_swaps,arr);
// // })
