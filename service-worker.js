const CACHE_NAME = 'ganancias-ves-v1';
const urlsToCache = [
    './ganancias_ves_usd_app.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    // Íconos de Placeholders
    'https://placehold.co/192x192/10b981/ffffff?text=VES',
    'https://placehold.co/512x512/10b981/ffffff?text=VES'
];

// Instalar y almacenar en caché los recursos de la aplicación
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Servir el contenido desde la caché si está disponible
self.addEventListener('fetch', (event) => {
    // Si no es una solicitud GET o si es Firebase/API, ignora el Service Worker
    if (event.request.method !== 'GET' || event.request.url.includes('googleapis')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - devuelve la respuesta de la caché
                if (response) {
                    return response;
                }
                // Si no está en caché, va a la red
                return fetch(event.request);
            })
    );
});
