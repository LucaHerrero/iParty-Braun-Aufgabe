var indexLoadBug = 0;
const routes = [{
        path: '/',
        url: '/index.html',
        name: 'home',
        on: {
            pageBeforeIn: function () {
                if (indexLoadBug == 0) {
                    loadContentIndex();
                }
                indexLoadBug++;
            }
        }
    },
    {
        path: '/about',
        url: '/pages/about.html',
        name: 'about',
    },
    {
        path: '/contact',
        url: '/pages/contact.html',
        name: 'contact',
    },
    {
        path: '/impressum',
        url: '/pages/impressum.html',
        name: 'impressum',
    },
    {
        path: '(.*)',
        url: '/pages/404.html',
    },
];