//DEBUG
console.log('Dialog (v0.1.2)');

//Dialog
function Dialog(dialogID) {
    var _self = this;
    this.dialog = document.getElementById(dialogID);
    this.isOpen = false;
    var num = 1;

    //Constructor
    if(this.dialog !== null){
        //construct Object
        var closeButtons = this.dialog.getElementsByClassName('dialog-close');
        for (var i = 0; i < closeButtons.length; i++) {
            var btn_close = closeButtons[i];
            btn_close.addEventListener('click', function(){
                _self.hide();
            });
        };
        this.dialog.addEventListener("transitionend", function(){
            if(this.classList.contains('dialog--animatable')){
                this.classList.remove('dialog--animatable');
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
     * Show Current Dialog
     * @return {[type]} [description]
     */
    this.show = function () {
        if(this.dialog !== null){
            this.dialog.classList.add('dialog--visible');
            this.isOpen = true;
        }
    };
    this.hide = function(){
        if(this.dialog !== null){
            this.dialog.classList.remove('dialog--visible');
            this.dialog.classList.add('dialog--animatable');
            this.isOpen = false;
        }
    };

};

//SHOW DIALOG
! function(){

    var memory_dialogs = [];
    
    var elems = document.querySelectorAll('[stewed-dialog]');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var dialogID = elem.getAttribute('stewed-dialog');
        memory_dialogs[dialogID] = new dialog(dialogID);
        
        //element click
        elem.addEventListener('click', function(){
            var current_dialog = this.getAttribute('stewed-dialog');
            
            var dialog = memory_dialogs[current_dialog];
            if(dialog.isOpen){
                dialog.hide();
            }else{
                dialog.show();
            }
        });
    }
}();