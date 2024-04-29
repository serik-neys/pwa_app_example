

window.addEventListener('load', async () => {

    //register ServiceWorker
    if ("serviceWorker" in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js');
            console.log(reg);
        } catch (e) {
            console.log(e);
        }
    }

    const postsEelem = document.querySelector('.posts')

    //render posts
    const render = (data) => {
        postsEelem.innerHTML = ""
        data.forEach(({ title, body }) => {
            postsEelem.insertAdjacentHTML("beforeend", `
        <div class="post">
        <h3 class="titile">${title}</h3>
        <p class="body">${body}</p>
        </div>
        `)
        })
    }

    //posts load
    const news = async () => {
        const response = await fetch('https://dummyjson.com/posts?limit=10')
        const data = await response.json()

        render(data.posts)
    }

    news()

    // notification with setTimeout
    setTimeout(() => {
        news()
        Notification.requestPermission().then(perm => {
            console.log(perm);
            if (perm === "granted") {
                new Notification("Hello!", {
                    icon: 'icon/ai-news.png'
                })
            }
        })
    }, 10000)
})

