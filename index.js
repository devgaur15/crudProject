let globalTemplateData = [];
templateContents = document.getElementById("templateContents");

const addCard = () => {
    const newTemplate = {
        // only curly braces show its a object
        id: `${Date.now()}`,
        // date.now is used as a type of id in timestamp format as no new template can be made on same date and time    `` template literal....is used to add variables....dollar sign with curly braces is the format to use template literals
        url: document.getElementById("carImage").value,
        //  .value helps in getting the input content in the form boxes
        carName: document.getElementById("carName").value,
        carType: document.getElementById("carType").value,
        carInfo: document.getElementById("carInfo").value,
    };
    templateContents = document.getElementById("templateContents");
    templateContents.insertAdjacentHTML('beforeend', generateTemplate(newTemplate));

    globalTemplateData.push(newTemplate);
    saveToLocal();
    // push at end
    // method used to insert generate function to add template....we will use before end here to insert card as last child bcoz we want every card to be viewed at end of previous card
}

const generateTemplate = ({id, url, carName, carType, carInfo}) => {
// curly braces used to desructure the arguments
   return ( `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>  
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-dark" name=${id}  onclick="editTemplate(this)">
            <i class="far fa-edit" name=${id}  onclick="editTemplate(this)"></i>
           </button>
          <button type="button" class="btn btn-outline-danger" name=${id}  onclick="deleteTemplate(this)">
            <i class="far fa-trash-alt" name=${id}  onclick="deleteTemplate(this)"></i>
          </button>
        </div>
      </div>
      <img src=${url} class="card-img-top" alt="image">
      <div class="card-body">
         <h5 class="card-title">${carName}</h5>
         <p class="card-text">${carType}</p>
         <p class="card-text">${carInfo}</p>
      </div>
      
     </div>
  </div>`)
}
//   used template literal to paste the html code in js file without affecting anything

const saveToLocal = () => {
  localStorage.setItem("tempo", JSON.stringify({templates: globalTemplateData}))
  // stringify convert json objects into strings, ie data sent in strings. JSON is javascript object notation, it is just a string format for javascript objects
  // setitem goes in key value format, here we have made the key has tempo
}

const reloadTemplate = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tempo"));
  console.log(localStorageCopy);
  // json.parse gets back the string from stringify to javascript format
  // localstoragecopy will throw error in first time use bcoz it will try to load the null value, hence by if else we first check it is null or not
  if(localStorageCopy) {
    globalTemplateData = localStorageCopy["templates"];
  }
  globalTemplateData.map((cardData) => {
    templateContents.insertAdjacentHTML('beforeend', generateTemplate(cardData));
  })
}

const deleteTemplate = (e) => {
  console.log(e)
 
  const targetID = e.getAttribute("name");
  // getattribute is used to get name attribute that has are template id     target denotes to the delete button we click   
  console.log(targetID)
  
  // tagname used to know whether button is clicked or the icon.........we use fliter method to delete selected template and not whole memory
  
  globalTemplateData = globalTemplateData.filter((cardData) => cardData.id!==targetID);
  console.log(globalTemplateData)
  saveToLocal();
  window.location.reload();
}
  // childnodes work in odd numbers

const editTemplate = (e) => {
  const targetID = e.getAttribute("name");
  console.log(e)
  console.log(e.parentNode)
  console.log(e.parentNode.parentNode.parentNode)
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])

  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true"))
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true"))
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true"))
   
  console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}

const saveEditTask = (e) => {
  const targetID = e.getAttribute("name");
  console.log(e)
}


