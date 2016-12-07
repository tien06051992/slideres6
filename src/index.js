require('../sass/style.scss');
const slider = document.getElementById('slides-one');
const slides = slider.childElementCount;


//console.log(slides);
// var currSlide = 0;

// const slideInterval = () => {
//     setInterval(nextslide, 3000);
// }

// const nextslide = () => {
//     slides[currSlide].className = 'slide';
//     currSlide = (currSlide + 1) % slides.length;
//     //console.log(currSlide + " - " + slides.length);
//     slides[currSlide].className = 'slide showing';
// }

class Slider {
	constructor(id) { // class constructor
        this.slider = document.getElementById(id);
        this.elementCount = slider.childElementCount;
    }

    getId() {
     	return this.id;
    }

    getSlideNumber() {
    	return this.elementCount;
    }

    generateNav() {
    	const html = `<div class='nav-slider'>
    			<span class='prev'>Prev</span>
    			<span class='next'>Next</span>
    		</div>
    	`;
        var div = document.createElement('div');
        this.slider.parentElement.appendChild(div)
        div.innerHTML = html;
     //    var elements = div.childNodes;
    	// this.slider.parentElement.appendChild(navSlider);
    }



}

const sliderOne = new Slider('slide-one');
sliderOne.generateNav();
console.log(sliderOne.getSlideNumber());
