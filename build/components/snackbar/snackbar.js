var snackbar = function(snackbarId) {
    'use strict';

    var _self = this;
    var num = 1;
    
    this.snackbar = document.getElementById(snackbarId);
    this.isOpen = false;

    /* Constructor */
    if (this.snackbar !== null) {

        var closeButtons = this.snackbar.getElementsByClassName('snackbar-close');
        for (var i = 0; i < closeButtons.length; i++) {
            var btn_close = closeButtons[i];
            btn_close.addEventListener('click', function(){
                _self.hide();
            });
        };
        this.snackbar.addEventListener("transitionend", function() {
            'use strict';

            if (this.classList.contains('snackbar--animatable')) {
                this.classList.remove('snackbar--animatable');
            }
        });

        /* Add key close event */
        document.addEventListener('keyup', function(e) {
            'use strict';
            if(e.keyCode === 27 && _self.isOpen){
                _self.hide();
            }
        });
    }

    /* Show Current snackbar */
    this.show = function () {
        if(this.snackbar !== null){
            this.snackbar.classList.add('snackbar--visible');
            this.isOpen = true;
        }
    };

    /* Hide Current snackbar */
    this.hide = function(){
        if(this.snackbar !== null){
            this.snackbar.classList.remove('snackbar--visible');
            this.snackbar.classList.add('snackbar--animatable');
            this.isOpen = false;
        }
    };

};

//SHOW snackbar
! function(){
    'use strict';

    var memory_snackbars = [];
    var elems = document.querySelectorAll('[stewed-snackbar]');

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var snackbarId = elem.getAttribute('stewed-snackbar');
        memory_snackbars[snackbarId] = new snackbar(snackbarId);

        /* Element click */
        elem.addEventListener('click', function(){
            'use strict';

            var current_snackbar = this.getAttribute('stewed-snackbar');
            var snackbar = memory_snackbars[current_snackbar];

            var snackbarBody = document.querySelector('.snackbar');

            snackbarBody.addEventListener('click', function() {
                snackbar.hide();
            });
            
            if (snackbar.isOpen) {
                snackbar.hide();
            } else {
                snackbar.show();
            }
        });
    }
}();