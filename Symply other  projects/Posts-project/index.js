import { App } from "./commponents/App.js"

const loading = () => {
    const container = document.createElement('div');
    container.classList.add('posts-container');
    container.append(App());
    const pageRes = document.getElementsByClassName('body-container');
    pageRes[0].append(container);
}

window.addEventListener("load", loading);