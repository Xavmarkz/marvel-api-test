const btn = document.getElementById("btn")
let select_list = document.getElementById("select_list")
let formu = document.getElementById("form.container")
let infoContent = document.getElementById("infoContent")

addEventListener("load", ()=>{
  let xhr = new XMLHttpRequest();
xhr.open("GET", "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=3dfd8ae0d235ce35764999638c3bc10e&hash=67a85c3c360e22fd6a9edd52abcb7982");
xhr.addEventListener("load", (getData)=>{
  let dataText = getData.target.responseText;
  let dataJSON = JSON.parse(dataText)
  let dataResults = dataJSON.data.results
  let splicedArray = dataResults.splice(2)
  let dataResultsArray = splicedArray.map(s=>s)
  let fragm = document.createDocumentFragment()
  for(let i=0; i<dataResultsArray.length; i++){
    let selectItem = document.createElement("option")
    selectItem.innerHTML = dataResultsArray[i].title
    fragm.appendChild(selectItem)
    select_list.appendChild(fragm)
    select_list.addEventListener("change",(e)=>{
      btn.addEventListener("click",()=>{
        if(e.target.value === selectItem.innerText){
          if(infoContent.innerText == selectItem.innerHTML){
            return false
          }else{
            infoContent.innerHTML = ""
            let contentFragment = document.createDocumentFragment()
            let image = `<img src="${dataResultsArray[i].thumbnail.path}.${dataResultsArray[i].thumbnail.extension}"</img class = "w-50 mt-5 mb-3 mx-auto ">`  
            contentTitle = `<h1 class="h3 mb-5">${selectItem.innerText}</h1>`
            infoContent.innerHTML = image + contentTitle
            }
            }
          }
        )
      })
    }
  })
xhr.send()
})
