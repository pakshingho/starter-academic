---
title: Python Tutor
subtitle: Code Visualization
date: 2021-03-30T20:15:24.989Z
draft: false
featured: false
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
<iframe width="800" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=def%20genSub%28L%29%3A%0A%20%20%20%20if%20len%28L%29%20%3D%3D0%3A%0A%20%20%20%20%20%20%20%20return%20%5B%5B%5D%5D%0A%20%20%20%20print%28'L%20is',%20L,%20'Within%20genSub.'%29%0A%20%20%20%20smaller%20%3D%20genSub%28L%5B%3A-1%5D%29%0A%20%20%20%20print%28'smaller%20is%3A',%20smaller%29%0A%20%20%20%20extra%3DL%5B-1%3A%5D%0A%20%20%20%20print%28'extra%3A',extra%29%0A%20%20%20%20new%3D%5B%5D%0A%20%20%20%20for%20small%20in%20smaller%3A%0A%20%20%20%20%20%20%20%20new.append%28small%2Bextra%29%0A%20%20%20%20print%28'new%3A',new%29%0A%20%20%20%20print%28'small%2Bnew%3A',smaller%20%2B%20new%29%0A%20%20%20%20return%20smaller%2Bnew%0A%0AgenSub%28%5B'a','b'%5D%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=py3anaconda&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>