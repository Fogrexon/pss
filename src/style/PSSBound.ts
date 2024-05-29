
export struct PSSBound {
  public size = {
    width: 0,
    height: 0
  }

  public margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  public padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  public getContentSize() {
    return {
      width: this.size.width - this.padding.left - this.padding.right,
      height: this.size.height - this.padding.top - this.padding.bottom
    }
  }
}