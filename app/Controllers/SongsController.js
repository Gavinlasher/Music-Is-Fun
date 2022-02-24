import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let temp = "";
  ProxyState.songs.forEach((s) => (temp += s.Template));
  document.getElementById("songs").innerHTML = temp;
}

async function getMySongs() {
  await songService.getMySongs();
}

function _drawActiveSong() {
  document.getElementById("active-song").innerHTML =
    ProxyState.activeSong.ActiveTemplate;
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  ProxyState.playlist.forEach((p) => (template += p.playlistTemplate));
  document.getElementById("playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on("songs", _drawResults);
    ProxyState.on("activeSong", _drawActiveSong);
    ProxyState.on("playlist", _drawPlaylist);
    getMySongs();
    _drawPlaylist();
    this.getMyPlaylist();
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  getActiveSong(id) {
    songService.getActiveSong(id);
  }
  playSong(id) {
    songService.playSong(id);
  }

  async getMyPlaylist() {
    try {
      await songService.getMyPlaylist();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    await songService.addSong(id);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async deleteSong(id) {
    try {
      await songService.deleteSong(id);
    } catch (error) {
      console.error(error);
    }
  }
}
