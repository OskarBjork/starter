import PreviewView from "./previewView";
import icons from "url:../../img/icons.svg";
import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
