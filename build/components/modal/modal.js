//DEBUG
console.log('Modal (v0.1.1)');

//Modal
function Modal(modelID) {
    var _self = this;
    this.modal = document.getElementById(modelID);
    this.isOpen = false;

    this.backgroundColor = '#000';
    this.opacityOverlay  = 0.6; 
    this.transitionStyle = true;
    this.keyboard        = true;
    this.durationIn      = 0.477;
    this.durationOut     = 0.177;

    //construct Object
    var buttons = this.modal.getElementsByClassName('modal-close');
    for (var i = 0; i < buttons.length; i++) {
        var btn_close = buttons[i];
        btn_close.addEventListener('click', function(){
            _self.hide();
        });
    };


    this.show = function () {
        //set background color
        this.modal.style.visibility = 'visible';
        this.isOpen = true;
    };
    this.hide = function(){
        this.modal.style.visibility = 'hidden';
        this.isOpen = false;
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
        var closeBtn = elem.getElementsByClassName(elem.getAttribute('stewed-modal'));


    }
}();