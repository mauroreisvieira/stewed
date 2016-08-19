//Modal
function Modal(modelID) {
    this.modal = document.getElementById(modelID);

    this.backgroundColor = '#000';
    this.opacityOverlay  = 0.6; 
    this.transitionStyle = true;
    this.keyboard        = true;
    this.durationIn      = 0.477;
    this.durationOut     = 0.177;

    this.show = function () {
        //set background color
        this.modal.style.visibility = 'visible';
    };
    this.hide = function(){
        this.modal.style.visibility = 'hidden';
    };
};

//SHOW MODAL
! function(){
    
    var elems = document.querySelectorAll('[stewed-modal]');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var modelID = elem.getAttribute('stewed-modal');
        elem.addEventListener('click', function(){
            var modal = new Modal(modelID);
            modal.backgroundColor = '#FFF';
            modal.show();
        });
    }
}();