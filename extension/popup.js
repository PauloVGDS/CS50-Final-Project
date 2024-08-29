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
      // Ordenação dos elementos da array por ordem de chegada
      template = ""
      data.eventos.sort((a, b) => {
      a = parseDataHora(a.data, a.hora)   
      b = parseDataHora(b.data, b.hora) 
      return a + b
      });

          //subStatus":["Origem: Unidade de Tratamento - CONTAGEM/MG",
          //"Destino: Unidade de Distribuição - UBERLANDIA/MG"]


      // Loop para colocar as informações de cada evento dentro da div 
      for (let i = 0; i < data["eventos"].length; i++) {
        template += `
        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${data.eventos[i].status}</h5>
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

function switchTheme() {
  let att = document.documentElement
  let btn = document.querySelector("#themeBtn")
  
  // For some reason if only the textContent be changed the icon dont appears correctly
  if (att.getAttribute("data-theme") == "light") {
    btn.innerHTML = "<span class='material-symbols-outlined'>light_mode</span>"  
    att.setAttribute("data-theme", "dark")
  } else {
    btn.innerHTML = "<span class='material-symbols-outlined'>dark_mode</span>"  
    att.setAttribute("data-theme", "light")
}


}

function parseDataHora(data, hora) {
  const [dia, mes, ano] = data.split('/');
  const [horas, minutos, segundos] = hora.split(':');
  return new Date(ano, mes - 1, dia, horas, minutos, segundos);
};

let searchBtn = document.querySelector("#inputBtn")
searchBtn.addEventListener("click", infoAPI)

let switchBtn = document.querySelector("#themeBtn")
switchBtn.addEventListener("click" ,switchTheme)



