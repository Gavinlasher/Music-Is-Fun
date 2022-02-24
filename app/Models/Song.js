export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get Template() {
    return `
    <div class="bg-light shadow text-center text-dark">
    <img src="${this.albumArt}" class="img-fluid">
    <li> ${this.title}</li>
    <li> ${this.artist}</li>
    <button onclick="app.songsController.getActiveSong('${this.id}')">Select Song </button>
  </div>

        `;
  }

  get playlistTemplate() {
    return `
    <div class="bg-light shadow text-center text-dark">
    <img src="${this.albumArt}" class="img-fluid">
    <li> ${this.title}</li>
    <li> ${this.artist}</li>
    <button onclick="app.songsController.playSong('${this.id}')">Play Song </button>
    <button onclick="app.songsController.deleteSong('${this.id}')">Delete Song </button>
  </div>
        `;
  }
  get ActiveTemplate() {
    return `
    <div class="bg-light shadow text-center text-dark">
    <img src="${this.albumArt}" class="img-fluid">
    <li> ${this.title}</li>
    <li> ${this.artist}</li>
    <audio controls src="${this.preview}"></audio>
    <button onclick="app.songsController.addSong('${this.id}')">Add Song </button>
  </div>
    `;
  }
}
