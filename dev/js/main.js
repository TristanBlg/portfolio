function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
function navbarActive(navbar) {
	if(window.scrollY > 20) {
		navbar.classList.add('active')
	} else {
		navbar.classList.remove('active')
	}
}
function headerParallax(header) {
	const headerRect = header.getBoundingClientRect()
	const headerX = headerRect.top
    header.style.backgroundPositionY = parseInt(-headerX / 5)+'px'
}
function navAutoScroll() {
	scrollIt = (destination, duration = 200, callback) => {
		const start = window.pageYOffset
		const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
		const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
		const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
		const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
		const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

		if('requestAnimationFrame' in window === false) {
			window.scroll(0, destinationOffsetToScroll)
		if(callback) {
			callback()
		}
			return
		}

		function scroll() {
			const now = 'now' in window.performance ? performance.now() : new Date().getTime()
			const time = Math.min(1, ((now - startTime) / duration))
			window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start)) + start))

			if(window.pageYOffset === destinationOffsetToScroll) {
				if(callback) {
					callback()
				}
				return
			}

			requestAnimationFrame(scroll)
		}

		scroll()
	}

	const navLink = document.querySelectorAll('[href^="#"]')
	Array.prototype.forEach.call(navLink, el => {
		el.addEventListener('click', function(ev) {
			ev.preventDefault()
			let hrefVal = this.getAttribute('href')
			hrefVal = hrefVal.replace( /^#/g , '')
			let target = document.getElementById(hrefVal)
			let targetTop = target.getBoundingClientRect().top

			scrollIt(
				target,
				200
			);
		})
	})
}

ready(function() {
	const header = document.getElementById('js-header')
	const navbar = document.getElementById('js-navbar-desktop')
	const container = 1170;
	const containerM = 980;
	const containerS = 768;
	const containerXs = 480;

	navAutoScroll()
	headerParallax(header)
	navbarActive(navbar)

	window.addEventListener('scroll', () => {
		headerParallax(header)
		navbarActive(navbar)
	})
})
