'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var errorDialog = errorTemplate.cloneNode(true);
  var successDialog = successTemplate.cloneNode(true);
  var errorDialogBtn = errorDialog.querySelector('.error__button');
  var mainContainer = document.querySelector('main');

  var onErrorDialogOpen = function (error) {
    errorDialog.querySelector('.error__message').textContent = error;
    mainContainer.appendChild(errorDialog);
    errorDialogBtn.addEventListener('click', onErrorDialogClose);
    errorDialog.addEventListener('click', onErrorDialogCloseByClick);
    document.addEventListener('keydown', onErrorDialogCloseByEsc);
  };

  var onErrorDialogClose = function () {
    errorDialog.remove();
    errorDialogBtn.removeEventListener('click', onErrorDialogClose);
    errorDialog.removeEventListener('click', onErrorDialogCloseByClick);
    document.removeEventListener('keydown', onErrorDialogCloseByEsc);
  };

  var onErrorDialogCloseByClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      onErrorDialogClose(evt);
    }
  };

  var onErrorDialogCloseByEsc = function (evt) {
    if (evt.key === 'Escape') {
      onErrorDialogClose(evt);
    }
  };

  var onSuccessOpen = function () {
    mainContainer.appendChild(successDialog);
    document.addEventListener('keydown', onSuccessDialogCloseByEsc);
    successDialog.addEventListener('click', onSuccessDialogCloseByClick);
  };

  var onSuccessDialogClose = function () {
    successDialog.remove();
    document.removeEventListener('keydown', onSuccessDialogCloseByEsc);
    successDialog.removeEventListener('click', onSuccessDialogCloseByClick);
  };

  var onSuccessDialogCloseByClick = function (evt) {
    if (evt.target.classList.contains('success')) {
      onSuccessDialogClose(evt);
    }
  };

  var onSuccessDialogCloseByEsc = function (evt) {
    if (evt.key === 'Escape') {
      onSuccessDialogClose(evt);
    }
  };

  window.dialog = {
    openError: onErrorDialogOpen,
    openSuccess: onSuccessOpen,
  };

})();
