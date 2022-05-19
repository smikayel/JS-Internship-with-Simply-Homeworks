const licensButtons = Array.from(document.getElementsByClassName('licenses'));
licensButtons.forEach(element => {
    element.addEventListener('click', (e)=> {
        const licensButtons = Array.from(document.getElementsByClassName('licenses'));
            licensButtons.forEach(element => {
            if (element.classList.contains('license-active')){
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
    element.addEventListener('click', (e)=> {
        const menuButtons = Array.from(document.getElementsByClassName('menu-button'));
        menuButtons.forEach(element => {
            if (element.classList.contains('license-active')){
                element.classList.remove('license-active');
            }
        });
        // if (e.target.classList.contains('rectangele'))
        //     e.target.parentElement.classList.add('license-active')
        // else
            e.target.style.opacity = 1;
    });
});