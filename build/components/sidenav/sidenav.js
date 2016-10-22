var SideNav = function() {
    'use strict';

    var $showButtonEl = document.querySelector('.js-menu-show'),
    $hideButtonEl = document.querySelector('.js-menu-hide'),
    $sideNavEl = document.querySelector('.js-side-nav'),
    $sideNavContainerEl = document.querySelector('.js-side-nav-container'),
    touchingSideNav = false,
    startX = 0,
    currentX = 0;

    this.addEventListeners = function () {

        if ($showButtonEl) {
            $showButtonEl.addEventListener('click', this.showSideNav);
        }

        if ($hideButtonEl) {
            $hideButtonEl.addEventListener('click', hideSideNav);
        }

        if ($sideNavEl) {
            $sideNavEl.addEventListener('click', hideSideNav);
        }

        if ($sideNavContainerEl) {
            $sideNavContainerEl.addEventListener('click', this.blockClicks);
        }

        if ($sideNavEl) {
            $sideNavEl.addEventListener('touchstart', this.onTouchStart);
            $sideNavEl.addEventListener('touchmove', this.onTouchMove);
            $sideNavEl.addEventListener('touchend', this.onTouchEnd);
        }
    }

    this.blockClicks = function(evt) {
        evt.stopPropagation();
    }

    var onTransitionEnd = function(evt) {
        $sideNavEl.classList.remove('side-nav--animatable');
        document.body.style.overflow = "";
        $sideNavEl.removeEventListener('transitionend', onTransitionEnd);
    }

    this.showSideNav = function() {
        $sideNavEl.classList.add('side-nav--animatable');
        $sideNavEl.classList.add('side-nav--visible');
        $sideNavEl.addEventListener('transitionend', onTransitionEnd);
    }

    var hideSideNav = function() {
        $sideNavEl.classList.add('side-nav--animatable');
        $sideNavEl.classList.remove('side-nav--visible');
        $sideNavEl.addEventListener('transitionend', onTransitionEnd);
    }

    this.onTouchStart = function(evt) {

        if (!$sideNavEl.classList.contains('side-nav--visible')) {
            return;
        }

        startX = evt.touches[0].pageX;
        currentX = startX;
        touchingSideNav = true;

        requestAnimationFrame(function() {
            update();
        });
    }

    this.onTouchMove = function(evt) {

        if (!touchingSideNav) {
            return;
        }

        currentX = evt.touches[0].pageX;
        const translateX = Math.min(0, currentX - startX);

        if (translateX < 0) {
            evt.preventDefault();
        }
    }

    this.onTouchEnd = function(evt) {

        if (!touchingSideNav) {
            return;
        }

        touchingSideNav = false;

        const translateX = Math.min(0, currentX - startX);
        $sideNavContainerEl.style.transform = '';

        if (translateX < 0) {
            hideSideNav();
        }
    }

    var update = function() {

        if (!touchingSideNav) {
            return;
        }

        requestAnimationFrame(function() {
            update();
        });

        const translateX = Math.min(0, currentX - startX);

        $sideNavContainerEl.style.transform = "translateX(" + translateX + "px)";

    }


};


! function() {
    'use strict';

    var sidenav = new SideNav();
    sidenav.addEventListeners();

}();
