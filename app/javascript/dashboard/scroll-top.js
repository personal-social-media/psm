document.addEventListener("turbo:before-render", () =>{
  document.querySelectorAll("[id]").forEach((el) => {
    if(el.id === "") el.removeAttribute("id");
  })
});