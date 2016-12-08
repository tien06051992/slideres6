class Slider {
	constructor(id) { // class constructor
        self = this;
        this.id = id;
        this.slider = document.getElementById(this.id);
        this.sliderBar = this.slider.children[0];
        this.elementCount = this.sliderBar.childElementCount;
        this.generateNav();
        this.setupSliderBar();
        this.currSlide = 0;
        this.registerEventNavigation();
    }

    getId() {
     	return this.id;
    }

    getSlideNumber() {
    	return this.elementCount;
    }

    generateNav() {
    	const html = `<div class='nav-slider'>
    			         <span id="${this.id}-prev" class='prev'>Prev</span>
    			         <span id="${this.id}-next" class='next'>Next</span>
    		          </div>
    	`;
        let div = document.createElement('div');
        this.slider.appendChild(div)
        div.innerHTML = html;
    }

    setupSliderBar() {
        for(let i = 0; i < this.elementCount; i++) {
            this.sliderBar.children[i].style.width = this.slider.offsetWidth + 'px';
        }
        this.sliderBar.style.width = this.slider.offsetWidth * this.elementCount + 'px';
    }

    nextSlide() {
        if(self.currSlide != self.elementCount) {
            self.currSlide = (self.currSlide + 1) % self.elementCount;
        }
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
    }

    prevSlide() {
        if(self.currSlide != 0) {
            self.currSlide = (self.currSlide - 1) % self.elementCount;
        }
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
    }

    registerEventNavigation() {
        document.getElementById(`${this.id}-prev`).addEventListener("click", this.prevSlide);
        document.getElementById(`${this.id}-next`).addEventListener("click", this.nextSlide);
    }

    animateSliderBar(slideItem) {
        self.sliderBar.style.transform = "translateX(" + -(slideItem * self.slider.offsetWidth) + "px)";
    }

}
const sliderOne = new Slider('slide-one');