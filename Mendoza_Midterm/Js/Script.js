const showMenu = (toggleId, navbarId,bodyId) =>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)

    if(toggle && navbar){
        toggle.addEventListener('click', ()=>{
            // APARECER MENU
            navbar.classList.toggle('show')
            // ROTATE TOGGLE
            toggle.classList.toggle('rotate')
            // PADDING BODY
            bodypadding.classList.toggle('expander')
        })
    }
}
showMenu('nav-toggle','navbar','body')

// LINK ACTIVE COLOR
const linkColor = document.querySelectorAll('.nav__link');   
function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

//addcart 
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000); // Toast visible for 2 seconds
}

const cartButtons = document.querySelectorAll('.btn-cart');
cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        showToast("Product added to cart!");
    });
});

//buynow 
const buyButtons = document.querySelectorAll('.btn-buy');
const modal = document.getElementById('buyModal');
const closeModal = document.querySelector('#buyModal .close');

buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = "block";
    });
});

// Close modal when clicking on the close button
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Handle form submission
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form processing logic here
    alert("Order submitted!");
    modal.style.display = "none";
});

//animation
document.addEventListener('DOMContentLoaded', () => {
    // For each product, add floating shapes
    document.querySelectorAll('.product').forEach(product => {
      // Create a container for shapes if one doesn't exist
      let shapesContainer = product.querySelector('.product-bg-shapes');
      if (!shapesContainer) {
        shapesContainer = document.createElement('div');
        shapesContainer.className = 'product-bg-shapes';
        product.appendChild(shapesContainer);
      }
  
      const numShapes = 5; // Adjust the number as needed
      const shapes = [];
  
      // Create several shapes at random positions within the product
      for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        // Initialize with random positions
        const randomX = Math.random() * product.clientWidth;
        const randomY = Math.random() * product.clientHeight;
        shape.style.left = randomX + 'px';
        shape.style.top = randomY + 'px';
        shapesContainer.appendChild(shape);
        shapes.push(shape);
      }
  
      // For each product, on mouse move, check each shape’s distance from pointer
      product.addEventListener('mousemove', (e) => {
        const rect = product.getBoundingClientRect();
        const pointerX = e.clientX - rect.left;
        const pointerY = e.clientY - rect.top;
        const threshold = 50; // distance threshold in pixels
  
        shapes.forEach(shape => {
          // Get current shape current position (its top-left coordinate relative to product)
          const shapeX = parseFloat(shape.style.left);
          const shapeY = parseFloat(shape.style.top);
          // Calculate the center of the shape
          const shapeCenterX = shapeX + shape.offsetWidth / 2;
          const shapeCenterY = shapeY + shape.offsetHeight / 2;
          const dx = shapeCenterX - pointerX;
          const dy = shapeCenterY - pointerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If the pointer is too close, move the shape away
          if (distance < threshold) {
            // Calculate the angle away from pointer
            const angle = Math.atan2(dy, dx);
            const offset = 30; // how far to push the shape away
            let newX = shapeX + Math.cos(angle) * offset;
            let newY = shapeY + Math.sin(angle) * offset;
            
            // Keep within product boundaries
            newX = Math.max(0, Math.min(newX, product.clientWidth - shape.offsetWidth));
            newY = Math.max(0, Math.min(newY, product.clientHeight - shape.offsetHeight));
            
            shape.style.left = newX + 'px';
            shape.style.top = newY + 'px';
          }
        });
      });
    });
  });
// End of animation
