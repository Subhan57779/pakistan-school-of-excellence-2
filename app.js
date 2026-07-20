const STORAGE_KEY = 'pse-admin-images';
const ADMIN_PASSWORD = 'PSEadmin2026';

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setImagePreview(imageElement, placeholderElement, dataUrl) {
  if (!imageElement || !placeholderElement) return;
  if (dataUrl) {
    imageElement.src = dataUrl;
    imageElement.classList.remove('hidden');
    placeholderElement.classList.add('hidden');
  } else {
    imageElement.removeAttribute('src');
    imageElement.classList.add('hidden');
    placeholderElement.classList.remove('hidden');
  }
}

function applySavedImages(images) {
  setImagePreview(document.getElementById('monogramImage'), document.getElementById('monogramPlaceholder'), images.monogram || '');
  setImagePreview(document.getElementById('galleryImage1'), document.getElementById('galleryPlaceholder1'), images.gallery1 || '');
  setImagePreview(document.getElementById('galleryImage2'), document.getElementById('galleryPlaceholder2'), images.gallery2 || '');
  setImagePreview(document.getElementById('galleryImage3'), document.getElementById('galleryPlaceholder3'), images.gallery3 || '');
}

async function getSavedImages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Unable to read saved images', error);
    return {};
  }
}

async function saveImages() {
  const monogramFile = document.getElementById('monogramInput').files[0];
  const gallery1File = document.getElementById('gallery1Input').files[0];
  const gallery2File = document.getElementById('gallery2Input').files[0];
  const gallery3File = document.getElementById('gallery3Input').files[0];

  const images = await getSavedImages();

  if (monogramFile) {
    images.monogram = await readFileAsDataUrl(monogramFile);
  }
  if (gallery1File) {
    images.gallery1 = await readFileAsDataUrl(gallery1File);
  }
  if (gallery2File) {
    images.gallery2 = await readFileAsDataUrl(gallery2File);
  }
  if (gallery3File) {
    images.gallery3 = await readFileAsDataUrl(gallery3File);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  applySavedImages(images);
  alert('Images saved locally in this browser.');
}

function clearImages() {
  localStorage.removeItem(STORAGE_KEY);
  applySavedImages({});
  document.getElementById('monogramInput').value = '';
  document.getElementById('gallery1Input').value = '';
  document.getElementById('gallery2Input').value = '';
  document.getElementById('gallery3Input').value = '';
}

function loadSavedImages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const images = JSON.parse(saved);
    applySavedImages(images);
  } catch (error) {
    console.error('Unable to load saved images', error);
  }
}

function revealAdminPanel() {
  document.getElementById('adminSection').classList.remove('hidden');
  document.getElementById('adminLoginBtn').classList.add('hidden');
  sessionStorage.setItem('pseAdminLoggedIn', 'true');
}

function adminLogin() {
  const password = prompt('Enter admin password to access image upload:');
  if (password === ADMIN_PASSWORD) {
    revealAdminPanel();
  } else if (password !== null) {
    alert('Incorrect password. Access denied.');
  }
}

function checkAdminLogin() {
  if (sessionStorage.getItem('pseAdminLoggedIn') === 'true') {
    revealAdminPanel();
  }
}

document.getElementById('adminLoginBtn').addEventListener('click', adminLogin);

checkAdminLogin();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.getElementById('saveImagesBtn').addEventListener('click', saveImages);
document.getElementById('clearImagesBtn').addEventListener('click', clearImages);

loadSavedImages();
