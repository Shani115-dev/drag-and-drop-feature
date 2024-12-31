const dropZone = document.getElementById('dropZone');
const imageSection = document.getElementById('imageSection').querySelector('.file-container');
const videoSection = document.getElementById('videoSection').querySelector('.file-container');
const textSection = document.getElementById('textSection').querySelector('.file-container');

// Highlight drop zone when dragging files over it
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('active');
});

// Remove highlight when dragging leaves
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('active');
});

// Handle file drop
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('active');
  
  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Handle files
function handleFiles(files) {
  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const filePreview = document.createElement('div');
      filePreview.classList.add('file-preview');

      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = e.target.result;
        filePreview.appendChild(img);
        imageSection.appendChild(filePreview);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.controls = true;
        video.src = e.target.result;
        filePreview.appendChild(video);
        videoSection.appendChild(filePreview);
      } else if (file.type.startsWith('text/')) {
        const pre = document.createElement('pre');
        pre.textContent = e.target.result;
        filePreview.appendChild(pre);
        textSection.appendChild(filePreview);
      } else {
        alert(`Unsupported file type: ${file.name}`);
      }
    };

    // Read file based on its type
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('text/')) {
      reader.readAsText(file);
    } else {
      alert(`Unsupported file type: ${file.name}`);
    }
  });
}
