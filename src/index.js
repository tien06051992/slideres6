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
        this.currDot;
        this.wrapDot;
        this.currWidthSlider = this.slider.offsetWidth;
        window.onresize = function() {

            console.log(self.slider.offsetWidth + " / " + self.currWidthSlider);
            //if(self.slider.offsetWidth < self.currWidthSlider) {
                self.setupSliderBar();
                setTimeout(function() {
                    self.animateSliderBar(self.currSlide);
                },500);
            // }else {
            //     console.log("dz");
            // }
        }
    }

    getId() {
        return this.id;
    }

    getSlideNumber() {
        return this.elementCount;
    }

    resizeSlider() {
        for (let i = 0; i < this.elementCount; i++) {
            this.sliderBar.children[i].style.width = self.slider.offsetWidth + 'px';
        }
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
        this.wrapDot = document.createElement('div');
        this.wrapDot.className = 'dot-sliders';
        for (let i = 0; i < this.elementCount; i++) {
            let item = document.createElement('span');
            item.setAttribute("data-item", i);
            item.addEventListener("click",this.slideTo, false);
            this.wrapDot.appendChild(item);
            if( i == 0) {
                this.currDot = item;
                this.currDot.className += "active";
            }
        }
        this.slider.appendChild(this.wrapDot);

    }

    slideTo() {
        this.animateSliderBar();
    }

    setupSliderBar() {
        this.resizeSlider();
        this.sliderBar.style.width = this.slider.offsetWidth * this.elementCount + 'px';
        this.slider.style.height = this.sliderBar.children[0].offsetHeight + 'px';
/*        setTimeout(function() {
            
            self.sliderBar.className += " transition";
        },100);*/
    }

    nextSlide() {
        if (self.currSlide != self.elementCount) {
            self.currSlide = (self.currSlide + 1) % self.elementCount;
        }
        console.log(self.currSlide);
        self.currDot.className = "";
        self.animateSliderBar(self.currSlide);
        self.updateCurrentDot(self.currSlide);
    }

    prevSlide() {
        if (self.currSlide != 0) {
            self.currSlide = (self.currSlide - 1) % self.elementCount;
        } else {
            self.currSlide = self.elementCount - 1;
        }
        console.log(self.currSlide);
        self.currDot.className = "";
        self.animateSliderBar(self.currSlide);
        self.updateCurrentDot(self.currSlide);
    }

    registerEventNavigation() {
        document.getElementById(`${this.id}-prev`).addEventListener("click", this.prevSlide);
        document.getElementById(`${this.id}-next`).addEventListener("click", this.nextSlide);
    }

    animateSliderBar(slideItem) {
        self.sliderBar.style.transform = "translateX(" + -(slideItem * self.slider.offsetWidth) + "px)";
    }

    slideTo() {
        self.currSlide = this.getAttribute("data-item") % self.elementCount;
        console.log(self.currSlide);
        self.animateSliderBar(self.currSlide);
        self.updateCurrentDot(self.currSlide);
    }

    updateCurrentDot(target) {
        self.currDot.className = "";
        self.wrapDot.children[target].className = "active";
        self.currDot = self.wrapDot.children[target];
    }
}

const sliderOne = new Slider('slide-one');
