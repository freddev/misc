__Material design__
```html
<button class="md-button">
    Register
</button>

``` 
```css
/* Define Material Design color palette */
:root {
  --md-primary: #3f51b5;
  --md-secondary: #ff4081;
}

/* Define Material Design button styles */
.md-button {
  background-color: var(--md-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.2s ease-in-out;
}

.md-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
}

.md-button:active {
  transform: translateY(2px);
}

``` 

_fredrik (at) conva se_
