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
            e.target.parentElement.classList.add('license-active')
        else
            e.target.classList.add('license-active')
    });
});


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
        // active.style.width = 144;
        parentElem.append(active);
    });
});