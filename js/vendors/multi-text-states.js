// Vanilla js
function initMultiTextStates(_msgsContainer, displayMode="inline") {
    var _msgs = _msgsContainer.children;
    _msgs = Array.from(_msgs);

    if(_msgs.length===0) {
        console.log("ERROR: The element needs to have children");
    } else {
        _msgsContainer.onclick = ()=> {
            var _visible = null;
            var _msgs = Array.from(_msgsContainer.children);
            _msgs.forEach((_msg, i)=>{ 
                if(!_msg.style.display || _msg.style.display!=="none") {
                    _visible = _msg;
                    if(_msg.style.display) displayMode = _msg.style.display;
                }
            });
            var _next = _visible.nextElementSibling ? 
                        _visible.nextElementSibling : _msgs[0];
            _visible.style.display = "none";
            _next.style.display = displayMode;
        }
    }
} // initMultiTextStates