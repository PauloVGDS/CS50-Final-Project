async function infoAPI() {


    function parseDataHora(data, hora) {
      const [dia, mes, ano] = data.split('/');
      const [horas, minutos, segundos] = hora.split(':');
      return new Date(ano, mes - 1, dia, horas, minutos, segundos);
    };

    let code = document.querySelector("#inputCode").value
    let container = document.querySelector("#infoContainer")
    let data;
    let format;

    try {

      data =  await fetch(`http://localhost:1732/${code}`,
      {
        mode:"cors",
        method: "GET",
        headers: {
              'Content-Type': 'application/json'
        }
      })
        .then(httpInfo => httpInfo.json())
        .then(data => data)
    }
    catch(error) {
      // Se der erro imprime na tela
      console.log(`Erro: ${error}`);
    }
    finally {
        // Ordenação da array por ordem de chegada
        format = ""
        data.eventos.sort((a, b) => {
        a = parseDataHora(a.data, a.hora)   
        b = parseDataHora(b.data, b.hora) 
        return a - b
        });

        // Fechamento da nav e começo da div
        format += `
        <div>`
        
        // Loop para colocar as informações de cada evento dentro da div 
        for (let i = 0; i < data["eventos"].length; i++) {
          format += `
              <h2 id="${data.eventos[i].status}">${data.eventos[i].status}</h2>
    
              <p>${data.eventos[i].subStatus}<br>Data: ${data.eventos[i].data} Hora: ${data.eventos[i].hora}</p>
              <hr>
          `
        }
        format += `</div>`
        // String html pronta, inserindo no documento.
        container.innerHTML = format;
        return;
      }
}


function switchTheme() {

  let att = document.documentElement
  let btn = document.querySelector("#themeBtn")

  if (att.getAttribute("data-theme") == "light") {
    btn.innerHTML = "<span class='material-symbols-outlined'>light_mode</span>"  
    att.setAttribute("data-theme", "dark")
  } else {
    btn.innerHTML = "<span class='material-symbols-outlined'>dark_mode</span>"  
    att.setAttribute("data-theme", "light")
  }


}



let searchBtn = document.querySelector("#inputBtn")
searchBtn.addEventListener("click", infoAPI)

let switchBtn = document.querySelector("#themeBtn")
switchBtn.addEventListener("click" ,switchTheme)



