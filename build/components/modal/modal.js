//DEBUG
console.log('Modal (v0.1.2)');

//Modal
function Modal(modalID) {
    var _self = this;
    this.modal = document.getElementById(modalID);
    this.isOpen = false;
    var num = 1;

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
        this.modal.addEventListener("transitionend", function(){
            if(this.classList.contains('modal--animatable')){
                this.classList.remove('modal--animatable');
            }
        });
        //add key close event
        document.addEventListener('keyup', function(e) {
            if(e.keyCode === 27 && _self.isOpen){
                _self.hide();
            }
        });
    }

    /**
     * Show Current Modal
     * @return {[type]} [description]
     */
    this.show = function () {
        if(this.modal !== null){
            this.modal.classList.add('modal--visible');
            this.isOpen = true;
        }
    };
    this.hide = function(){
        if(this.modal !== null){
            this.modal.classList.remove('modal--visible');
            this.modal.classList.add('modal--animatable');
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