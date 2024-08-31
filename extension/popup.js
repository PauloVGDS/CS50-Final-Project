async function infoAPI() {

  let code = document.querySelector("#inputCode").value
  let container = document.querySelector("#infoContainer")
  let data, template;

  try {

    data =  await fetch(`https://dt5lxpq0ka.execute-api.sa-east-1.amazonaws.com/default/SearchPackageFunction?code=${code}`,
    {
      //AK295696465BR
      mode:"cors",
      method: "GET",
      headers: {
            'Content-Type': 'application/json'
      }
    })
      .then(httpInfo => httpInfo.json())
  }

  
  catch(error) {
    // Se der erro imprime na tela
    console.log(`Erro: ${error}`);
  }
  finally {

    if (code == "") {
      template = `
      <a href="#" id="packageEventPlaceholder" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <p class="mb-1 lead fw-semibold">Your package informations will appears here!</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="80px" width="80px"><path d="m720-80 120-120-28-28-72 72v-164h-40v164l-72-72-28 28L720-80ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"/></svg>
        </div>
      </a>`
      return container.innerHTML = template;
    }
    // Ordenação dos elementos da array por ordem de chegada
    template = ""
    data.eventos.sort((a, b) => {
    a = parseDataHora(a.data, a.hora)   
    b = parseDataHora(b.data, b.hora) 
    return a + b
    });

    // Loop para colocar as informações de cada evento dentro da div 
    for (let i = 0; i < data["eventos"].length; i++) {
      template += `
      <a href="#" id="packageEvent" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 id="eventHeader" class="mb-1">${data.eventos[i].status}</h5>
        </div>
        <p class="mb-1">${data.eventos[i].subStatus[0]}</p>
        <small>${data.eventos[i].subStatus[1] != undefined ? data.eventos[i].subStatus[1] : ""}</small>
        <small>${data.eventos[i].data} ${data.eventos[i].hora}</small>
      </a>
      `
    }
    // String html pronta, inserindo no documento.
    return container.innerHTML = template;
  }
}

function parseDataHora(data, hora) {
  const [dia, mes, ano] = data.split('/');
  const [horas, minutos, segundos] = hora.split(':');
  return new Date(ano, mes - 1, dia, horas, minutos, segundos);
}

function switchTheme() {
  // Seleção do corpo e botão
  let body = document.body;
  let themeBtn = document.querySelector("#themeBtn span");
  // Define o thema do corpo e icone do botão de acordo com o cookie
  body.dataset.theme = localStorage.getItem("theme") == "light" ? "dark" : "light";
  themeBtn.textContent = localStorage.getItem("theme") == "light" ? "light_mode" : "dark_mode";
  localStorage.setItem("theme", body.dataset.theme);
  
}


document.addEventListener("DOMContentLoaded", () => {
  // Seleção do corpo e botão
  let body = document.body;
  let themeBtn = document.querySelector("#themeBtn span");
  

  // Condição para criar os cookies
  if (localStorage.getItem("theme") != null){
    body.dataset.theme = localStorage.getItem("theme");
  } else {
    localStorage.setItem("theme", "light");
    body.dataset.theme = localStorage.getItem("theme");
  }
  // Define o icone do botão de tema de acordo com o cookie
  themeBtn.textContent = localStorage.getItem("theme") == "light" ? "dark_mode" : "light_mode";
});

let searchBtn = document.querySelector("#inputBtn")
searchBtn.addEventListener("click", infoAPI)

let switchBtn = document.querySelector("#themeBtn")
switchBtn.addEventListener("click" ,switchTheme)