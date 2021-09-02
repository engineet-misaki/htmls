
// const btn = document.querySelector("#btn");

// function hello() {
//     alert("test")
// }

// btn.addEventListener('click', hello)
// btn.addEventListener('mouseenter', hello)

document.addEventListener('DOMContentLoaded', function () {
    const el = document.querySelector('.anime')
    const str = el.innerHTML.split('')
    el.innerHTML = str.reduce((acc,el)=>{
        el = el.replace(/\s+/,'&nbsp;')
        return acc + "<span>" + el + "</span>"
    },'');
})


const child = document.querySelector('.tex')

const cb = (entries, observe) => {
    alert("test")
    // console.log(entries)
    // entries.foreach(entry => {
    //     if(entry.isIntersecting){
    //         console.log("test")
    //         observe.unobserve(entry.target)
    //     }
    // })
}

const op = {
    rootMargin: "-300px 0px 0px 0px"
}

const io = new IntersectionObserver(cb, op);
io.observe(child)