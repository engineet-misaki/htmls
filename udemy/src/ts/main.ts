 // console.log("stet")

// function postM() {
//     // const form = document.createElement("form")
//     const forms = document.forms["form-area"]
//     const email = forms.elements["email"].value
//     const name = forms.elements["name"].value
//     const contents = forms.elements["area-small"].value === "" ? forms.elements["area-big"].value : forms.elements["area-small"].value
//     console.log(email,contents,name)
//     alert("POST機能はまだ実装してないよ！")
// }


document.addEventListener('DOMContentLoaded', function () {
  const hero = new HeroSlider('.swiper-container');
  hero.start();

  // const cb = function(el, inview) {
  //   const ta = new TeenTextA
  // }

  const _inviewAnimation = function(el, inview) {
    if(inview) {
      el.classList.add('inview')
    }else {
      el.classList.remove('inview')
    }
  }
  const so2 = new ScrollObserver('.cover-slide', _inviewAnimation)
})


