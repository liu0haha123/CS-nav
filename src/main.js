const $siteList = $(".siteList")
const $lastLi = $siteList.find("li.last")
const X = localStorage.getItem("X")
const XObject = JSON.parse(X)

const hashMap = XObject || [
    { logo: "A", url: "https://arxiv.org/" },
    { logo: "G", url: "https://github.com" }
]

$(document).ready(function () { $('.hover').bind('touchstart touchend', function (e) { e.preventDefault();  }); });


const render = () => {
    $siteList.find("li:not(.last)").remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                        <div class="logo">${simplify(node.url)[0].toUpperCase()}</div>
                        <div class="link">${simplify(node.url)}</div>
                        <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                        </div>
                    </div>
        </li>`).insertBefore($lastLi)
        $li.on("click", () => {
            // 用JS行为代替a标签
            window.open(node.url)
        })
        $li.on("click", ".close", e => {
            // 阻止冒泡
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

$(".searchForm").on("keypress", (e) => {
    e.stopPropagation()
})
const simplify = (url) => {
    // 删除以/为开头的所有内容
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace("/\/.*/i", "")
        .replace("/", "")
}

render()


$(".addButton").on("click", () => {
    let url = window.prompt("请输入要添加的网址")
    if (url.indexOf("http") !== 0) {
        url = "https://" + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplify(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    console.log(string);
    window.localStorage.setItem("X", string)
}


$(document).on("keypress", (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {

            window.open(hashMap[i].url)
        }
    }
})

