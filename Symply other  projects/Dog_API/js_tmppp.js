const append = () => {
    let div = document.getElementById("body");
    let header = document.createElement('h2');
    header.innerText = "Choose somthing to search ..."
    div.appendChild(header)

    
    let select_types = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller', 'australian', 'basenji', 'beagle', 'bluetick', 'borzoi', 'bouvier', 'boxer', 'brabancon', 'briard', 'buhund', 'bulldog', 'bullterrier', 'cattledog', 'chihuahua', 'chow', 'clumber', 'cockapoo', 'collie', 'coonhound', 'corgi', 'cotondetulear', 'dachshund', 'dalmatian', 'dane', 'deerhound', 'dhole', 'dingo', 'doberman', 'elkhound', 'entlebucher', 'eskimo', 'finnish', 'frise', 'germanshepherd', 'greyhound', 'groenendael', 'havanese', 'hound', 'husky', 'keeshond', 'kelpie', 'komondor', 'kuvasz', 'labradoodle', 'labrador', 'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese', 'mastiff', 'mexicanhairless', 'mix', 'mountain', 'newfoundland', 'otterhound', 'ovcharka', 'papillon', 'pekinese', 'pembroke', 'pinscher', 'pitbull', 'pointer', 'pomeranian', 'poodle', 'pug', 'puggle', 'pyrenees', 'redbone', 'retriever', 'ridgeback', 'rottweiler', 'saluki', 'samoyed', 'schipperke', 'schnauzer', 'setter', 'sheepdog', 'shiba', 'shihtzu', 'spaniel', 'springer', 'stbernard', 'terrier', 'tervuren', 'vizsla', 'waterdog', 'weimaraner', 'whippet', 'wolfhound'];
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then((data) => {
        let types = data.message;
        types = Object.keys(types);
        console.log(types)
        select_types.push(select_types,types);
    });


    let select_bar = document.createElement('select');
    select_bar.id = 'search_key';
    for (let type of select_types){
        let option = document.createElement('option');
        option.value = type;
        option.innerText = type;
        select_bar.appendChild(option);
    }
    div.appendChild(select_bar);

    let fetch_button = document.createElement('button');
    fetch_button.innerText = "Fetch!";
    fetch_button.onclick = function() {search()};

    div.appendChild(fetch_button);
    div.appendChild(document.createElement('br'));
} 


function search () {
    let div = document.getElementById("body");

    let search_key = document.getElementById('search_key');
    if (search_key.value === 'choose something...'){
        let error_message = document.createElement('h4');
        error_message.innerHTML = 'Choose somthing to search!';   
        div.appendChild(error_message);
        return ;
    }
    let search_url = `https://dog.ceo/api/breed/${search_key.value}/images/random`;

    let deletePrevResoult = document.getElementById('resoult');
    if (deletePrevResoult)
        deletePrevResoult.remove();

    fetch(search_url)
    .then(response => response.json())
    .then(data => {
        let image = document.createElement('img')
        image.id = 'resoult';
        image.src = data.message;
        div.appendChild(image);
    });
}

append();