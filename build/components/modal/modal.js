//DEBUG
console.log('Modal (v0.1.13)');

//Modal
function Modal(modalID) {
    var _self = this;
    console.log(modalID);
    this.modal = document.getElementById(modalID);
    this.isOpen = false;

    //Properties
    this.backgroundColor = '#000';
    
    //Constructor
    if(this.modal !== null){
        //construct Object
        var closeButtons = this.modal.getElementsByClassName('modal-close');
        for (var i = 0; i < closeButtons.length; i++) {
            var btn_close = closeButtons[i];
            btn_close.addEventListener('click', function(){
                _self.hide();
            });
        };
    }

    /**
     * Show Current Modal
     * @return {[type]} [description]
     */
    this.show = function () {
        if(this.modal !== null){
            this.modal.classList.add('modal--visible');
            this.modal.classList.add('modal-animated');
            this.isOpen = true;
            this.modal.addEventListener("transitionend", function(){
                this.classList.remove('modal-animated');
            });
        }
    };
    this.hide = function(){
        if(this.modal !== null){
            this.modal.classList.remove('modal--visible');
            this.isOpen = false;
        }
    };

};

//SHOW MODAL
! function(){

    var memory_modals = [];
    
    var elems = document.querySelectorAll('[stewed-modal]');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var modalID = elem.getAttribute('stewed-modal');
        memory_modals[modalID] = new Modal(modalID);
        
        //element click
        elem.addEventListener('click', function(){
            var current_modal = this.getAttribute('stewed-modal');
            
            var modal = memory_modals[current_modal];
            if(modal.isOpen){
                modal.hide();
            }else{
                modal.show();
            }
        });
    }
}();