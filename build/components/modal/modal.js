//DEBUG
console.log('Modal (v0.1.10)');

//Modal
function Modal(modalID) {
    var _self = this;
    console.log(modalID);
    this.modal = document.getElementById(modalID);
    this.isOpen = false;

    this.backgroundColor = '#000';
    this.opacityOverlay  = 0.6; 
    this.transitionStyle = true;
    this.keyboard        = true;
    this.durationIn      = 0.477;
    this.durationOut     = 0.177;

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
            this.modal.className += ' modal--visible';
            this.isOpen = true;
        }
    };
    this.hide = function(){
        if(this.modal !== null){
            var currentClass = this.modal.className;
            this.modal.className = currentClass.replace(' modal--visible', '');
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
            //new Modal().show(); 
        });
        //element find class modal-close
        //var closeBtn = elem.getElementsByClassName(elem.getAttribute('stewed-modal'));


    }
}();