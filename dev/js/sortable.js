class Sortable {
	constructor({
		parent = document.querySelector('.sortable'),
		links = document.querySelectorAll('[data-sortable-link]'),
		active = 'active',
		column = 3, 
		margin = 20
	}) {
		this.parent = parent
		this.links = Array.from(links)
		this.active = active
		this.items = Array.from(this.parent.children)
		this.column = column
		this.margin = margin

		this.init()
	}

	orderItems(){
		let {parent, items, column, margin} = this
		let windowWidth = window.innerWidth

		if(windowWidth <= 980 && windowWidth > 480) {
			column = 2
		} else if (windowWidth <= 480) {
			column = 1
		}

		let parentWidth = parent.offsetWidth
		let rectWidth = (parentWidth - (margin * (column - 1))) / column
		let positionX = 0
		let arrayRectHeight = []

		new Promise((resolve, reject) => {
			resolve(
				items.forEach((el, i) => {
					el.style.position = "absolute"
					el.style.width = rectWidth+'px'
					arrayRectHeight.push(el.offsetHeight)
					if(i >= column){
						let rectHeight = (arrayRectHeight[i - column] * Math.floor((i / column))) + (margin * Math.floor((i / column)))
						el.style.transform = `translate3d(${positionX}px, ${rectHeight}px, 0px)`
					} else {
						el.style.transform = `translate3d(${positionX}px, 0px, 0px)`
					}
					if(positionX >= rectWidth * (column - 1)) {
						positionX = 0
					} else {
						positionX = positionX + rectWidth + margin
					}
				})
			)
		}).then(() => {
			parent.style.position = 'relative'
			let parentHeight = ((Math.ceil(items.length / column) * arrayRectHeight[0]) + (margin * (Math.ceil(items.length / column) - 1)))
			parent.style.height = parentHeight+'px'
		}).then(() => {
			// Bug last item get transition before position - Remove setTimeout
			setTimeout(() => {
				items.forEach((el, i) => {
				el.style.transition = 'transform .4s ease-in-out, opacity .2s ease-in-out'
			})
			}, 100)
		}).catch(err => {
			console.error(err)
		})
	}

	clickFilter(ev) {
		ev.preventDefault()
		const dataLink = this.dataset.sortableLink
		sortable.links.forEach(el => {
			el.classList.remove(sortable.active)
		})
		this.classList.add(sortable.active)
		let obj = document.querySelectorAll(`[data-sortable]`)
		let itemsFilter = []
		new Promise((resolve, reject) => {
			resolve(
				Object.keys(obj).map(key => obj[key]).filter(el => {
					if(dataLink === 'all') {
						el.style.opacity = '1'
						itemsFilter.push(el)
					} else {
						if(el.dataset.sortable !== dataLink) {
							el.style.opacity = '0'
						} else {
							el.style.opacity = '1'
							itemsFilter.push(el)
						}
					}
					
				})
			)
		}).then(() => {
			sortable.items = itemsFilter
		}).then(() => {
			sortable.orderItems()
		}).catch(err => {
			console.error(err)
		})
	}

	linksTriggered(){
		let {links, clickFilter} = this
		links.forEach(el => {
			el.onclick = clickFilter
		})
	}

	init(){
		this.linksTriggered()
		this.orderItems()
	}
}

const sortable = new Sortable({
	parent: document.querySelector('.portfolio-project')
})




window.addEventListener('resize', () => {
	clearTimeout(window.sortableResize)
	window.sortableResize = setTimeout(() => {
		sortable.orderItems()
	}, 500)
})
