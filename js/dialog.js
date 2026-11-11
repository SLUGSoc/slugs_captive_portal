const dialog = document.querySelector('#help-dialog');

document.querySelector('#voucher-help')
    .addEventListener('click', () => dialog.showModal());

document.querySelector('#help-close').addEventListener('click', () => dialog.close());