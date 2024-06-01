// Vanilla js
function initMultiTextStates(_msgsContainer) {
    var _msgs = _msgsContainer.children;
    _msgs = Array.from(_msgs);

    if(_msgs.length===0) {
        console.log("ERROR: The element needs to have children");
    } else {
        _msgsContainer.onclick = ()=> {
            var _msgs = Array.from(_msgsContainer.children);
            for(var i = 0; i < _msgs.length; i++) {
                var _msg = _msgs[i];
                if(_msg.classList.contains("active")) {
                    _msg.classList.remove("active");
                    if(_msg.nextElementSibling) {
                        _msg.nextElementSibling.classList.add("active");
                    } else {
                        _msgs[0].classList.add("active");
                    } // if visible has a next sibling or refer to first element
                    break;
                } // if found visible from for loop
            };
        } // onclick
    } // else

} // initMultiTextStates