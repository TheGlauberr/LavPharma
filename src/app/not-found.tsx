export default function NotFound() {
  return (
    <html lang="es">
      <body className="bg-navy min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-6xl font-bold mb-4">404</h1>
          <p className="text-gray-400 text-lg mb-8">Página no encontrada / Page not found</p>
          <a
            href="/"
            className="bg-accent-blue hover:bg-accent-blue-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al inicio / Go home
          </a>
        </div>
      </body>
    </html>
  );
}
