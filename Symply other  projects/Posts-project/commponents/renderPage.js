function userLogo(creator) {
    // const container = document.createElement()
    const logoText = creator.name.split(' ')[0][0] + creator.name.split(' ')[1][0];
    const Img = document.createElement('div');
    Img.classList.add('circle');
    Img.innerHTML = `<text>${logoText}</text>`;
    console.log(logoText)
    return Img
}

function render(data){
    const container = document.createElement('div');
    
    data.forEach(post => {
        const postcontainer = document.createElement('div');
        postcontainer.classList.add('post');
        postcontainer.appendChild(userLogo(post.creator));
        postcontainer.setAttribute("userid", post.userId);

        let postContentContainer = document.createElement('div');
        postContentContainer.classList.add('post-container');

        let postTitle = document.createElement('h3');
        postTitle.classList.add('post-title');
        postTitle.innerHTML = post.title;
        postContentContainer.appendChild(postTitle);

        let postContent = document.createElement('span');
        postContent.classList.add('post-Content');
        postContent.innerHTML = post.body;
        postContentContainer.appendChild(postContent);

        // const comments = document.createElement('a');
        // comments.classList.add("comments");
        // comments.innerHTML = "#comments";
        postcontainer.append(postContentContainer);
        container.appendChild(postcontainer);
    });
    return container;
}

export const renderResoult = (data) => {
    const container = document.getElementsByClassName('posts-container');
    container.innerHTML = "";
    if (!data.filterdData){
        return render(data);
    }
}







