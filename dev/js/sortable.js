class Sortable {
	constructor(parent, column = 3, margin = 20) {
		this.parent = parent
		this.item = this.parent.querySelectorAll('.portfolio-project__item')
		this.column = column
		this.margin = margin
	}

	orderItems(arrTest){
		console.log('start')
		let {parent, column, margin} = this
		console.log(arrTest)
		if(arrTest) {
			var item = arrTest
		} else {
			var item = this.item
		}
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

		new Promise(function(resolve, reject){
			resolve(
				item.forEach(function(el, i){
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
		}).then(function(){
			let parentHeight = ((Math.ceil(item.length / column) * arrayRectHeight[0]) + (margin * (Math.ceil(item.length / column) - 1)))
			parent.style.height = parentHeight+'px'
		}).catch(function(err){
			console.error(err)
		})
	}

	clickFilter(ev) {
		ev.preventDefault()
		const dataLink = this.dataset.sortableLink

		console.log(this.dataset.sortableLink)
		let obj = document.querySelectorAll(`[data-sortable]`)
		let arrTest = []
		new Promise(function(resolve, reject){
			resolve(
				Object.keys(obj).map((key) => obj[key]).filter(function(el){
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
		}).then(function(){
			sortable.orderItems(arrTest)
		}).catch(function(err){
			console.error(err)
		})
	}
}

const sortable = new Sortable(
	document.querySelector('.portfolio-project')
)
sortable.orderItems()

document.querySelectorAll('[data-sortable-link]').forEach(function(el){
	el.onclick = sortable.clickFilter
})

window.onresize = function(){
	clearTimeout(window.resizedFinish)
	window.resizedFinish = setTimeout(function(){
		sortable.orderItems()
	}, 100)
}
