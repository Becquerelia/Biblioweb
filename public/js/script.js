document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("basic-auth JS imported successfully!");
    let myModal = document.getElementById('myModal')
    let myInput = document.getElementById('myInput')

    myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
    })
  },
  false
);
