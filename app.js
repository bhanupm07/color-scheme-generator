let url = "https://www.thecolorapi.com/scheme?mode=monochrome&hex=5A00E0";

const loading = document.querySelector(".loading");
const colorsContainer = document.querySelector(".colors-container");

function render(data) {
  let html = "";
  data.colors.forEach((color) => {
    html += `
      <div class="color-div">
      <div class="color" style="background-color:${color.hex.value}"></div>
      <div class="hex-value" onClick="copyToClipboard('${color.hex.value}')">
        <span class="hex">${color.hex.value}</span>
        <i class="fa-regular fa-copy" style="color: #ffffff;"></i>
      </div>
      </div>
      `;
  });
  document.querySelector(".colors-container").innerHTML = html;
}

async function getApiData() {
  loading.style.display = "block";
  const res = await fetch(url);
  const data = await res.json();
  loading.style.display = "none";
  render(data);
  document.querySelector("form").addEventListener("submit", submit);
}
getApiData();

async function submit(e) {
  e.preventDefault();
  const inputColor = document.querySelector("#input-color");
  url = `https://www.thecolorapi.com/scheme?mode=${
    document.querySelector("select").value
  }&hex=${inputColor.value.replace("#", "")}`;
  getApiData();
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
  alert(text + " copied to clipboard");
}
