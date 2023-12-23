alert("hi");
$("button").click(function () {
  const task = $("input:text").val();

  const new_item = document.createElement("li");
  new_item.appendChild(document.createTextNode(task));

  list.append(new_item);
});
