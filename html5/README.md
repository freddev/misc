__html5__
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Advanced HTML5 Example</title>
    <style>
      /* Flexbox layout */
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      /* CSS grid */
      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
      }

      .grid-item {
        background-color: #ddd;
        padding: 20px;
        text-align: center;
        font-size: 2rem;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      /* JavaScript interactivity */
      .btn {
        display: inline-block;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
        margin-top: 20px;
      }

      .btn:hover {
        background-color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Advanced HTML5 Example</h1>
      <p>This page demonstrates some advanced features of HTML5.</p>
      <div class="grid">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
      </div>
      <a href="#" class="btn">Click me</a>
    </div>
    <script>
      // JavaScript interactivity
      const btn = document.querySelector(".btn");
      btn.addEventListener("click", () => {
        alert("Hello World!");
      });
    </script>
  </body>
</html>

```
This code defines a web page that uses the flexbox layout to center its content vertically and horizontally, and the CSS grid to create a 3x2 grid of items. It also uses media queries to make the grid responsive on smaller screens. Additionally, it includes a JavaScript event listener on a button that pops up an alert message when clicked.

_fredrik (at) conva se_
