    var Dropdown = function(selected, id) {
        'use strict';

        this.dropdown = selected;
        this.id = document.getElementById(id);


        this.show = function(){

            if (!this.id.classList.contains('dropdown--visible')) {
                var elements = document.getElementsByClassName('dropdown--visible');

                if (elements.length > 0) {
                    elements[0].classList.remove("dropdown--visible");
                }
                this.id.className += " dropdown--visible";

            } else {
                this.id.className += " dropdown--animatable";
                this.id.classList.remove("dropdown--visible");
            }
        }

        this.id.addEventListener("transitionend", function(){
            if (this.classList.contains('dropdown--animatable')) {
                this.classList.remove('dropdown--animatable');
            }
        });

    };


    ! function(){
        'use strict';

        /* get dropdown item */
        var elems = document.querySelectorAll('[stewed-dropdown]');

        for (var i = 0; i < elems.length; i++) {

            var myDropdown = elems[i];

            /* on click in tab */
            myDropdown.addEventListener('click', function() {
                'use strict';

                var id = this.getAttribute('stewed-dropdown')
                var dropdown = new Dropdown(this, id);

                if ( !this.classList.contains('disabled') ) {
                    dropdown.show();
                }

            });        

        }

    }();


