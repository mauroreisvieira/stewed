//DEBUG
console.log('Snackbar (v0.1.2)');

//snackbar
function Snackbar(snackbarID) {
    var _self = this;
    this.snackbar = document.getElementById(snackbarID);
    this.isOpen = false;
    var num = 1;

    //Constructor
    if(this.snackbar !== null){
        //construct Object
        var closeButtons = this.snackbar.getElementsByClassName('snackbar-close');
        for (var i = 0; i < closeButtons.length; i++) {
            var btn_close = closeButtons[i];
            btn_close.addEventListener('click', function(){
                _self.hide();
            });
        };
        this.snackbar.addEventListener("transitionend", function(){
            if(this.classList.contains('snackbar--animatable')){
                this.classList.remove('snackbar--animatable');
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
     * Show Current Snackbar
     * @return {[type]} [description]
     */
    this.show = function () {
        if(this.snackbar !== null){
            this.snackbar.classList.add('snackbar--visible');
            this.isOpen = true;
        }
    };
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

    var memory_snackbars = [];
    
    var elems = document.querySelectorAll('[stewed-snackbar]');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var snackbarID = elem.getAttribute('stewed-snackbar');
        memory_snackbars[snackbarID] = new Snackbar(snackbarID);
        
        //element click
        elem.addEventListener('click', function(){
            var current_snackbar = this.getAttribute('stewed-snackbar');
            
            var snackbar = memory_snackbars[current_snackbar];
            if(snackbar.isOpen){
                snackbar.hide();
            }else{
                snackbar.show();
            }
        });
    }
}();