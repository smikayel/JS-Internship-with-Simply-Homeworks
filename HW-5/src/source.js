export function licensesButton(){
    const licensButtons = Array.from(document.getElementsByClassName('licenses'));
    licensButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            const licensButtons = Array.from(document.getElementsByClassName('licenses'));
            licensButtons.forEach(element => {
                if (element.classList.contains('license-active')) {
                    element.classList.remove('license-active');
                }
            });
            if (e.target.classList.contains('rectangele'))
                e.target.parentElement.classList.add('license-active');
            else
                e.target.classList.add('license-active');
        });
    });
};

export function menu(){
    const menuButtons = Array.from(document.getElementsByClassName('menu-button'));
    menuButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            const menuButtons = Array.from(document.getElementsByClassName('menu-button'));
            menuButtons.forEach(element => {
                const active = element.getElementsByTagName('hr')[0];
                if (active)
                    element.removeChild(active);
                if (element.classList.contains('license-active')) {
                    element.classList.remove('license-active');
                }
            });
            const parentElem = e.target.parentElement;
            parentElem.classList.add('license-active');
            const active = document.createElement('hr');
            active.classList.add('button-active-liner');
            parentElem.append(active);
        });
    });
}


export function renderButtonactivity(buttonsData){
    const licensButtons = Array.from(document.getElementsByClassName('licenses'));
    for (let data of buttonsData){
        if (data.name == 'Free' && data.active == true)
            licensButtons[0].classList.add('license-active')
        else if (data.name == 'Pro' && data.active == true)   
            licensButtons[1].classList.add('license-active')
        else if (data.name == 'VIP' && data.active == true)   
            licensButtons[2].classList.add('license-active')
    };
};