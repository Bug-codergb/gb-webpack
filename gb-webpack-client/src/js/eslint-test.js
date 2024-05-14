import $ from "jquery";
function getContainer() {
  const app = $("#app");
  app.css(
    "boxShadow",
    "0 0 10px rgba(0,0,0,.4)"
  );
  app.css("padding", "20px");
  app.css(
    "borderRadius",
    "5px"
  );
}
console.log("wew");
export { getContainer };
