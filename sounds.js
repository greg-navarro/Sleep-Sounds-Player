class Sound {
  constructor(name, soundSrc, imgSrc) {
    this.name = name;
    this.soundSrc = soundSrc;
    this.imgSrc = imgSrc;
  }

  toString() {
    return `${this.name} sound retrieved from ${this.soundSrc}`;
  }
}

export default Sound;