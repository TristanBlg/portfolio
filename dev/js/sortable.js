class Sortable {
	constructor(parent, column = 3, margin = 20) {
		this.parent = parent
		this.item = this.parent.querySelectorAll('.portfolio-project__item')
		this.column = column
		this.margin = margin
	}

	printItems(){
		let {parent, item, column, margin} = this
		let parentWidth = parent.offsetWidth
		let rectWidth = (parentWidth - (margin * (column - 1))) / column
		let positionX = 0
		let arrayRectHeight = []

		let test = new Promise(function(resolve, reject){
			resolve(
				item.forEach(function(el, i){
					el.style.position = "absolute"
					el.style.width = rectWidth+'px'
					arrayRectHeight.push(el.offsetHeight)
					console.log(arrayRectHeight)
					if(i >= column){
						let rectHeight = arrayRectHeight[i - column] + margin
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
		})
		test.then(function(){
			let parentHeight = ((Math.floor(item.length / column) * arrayRectHeight[0]) + (margin * (Math.floor(item.length / column) - 1)))
			parent.style.height = parentHeight+'px'
		}).catch(function(){
			console.log('error')
		})
	}
}

const sortable = new Sortable(
	document.querySelector('.portfolio-project')
)
sortable.printItems()
