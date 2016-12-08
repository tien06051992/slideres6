
"use strict";
function isOnMobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

class Slider {
    constructor(id) { // class constructor
        self = this;
        this.id = id;
        this.slider = document.getElementById(this.id);
        this.sliderBar = this.slider.children[0];
        this.elementCount = this.sliderBar.childElementCount;
        this.currDot;
        this.wrapDot;
        this.currWidthSlider = this.slider.offsetWidth;
        this.mousePos;
        this.currSlide = 0;
        this.generateNav();
        this.generateDot();
        this.setupSliderBar();
        this.registerEvent();
        window.onresize = function() {
            self.setupSliderBar();
            setTimeout(function() {
                self.animateSliderBar(self.currSlide);
            },500);
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
        self.currDot.className = "";
        self.animateSliderBar(self.currSlide);
        self.updateCurrentDot(self.currSlide);
    }

    registerEvent() {
        document.getElementById(`${this.id}-prev`).addEventListener("click", this.prevSlide);
        document.getElementById(`${this.id}-next`).addEventListener("click", this.nextSlide);
        self.sliderBar.addEventListener(isOnMobile() ? "touchstart" : "mousedown", this.handleDrag);
    }

    handleDrag() {
        document.onmousemove = self.handleMouseMove;
        var loop = setInterval(self.getMousePosition(),3000);
    }

    handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        self.mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

    getMousePosition() {
        let pos = self.mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {
            // Use pos.x and pos.y
            console.log(pos);
        }
    }

    animateSliderBar(slideItem) {
        self.sliderBar.style.transform = "translateX(" + -(slideItem * self.slider.offsetWidth) + "px)";
    }

    slideTo() {
        self.currSlide = this.getAttribute("data-item") % self.elementCount;
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

(function() {
    var mousePos;

    document.onmousemove = handleMouseMove;
    //setInterval(getMousePosition, 100); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {
            // Use pos.x and pos.y
            console.log(pos);
        }
    }
})();