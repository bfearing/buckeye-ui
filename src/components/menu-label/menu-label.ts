import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import BuckeyeElement from '../../internal/buckeye-element';
import styles from './menu-label.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Menu labels are used to describe a group of menu items.
 * @documentation https://buckeyeui.com/components/menu-label
 * @status stable
 * @since 2.0
 *
 * @slot - The menu label's content.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('sl-menu-label')
export default class SlMenuLabel extends BuckeyeElement {
  static styles: CSSResultGroup = styles;

  render() {
    return html` <slot part="base" class="menu-label"></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-menu-label': SlMenuLabel;
  }
}
