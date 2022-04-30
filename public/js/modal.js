document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("basic-auth JS imported successfully!");
    if (document.querySelector("myModal") && document.querySelector("myInput")) {
      let myModal = document.querySelector("myModal");
      let myInput = document.querySelector("myInput");

      myModal.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
    }
  },
  false
);
