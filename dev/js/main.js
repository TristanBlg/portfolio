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
headerParallax = () =>{
	let headerRect = header.getBoundingClientRect()
	let x = headerRect.top
	let h = headerRect.height
    header.style.backgroundPositionY = (parseInt(-x / 5)+'px')
}

headerParallax()
navbarActive()

window.addEventListener('scroll', () => {
	headerParallax()
	navbarActive()
})
