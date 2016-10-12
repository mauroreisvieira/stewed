var Modal = function(modalId) {
    'use strict';

    var _self = this;
    var num = 1;

    this.modal = document.getElementById(modalId);
    this.isOpen = false;
    
    /* Constructor */
    if(this.modal !== null) {

        var closeButtons = this.modal.getElementsByClassName('modal-close');
        for (var i = 0; i < closeButtons.length; i++) {
            var btn_close = closeButtons[i];
            btn_close.addEventListener('click', function(){
                _self.hide();
            });
        };
        this.modal.addEventListener("transitionend", function(){
            if(this.classList.contains('modal--animatable')){
                this.classList.remove('modal--animatable');
            }
        });
        //add key close event
        document.addEventListener('keyup', function(e) {
            'use strict'

            if(e.keyCode === 27 && _self.isOpen) {
                _self.hide();
            }
        });
    }

    /* Show Current Modal */
    this.show = function () {
        if(this.modal !== null){
            this.modal.classList.add('modal--visible');
            this.isOpen = true;
        }
    };

    /* Hide Current Modal */
    this.hide = function(){
        if(this.modal !== null){
            this.modal.classList.remove('modal--visible');
            this.modal.classList.add('modal--animatable');
            this.isOpen = false;
        }
    };
};


! function(){
   'use strict';

   var memory_modals = [];
   var elems = document.querySelectorAll('[stewed-modal]');

   for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    var modalId = elem.getAttribute('stewed-modal');
    memory_modals[modalId] = new Modal(modalId);

    /* Eelement click */
    elem.addEventListener('click', function() {
        'use strict';

        var current_modal = this.getAttribute('stewed-modal');
        var modal = memory_modals[current_modal];

        if (modal.isOpen) {
            modal.hide();
        } else {
            modal.show();
        }
    });
}
}();