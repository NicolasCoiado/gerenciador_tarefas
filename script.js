const frm = document.querySelector("form")
const lista = document.querySelector("#lista-tarefas")

frm.addEventListener("submit", (e) => {
    e.preventDefault()

    const tarefa = frm.inTarefa.value

    const p = document.createElement("p")
    const texto = document.createTextNode(tarefa)
    p.appendChild(texto)
    lista.appendChild(p)

    frm.inTarefa.value=""
    frm.inTarefa.focus()
})

frm.inSelec.addEventListener("click",()=>{
    const tarefas = document.querySelectorAll("p")

    if (tarefas.length == 0) {
        alert("Não há tarefas para selecionar")
        return                                        
      }
    
      let aux = -1                   
    
      for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].className == "tarefa-selecionada") {
          tarefas[i].className = "tarefa-normal"
          aux = i                        
          break                                     
        }
      }
    
      if (aux == tarefas.length - 1) {
        aux = -1
      }
    
      tarefas[aux + 1].className = "tarefa-selecionada"
})

frm.inRetirar.addEventListener("click", () => { 
    const tarefas = document.querySelectorAll("p")
  
    let aux = -1          
  
    tarefas.forEach((tarefa, i) => {
      if (tarefa.className == "tarefa-selecionada") {
        aux = i                               
      }
    })
  
    if (aux == -1) {      
      alert("Selecione uma tarefa para removê-la...")
      return
    }
      if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {
        lista.removeChild(tarefas[aux])
    }
  })

frm.inGrava.addEventListener("click", () => { 
    const tarefas = document.querySelectorAll("p")

    if (tarefas.length == 0) {
        alert("Não há tarefas para serem salvas")      
        return                                      
    }

    let dados = "" 
    tarefas.forEach(tarefa => { 
        dados += tarefa.innerText + ";"
    })

    localStorage.setItem("tarefas", dados.slice(0, -1))

    if (localStorage.getItem("tarefas")) {
        alert("Ok! Tarefas Salvas")
    }
})

window.addEventListener("load", () => { 
    if (localStorage.getItem("tarefas")) {
        const dados = localStorage.getItem("tarefas").split(";")

    dados.forEach(dado => {
        const p = document.createElement("p")
        const texto = document.createTextNode(dado)
        p.appendChild(texto)
        lista.appendChild(p)
    })
}
})