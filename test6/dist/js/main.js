// const btn = document.querySelector("#btn");
// function hello() {
//     alert("test")
// }
// btn.addEventListener('click', hello)
// btn.addEventListener('mouseenter', hello)
document.addEventListener('DOMContentLoaded', function () {
    var el = document.querySelector('.anime');
    var str = el.innerHTML.split('');
    el.innerHTML = str.reduce(function (acc, el) {
        el = el.replace(/\s+/, '&nbsp;');
        return acc + "<span>" + el + "</span>";
    }, '');
});
var child = document.querySelector('.tex');
var cb = function (entries, observe) {
    alert("test");
    // console.log(entries)
    // entries.foreach(entry => {
    //     if(entry.isIntersecting){
    //         console.log("test")
    //         observe.unobserve(entry.target)
    //     }
    // })
};
var op = {
    rootMargin: "-300px 0px 0px 0px"
};
var io = new IntersectionObserver(cb, op);
io.observe(child);

//# sourceMappingURL=main.js.map
