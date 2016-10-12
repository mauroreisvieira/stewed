var Form = function () {
    'use strict';

    const VALIDATE = document.querySelectorAll('[stewed-validate="true"]');
    var inputs = document.getElementsByClassName('textfield__input');

    for (var i = 0; i < inputs.length; i++) {

        if (! inputs[i].disabled) {
            var input = inputs[i];
            input.parentNode.className = 'textfield';

            input.addEventListener('input', function() {
                'use strict';

                if (VALIDATE.length) {
                    const MIN = (this.min == '') ? ((this.type == 'tel') ? 9 : 2 ) : this.min,
                    MAX = (this.max == '') ? ((this.type == 'tel') ? 13 : Number.MAX_SAFE_INTEGER ) : this.max,
                    EMAIL = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                    if (this.type == 'select-one') {
                        if (this.value != "") {
                            this.parentNode.className = 'textfield textfield--valid';
                        } else {
                            this.parentNode.className = 'textfield textfield--invalid';
                        }
                    } else if (this.type == 'textarea') {
                        if (this.value.length > 1) {
                            this.parentNode.className = 'textfield textfield--valid';
                        } else if (this.value.length == 0) {
                            this.parentNode.className = 'textfield';
                        } else {
                            this.parentNode.className = 'textfield textfield--invalid';
                        }
                    } else {
                        if ( (this.value.length >= MIN ) && (this.value.length <= MAX) )  {
                            if (this.type == 'email') {
                                if (EMAIL.test(this.value)) {
                                    this.parentNode.className = 'textfield textfield--valid';
                                } else {
                                    this.parentNode.className = 'textfield textfield--invalid';
                                }
                            } else {
                                this.parentNode.className = 'textfield textfield--valid';
                            }
                        } else if (this.value.length == 0) {
                            this.parentNode.className = 'textfield';
                        } else {
                            this.parentNode.className = 'textfield textfield--invalid';
                        }
                    }
                } else {
                    if (this.value.length > 1) {
                        this.parentNode.className = 'textfield textfield--filled';
                    } else {
                        this.parentNode.className = 'textfield';
                    }
                }
            });
        }
    }
};

!function(){
    'use strict';
    new Form();
}();