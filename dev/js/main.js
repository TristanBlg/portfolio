
const header = document.querySelector('.bg')
const navbar = document.getElementById('js-navbar')
window.onscroll = () => {
	let windowScrollTop = window.scrollY
	if(windowScrollTop > 20) {
		navbar.classList.add('active')
	} else {
		navbar.classList.remove('active')
	}

	let headerRect = header.getBoundingClientRect()
	let x = headerRect.top
	let h = headerRect.height
    console.log('x   '+x)
    console.log('h   '+h)
    header.style.backgroundPosition = ('50% '+parseInt(-x / 5)+'px');
}
