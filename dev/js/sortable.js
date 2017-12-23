class Sortable {
	constructor({
		parent, 
		column = 3, 
		margin = 20
	}) {
		this.parent = parent
		this.item = this.parent.querySelectorAll('.portfolio-project__item')
		this.column = column
		this.margin = margin
	}

	orderItems(item = this.item, refresh){
		let {parent, column, margin} = this
		let windowWidth = window.innerWidth

		if(refresh){
			console.log('refresh')
		}
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
				item.forEach((el, i) => {
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
			let parentHeight = ((Math.ceil(item.length / column) * arrayRectHeight[0]) + (margin * (Math.ceil(item.length / column) - 1)))
			parent.style.height = parentHeight+'px'
		}).then(() => {
			// Bug last item get transition before position - Remove setTimeout
			setTimeout(() => {
				item.forEach((el, i) => {
				el.style.transition = 'transform .4s ease-in-out'
			})
			}, 100)
		}).catch(err => {
			console.error(err)
		})
	}

	clickFilter(ev) {
		ev.preventDefault()
		const dataLink = this.dataset.sortableLink
		document.querySelectorAll('[data-sortable-link]').forEach(el => {
			el.classList.remove('active')
		})
		this.classList.add('active')
		let obj = document.querySelectorAll(`[data-sortable]`)
		let arrTest = []
		new Promise((resolve, reject) => {
			resolve(
				Object.keys(obj).map(key => obj[key]).filter(el => {
					if(dataLink === 'all') {
						el.style.display = 'block'
						arrTest.push(el)
					} else {
						if(el.dataset.sortable !== dataLink) {
							el.style.display = 'none'
						} else {
							el.style.display = 'block'
							arrTest.push(el)
						}
					}
					
				})
			)
		}).then(() => {
			sortable.orderItems(arrTest)
		}).catch(err => {
			console.error(err)
		})
	}
}

const sortable = new Sortable({
	parent: document.querySelector('.portfolio-project')
})
sortable.orderItems()

document.querySelectorAll('[data-sortable-link]').forEach(el => {
	el.onclick = sortable.clickFilter
})

window.addEventListener('resize', () => {
	clearTimeout(window.sortableResize)
	window.sortableResize = setTimeout(() => {
		sortable.orderItems(undefined, true)
	}, 100)
})
