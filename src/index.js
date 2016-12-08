"use strict";
class Slider {
    constructor(id) { // class constructor
        self = this;
        this.id = id;
        this.slider = document.getElementById(this.id);
        this.sliderBar = this.slider.children[0];
        this.elementCount = this.sliderBar.childElementCount;
        this.generateNav();
        this.generateDot();
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
                         <span id="${this.id}-prev" class='prev'></span>
                         <span id="${this.id}-next" class='next'></span>
                      </div>
        `;
        let div = document.createElement('div');
        this.slider.appendChild(div);
        div.innerHTML = html;
    }

    generateDot() {
        let div = document.createElement('div');
        div.className = 'dot-sliders';
        for (let i = 0; i < this.elementCount; i++) {
            let item = document.createElement('span');
            item.setAttribute("data-item", i);
            div.appendChild(item);
        }
        this.slider.appendChild(div);

    }

    setupSliderBar() {
        for (let i = 0; i < this.elementCount; i++) {
            this.sliderBar.children[i].style.width = this.slider.offsetWidth + 'px';
        }
        this.sliderBar.style.width = this.slider.offsetWidth * this.elementCount + 'px';
        setTimeout(function() {
            self.sliderBar.className += " transition";
        },100);
    }

    nextSlide() {
        if (self.currSlide != self.elementCount) {
            self.currSlide = (self.currSlide + 1) % self.elementCount;
        }
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
    }

    prevSlide() {
        if (self.currSlide != 0) {
            self.currSlide = (self.currSlide - 1) % self.elementCount;
        } else {
            self.currSlide = self.elementCount - 1;
        }
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
    }

    registerEventNavigation() {
        document.getElementById(`${this.id}-prev`).addEventListener("click", this.prevSlide);
        document.getElementById(`${this.id}-next`).addEventListener("click", this.nextSlide);
        //this.sliderBar.className += " transition";
    }

    animateSliderBar(slideItem) {
        self.sliderBar.style.transform = "translateX(" + -(slideItem * self.slider.offsetWidth) + "px)";
    }

    slideTo(targetSlide) {
        self.currSlide = targetSlide % self.elementCount;
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
    }
}
const sliderOne = new Slider('slide-one');
