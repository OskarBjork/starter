import { mark } from "regenerator-runtime";
import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  _errorMessage = "No recipes found for your query! Please try again";
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @param {boolean} [bookmarksAreEmpty] Prevents bugs when removing bookmarks
   * @returns {function | string | undefined}
   * @this {Object} View instance
   * @author Oskar Björk
   * @todo finish implementation
   */
  render(data, render = true, bookmarksAreEmpty = false) {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0 && !bookmarksAreEmpty)
    ) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data, bookmarksAreEmpty = false) {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0 && !bookmarksAreEmpty)
    ) {
      return this.renderError();
    }
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // if (!curEl) return;
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl?.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
		<div class="spinner">
						<svg>
							<use href="${icons}#icon-loader"></use>
						</svg>
					</div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
  	<div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  	</div>
  	<p>${message}</p>
    </div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
		<div>
			<svg>
      <use href="${icons}#icon-smile"></use>
			</svg>
      </div>
      <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
