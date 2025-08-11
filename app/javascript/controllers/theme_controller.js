import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Initialize theme on page load
    this.initializeTheme()
    
    // Listen for system theme changes (only affects users who haven't manually toggled)
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  }
  
  disconnect() {
    // Clean up if needed
  }
  
  initializeTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme")
    
    if (savedTheme) {
      // User has visited before - use their saved preference
      this.applyTheme(savedTheme)
    } else {
      // First visit - detect system preference and save it
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = systemPrefersDark ? "dark" : "light"
      
      // Save the detected system preference
      localStorage.setItem("theme", initialTheme)
      
      // Apply the theme
      this.applyTheme(initialTheme)
    }
  }
  
  toggle(event) {
    event.preventDefault()
    
    // Get current theme from localStorage (more reliable than checking DOM)
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    
    // Save the new preference
    localStorage.setItem("theme", newTheme)
    
    // Apply the theme
    this.applyTheme(newTheme)
  }
  
  applyTheme(theme) {
    // Update document classes
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    // Update all theme icons on the page
    this.updateAllIcons(theme)
  }
  
  updateAllIcons(theme) {
    // Find all theme toggle buttons and update their icons
    const buttons = document.querySelectorAll('[data-action*="theme#toggle"]')
    
    buttons.forEach(button => {
      const svg = button.querySelector('svg')
      if (svg) {
        // Clear existing content
        while (svg.firstChild) {
          svg.removeChild(svg.firstChild)
        }
        
        // Add new path based on theme
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("stroke-linecap", "round")
        path.setAttribute("stroke-linejoin", "round")
        path.setAttribute("stroke-width", "2")
        
        if (theme === "dark") {
          // Sun icon for dark mode (clicking will switch to light)
          path.setAttribute("d", "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z")
        } else {
          // Moon icon for light mode (clicking will switch to dark)
          path.setAttribute("d", "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z")
        }
        
        svg.appendChild(path)
      }
    })
  }
}