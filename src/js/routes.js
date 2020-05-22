const page404animal = [
    "/images/icons/monkey1.svg",
    "/images/icons/monkey2.svg",
    "/images/icons/monkey3.svg"
]
const routes = [{
        path: '/',
        url: '/index.html',
        name: 'home',
        on: {
            pageBeforeIn: function () {
                if ($('#impressionImages').text().length == 0) {
                    loadContentIndex();
                }
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
        on: {
            pageAfterIn: function () {
                let randomNumber = Math.floor(Math.random() * 3);
                $(".monkey404image").attr("src", page404animal[randomNumber]);
            }
        }
    },
];