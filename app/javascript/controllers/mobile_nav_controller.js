import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "hamburger", "close"]
  
  connect() {
    this.isOpen = false
  }
  
  toggle() {
    this.isOpen = !this.isOpen
    
    if (this.isOpen) {
      this.menuTarget.classList.remove("hidden")
      this.menuTarget.classList.add("block")
      if (this.hasHamburgerTarget) this.hamburgerTarget.classList.add("hidden")
      if (this.hasCloseTarget) this.closeTarget.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    } else {
      this.menuTarget.classList.add("hidden")
      this.menuTarget.classList.remove("block")
      if (this.hasHamburgerTarget) this.hamburgerTarget.classList.remove("hidden")
      if (this.hasCloseTarget) this.closeTarget.classList.add("hidden")
      document.body.style.overflow = ""
    }
  }
  
  close() {
    if (this.isOpen) {
      this.toggle()
    }
  }
  
  disconnect() {
    document.body.style.overflow = ""
  }
}