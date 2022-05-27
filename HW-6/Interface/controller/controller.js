BASE_URL = 'http://127.0.0.1:5000/todos/';


async function getData(url){
  try {
      const response = await fetch(url,);
      return response.json();
  } catch (e) {
      console.log(e.message);
  };
};


async function search(event){
  const inputfield = document.getElementById('search');
  const container = document.getElementById('search-container');
  const searchKeyword = inputfield.value;
  let url =`${BASE_URL}${searchKeyword}`;
  let data;
  try{
    data = await getData(url);
  } catch (e){
    container.innerHTML = 'Not found!'
    return
  }
  container.innerHTML = '';
  
  const Table = document.createElement('table');
  Table.className = 'remainder';
  const tableRow = document.createElement('tr');
  Object.keys(data[0]).forEach(e => {
    if (e === 'description' || e === "remaindAt" || e === "remaindAt" || e === 'status'){
      const tableData = document.createElement('td');
      tableData.innerHTML = data[0][e];
      tableRow.append(tableData);
    }
  });
  Table.append(tableRow)
  container.append(Table);
}

function deleteRemainder(e){
  const remainderId = e.target.parentElement.getAttribute("remainderid")
  try {
    fetch(BASE_URL, {
      method: "DELETE",
      body: JSON.stringify({
        id:remainderId
      }),
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    .then(console.log)

  } catch (e) {
      console.log(e.message);
  };
}

function updateButtonRemainder(){
  const id = document.getElementById('updateId').value
  const description = document.getElementById('updateDescription').value
  const remaindAt = document.getElementById('updateRemaindAt').value
  try {
    fetch(BASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          id,
          description,
          remaindAt
        }),
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then(console.log)

  } catch (e) {
      console.log(e.message);
  };
};

async function getRequest () {
  const allData = await getData(BASE_URL);
  const Table = document.getElementsByClassName('remainder')[0];
  allData.forEach(element => {
    
    const tableRow = document.createElement('tr');
    Object.keys(element).forEach(e => {
      if (e === 'description' || e === "remaindAt" || e === "remaindAt" || e === 'status'){
        const tableData = document.createElement('td');
        tableData.innerHTML = element[e];
        tableRow.append(tableData);
      }
    });
    tableRow.setAttribute('remainderid',element.id)
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', (e) => {
      deleteRemainder(e);
    });
    const updateButton = document.createElement('button');
    updateButton.className = 'updateButton';
    updateButton.addEventListener('click', (e) => {
      updateButtonRemainder(e);
    });
    deleteButton.innerHTML = 'Delete';
    updateButton.innerHTML = 'update';
    tableRow.append(deleteButton, updateButton);
    Table.append(tableRow)
  });
  // console.log(dataRow);
  // Table.append(dataRow);
}

function add(){
  const description = document.getElementById('addRemainderDescription').value
  const remaindAt = document.getElementById('addRemainderRemaindAt').value
  try {
    fetch(BASE_URL, {method: "POST", body: JSON.stringify({description, remaindAt}),
    headers: { "Content-Type": "application/json" }})
    .then(console.log)

  } catch (e) {
      console.log(e.message);
  };

}


function init(){
  getRequest ();
  const searchButton = document.getElementById('search-button')
  searchButton.addEventListener('click', (e) => {
    search(e);
  });

  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', (e) => {
    add();
  });
  
}

init ()