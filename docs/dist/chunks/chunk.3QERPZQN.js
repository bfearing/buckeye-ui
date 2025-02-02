import {
  FormControlController,
  validValidityState
} from "./chunk.2NG3IXEM.js";
import {
  button_styles_default
} from "./chunk.2PN5WG7H.js";
import {
  i as i2,
  n
} from "./chunk.DWZK57IM.js";
import {
  l
} from "./chunk.ECDOB2MG.js";
import {
  HasSlotController
} from "./chunk.WVHZIUTV.js";
import {
  LocalizeController
} from "./chunk.MQ6XKY3Z.js";
import {
  o
} from "./chunk.26WLO5GK.js";
import {
  watch
} from "./chunk.VQ3XOPCT.js";
import {
  BuckeyeElement,
  e,
  e2,
  i,
  t
} from "./chunk.5DKFNGO3.js";
import {
  __decorateClass
} from "./chunk.LKA3TPUC.js";

// src/components/button/button.ts
var Button = class extends BuckeyeElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      form: (input) => {
        if (input.hasAttribute("form")) {
          const doc = input.getRootNode();
          const formId = input.getAttribute("form");
          return doc.getElementById(formId);
        }
        return input.closest("form");
      },
      assumeInteractionOn: ["click"]
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
    this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return this.button.validity;
    }
    return validValidityState;
  }
  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return this.button.validationMessage;
    }
    return "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleHostClick = this.handleHostClick.bind(this);
    this.addEventListener("click", this.handleHostClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleHostClick);
  }
  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("bui-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("bui-focus");
  }
  handleClick() {
    if (this.type === "submit") {
      this.formControlController.submit(this);
    }
    if (this.type === "reset") {
      this.formControlController.reset(this);
    }
  }
  handleHostClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.formControlController.setValidity(this.disabled);
    }
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i2`a` : i2`button`;
    return n`
      <${tag}
        part="base"
        class=${o({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${l(isLink ? void 0 : this.disabled)}
        type=${l(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${l(isLink ? void 0 : this.name)}
        value=${l(isLink ? void 0 : this.value)}
        href=${l(isLink ? this.href : void 0)}
        target=${l(isLink ? this.target : void 0)}
        download=${l(isLink ? this.download : void 0)}
        rel=${l(isLink ? this.rel : void 0)}
        role=${l(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n` <bui-icon part="caret" class="button__caret" library="system" name="caret"></bui-icon> ` : ""}
        ${this.loading ? n`<bui-spinner></bui-spinner>` : ""}
      </${tag}>
    `;
  }
};
Button.styles = button_styles_default;
__decorateClass([
  i(".button")
], Button.prototype, "button", 2);
__decorateClass([
  t()
], Button.prototype, "hasFocus", 2);
__decorateClass([
  t()
], Button.prototype, "invalid", 2);
__decorateClass([
  e2()
], Button.prototype, "title", 2);
__decorateClass([
  e2({ reflect: true })
], Button.prototype, "variant", 2);
__decorateClass([
  e2({ reflect: true })
], Button.prototype, "size", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "caret", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "loading", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "outline", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "pill", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Button.prototype, "circle", 2);
__decorateClass([
  e2()
], Button.prototype, "type", 2);
__decorateClass([
  e2()
], Button.prototype, "name", 2);
__decorateClass([
  e2()
], Button.prototype, "value", 2);
__decorateClass([
  e2()
], Button.prototype, "href", 2);
__decorateClass([
  e2()
], Button.prototype, "target", 2);
__decorateClass([
  e2()
], Button.prototype, "rel", 2);
__decorateClass([
  e2()
], Button.prototype, "download", 2);
__decorateClass([
  e2()
], Button.prototype, "form", 2);
__decorateClass([
  e2({ attribute: "formaction" })
], Button.prototype, "formAction", 2);
__decorateClass([
  e2({ attribute: "formenctype" })
], Button.prototype, "formEnctype", 2);
__decorateClass([
  e2({ attribute: "formmethod" })
], Button.prototype, "formMethod", 2);
__decorateClass([
  e2({ attribute: "formnovalidate", type: Boolean })
], Button.prototype, "formNoValidate", 2);
__decorateClass([
  e2({ attribute: "formtarget" })
], Button.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], Button.prototype, "handleDisabledChange", 1);
Button = __decorateClass([
  e("bui-button")
], Button);

export {
  Button
};
