#!/bin/bash

set -e

DIST_DIR="dist/PFG-DAW-ANGULARFRONT/browser"
BASE_HREF="/PFG-DAW-ANGULARFRONT/"

echo "🧹 Limpiando carpeta de build antigua..."
rm -rf "$DIST_DIR"

echo "⚡ Generando build de producción..."
ng build --configuration production --output-path="dist/PFG-DAW-ANGULARFRONT" --base-href "$BASE_HREF"

echo "📁 Entrando en carpeta browser..."
cd "$DIST_DIR"

echo "📄 Copiando index.html a 404.html..."
if [ -f "index.html" ]; then
    cp index.html 404.html
    echo "✅ Copia realizada"
else
    echo "❌ ERROR: index.html no existe"
    exit 1
fi

echo "🚀 Subiendo a GitHub Pages..."
npx angular-cli-ghpages --dir="."

echo "🎉 Deploy completado con éxito!"