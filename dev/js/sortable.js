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

		this.item.forEach(function(el, i){
			console.log(i)
			el.style.position = "absolute"
			el.style.width = rectWidth+'px'
			el.style.transform = `translate3d(${positionX}px, 0px, 0px)`
			if(positionX >= rectWidth * (column - 1)) {
				positionX = 0
			} else {
				positionX = positionX + rectWidth + margin
			}
		})
	}
}

const sortable = new Sortable(
	document.querySelector('.portfolio-project')
)
sortable.printItems()
