import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then((res) => {
        ProxyState.songs = res.results.map((rawData) => new Song(rawData));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    const res = await sandBoxApi.get();
    console.log(res.data);
  }

  getActiveSong(id) {
    let activeSong = ProxyState.songs.find((s) => s.id == id);
    ProxyState.activeSong = activeSong;
    console.log(activeSong);
  }
  playSong(id) {
    let clickedSong = ProxyState.playlist.find((ps) => ps.id == id);
    ProxyState.activeSong = clickedSong;
    ProxyState.activeSong = ProxyState.activeSong;
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    // let currentSong = ProxyState.songs.find((s) => s.id == id);
    let currentSong = ProxyState.activeSong;

    const res = await sandBoxApi.post("", currentSong);
    let teemo = new Song(res.data);
    ProxyState.playlist = [...ProxyState.playlist, teemo];
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async deleteSong(id) {
    const res = await sandBoxApi.delete(id);
    ProxyState.playlist = ProxyState.playlist.filter((ps) => ps.id != id);
  }

  async getMyPlaylist() {
    const res = await sandBoxApi.get();
    ProxyState.playlist = res.data.map((s) => new Song(s));
  }
}

const service = new SongsService();
export default service;
