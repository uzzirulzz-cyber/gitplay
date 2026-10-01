#!/bin/bash
echo "Starting aggressive micro image optimization..."
mkdir -p public/assets/images/products
mkdir -p src/assets/images/products

# Optimize all files in public/assets/images/products
cd public/assets/images/products
for f in *; do
  if [ -f "$f" ] && [ -s "$f" ]; then
    echo "Optimizing $f to micro thumbnail..."
    # Resize to max 120x120 and set quality to 50%
    convert "$f" -resize 120x120 -quality 50 "opt_$f" 2>/dev/null
    if [ -f "opt_$f" ] && [ -s "opt_$f" ]; then
      mv "opt_$f" "$f"
    fi
  fi
done

# Sync public to src assets so they match
cd ../../../../
cp -r public/assets/images/products/* src/assets/images/products/

echo "Optimization complete!"
du -sh public/assets/images/products
