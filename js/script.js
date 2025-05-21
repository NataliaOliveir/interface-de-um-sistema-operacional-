// Seletores
const textArea = document.getElementById('textArea');
const saveLocalBtn = document.getElementById('saveLocalBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const notepad = document.getElementById('notepad');
const titleBar = notepad.querySelector('.title-bar');
const closeBtn = document.getElementById('closeBtn');
const iconNotepad = document.getElementById('icon-notepad');

// Abrir janela
iconNotepad.addEventListener('dblclick', () => {
  notepad.style.display = 'block';
});

// Fechar
closeBtn.addEventListener('click', () => {
  notepad.style.display = 'none';
});

// Salvar no localStorage
saveLocalBtn.addEventListener('click', () => {
  localStorage.setItem('blocoNotasTexto', textArea.value);
  alert('Anotação salva no navegador!');
});

// Restaurar conteúdo salvo
window.addEventListener('load', () => {
  const textoSalvo = localStorage.getItem('blocoNotasTexto');
  if (textoSalvo) {
    textArea.value = textoSalvo;
  }
});

// Baixar como .txt
downloadBtn.addEventListener('click', () => {
  const texto = textArea.value;
  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "anotacao.txt";
  link.click();
});

// Limpar
clearBtn.addEventListener('click', () => {
  textArea.value = "";
  localStorage.removeItem('blocoNotasTexto');
});

// Janela arrastável
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - notepad.offsetLeft;
  offsetY = e.clientY - notepad.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    notepad.style.left = (e.clientX - offsetX) + "px";
    notepad.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Ícones arrastáveis
const icons = document.querySelectorAll('.icon');

window.addEventListener('DOMContentLoaded', () => {
  icons.forEach(icon => {
    const id = icon.id;
    const savedPos = localStorage.getItem(`icon-${id}`);
    if (savedPos) {
      const { x, y } = JSON.parse(savedPos);
      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;
    }
  });
});

icons.forEach(icon => {
  let dragging = false;
  let iconOffsetX = 0;
  let iconOffsetY = 0;

  icon.addEventListener('mousedown', (e) => {
    dragging = true;
    iconOffsetX = e.clientX - icon.offsetLeft;
    iconOffsetY = e.clientY - icon.offsetTop;
    icon.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', (e) => {
    if (dragging) {
      const x = e.clientX - iconOffsetX;
      const y = e.clientY - iconOffsetY;
      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;

      const id = icon.id;
      localStorage.setItem(`icon-${id}`, JSON.stringify({ x, y }));
    }
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      icon.style.zIndex = '';
    }
  });
});
