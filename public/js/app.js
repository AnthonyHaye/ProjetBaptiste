async function generateCover() {
  try {
    const title = document.getElementById('title').value;
    const profession = document.getElementById('profession').value;
    const prompt = document.getElementById('prompt').value;

    const result = await apiRequest('/books/generate-cover', 'POST', {
      title,
      profession,
      prompt
    });

    const coverImage = document.getElementById('coverImage');
    coverImage.src = result.imageUrl;
    coverImage.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}

async function uploadPhoto() {
  try {
    const fileInput = document.getElementById('photoUpload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('photo', file);

    const result = await apiRequest('/books/upload-photo', 'POST', formData);
    document.getElementById('photoResult').textContent = 'Photo téléversée avec succès !';
  } catch (error) {
    alert(error.message);
  }
}

async function generateChapters() {
  try {
    const theme = document.getElementById('theme').value;
    const result = await apiRequest('/books/generate-chapters', 'POST', { theme });
    document.getElementById('chaptersResult').textContent = JSON.stringify(result.chapters, null, 2);
  } catch (error) {
    alert(error.message);
  }
}