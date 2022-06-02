const cheangeResoultText = (keyword) => {
    const ResText = document.getElementsByClassName('text-resoult')[0];
    if (keyword === ""){
        ResText.innerHTML = "all users";
        return ;
    }
    ResText.innerHTML = keyword
}

export const markfilterdPosts = (keyword) => {
    const filterdPosts = document.getElementsByClassName('post-title');
    for (let element of filterdPosts){
        let elementText = element.innerHTML;
        let marked = elementText.replace(keyword, `<mark>${keyword}</mark>`);
        element.innerHTML = marked;
    }
    cheangeResoultText(keyword);
}