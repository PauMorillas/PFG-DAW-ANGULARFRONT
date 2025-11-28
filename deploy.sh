# Salir si hay algún error
set -e

# Variables
PROJECT_DIR=$(pwd)
DIST_DIR="$PROJECT_DIR/dist/PFG-DAW-ANGULARFRONT"
BASE_HREF="/PFG-DAW-ANGULARFRONT/"

echo "🧹 Limpiando carpeta de build antigua..."
rm -rf "$DIST_DIR"

echo "⚡ Generando build de producción..."
ng build --configuration production --output-path="$DIST_DIR" --base-href "$BASE_HREF"

echo "📄 Copiando index.html a 404.html..."
cp "$DIST_DIR/browser/index.html" "$DIST_DIR/browser/404.html"

echo "🚀 Desplegando en GitHub Pages..."
npx angular-cli-ghpages --dir="$DIST_DIR/browser"

echo "✅ Deploy completado con éxito!"