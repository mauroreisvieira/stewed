    var Tabs = function(selected, id) {
        'use strict';

        const KEY_LEFT = 37,
            KEY_UP = 38,
            KEY_RIGHT = 39,
            KEY_DOWN = 40;

        this.tab = selected;
        this.id = document.getElementById(id);

        this.hide = function(){
            var parentTabs = this.tab.parentNode.children;
            var sectionsTabs = this.id.parentNode.children;

            for (var i = 0; i < parentTabs.length; i++) {
                parentTabs[i].classList.remove('tabs__item--active');
            }    

            for (var j = 0; j < sectionsTabs.length; j++) {
                sectionsTabs[j].classList.remove('tab-section--active');
            }
        }

        this.show = function(){
            this.tab.classList.add('tabs__item--active');
            this.id.classList.add('tab-section--active');
        }

    };


    ! function(){
        'use strict';

        /* get tabs item */
        var tabs = document.getElementsByClassName('tabs__item');

        /* save in array all tabs */
        const tabsArray = Array.from(tabs);

        for (var i = 0; i < tabs.length; i++) {
            var myTab = tabs[i];

            /* on click in tab */
            myTab.addEventListener('click', function() {
                'use strict';

                var id = this.getAttribute('stewed-tab-id')
                var tab = new Tabs(this, id);

                if ( id !== "false" ) {
                    if ( (!this.classList.contains('disabled'))) {
                        tab.hide();
                        tab.show();
                    }
                }

            });        

        }

        /* TODO: Change tab using keyboard */
        window.addEventListener('keypress', function(e) {
            'use strict';

            // switch (e.keyCode) {
            //     case KEY_UP:
            //     case KEY_LEFT:
            //         index--;
            //     break;

            //     case KEY_RIGHT:
            //     case KEY_DOWN:
            //         index++;
            //     break;

            //     default: break;
            // }

            if (index < 0) {
                index = 0;
            } else if (index >= tabs.length) {
                index = tabs.length - 1;
            }

            console.log(index);

        });
        
    }();


