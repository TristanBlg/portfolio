function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
const navbarActive = function(navbar) {
  function isActive(){
    if(window.scrollY > 20) {
      navbar.classList.add('active')
    } else {
      navbar.classList.remove('active')
    }
  }
  isActive()

  window.addEventListener('scroll', () => {
    isActive()
  })
}
const scrollTo = function({target, duration = 200, callback} = {}){
  if(!target){
    console.error('scrollTo() => You must specify a target.')
    return false
  }
  const targetHref                  = target.getAttribute('href').replace( /^#/g , '')
  const destination                 = document.getElementById(targetHref)
  const start                       = window.pageYOffset
  const startTime                   = 'now' in window.performance ? performance.now() : new Date().getTime()
  const documentHeight              = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  const windowHeight                = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset           = typeof destination === 'number' ? destination : destination.offsetTop
  const destinationOffsetToScroll   = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  if('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll)
    if(callback) {
        callback()
    }
    return
  }
  
  const scroll = function() {
    const now   = 'now' in window.performance ? performance.now() : new Date().getTime()
    const time  = Math.min(1, ((now - startTime) / duration))
    
    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start)) + start))
    
    if(time >= 1 || Math.round(window.pageYOffset) === destinationOffsetToScroll) {
      if(callback) {
        callback()
      }
      return
    }

    requestAnimationFrame(scroll)
  }

  requestAnimationFrame(scroll)
}
function animateAtScroll({animationName = 'fadeIn', windowHeightRatio = 1.2, selectorDataName = 'delay'} = {}) {
  const elements = Array.from(document.querySelectorAll(`[data-${selectorDataName}]`));
  
  elements.forEach(function(el){
    switch (animationName) {
      case 'fadeIn':
        el.style.opacity = 0;
        break;
      case 'fadeOut':
        el.style.opacity = 1;
        break;
      default:
        console.error('animateAtScroll() -> Your animationName parameter doesn\'t exist in the script.')
    }
  })

  const classStopAnimation = 'animateAtScroll'
  let windowHeight = window.innerHeight / windowHeightRatio

  function setClass(){
    elements.forEach(function(el){
      let sectionTop = el.getBoundingClientRect().top;
      if(windowHeight > sectionTop) {
        if(!el.classList.contains(classStopAnimation)) {
          let delay = el.getAttribute(`data-${selectorDataName}`)
          if(delay === undefined) {
            delay = 0
          }
          el.classList.add(classStopAnimation)
          setTimeout(function(){
            el.classList.add(animationName)
          }, delay)
        }
      }
    })
  }
  
  document.addEventListener('resize', function(){
    windowHeight = window.innerHeight / windowHeightRatio
  })

  setClass();
  document.addEventListener('scroll', setClass)
}

ready(function() {
  const header        = document.getElementById('js-header')
  const navbar        = document.getElementById('js-navbar-desktop')
  const container     = 1170;
  const containerM    = 980;
  const containerS    = 768;
  const containerXs   = 480;

  navbarActive(navbar)
  animateAtScroll()

  const navLink = Array.from(document.querySelectorAll('[href^="#"]'))
  navLink.forEach(el => {
    el.addEventListener('click', function(ev) {
      ev.preventDefault()
      scrollTo({
        duration: 200,
        target: this
      });
    })
  })
})
