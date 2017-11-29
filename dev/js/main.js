const header = document.getElementById('js-header')
const navbar = document.getElementById('js-navbar')

navbarActive = () => {
	let windowScrollTop = window.scrollY
	if(windowScrollTop > 20) {
		navbar.classList.add('active')
	} else {
		navbar.classList.remove('active')
	}
}
headerParallax = () => {
	let headerRect = header.getBoundingClientRect()
	let x = headerRect.top
	let h = headerRect.height
    header.style.backgroundPositionY = (parseInt(-x / 5)+'px')
}
navAutoScroll = () => {
	let navLink = document.getElementsByClassName('js-navlink')
	Array.prototype.forEach.call(navLink, el => {
		el.addEventListener('click', function(ev) {
			ev.preventDefault()
			let hrefVal = this.getAttribute('href')
			hrefVal = hrefVal.replace( /^#/g , '')
			if(hrefVal === "home") {
				// Moove top of doc
			} else {
				let target = document.getElementById(hrefVal)
				// Moove top of element
			}
		})
	})
}

navAutoScroll()
headerParallax()
navbarActive()

window.addEventListener('scroll', () => {
	headerParallax()
	navbarActive()
})
