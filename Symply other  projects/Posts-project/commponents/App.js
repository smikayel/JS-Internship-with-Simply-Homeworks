import { fetchData } from "./fetchData.js";
import { renderResoult } from "./renderPage.js";
import { markfilterdPosts } from "./helperFunctions.js"

function debounce(fn, delay = 400) {
    let timeoutId

	return function(...args) {
        if (timeoutId) {
        	clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
        	fn.apply(this, args)
        }, delay)
    }
}

function filterPosts(posts, keyword){
    return posts.filter((post) => post.title.includes(keyword));
}

export const App = () => {
    const state = {
        posts : [],
        filterdPosts : [],
    };

    window.state = state;
    const container = document.createElement('div');

    fetchData("posts")
    .then((posts) => {
        state.posts = Array.from(posts);
        const userIds = Array.from(new Set(state.posts.map(post => post.userId)))
        const promises = userIds.map((userId) => fetchData(`users/${userId}`));

        return Promise.all(promises);
    })
    .then((users) => {
        state.posts = state.posts.map((post) => {
          return {
            ...post,
            creator: users.find((user) => post.userId === user.id),
          };
        });
        container.appendChild(renderResoult(state.posts));
      });

    const searchCallBack = debounce((e) => {
        state.filterdPosts = filterPosts(state.posts, e.target.value);
        container.innerHTML = "";
        container.appendChild(renderResoult(state.filterdPosts));
        markfilterdPosts(e.target.value);
    })

    const searchInput = document.getElementsByClassName('search-input')[0];
    searchInput.addEventListener("input", searchCallBack);

    return container;
}