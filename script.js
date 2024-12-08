function isLiked(element) {
    if (element.style.cssText != '') {
        return true;
    }
    else {
        return false;
    }
}
function inputAlert(
    title, placeholder = 'Your input...', showCancelButton = true, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel', noValueReturn = 'The field should not be empty!', mode = 'like') {
    Swal.fire({
        title: title,
        input: 'number',
        inputPlaceholder: placeholder+' ('+document.getElementsByClassName('PostButtonReactions').length+')',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        inputValidator: (value) => {
            if (!value) {
                return noValueReturn;
            }
        }
    }).then((result) => {
        LikeCount = Number(result.value);
        function loop(LikeCount, mode) {
            let ReactionButtons = document.getElementsByClassName('PostButtonReactions');
            let Len_ReactBut = ReactionButtons.length;
            if (LikeCount > Len_ReactBut) {
                window.scrollTo({
                    top: 999999999,
                    left: 0,
                    behavior: 'smooth'
                });
                setTimeout(1000, loop(LikeCount));
            }
            else {
                for (let i = 0; i < LikeCount; i++) {
                    let element = ReactionButtons[i];
                    if (mode == 'like') {
                        if (!isLiked(element)) {
                            element.click();
                        }
                    } else if (mode == 'dislike') {
                        if (isLiked(element)){
                            element.click();
                        }
                    }
                }
            }
        }
        loop(LikeCount, mode);
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'l' && event.altKey) {inputAlert('VKAutoLikes', 'Количество лайков');}
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'L' && event.altKey && event.shiftKey) {inputAlert('VKAutoDislikes', 'Количество дизлайков', mode='dislike');}
});