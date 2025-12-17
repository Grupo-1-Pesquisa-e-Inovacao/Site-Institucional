function showToast(mensagem) {
  const toast = document.getElementById("toast");
  if(toast.innerHTML){
    toast.className = toast.className.replace("show", "");
  }
  toast.textContent = mensagem;
  toast.className = "show";

  // Remove depois de segundos
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 1200);
}

function showToastErro(mensagem) {
  const toast = document.getElementById("toastErro");
  if(toast.innerHTML){
    toast.className = toast.className.replace("show", "");
  }
  toast.textContent = mensagem;
  toast.className = "show";

  // Remove depois de 4 segundos
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 4000);
  
}

