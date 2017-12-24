ready = fn => {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
navbarActive = (navbar) => {
	if(window.scrollY > 20) {
		navbar.classList.add('active')
	} else {
		navbar.classList.remove('active')
	}
}
headerParallax = (header) => {
	let headerRect = header.getBoundingClientRect()
	let headerX = headerRect.top
    header.style.backgroundPositionY = (parseInt(-headerX / 5)+'px')
}
navAutoScroll = () => {
	let navLink = document.querySelectorAll('[href^="#"]')
	Array.prototype.forEach.call(navLink, el => {
		el.addEventListener('click', function(ev) {
			ev.preventDefault()
			let hrefVal = this.getAttribute('href')
			hrefVal = hrefVal.replace( /^#/g , '')
			let target = document.getElementById(hrefVal)
			let targetTop = target.getBoundingClientRect().top

			if(targetTop > 0) {
				scrollIt(
				    target,
				    300,
				    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
				);
			}
		})
	})
}

ready(() => {
	const header = document.getElementById('js-header')
	const navbar = document.getElementById('js-navbar-desktop')

	navAutoScroll()
	headerParallax(header)
	navbarActive(navbar)

	window.addEventListener('scroll', () => {
		headerParallax(header)
		navbarActive(navbar)
	})
})


////////// A CHANGER /////////


function scrollIt(destination, duration = 200, callback) {

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
