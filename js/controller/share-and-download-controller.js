'use strict';

// Define doUploadImage() - upload image to web
function doUploadImg(elForm, onSuccess) {
    let formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

// Define onShareFacebook() - share meme to facebook
function onShareFacebook(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgDataFacebook').value = gElCanvas.toDataURL('image/jpeg');

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer?u=${uploadedImgUrl}`, '_blank');
    }

    doUploadImg(elForm, onSuccess);
}


// Define onDownloadMeme() - download meme as png
function onDownloadMeme(elLink) {
    let meme = gElCanvas.toDataURL();
    elLink.href = meme;
}


// Define onShareWhatsapp() - share on whatsapp
function onShareWhatsapp(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgDataWhatsapp').value = gElCanvas.toDataURL('image/jpeg');

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`whatsapp://send?text=${uploadedImgUrl}`, '_blank');
    }

    doUploadImg(elForm, onSuccess);
}