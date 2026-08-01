#!/bin/bash
set -e

echo "Optimizing Logo..."
convert public/Logo-new.webp -resize 460x -quality 82 public/Logo-new.webp
convert public/Logo-new.webp -resize 320x -quality 80 public/Logo-new-320.webp

echo "Optimizing Hero image Majaslapa-tavam-biznesam.webp..."
convert public/Majaslapa-tavam-biznesam.webp -resize 480x -quality 80 public/Majaslapa-tavam-biznesam-480.webp
convert public/Majaslapa-tavam-biznesam.webp -resize 768x -quality 82 public/Majaslapa-tavam-biznesam-768.webp
convert public/Majaslapa-tavam-biznesam.webp -resize 1200x -quality 82 public/Majaslapa-tavam-biznesam-1200.webp

echo "Optimizing Web-izstrades-agentura2.webp..."
convert public/Web-izstrades-agentura2.webp -resize 480x -quality 80 public/Web-izstrades-agentura2-480.webp
convert public/Web-izstrades-agentura2.webp -resize 780x -quality 82 public/Web-izstrades-agentura2-780.webp

echo "Optimizing individuals-dizains-musdienu-tehnologijas.webp..."
convert public/individuals-dizains-musdienu-tehnologijas.webp -resize 480x -quality 80 public/individuals-dizains-musdienu-tehnologijas-480.webp
convert public/individuals-dizains-musdienu-tehnologijas.webp -resize 768x -quality 82 public/individuals-dizains-musdienu-tehnologijas-768.webp
convert public/individuals-dizains-musdienu-tehnologijas.webp -resize 1200x -quality 82 public/individuals-dizains-musdienu-tehnologijas-1200.webp

echo "Optimizing uznemuma-digitala-vizitkarte.webp..."
convert public/uznemuma-digitala-vizitkarte.webp -resize 480x -quality 80 public/uznemuma-digitala-vizitkarte-480.webp
convert public/uznemuma-digitala-vizitkarte.webp -resize 768x -quality 82 public/uznemuma-digitala-vizitkarte-768.webp
convert public/uznemuma-digitala-vizitkarte.webp -resize 1200x -quality 82 public/uznemuma-digitala-vizitkarte-1200.webp

echo "Optimizing Portfolio images..."
convert public/Avangart-portfolio.webp -resize 800x -quality 80 public/Avangart-portfolio-800.webp
convert public/Avangart-portfolio.webp -resize 1200x -quality 82 public/Avangart-portfolio.webp

convert public/Avenuegroup-portfolio.webp -resize 800x -quality 80 public/Avenuegroup-portfolio-800.webp
convert public/Avenuegroup-portfolio.webp -resize 1200x -quality 82 public/Avenuegroup-portfolio.webp

convert public/Travel-with-Martins-portfolio.webp -resize 800x -quality 80 public/Travel-with-Martins-portfolio-800.webp
convert public/Travel-with-Martins-portfolio.webp -resize 1200x -quality 82 public/Travel-with-Martins-portfolio.webp

convert public/Portfolio2-1-1.webp -resize 800x -quality 82 public/Portfolio2-1-1.webp

echo "Optimization complete!"
