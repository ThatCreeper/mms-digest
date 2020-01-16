const urlParams = new URLSearchParams(window.location.search);
const marked = require("marked");
window.onload = () => {
  document.getElementsByClassName("mainContent")[0].innerHTML = marked(
    "# " +
      urlParams.get("title") +
      "\n" +
      "### Written By " +
      urlParams.get("author") +
      "\n\n" +
      urlParams.get("content")
  );
};
