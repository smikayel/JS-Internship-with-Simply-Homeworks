BASE_URL = 'http://127.0.0.1:5000/todos/';


async function getData(url){
  try {
      const response = await fetch(url,);
      return response.json();
  } catch (e) {
      console.log(e.message);
  };
};

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
  getRequest ()
}

function updateButtonRemainder(e){
  const id = e.target.parentElement.getAttribute("remainderid")
  const description = document.getElementById('updateDescription').value
  const remaindAt = document.getElementById('updateRemaindAt').value
  const ceckboxValue = document.getElementById('updateRemainderStatus').checked
  let status = 'pending';
  if (ceckboxValue)
    status = 'done';
  try {
    fetch(BASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          id,
          description,
          remaindAt,
          status
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
  Table.children.innerText = '';
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
}

function add(){
  const description = document.getElementById('addRemainderDescription').value
  const remaindAt = document.getElementById('addRemainderRemaindAt').value
  const ceckboxValue = document.getElementById('addRemainderStatus').checked
  let status = 'pending';
  if (ceckboxValue)
    status = 'done';
  try {
    fetch(BASE_URL, {method: "POST", body: JSON.stringify({description, remaindAt, status}),
    headers: { "Content-Type": "application/json" }})
    .then(console.log)

  } catch (e) {
      console.log(e.message);
  };
}


function init(){
  getRequest ();
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', (e) => {
    add();
  });
  
}

init ()