function MakeTabItem(id) {
  let tab = document.createElement("span");
  tab.classList.add("tab-label");
  tab.setAttribute("role", "tab");
  tab.innerHTML = id;
  return tab;
}

function Activate(tab_group) {
  let tab_list = tab_group.querySelector(".tab-list");
  let tab_content = tab_group.querySelector(".tab-content");
  for (let i = 0; i < tab_content.children.length; i++) {
    tab_content.children[i].setAttribute("hidden", true);
    tab_list.appendChild(MakeTabItem(tab_content.children[i].id));
  }
  for (let i = 0; i < tab_list.children.length; i++) {
    tab_list.children[i].addEventListener("click", ShowTab);
  }
  tab_list.children[0].setAttribute("aria-selected", true);
  tab_content.children[0].removeAttribute("hidden");
}

function ShowTab(event) {
  let target = event.target;
  let tab_group = target.parentElement.parentElement.parentElement;
  let tab_list = tab_group.querySelector(".tab-list");
  let tab_content = tab_group.querySelector(".tab-content");
  for (let i = 0; i < tab_list.children.length; i++) {
    if (target.innerHTML == tab_list.children[i].innerHTML) {
      target.setAttribute("aria-selected", true);
    } else {
      tab_list.children[i].setAttribute("aria-selected", false);
    }
  }
  for (let i = 0; i < tab_content.children.length; i++) {
    if (target.innerHTML == tab_content.children[i].id) {
      tab_content.children[i].removeAttribute("Hidden");
    } else {
      tab_content.children[i].setAttribute("Hidden", true);
    }
  }
}

let tab_groups = Array.from(document.getElementsByClassName("tabs"));
tab_groups.forEach((tab_group) => {
  Activate(tab_group);
});
