import { licensesButton, menu, renderButtonactivity } from './source.js';

function renderSubData(data, id, islast){
    const subSystems = data.tabs[2].data.subsystems
    const filtered = subSystems.filter(el => el.system_id == id);
    const parentContainer = document.createElement('div');
    const container = document.getElementById('sub-data-maket').content.cloneNode(true);
    parentContainer.append(container);
    filtered.forEach(data => {
        const cloneRow = document.getElementById('sub-maket-row').content.cloneNode(true);
        cloneRow.querySelector('#licenses').innerHTML = data.licenses;
        cloneRow.querySelector('#expire').innerHTML = data.expires;
        parentContainer.append(cloneRow);
    })
    if (!islast)
        parentContainer.append(document.getElementById('table-header-other-part').content.cloneNode(true));
    return parentContainer;
}

function resetArrows(e, data){
    const subDivs = Array.from(document.getElementsByClassName('sub-data'));
    subDivs.forEach(el => el.innerHTML = '');
    const arrows = Array.from(document.getElementsByClassName('arr'));
    arrows.forEach(element => {
        element.innerHTML = '▶';
    })

    const id = e.target.parentElement.parentElement.id;
    let islast = false;
    if (id == subDivs.length - 1)
        islast = true;
    subDivs[id].
    appendChild(renderSubData(data, e.target.parentElement.parentElement.getAttribute('systeam_id'), islast));
}

function setData(data){
    const tables = document.getElementsByClassName('tables')[0];
    
    const offlineActivationSystems = data.tabs[2].data.systems;
    let index = 0;
    while (index < offlineActivationSystems.length){
        const clone = document.getElementById('data-maket').content.cloneNode(true);
        clone.querySelector('#get-data').addEventListener('click', (e) => {
            resetArrows(e, data);
            e.target.innerHTML = '▼';
        });
        clone.querySelector("#sys-name").parentElement.setAttribute("id", index);
        clone.querySelector("#sys-name").parentElement.setAttribute("systeam_id", offlineActivationSystems[index].id);
        clone.querySelector("#sys-name").innerHTML = offlineActivationSystems[index].system_name;
        clone.querySelector("#id").innerHTML = offlineActivationSystems[index].id;
        clone.querySelector("#created-data").innerHTML = offlineActivationSystems[index].created_date;
        clone.querySelector("#active-licenses").innerHTML = offlineActivationSystems[index].active_licenses;
        const getMoreContainer = document.createElement('div');
        getMoreContainer.classList.add('sub-data');
        clone.append(getMoreContainer);
        tables.append(clone);
        index++;
    }
}

async function init() {
    const response = await fetch('../data/test_data.json').then(data => data);
    const data = JSON.parse(await response.text());
    setData(data)
    renderButtonactivity(data.plans)
    licensesButton();
    menu();
}

init()